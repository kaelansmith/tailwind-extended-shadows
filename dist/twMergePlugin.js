import { mergeConfigs, validators } from "tailwind-merge";
export const withExtendedShadows = (prevConfig) => {
    return mergeConfigs(prevConfig, {
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
