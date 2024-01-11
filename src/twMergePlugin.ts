import { type Config, mergeConfigs, validators } from "tailwind-merge";

type GroupIds =
  | "extendedShadows.offset-x"
  | "extendedShadows.offset-y"
  | "extendedShadows.spread";

export const withExtendedShadows = (
  prevConfig: Config<GroupIds, string>
): Config<GroupIds, string> => {
  return mergeConfigs<GroupIds>(prevConfig, {
    extend: {
      classGroups: {
        // x-axis shadow offsets
        "extendedShadows.offset-x": [
          {
            "shadow-l": ["", validators.isNumber, validators.isArbitraryLength],
          },
          {
            "shadow-r": ["", validators.isNumber, validators.isArbitraryLength],
          },
        ],
        // y-axis shadow offsets
        "extendedShadows.offset-y": [
          {
            "shadow-t": ["", validators.isNumber, validators.isArbitraryLength],
          },
          {
            "shadow-b": ["", validators.isNumber, validators.isArbitraryLength],
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
      },
    },
  });
};
