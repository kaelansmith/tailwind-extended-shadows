import { extendedShadowsPlugin } from "./plugin";

// CJS `require("tailwind-extended-shadows")` must return the plugin function
// directly (project configs use require()). `export =` compiles to module.exports.
export = extendedShadowsPlugin;
