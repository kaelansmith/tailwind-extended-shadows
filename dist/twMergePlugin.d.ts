import { type Config } from "tailwind-merge";
type GroupIds = "extendedShadows.offset-x" | "extendedShadows.offset-y" | "extendedShadows.blur" | "extendedShadows.spread" | "extendedShadows.opacity" | "extendedShadows.shadows" | "extendedShadows.shadows-scale" | "extendedShadows.shadows-ease";
export declare const withExtendedShadows: (prevConfig: Config<GroupIds, string>) => Config<GroupIds, string>;
export {};
