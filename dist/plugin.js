"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendedShadowsPlugin = void 0;
const plugin = require("tailwindcss/plugin");
// @ts-ignore
const flattenColorPaletteImport = require("tailwindcss/lib/util/flattenColorPalette");
const { parseColor } = require("tailwindcss/lib/util/color");
const { importDefault } = require("./helpers");
// Tailwind Play will import these internal imports as ES6 imports, while most
// other workflows will import them as CommonJS imports.
const flattenColorPalette = importDefault(flattenColorPaletteImport);
// Note: we purposely keep all plugin code in one file to make it easy to copy/paste between Tailwind Playground (which serves as a nice dev/testing environment)
const shadowScaleDefaultTheme = {};
for (let i = 1; i <= 5; i += 0.25) {
    shadowScaleDefaultTheme[i] = i.toString();
}
const shadowOpacityDefaultTheme = {};
for (let i = 0; i <= 100; i += 5) {
    shadowOpacityDefaultTheme[i] = i.toString();
}
const BOX_SHADOW_COMPOSITION = `var(--tw-inset-shadow, 0 0 #0000), var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow, 0 0 #0000)`;
/** Default inset shadow geometry (matches Tailwind v3 `shadow-inner` / v4 `inset-shadow-sm`). */
const INSET_SHADOW_DEFAULTS = {
    x: "0px",
    y: "2px",
    blur: "4px",
    spread: "0px",
    color: "rgb(0 0 0 / 0.05)",
};
const insetShadowBaseStyles = ({ x = INSET_SHADOW_DEFAULTS.x, y = INSET_SHADOW_DEFAULTS.y, blur = INSET_SHADOW_DEFAULTS.blur, spread = INSET_SHADOW_DEFAULTS.spread, color = INSET_SHADOW_DEFAULTS.color, preBaseShadowValues = "0 0 #0000", } = {}) => ({
    "--tw-inset-shadow-x-offset": x,
    "--tw-inset-shadow-y-offset": y,
    "--tw-inset-shadow-blur": blur,
    "--tw-inset-shadow-spread": spread,
    "--tw-inset-shadow-opacity": "1",
    "--tw-inset-shadow-layers": "0 0 #0000",
    "--tw-inset-shadows-multiplier": "1",
    "--tw-inset-shadow-layer-base": `${preBaseShadowValues}, inset var(--tw-inset-shadow-x-offset) var(--tw-inset-shadow-y-offset) var(--tw-inset-shadow-blur) var(--tw-inset-shadow-spread) var(--tw-inset-shadow-color, ${color})`,
    "--tw-inset-shadow": "var(--tw-inset-shadow-layer-base)",
    "box-shadow": BOX_SHADOW_COMPOSITION,
});
exports.extendedShadowsPlugin = plugin(function ({ matchUtilities, theme }) {
    /**
     * Helper that parses comma-separated box-shadow values into array of objects,
     * making it easy to loop over and extract x/y/blur/spread/color (and inset).
     * Accepts optional leading `inset` and 2–4 length tokens before color
     * (missing blur/spread normalize to 0px).
     */
    const parseShadowValue = (shadowVal) => {
        const shadowRegex = /(inset\s+)?([-\d.]+[a-z]*)\s+([-\d.]+[a-z]*)(?:\s+([-\d.]+[a-z]*))?(?:\s+([-\d.]+[a-z]*))?\s+(rgba?\([^)]+\)|#[\dA-Fa-f]+)/g;
        const shadows = [];
        let matches;
        while ((matches = shadowRegex.exec(shadowVal)) !== null) {
            let [, inset, x, y, blur, spread, color] = matches;
            blur = blur ?? "0px";
            spread = spread ?? "0px";
            [x, y, blur, spread] = [x, y, blur, spread].map((value) => value === "0" ? "0px" : value);
            shadows.push({ inset: Boolean(inset), x, y, blur, spread, color });
        }
        return shadows.length > 0 ? shadows : null;
    };
    /* Converts HEX color to RGB */
    const toRGB = (value) => parseColor(value)?.color.join(" ");
    const isHexColor = (color) => {
        const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexColorRegex.test(color);
    };
    const resolveShadowColor = (value, modifier, opacityVar) => {
        const defaultOpacityValue = modifier === null || modifier === undefined
            ? 1
            : parseInt(modifier) / 100;
        const opacityValue = `var(${opacityVar}, ${defaultOpacityValue})`;
        const color = isHexColor(value)
            ? `rgb(${toRGB(value)} / ${opacityValue})`
            : typeof value == "function"
                ? value({ opacityValue }) // handle hsl values which are functions
                : value;
        return { color, defaultOpacityValue };
    };
    /**
     * Builds auto-generated shadow layer strings (regular + ease-in + ease-out).
     */
    const buildShadowLayers = ({ totalIterations, xVar, yVar, blurVar, spreadVar, colorVar, multiplierVar, inset = false, }) => {
        let layers = "";
        let layersEaseIn = "";
        let layersEaseOut = "";
        let multiplier = "";
        const insetPrefix = inset ? "inset " : "";
        // note: `shadows-5` means we add 4 additional shadows to the base layer, hence `<` and not `<=` in loop:
        for (let i = 1; i < totalIterations; i++) {
            if (i > 1) {
                layers += ", ";
                layersEaseIn += ", ";
                layersEaseOut += ", ";
                multiplier += " * ";
            }
            multiplier += `var(${multiplierVar})`;
            const x = `calc(var(${xVar}) * ${multiplier})`;
            const y = `calc(var(${yVar}) * ${multiplier})`;
            const blur = `calc(var(${blurVar}) * ${multiplier})`;
            const end = `var(${spreadVar}) var(${colorVar}, rgb(0 0 0 / 0.1))`;
            layers += `${insetPrefix}${x} ${y} ${blur} ${end}`;
            let multiplierEaseIn = i / totalIterations;
            let multiplierEaseOut = (1 - i) / totalIterations;
            layersEaseIn += insetPrefix;
            layersEaseOut += insetPrefix;
            const props = [x, y, blur];
            props.forEach((val) => {
                layersEaseIn += `calc(${val} * ${multiplierEaseIn} * ${multiplierEaseIn}) `;
                layersEaseOut += `calc(${val} * (1 - (${multiplierEaseOut} * ${multiplierEaseOut}))) `;
            });
            layersEaseIn += end;
            layersEaseOut += end;
        }
        return { layers, layersEaseIn, layersEaseOut };
    };
    /**
     * Override built-in shadow-{size} utilities (including shadow-inner) to
     * incorporate custom offset + blur + spread CSS properties, with fallbacks
     * to its default values.
     * Note: it's important that we do this before adding the other utilities further
     * below, as it affects the order of the CSS output, and offset/blur/spread needs
     * to come after shadow-{size} in order to override the defaults.
     */
    const shadowTheme = theme("boxShadow");
    matchUtilities({
        shadow: (value) => {
            // Preserve Tailwind's shadow-none (core boxShadow is disabled by this plugin).
            // Clears outer shadow only — inset is controlled by inset-shadow-none.
            if (value === "none") {
                return {
                    "--tw-shadow": "0 0 #0000",
                    "--tw-shadow-layers": "0 0 #0000",
                    "box-shadow": BOX_SHADOW_COMPOSITION,
                };
            }
            const shadowValues = parseShadowValue(value);
            if (shadowValues?.length) {
                const isInset = shadowValues.every((shadow) => shadow.inset);
                // Mixed inset/outer theme values are not supported
                if (!isInset && shadowValues.some((shadow) => shadow.inset)) {
                    return;
                }
                let preBaseShadowValues = "0 0 #0000";
                let lastBaseShadowValue = shadowValues[0];
                if (shadowValues?.length >= 2) {
                    /**
                     * If values from Tailwind's `theme.boxShadow` include multiple shadow layers,
                     * we handle that below. The last layer becomes the "base" layer used for
                     * auto-generating additional layers via the `shadows-{2-8}` utility.
                     */
                    preBaseShadowValues = "";
                    lastBaseShadowValue = shadowValues.pop();
                    shadowValues.forEach(({ x, y, blur, spread, color }, i) => {
                        if (i > 0)
                            preBaseShadowValues += ", ";
                        const colorVar = isInset
                            ? "--tw-inset-shadow-color"
                            : "--tw-shadow-color";
                        const insetPrefix = isInset ? "inset " : "";
                        preBaseShadowValues += `${insetPrefix}${x} ${y} ${blur} ${spread} var(${colorVar}, ${color})`;
                    });
                }
                const { x, y, blur, spread, color } = lastBaseShadowValue;
                if (isInset) {
                    // v3 `shadow-inner` — same var stack as v4-aligned `inset-shadow`
                    return insetShadowBaseStyles({
                        x,
                        y,
                        blur,
                        spread,
                        color,
                        preBaseShadowValues,
                    });
                }
                return {
                    /**
                     * Note: we set defaults for offset/blur/spread/opacity/layers/multiplier/ease variables here to avoid inheriting
                     * from one of their respective utility classes higher up the tree. If one of these utility classes gets applied
                     * alongside a shadow-{size} class, it will override the defaults because those classes get output after the shadow-{size} classes.
                     */
                    "--tw-shadow-x-offset": x,
                    "--tw-shadow-y-offset": y,
                    "--tw-shadow-blur": blur,
                    "--tw-shadow-spread": spread,
                    "--tw-shadow-opacity": "1",
                    "--tw-shadow-layers": "0 0 #0000",
                    "--tw-shadows-multiplier": "1",
                    "--tw-shadow-layer-base": `${preBaseShadowValues}, var(--tw-shadow-x-offset) var(--tw-shadow-y-offset) var(--tw-shadow-blur) var(--tw-shadow-spread) var(--tw-shadow-color, ${color})`,
                    "--tw-shadow": "var(--tw-shadow-layer-base)",
                    "box-shadow": BOX_SHADOW_COMPOSITION,
                };
            }
        },
    }, {
        values: shadowTheme,
        type: "shadow",
    });
    const themeShadowColors = theme("boxShadowColor");
    matchUtilities({
        shadow: (value, { modifier }) => {
            const { color, defaultOpacityValue } = resolveShadowColor(value, modifier, "--tw-shadow-opacity");
            return {
                "--tw-shadow-color": color,
                "--tw-shadow-opacity": `${defaultOpacityValue}`,
                // have to set "--tw-shadow" again here to override built-in Tailwind stuff
                "--tw-shadow": `var(--tw-shadow-layer-base), var(--tw-shadow-layers, 0 0 #0000)`,
            };
        },
    }, {
        values: flattenColorPalette(themeShadowColors),
        modifiers: "any",
        type: ["color"],
    });
    /**
     *  Create `shadows-{2-8}` utilities for auto-generating shadow layers
     *  Note: `shadows-ease-{in,out}` utilities are also specified here as nested properties
     */
    const layerValues = theme("boxShadowLayers");
    matchUtilities({
        shadows: (value) => {
            const totalIterations = parseInt(value);
            const { layers, layersEaseIn, layersEaseOut } = buildShadowLayers({
                totalIterations,
                xVar: "--tw-shadow-x-offset",
                yVar: "--tw-shadow-y-offset",
                blurVar: "--tw-shadow-blur",
                spreadVar: "--tw-shadow-spread",
                colorVar: "--tw-shadow-color",
                multiplierVar: "--tw-shadows-multiplier",
            });
            return {
                "--tw-shadows-multiplier": "1",
                "--tw-shadow-layers": layers,
                "--tw-shadow": `var(--tw-shadow-layer-base), var(--tw-shadow-layers)`,
                "&.shadows-ease-in": {
                    "--tw-shadow-layers": layersEaseIn,
                },
                "&.shadows-ease-out": {
                    "--tw-shadow-layers": layersEaseOut,
                },
            };
        },
    }, {
        values: layerValues,
    });
    /**
     *  Create box-shadow offset utilities:
     */
    const offsetValues = theme("boxShadowOffset");
    matchUtilities({
        "shadow-x": (value) => ({
            "--tw-shadow-x-offset": `${value}`,
        }),
        "shadow-y": (value) => ({
            "--tw-shadow-y-offset": `${value}`,
        }),
    }, {
        values: offsetValues,
        supportsNegativeValues: true,
    });
    /**
     *  Create box-shadow blur utilities:
     */
    const blurValues = theme("boxShadowBlur");
    matchUtilities({
        "shadow-blur": (value) => ({
            "--tw-shadow-blur": `${value}`,
        }),
    }, {
        values: blurValues,
    });
    /**
     *  Create box-shadow spread utilities:
     */
    const spreadValues = theme("boxShadowSpread");
    matchUtilities({
        "shadow-spread": (value) => ({
            "--tw-shadow-spread": `${value}`,
        }),
    }, {
        values: spreadValues,
        supportsNegativeValues: true,
    });
    /**
     *  Create box-shadow opacity utilities:
     */
    const opacityValues = theme("boxShadowOpacity");
    matchUtilities({
        "shadow-opacity": (value) => ({
            "--tw-shadow-opacity": `${parseInt(value) / 100}`,
        }),
    }, {
        values: opacityValues,
    });
    /**
     *  Create box-shadow layers scaling/multiplier utilities:
     */
    const scaleValues = theme("boxShadowLayersScale");
    matchUtilities({
        "shadows-scale": (value) => ({
            "--tw-shadows-multiplier": `${value}`,
        }),
    }, {
        values: scaleValues,
        supportsNegativeValues: true,
    });
    /**
     * Inset shadow utilities — v4-aligned `inset-shadow-*` / `inset-shadows-*`
     * API that writes to --tw-inset-shadow* variables.
     * Requires an `inset-shadow-{size}` base (or v3 `shadow-inner`) before
     * property utilities take effect.
     */
    const insetShadowTheme = theme("insetBoxShadow");
    matchUtilities({
        "inset-shadow": (value) => {
            if (value === "none") {
                return {
                    "--tw-inset-shadow": "0 0 #0000",
                    "--tw-inset-shadow-layers": "0 0 #0000",
                    "box-shadow": BOX_SHADOW_COMPOSITION,
                };
            }
            const shadowValues = parseShadowValue(value);
            if (shadowValues?.length) {
                let preBaseShadowValues = "0 0 #0000";
                let lastBaseShadowValue = shadowValues[0];
                if (shadowValues.length >= 2) {
                    preBaseShadowValues = "";
                    lastBaseShadowValue = shadowValues.pop();
                    shadowValues.forEach(({ x, y, blur, spread, color }, i) => {
                        if (i > 0)
                            preBaseShadowValues += ", ";
                        preBaseShadowValues += `inset ${x} ${y} ${blur} ${spread} var(--tw-inset-shadow-color, ${color})`;
                    });
                }
                const { x, y, blur, spread, color } = lastBaseShadowValue;
                return insetShadowBaseStyles({
                    x,
                    y,
                    blur,
                    spread,
                    color,
                    preBaseShadowValues,
                });
            }
        },
    }, {
        values: insetShadowTheme,
        type: "shadow",
    });
    matchUtilities({
        "inset-shadow": (value, { modifier }) => {
            const { color, defaultOpacityValue } = resolveShadowColor(value, modifier, "--tw-inset-shadow-opacity");
            return {
                "--tw-inset-shadow-color": color,
                "--tw-inset-shadow-opacity": `${defaultOpacityValue}`,
                "--tw-inset-shadow": `var(--tw-inset-shadow-layer-base), var(--tw-inset-shadow-layers, 0 0 #0000)`,
            };
        },
    }, {
        values: flattenColorPalette(themeShadowColors),
        modifiers: "any",
        type: ["color"],
    });
    matchUtilities({
        "inset-shadows": (value) => {
            const totalIterations = parseInt(value);
            const { layers, layersEaseIn, layersEaseOut } = buildShadowLayers({
                totalIterations,
                xVar: "--tw-inset-shadow-x-offset",
                yVar: "--tw-inset-shadow-y-offset",
                blurVar: "--tw-inset-shadow-blur",
                spreadVar: "--tw-inset-shadow-spread",
                colorVar: "--tw-inset-shadow-color",
                multiplierVar: "--tw-inset-shadows-multiplier",
                inset: true,
            });
            return {
                "--tw-inset-shadows-multiplier": "1",
                "--tw-inset-shadow-layers": layers,
                "--tw-inset-shadow": `var(--tw-inset-shadow-layer-base), var(--tw-inset-shadow-layers)`,
                "&.inset-shadows-ease-in": {
                    "--tw-inset-shadow-layers": layersEaseIn,
                },
                "&.inset-shadows-ease-out": {
                    "--tw-inset-shadow-layers": layersEaseOut,
                },
            };
        },
    }, {
        values: layerValues,
    });
    matchUtilities({
        "inset-shadow-x": (value) => ({
            "--tw-inset-shadow-x-offset": `${value}`,
        }),
        "inset-shadow-y": (value) => ({
            "--tw-inset-shadow-y-offset": `${value}`,
        }),
    }, {
        values: offsetValues,
        supportsNegativeValues: true,
    });
    matchUtilities({
        "inset-shadow-blur": (value) => ({
            "--tw-inset-shadow-blur": `${value}`,
        }),
    }, {
        values: blurValues,
    });
    matchUtilities({
        "inset-shadow-spread": (value) => ({
            "--tw-inset-shadow-spread": `${value}`,
        }),
    }, {
        values: spreadValues,
        supportsNegativeValues: true,
    });
    matchUtilities({
        "inset-shadow-opacity": (value) => ({
            "--tw-inset-shadow-opacity": `${parseInt(value) / 100}`,
        }),
    }, {
        values: opacityValues,
    });
    matchUtilities({
        "inset-shadows-scale": (value) => ({
            "--tw-inset-shadows-multiplier": `${value}`,
        }),
    }, {
        values: scaleValues,
        supportsNegativeValues: true,
    });
}, {
    // Disable core boxShadow + boxShadowColor so this plugin fully owns
    // shadow-{size} and shadow-{color} (including routing v3 shadow-inner into
    // --tw-inset-shadow instead of --tw-shadow) without duplicate conflicting rules.
    corePlugins: {
        boxShadow: false,
        boxShadowColor: false,
    },
    // default theme values:
    theme: {
        insetBoxShadow: {
            DEFAULT: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
            "2xs": "inset 0 1px 0 0 rgb(0 0 0 / 0.05)",
            xs: "inset 0 1px 1px 0 rgb(0 0 0 / 0.05)",
            sm: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
            none: "none",
        },
        boxShadowOffset: {
            px: "1px",
            0: "0",
            0.5: "0.125rem",
            1: "0.25rem",
            1.5: "0.375rem",
            2: "0.5rem",
            2.5: "0.625rem",
            3: "0.75rem",
            3.5: "0.875rem",
            4: "1rem",
            5: "1.25rem",
            6: "1.5rem",
            7: "1.75rem",
            8: "2rem",
        },
        boxShadowBlur: {
            px: "1px",
            0: "0",
            0.5: "0.125rem",
            1: "0.25rem",
            1.5: "0.375rem",
            2: "0.5rem",
            2.5: "0.625rem",
            3: "0.75rem",
            3.5: "0.875rem",
            4: "1rem",
            5: "1.25rem",
            6: "1.5rem",
            7: "1.75rem",
            8: "2rem",
            9: "2.25rem",
            10: "2.5rem",
            11: "2.75rem",
            12: "3rem",
            14: "3.5rem",
            16: "4rem",
        },
        boxShadowSpread: {
            px: "1px",
            0: "0",
            0.5: "0.125rem",
            1: "0.25rem",
            1.5: "0.375rem",
            2: "0.5rem",
            2.5: "0.625rem",
            3: "0.75rem",
            3.5: "0.875rem",
            4: "1rem",
        },
        boxShadowOpacity: shadowOpacityDefaultTheme,
        boxShadowLayersScale: shadowScaleDefaultTheme,
        boxShadowLayers: {
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
        },
    },
});
