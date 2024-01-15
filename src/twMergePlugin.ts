import { type Config, mergeConfigs, validators } from "tailwind-merge";

type GroupIds =
  | "extendedShadows.offset-x"
  | "extendedShadows.offset-y"
  | "extendedShadows.blur"
  | "extendedShadows.spread"
  | "extendedShadows.opacity"
  | "extendedShadows.shadows"
  | "extendedShadows.shadows-scale"
  | "extendedShadows.shadows-ease";

export const withExtendedShadows = (
  prevConfig: Config<GroupIds, string>
): Config<GroupIds, string> => {
  return mergeConfigs<GroupIds>(prevConfig, {
    extend: {
      classGroups: {
        // x-axis shadow offsets
        "extendedShadows.offset-x": [
          {
            "shadow-x": [
              "px",
              validators.isNumber,
              validators.isArbitraryLength,
            ],
          },
        ],
        // y-axis shadow offsets
        "extendedShadows.offset-y": [
          {
            "shadow-y": [
              "px",
              validators.isNumber,
              validators.isArbitraryLength,
            ],
          },
        ],
        // shadow blur
        "extendedShadows.blur": [
          {
            "shadow-blur": [
              "px",
              validators.isNumber,
              validators.isArbitraryLength,
            ],
          },
        ],
        // shadow spread
        "extendedShadows.spread": [
          {
            "shadow-spread": [
              "px",
              validators.isNumber,
              validators.isArbitraryLength,
            ],
          },
        ],
        // shadow opacity
        "extendedShadows.opacity": [
          {
            "shadow-opacity": [
              validators.isInteger,
              validators.isArbitraryNumber,
            ],
          },
        ],
        // shadows (layers)
        "extendedShadows.shadows": [
          {
            shadows: [validators.isInteger],
          },
        ],
        // shadows scale multiplier
        "extendedShadows.shadows-scale": [
          {
            "shadows-scale": [validators.isNumber],
          },
        ],
        // shadows easings
        "extendedShadows.shadows-ease": [
          {
            "shadows-ease": ["in", "out"],
          },
        ],
      },
    },
  });
};
