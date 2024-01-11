import { type Config } from "tailwind-merge";
type GroupIds = "extendedShadows.offset-x" | "extendedShadows.offset-y" | "extendedShadows.spread";
export declare const withExtendedShadows: (prevConfig: Config<GroupIds, string>) => Config<GroupIds, string>;
export {};
