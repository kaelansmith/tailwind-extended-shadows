const plugin = require("tailwindcss/plugin");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette");
const { parseColor } = require("tailwindcss/lib/util/color");
// Note: we purposely keep all plugin code in one file to make it easy to copy/paste between Tailwind Playground (which serves as a nice dev/testing environment)
const shadowScaleDefaultTheme = {};
for (let i = 1; i <= 5; i += 0.25) {
    shadowScaleDefaultTheme[i] = i.toString();
}
const shadowOpacityDefaultTheme = {};
for (let i = 0; i <= 100; i += 5) {
    shadowOpacityDefaultTheme[i] = i.toString();
}
export const extendedShadowsPlugin = plugin(function ({ matchUtilities, theme }) {
    /**
     * Helper that parses comma-separated box-shadow values into array of objects,
     * making it easy to loop over and extract x/y/blur/spread/color
     */
    const parseShadowValue = (shadowVal) => {
        // Regular expression to extract x-offset, y-offset, blur, spread, and color
        const shadowRegex = /([-\d.]+[a-z]*) ([-\d.]+[a-z]*) ([-\d.]+[a-z]*) ([-\d.]+[a-z]*) (rgba?\([^)]+\)|#[\dA-Fa-f]+)/g;
        const shadows = [];
        let matches;
        while ((matches = shadowRegex.exec(shadowVal)) !== null) {
            let [, x, y, blur, spread, color] = matches;
            [x, y, blur, spread] = [x, y, blur, spread].map((value) => value === "0" ? "0px" : value);
            shadows.push({ x, y, blur, spread, color });
        }
        return shadows.length > 0 ? shadows : null;
    };
    /**
     * Override built-in shadow-{size} utilities to incorporate custom offset +
     * blur + spread CSS properties, with fallbacks to its default values.
     * Note: it's important that we do this before adding the other utilities further
     * below, as it affects the order of the CSS output, and offset/blur/spread needs
     * to come after shadow-{size} in order to override the defaults.
     */
    const shadowTheme = theme("boxShadow");
    matchUtilities({
        shadow: (value) => {
            const shadowValues = parseShadowValue(value);
            if (shadowValues?.length) {
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
                        preBaseShadowValues += `${x} ${y} ${blur} ${spread} var(--tw-shadow-color, ${color})`;
                    });
                }
                const { x, y, blur, spread, color } = lastBaseShadowValue;
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
                    "box-shadow": `var(--tw-inset-shadow, 0 0 #0000), var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)`,
                };
            }
        },
    }, {
        values: shadowTheme,
        type: "shadow",
    });
    /* Converts HEX color to RGB */
    const toRGB = (value) => parseColor(value)?.color.join(" ");
    const isHexColor = (color) => {
        const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexColorRegex.test(color);
    };
    const themeShadowColors = theme("boxShadowColor");
    matchUtilities({
        shadow: (value, { modifier }) => {
            const defaultOpacityValue = modifier === null || modifier === undefined
                ? 1
                : parseInt(modifier) / 100;
            const opacityValue = `var(--tw-shadow-opacity, ${defaultOpacityValue})`;
            const color = isHexColor(value)
                ? `rgb(${toRGB(value)} / ${opacityValue})`
                : typeof value == "function"
                    ? value({ opacityValue }) // handle hsl values which are functions
                    : value;
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
            let layers = "";
            let layersEaseIn = "";
            let layersEaseOut = "";
            let multiplier = "";
            // note: `shadows-5` means we add 4 additional shadows to the base layer, hence `<` and not `<=` in loop:
            for (let i = 1; i < totalIterations; i++) {
                if (i > 1) {
                    layers += ", ";
                    layersEaseIn += ", ";
                    layersEaseOut += ", ";
                    multiplier += " * ";
                }
                multiplier += "var(--tw-shadows-multiplier)";
                const x = `calc(var(--tw-shadow-x-offset) * ${multiplier})`;
                const y = `calc(var(--tw-shadow-y-offset) * ${multiplier})`;
                const blur = `calc(var(--tw-shadow-blur) * ${multiplier})`;
                const end = "var(--tw-shadow-spread) var(--tw-shadow-color, rgb(0 0 0 / 0.1))";
                layers += `${x} ${y} ${blur} ${end}`;
                let multiplierEaseIn = i / totalIterations;
                let multiplierEaseOut = (1 - i) / totalIterations;
                const props = [x, y, blur];
                props.forEach((val) => {
                    layersEaseIn += `calc(${val} * ${multiplierEaseIn} * ${multiplierEaseIn}) `;
                    layersEaseOut += `calc(${val} * (1 - (${multiplierEaseOut} * ${multiplierEaseOut}))) `;
                });
                layersEaseIn += end;
                layersEaseOut += end;
            }
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
}, {
    // default theme values:
    theme: {
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
