import postcss from "postcss";
import tailwindcss from "tailwindcss";
// Built CJS entry — `require()` returns the plugin function directly
const extendedShadowsPlugin = require("../dist/index.js");

type GenerateCssOptions = {
  content: string;
  theme?: Record<string, unknown>;
};

/**
 * Compile Tailwind utilities for the given HTML content string using this plugin.
 */
export async function generateCss({
  content,
  theme,
}: GenerateCssOptions): Promise<string> {
  const result = await postcss([
    tailwindcss({
      content: [{ raw: content, extension: "html" }],
      theme: theme ? { extend: theme } : undefined,
      plugins: [extendedShadowsPlugin],
      corePlugins: {
        preflight: false,
      },
    }),
  ]).process("@tailwind utilities;", { from: undefined });

  return result.css;
}

/**
 * Return the CSS rule block for a utility class.
 * Avoids prefix collisions (e.g. `.inset-shadow` vs `.inset-shadow-2xs`).
 */
export function getRule(css: string, className: string): string | null {
  const needle = `.${className.replace(/\//g, "\\/")}`;
  let searchFrom = 0;

  while (searchFrom < css.length) {
    const idx = css.indexOf(needle, searchFrom);
    if (idx === -1) return null;

    const after = css[idx + needle.length];
    // Continue if this is a longer class name (e.g. inset-shadow-2xs)
    if (after && /[a-zA-Z0-9_-]/.test(after)) {
      searchFrom = idx + needle.length;
      continue;
    }

    const braceStart = css.indexOf("{", idx);
    const braceEnd = css.indexOf("}", braceStart);
    if (braceStart === -1 || braceEnd === -1) return null;
    return css.slice(idx, braceEnd + 1);
  }

  return null;
}

export function ruleIncludes(rule: string | null, snippets: string[]): boolean {
  if (!rule) return false;
  return snippets.every((s) => rule.includes(s));
}
