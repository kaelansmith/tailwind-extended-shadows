import { mergeConfigs, validators } from "tailwind-merge";
export const withExtendedShadows = (prevConfig) => {
    return mergeConfigs(prevConfig, {
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
