import "server-only";
import extendedShadows from "tailwind-extended-shadows";

type ThemeScale = Record<string, string>;

type PluginTheme = {
  boxShadowOffset: ThemeScale;
  boxShadowBlur: ThemeScale;
  boxShadowSpread: ThemeScale;
  boxShadowOpacity: ThemeScale;
  boxShadowLayers: ThemeScale;
  boxShadowLayersScale: ThemeScale;
  insetBoxShadow: ThemeScale;
};

/** The default theme scales, read from the plugin itself. */
export const pluginTheme = (
  extendedShadows as unknown as { config: { theme: PluginTheme } }
).config.theme;
