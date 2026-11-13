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
/**
 * Internal custom properties. Their names are kept short because layered
 * utilities repeat them many times per rule. `--tw-shadow`, `--tw-shadow-color`
 * and `--tw-inset-shadow*` stay as-is for compatibility with Tailwind's ring
 * and shadow conventions.
 */
const OUTER_VARS = {
    x: "--tw-sx",
    y: "--tw-sy",
    blur: "--tw-sb",
    spread: "--tw-ss",
    opacity: "--tw-so",
    layers: "--tw-sl",
    multiplier: "--tw-sm",
    power: "--tw-sp",
    base: "--tw-slb",
    color: "--tw-shadow-color",
    shadow: "--tw-shadow",
};
const INSET_VARS = {
    x: "--tw-isx",
    y: "--tw-isy",
    blur: "--tw-isb",
    spread: "--tw-iss",
    opacity: "--tw-iso",
    layers: "--tw-isl",
    multiplier: "--tw-ism",
    power: "--tw-isp",
    base: "--tw-islb",
    color: "--tw-inset-shadow-color",
    shadow: "--tw-inset-shadow",
};
const toFactor = (value) => String(+value.toFixed(8));
/** Default inset shadow geometry (matches Tailwind v3 `shadow-inner` / v4 `inset-shadow-sm`). */
const INSET_SHADOW_DEFAULTS = {
    x: "0px",
    y: "2px",
    blur: "4px",
    spread: "0px",
    color: "rgb(0 0 0 / 0.05)",
};
const insetShadowBaseStyles = ({ x = INSET_SHADOW_DEFAULTS.x, y = INSET_SHADOW_DEFAULTS.y, blur = INSET_SHADOW_DEFAULTS.blur, spread = INSET_SHADOW_DEFAULTS.spread, color = INSET_SHADOW_DEFAULTS.color, preBaseShadowValues = "0 0 #0000", } = {}) => ({
    [INSET_VARS.x]: x,
    [INSET_VARS.y]: y,
    [INSET_VARS.blur]: blur,
    [INSET_VARS.spread]: spread,
    [INSET_VARS.opacity]: "1",
    [INSET_VARS.layers]: "0 0 #0000",
    [INSET_VARS.multiplier]: "1",
    [INSET_VARS.base]: `${preBaseShadowValues}, inset var(${INSET_VARS.x}) var(${INSET_VARS.y}) var(${INSET_VARS.blur}) var(${INSET_VARS.spread}) var(${INSET_VARS.color}, ${color})`,
    [INSET_VARS.shadow]: `var(${INSET_VARS.base})`,
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
     * Layer `i` is scaled by multiplier^i, which `powers` precomputes once per
     * rule (`--tw-sp2: calc(var(--tw-sm) * var(--tw-sm))`, `--tw-sp3: calc(var(--tw-sp2) * var(--tw-sm))`, ...)
     * so each layer references a single variable.
     */
    const buildShadowLayers = (totalIterations, vars, inset = false) => {
        const regular = [];
        const easeIn = [];
        const easeOut = [];
        const powers = {};
        const insetPrefix = inset ? "inset " : "";
        const end = `var(${vars.spread}) var(${vars.color}, rgb(0 0 0 / 0.1))`;
        // note: `shadows-5` means we add 4 additional shadows to the base layer, hence `<` and not `<=` in loop:
        for (let i = 1; i < totalIterations; i++) {
            let power = `var(${vars.multiplier})`;
            if (i > 1) {
                const previous = i === 2 ? power : `var(${vars.power}${i - 1})`;
                powers[`${vars.power}${i}`] = `calc(${previous} * var(${vars.multiplier}))`;
                power = `var(${vars.power}${i})`;
            }
            const layer = (factor) => insetPrefix +
                [vars.x, vars.y, vars.blur]
                    .map((v) => `calc(var(${v}) * ${power}${factor})`)
                    .join(" ") +
                ` ${end}`;
            const easeInFactor = (i / totalIterations) ** 2;
            const easeOutFactor = 1 - ((1 - i) / totalIterations) ** 2;
            regular.push(layer(""));
            easeIn.push(layer(` * ${toFactor(easeInFactor)}`));
            easeOut.push(layer(easeOutFactor === 1 ? "" : ` * ${toFactor(easeOutFactor)}`));
        }
        return {
            powers,
            layers: regular.join(", "),
            layersEaseIn: easeIn.join(", "),
            layersEaseOut: easeOut.join(", "),
        };
    };
    /**
     * `shadows-{n}` (with nested `shadows-ease-{in,out}` modifiers) plus the
     * single-rule `shadows-in-{n}` / `shadows-out-{n}` forms, which only emit the
     * easing that's used and can be `@apply`-ed.
     */
    const layerUtilities = (prefix, vars, inset = false) => {
        const declarations = (layers, powers) => ({
            [vars.multiplier]: "1",
            ...powers,
            [vars.layers]: layers,
            [vars.shadow]: `var(${vars.base}), var(${vars.layers})`,
        });
        const build = (value) => buildShadowLayers(parseInt(value), vars, inset);
        return {
            [prefix]: (value) => {
                const { powers, layers, layersEaseIn, layersEaseOut } = build(value);
                return {
                    ...declarations(layers, powers),
                    [`&.${prefix}-ease-in`]: { [vars.layers]: layersEaseIn },
                    [`&.${prefix}-ease-out`]: { [vars.layers]: layersEaseOut },
                };
            },
            [`${prefix}-in`]: (value) => {
                const { powers, layersEaseIn } = build(value);
                return declarations(layersEaseIn, powers);
            },
            [`${prefix}-out`]: (value) => {
                const { powers, layersEaseOut } = build(value);
                return declarations(layersEaseOut, powers);
            },
        };
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
                    [OUTER_VARS.shadow]: "0 0 #0000",
                    [OUTER_VARS.layers]: "0 0 #0000",
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
                        const colorVar = isInset ? INSET_VARS.color : OUTER_VARS.color;
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
                    [OUTER_VARS.x]: x,
                    [OUTER_VARS.y]: y,
                    [OUTER_VARS.blur]: blur,
                    [OUTER_VARS.spread]: spread,
                    [OUTER_VARS.opacity]: "1",
                    [OUTER_VARS.layers]: "0 0 #0000",
                    [OUTER_VARS.multiplier]: "1",
                    [OUTER_VARS.base]: `${preBaseShadowValues}, var(${OUTER_VARS.x}) var(${OUTER_VARS.y}) var(${OUTER_VARS.blur}) var(${OUTER_VARS.spread}) var(${OUTER_VARS.color}, ${color})`,
                    [OUTER_VARS.shadow]: `var(${OUTER_VARS.base})`,
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
            const { color, defaultOpacityValue } = resolveShadowColor(value, modifier, OUTER_VARS.opacity);
            return {
                [OUTER_VARS.color]: color,
                [OUTER_VARS.opacity]: `${defaultOpacityValue}`,
                // have to set "--tw-shadow" again here to override built-in Tailwind stuff
                [OUTER_VARS.shadow]: `var(${OUTER_VARS.base}), var(${OUTER_VARS.layers}, 0 0 #0000)`,
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
    matchUtilities(layerUtilities("shadows", OUTER_VARS), {
        values: layerValues,
    });
    /**
     *  Create box-shadow offset utilities:
     */
    const offsetValues = theme("boxShadowOffset");
    matchUtilities({
        "shadow-x": (value) => ({
            [OUTER_VARS.x]: `${value}`,
        }),
        "shadow-y": (value) => ({
            [OUTER_VARS.y]: `${value}`,
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
            [OUTER_VARS.blur]: `${value}`,
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
            [OUTER_VARS.spread]: `${value}`,
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
            [OUTER_VARS.opacity]: `${parseInt(value) / 100}`,
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
            [OUTER_VARS.multiplier]: `${value}`,
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
                    [INSET_VARS.shadow]: "0 0 #0000",
                    [INSET_VARS.layers]: "0 0 #0000",
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
                        preBaseShadowValues += `inset ${x} ${y} ${blur} ${spread} var(${INSET_VARS.color}, ${color})`;
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
            const { color, defaultOpacityValue } = resolveShadowColor(value, modifier, INSET_VARS.opacity);
            return {
                [INSET_VARS.color]: color,
                [INSET_VARS.opacity]: `${defaultOpacityValue}`,
                [INSET_VARS.shadow]: `var(${INSET_VARS.base}), var(${INSET_VARS.layers}, 0 0 #0000)`,
            };
        },
    }, {
        values: flattenColorPalette(themeShadowColors),
        modifiers: "any",
        type: ["color"],
    });
    matchUtilities(layerUtilities("inset-shadows", INSET_VARS, true), {
        values: layerValues,
    });
    matchUtilities({
        "inset-shadow-x": (value) => ({
            [INSET_VARS.x]: `${value}`,
        }),
        "inset-shadow-y": (value) => ({
            [INSET_VARS.y]: `${value}`,
        }),
    }, {
        values: offsetValues,
        supportsNegativeValues: true,
    });
    matchUtilities({
        "inset-shadow-blur": (value) => ({
            [INSET_VARS.blur]: `${value}`,
        }),
    }, {
        values: blurValues,
    });
    matchUtilities({
        "inset-shadow-spread": (value) => ({
            [INSET_VARS.spread]: `${value}`,
        }),
    }, {
        values: spreadValues,
        supportsNegativeValues: true,
    });
    matchUtilities({
        "inset-shadow-opacity": (value) => ({
            [INSET_VARS.opacity]: `${parseInt(value) / 100}`,
        }),
    }, {
        values: opacityValues,
    });
    matchUtilities({
        "inset-shadows-scale": (value) => ({
            [INSET_VARS.multiplier]: `${value}`,
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
