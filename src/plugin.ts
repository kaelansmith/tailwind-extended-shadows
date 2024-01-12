const plugin = require("tailwindcss/plugin");

export const extendedShadowsPlugin = plugin(function ({
  matchUtilities,
  theme,
}) {
  /* 
    First, override built-in shadow-{size} utilities to incorporate custom offset + 
    spread CSS properties, with fallbacks to its default offset + spread values.
    Note: it's important that we do this before adding the offset/spread utilities further
    below, as it affects the order of the CSS output, and spread/offset needs to come after
    shadow-{size} in order to override the defaults.
  */

  const shadowTheme = theme("boxShadow");

  const parseShadowValue = (shadowVal) => {
    // Regular expression to extract x-offset, y-offset, blur, spread, and color
    const shadowRegex =
      /([-\d.]+[a-z]*) ([-\d.]+[a-z]*) ([-\d.]+[a-z]*) ([-\d.]+[a-z]*) (rgba?\([^)]+\)|#[\dA-Fa-f]+)/;
    const matches = shadowVal?.match(shadowRegex);

    if (matches) {
      let [, x, y, blur, spread, color] = matches;

      // convert `0` to `0px` to fix `calc` bug for `shadows-*` utility (calc multiplication requires at least one of the values to be a length)
      if (x == 0) x = "0px";
      if (y == 0) y = "0px";
      if (blur == 0) blur = "0px";
      if (spread == 0) spread = "0px";

      return [x, y, blur, spread, color];
    }

    return null;
  };

  matchUtilities(
    {
      shadow: (value) => {
        const shadowValues = parseShadowValue(value);

        if (shadowValues) {
          const [x, y, blur, spread, color] = shadowValues;

          return {
            /* 
              Note: we purposely reset the offset/spread variables here to avoid inheriting from offset/spread classes higher up the tree. If an offset/spread class gets applied alongside a shadow-{size} class, it will override the resets below because those classes get output after the shadow-{size} classes.
            */
            "--tw-shadow-x-offset": x,
            "--tw-shadow-y-offset": y,
            "--tw-shadow-blur": blur,
            "--tw-shadow-spread": spread,
            "--tw-shadow-layer-base": `var(--tw-shadow-x-offset) var(--tw-shadow-y-offset) var(--tw-shadow-blur) var(--tw-shadow-spread) var(--tw-shadow-color, ${color})`,
            "--tw-shadow": "var(--tw-shadow-layer-base)",
            "box-shadow": `var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)`,
          };
        }
      },
    },
    {
      values: shadowTheme,
      variants: ["responsive"],
      type: "shadow",
    }
  );

  /**
   *  Create `shadows-{2-8}` utilities for auto-generating shadow layers
   *  Note: `shadows-ease-{in,out}` utilities are also specified here as nested properties
   */
  matchUtilities(
    {
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
          const end =
            "var(--tw-shadow-spread) var(--tw-shadow-color, rgb(0 0 0 / 0.1))";
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
          "--tw-shadows-ease": "1",
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
    },
    {
      values: {
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
      },
      variants: ["responsive"],
    }
  );

  /**
   *  Create offset/spread utilities:
   *
   *  Shadow offset + spread utilities use the theme's spacing values. Below we make `spacing.1`
   *  the default value, and remove the option for appending `-1`. This follows Tailwind's internal API
   *  design pattern where you can, for example, specify `border-2`, but not `border-1` -- the latter is
   *  applied with just `border`. Same goes for us, eg. `shadow-b` equates to `shadow-b-1`.
   */
  const spacingValues = {
    ...theme("spacing"),
    DEFAULT: theme("spacing.1"),
  };
  delete spacingValues[1];

  // shadow x and y offsets (automatically supports arbitrary values thanks to `matchUtilities`)
  matchUtilities(
    {
      "shadow-y": (value) => ({
        "--tw-shadow-y-offset": value,
      }),
      "shadow-x": (value) => ({
        "--tw-shadow-x-offset": value,
      }),
    },
    {
      values: spacingValues,
      variants: ["responsive"],
      supportsNegativeValues: true,
    }
  );

  // shadow spread
  matchUtilities(
    {
      "shadow-spread": (value) => ({
        "--tw-shadow-spread": value,
      }),
    },
    {
      values: spacingValues,
      variants: ["responsive"],
      supportsNegativeValues: true,
    }
  );

  const scaleValues = {};
  for (let i = 1; i <= 5; i += 0.25) {
    scaleValues[i] = i.toString();
  }

  // Create shadow layers scaling multiplier utilities
  matchUtilities(
    {
      "shadows-scale": (value) => ({
        "--tw-shadows-multiplier": value,
      }),
    },
    {
      values: scaleValues,
      variants: ["responsive"],
      supportsNegativeValues: true,
    }
  );
});
