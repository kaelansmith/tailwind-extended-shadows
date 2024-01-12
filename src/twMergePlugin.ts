import { type Config, mergeConfigs, validators } from "tailwind-merge";

type GroupIds =
  | "extendedShadows.offset-x"
  | "extendedShadows.offset-y"
  | "extendedShadows.spread"
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
            "shadow-x": ["", validators.isNumber, validators.isArbitraryLength],
          },
        ],
        // y-axis shadow offsets
        "extendedShadows.offset-y": [
          {
            "shadow-y": ["", validators.isNumber, validators.isArbitraryLength],
          },
        ],
        // shadow spread
        "extendedShadows.spread": [
          {
            "shadow-spread": [
              "",
              validators.isNumber,
              validators.isArbitraryLength,
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
