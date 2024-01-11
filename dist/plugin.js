const plugin = require("tailwindcss/plugin");
export const extendedShadowsPlugin = plugin(function ({ matchUtilities, theme, }) {
    /*
      First, override built-in shadow-{size} utilities to incorporate custom offset +
      spread CSS properties, with fallbacks to its default offset + spread values.
      Note: it's important that we do this before adding the offset/spread utilities further
      below, as it affects the order of the CSS output, and spread/offset needs to come after
      shadow-{size} in order to override the defaults.
    */
    const shadowSizes = theme("boxShadow");
    matchUtilities({
        shadow: (value) => {
            // Regular expression to extract x-offset, y-offset, blur, spread, and color
            const shadowRegex = /([-\d.]+[a-z]*) ([-\d.]+[a-z]*) ([-\d.]+[a-z]*) ([-\d.]+[a-z]*) (rgba?\([^)]+\)|#[\dA-Fa-f]+)/;
            const matches = value?.match(shadowRegex);
            if (matches) {
                const [, x, y, blur, spread, color] = matches;
                return {
                    /*
                      Note: we purposely reset the offset/spread variables here to avoid inheriting from offset/spread classes higher up the tree.
                      If an offset/spread class gets applied alongside a shadow-{size} class, it will override the resets below because those classes
                      get output after the shadow-{size} classes.
                     */
                    "--tw-shadow-x-offset": x,
                    "--tw-shadow-y-offset": y,
                    "--tw-shadow-spread": spread,
                    "--tw-shadow-color": color,
                    "--tw-shadow-blur": blur,
                    "--tw-shadow": `var(--tw-shadow-x-offset) var(--tw-shadow-y-offset) var(--tw-shadow-blur) var(--tw-shadow-spread) var(--tw-shadow-color)`,
                    "box-shadow": `var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)`,
                };
            }
        },
    }, {
        values: shadowSizes,
        variants: ["responsive"],
        type: "shadow",
    });
    /*
      Second, create offset/spread utilities:
      
      Shadow offset + spread utilities use the theme's spacing values. Below we make `spacing.1`
      the default value, and remove the option for appending `-1`. This follows Tailwind's internal API
      design pattern where you can, for example, specify `border-2`, but not `border-1` -- the latter is
      applied with just `border`. Same goes for us, eg. `shadow-b` equates to `shadow-b-1`.
     */
    const spacingValues = {
        ...theme("spacing"),
        DEFAULT: theme("spacing.1"),
    };
    delete spacingValues[1];
    // shadow x and y offsets (automatically supports arbitrary values thanks to `matchUtilities`)
    matchUtilities({
        "shadow-t": (value) => ({
            "--tw-shadow-y-offset": `-${value}`,
        }),
        "shadow-b": (value) => ({
            "--tw-shadow-y-offset": value,
        }),
        "shadow-l": (value) => ({
            "--tw-shadow-x-offset": `-${value}`,
        }),
        "shadow-r": (value) => ({
            "--tw-shadow-x-offset": value,
        }),
    }, {
        values: spacingValues,
        variants: ["responsive"],
    });
    // shadow spread
    matchUtilities({
        "shadow-spread": (value) => ({
            "--tw-shadow-spread": value,
        }),
    }, {
        values: spacingValues,
        variants: ["responsive"],
        supportsNegativeValues: true,
    });
});
