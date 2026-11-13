/**
 * Every class the playground can output. Tailwind scans this file, so each
 * class must be a full literal string (no string concatenation).
 *
 * The zero options use `[0px]`: the theme value `0` has no unit, so it becomes
 * an invalid `calc(0 * n)` length when layers are active.
 */

export type Option = {
  label: string;
  className: string | null;
};

export const sizeOptions: Option[] = [
  { label: "sm", className: "shadow-sm" },
  { label: "md", className: "shadow-md" },
  { label: "lg", className: "shadow-lg" },
  { label: "xl", className: "shadow-xl" },
  { label: "2xl", className: "shadow-2xl" },
];

export const xOptions: Option[] = [
  { label: "-8", className: "-shadow-x-8" },
  { label: "-6", className: "-shadow-x-6" },
  { label: "-4", className: "-shadow-x-4" },
  { label: "-3", className: "-shadow-x-3" },
  { label: "-2", className: "-shadow-x-2" },
  { label: "-1", className: "-shadow-x-1" },
  { label: "-px", className: "-shadow-x-px" },
  { label: "0", className: "shadow-x-[0px]" },
  { label: "px", className: "shadow-x-px" },
  { label: "1", className: "shadow-x-1" },
  { label: "2", className: "shadow-x-2" },
  { label: "3", className: "shadow-x-3" },
  { label: "4", className: "shadow-x-4" },
  { label: "6", className: "shadow-x-6" },
  { label: "8", className: "shadow-x-8" },
];

export const yOptions: Option[] = [
  { label: "-8", className: "-shadow-y-8" },
  { label: "-6", className: "-shadow-y-6" },
  { label: "-4", className: "-shadow-y-4" },
  { label: "-3", className: "-shadow-y-3" },
  { label: "-2", className: "-shadow-y-2" },
  { label: "-1", className: "-shadow-y-1" },
  { label: "-px", className: "-shadow-y-px" },
  { label: "0", className: "shadow-y-[0px]" },
  { label: "px", className: "shadow-y-px" },
  { label: "0.5", className: "shadow-y-0.5" },
  { label: "1", className: "shadow-y-1" },
  { label: "2", className: "shadow-y-2" },
  { label: "3", className: "shadow-y-3" },
  { label: "4", className: "shadow-y-4" },
  { label: "5", className: "shadow-y-5" },
  { label: "6", className: "shadow-y-6" },
  { label: "8", className: "shadow-y-8" },
];

export const blurOptions: Option[] = [
  { label: "0", className: "shadow-blur-[0px]" },
  { label: "px", className: "shadow-blur-px" },
  { label: "0.5", className: "shadow-blur-0.5" },
  { label: "1", className: "shadow-blur-1" },
  { label: "2", className: "shadow-blur-2" },
  { label: "3", className: "shadow-blur-3" },
  { label: "4", className: "shadow-blur-4" },
  { label: "5", className: "shadow-blur-5" },
  { label: "6", className: "shadow-blur-6" },
  { label: "8", className: "shadow-blur-8" },
  { label: "10", className: "shadow-blur-10" },
  { label: "12", className: "shadow-blur-12" },
  { label: "16", className: "shadow-blur-16" },
];

export const spreadOptions: Option[] = [
  { label: "-4", className: "-shadow-spread-4" },
  { label: "-3", className: "-shadow-spread-3" },
  { label: "-2", className: "-shadow-spread-2" },
  { label: "-1", className: "-shadow-spread-1" },
  { label: "-px", className: "-shadow-spread-px" },
  { label: "0", className: "shadow-spread-0" },
  { label: "px", className: "shadow-spread-px" },
  { label: "1", className: "shadow-spread-1" },
  { label: "2", className: "shadow-spread-2" },
  { label: "3", className: "shadow-spread-3" },
  { label: "4", className: "shadow-spread-4" },
];

export const opacityOptions: Option[] = [
  { label: "0", className: "shadow-opacity-0" },
  { label: "5", className: "shadow-opacity-5" },
  { label: "10", className: "shadow-opacity-10" },
  { label: "15", className: "shadow-opacity-15" },
  { label: "20", className: "shadow-opacity-20" },
  { label: "25", className: "shadow-opacity-25" },
  { label: "30", className: "shadow-opacity-30" },
  { label: "40", className: "shadow-opacity-40" },
  { label: "50", className: "shadow-opacity-50" },
  { label: "60", className: "shadow-opacity-60" },
  { label: "75", className: "shadow-opacity-75" },
  { label: "100", className: "shadow-opacity-100" },
];

export const layerOptions: Option[] = [
  { label: "1", className: null },
  { label: "2", className: "shadows-2" },
  { label: "3", className: "shadows-3" },
  { label: "4", className: "shadows-4" },
  { label: "5", className: "shadows-5" },
  { label: "6", className: "shadows-6" },
  { label: "7", className: "shadows-7" },
  { label: "8", className: "shadows-8" },
];

export const scaleOptions: Option[] = [
  { label: "1", className: "shadows-scale-1" },
  { label: "1.25", className: "shadows-scale-1.25" },
  { label: "1.5", className: "shadows-scale-1.5" },
  { label: "1.75", className: "shadows-scale-1.75" },
  { label: "2", className: "shadows-scale-2" },
  { label: "2.25", className: "shadows-scale-2.25" },
  { label: "2.5", className: "shadows-scale-2.5" },
  { label: "2.75", className: "shadows-scale-2.75" },
  { label: "3", className: "shadows-scale-3" },
];

export const easeOptions: Option[] = [
  { label: "None", className: null },
  { label: "In", className: "shadows-ease-in" },
  { label: "Out", className: "shadows-ease-out" },
];

export type ColorOption = Option & { swatch: string };

export const colorOptions: ColorOption[] = [
  { label: "Zinc", className: "shadow-zinc-900", swatch: "bg-zinc-900" },
  { label: "Black", className: "shadow-black", swatch: "bg-black" },
  { label: "Indigo", className: "shadow-indigo-600", swatch: "bg-indigo-600" },
  { label: "Rose", className: "shadow-rose-600", swatch: "bg-rose-600" },
  {
    label: "Emerald",
    className: "shadow-emerald-600",
    swatch: "bg-emerald-600",
  },
  { label: "Amber", className: "shadow-amber-500", swatch: "bg-amber-500" },
];
