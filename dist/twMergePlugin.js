"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withExtendedShadows = void 0;
const tailwind_merge_1 = require("tailwind-merge");
const withExtendedShadows = (prevConfig) => {
    return (0, tailwind_merge_1.mergeConfigs)(prevConfig, {
        extend: {
            classGroups: {
                // x-axis shadow offsets
                "extendedShadows.offset-x": [
                    {
                        "shadow-x": [
                            "px",
                            tailwind_merge_1.validators.isNumber,
                            tailwind_merge_1.validators.isArbitraryLength,
                        ],
                    },
                ],
                // y-axis shadow offsets
                "extendedShadows.offset-y": [
                    {
                        "shadow-y": [
                            "px",
                            tailwind_merge_1.validators.isNumber,
                            tailwind_merge_1.validators.isArbitraryLength,
                        ],
                    },
                ],
                // shadow blur
                "extendedShadows.blur": [
                    {
                        "shadow-blur": [
                            "px",
                            tailwind_merge_1.validators.isNumber,
                            tailwind_merge_1.validators.isArbitraryLength,
                        ],
                    },
                ],
                // shadow spread
                "extendedShadows.spread": [
                    {
                        "shadow-spread": [
                            "px",
                            tailwind_merge_1.validators.isNumber,
                            tailwind_merge_1.validators.isArbitraryLength,
                        ],
                    },
                ],
                // shadow opacity
                "extendedShadows.opacity": [
                    {
                        "shadow-opacity": [
                            tailwind_merge_1.validators.isInteger,
                            tailwind_merge_1.validators.isArbitraryNumber,
                        ],
                    },
                ],
                // shadows (layers)
                "extendedShadows.shadows": [
                    {
                        shadows: [tailwind_merge_1.validators.isInteger],
                    },
                ],
                // shadows scale multiplier
                "extendedShadows.shadows-scale": [
                    {
                        "shadows-scale": [tailwind_merge_1.validators.isNumber],
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
exports.withExtendedShadows = withExtendedShadows;
