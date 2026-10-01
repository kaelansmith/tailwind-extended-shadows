import { describe, expect, it } from "vitest";
import { generateCss, getRule, ruleIncludes } from "./generateCss";

describe("outer shadow utilities (regression)", () => {
  it("emits outer CSS vars for shadow-md", async () => {
    const css = await generateCss({ content: `<div class="shadow-md"></div>` });
    const rule = getRule(css, "shadow-md");
    expect(rule).toBeTruthy();
    expect(
      ruleIncludes(rule, [
        "--tw-shadow-x-offset",
        "--tw-shadow-y-offset",
        "--tw-shadow-blur",
        "--tw-shadow-spread",
        "--tw-shadow-layer-base",
        "box-shadow:",
        "var(--tw-inset-shadow",
        "var(--tw-shadow",
      ]),
    ).toBe(true);
    // Outer size must not write inset offset vars
    expect(rule!.includes("--tw-inset-shadow-x-offset")).toBe(false);
  });

  it("supports shadow-x / shadow-y / shadow-blur overrides", async () => {
    const css = await generateCss({
      content: `<div class="shadow-lg shadow-x-1 shadow-y-2 shadow-blur-3"></div>`,
    });
    expect(getRule(css, "shadow-x-1")).toContain("--tw-shadow-x-offset");
    expect(getRule(css, "shadow-y-2")).toContain("--tw-shadow-y-offset");
    expect(getRule(css, "shadow-blur-3")).toContain("--tw-shadow-blur");
  });

  it("supports shadow color with opacity modifier", async () => {
    const css = await generateCss({
      content: `<div class="shadow-md shadow-black/20"></div>`,
    });
    const rule = getRule(css, "shadow-black/20");
    expect(rule).toBeTruthy();
    expect(rule!).toContain("--tw-shadow-color");
    expect(rule!).toContain("--tw-shadow-opacity");
  });

  it("supports layered shadows", async () => {
    const css = await generateCss({
      content: `<div class="shadow-sm shadows-3 shadows-scale-2 shadows-ease-out"></div>`,
    });
    expect(getRule(css, "shadows-3")).toContain("--tw-shadow-layers");
    expect(getRule(css, "shadows-scale-2")).toContain(
      "--tw-shadows-multiplier",
    );
    expect(css).toMatch(/\.shadows-3\.shadows-ease-out/);
  });

  it("shadow-none clears outer only", async () => {
    const css = await generateCss({
      content: `<div class="shadow-none inset-shadow-sm"></div>`,
    });
    const noneRule = getRule(css, "shadow-none");
    expect(noneRule).toBeTruthy();
    expect(noneRule!).toContain("--tw-shadow: 0 0 #0000");
    expect(noneRule!.includes("--tw-inset-shadow: 0 0 #0000")).toBe(false);

    const insetRule = getRule(css, "inset-shadow-sm");
    expect(insetRule).toContain("--tw-inset-shadow-x-offset");
  });

  it("routes shadow-inner to the inset var stack", async () => {
    const css = await generateCss({
      content: `<div class="shadow-inner"></div>`,
    });
    const rule = getRule(css, "shadow-inner");
    expect(rule).toBeTruthy();
    expect(rule!).toContain("--tw-inset-shadow-x-offset");
    expect(rule!).toContain("--tw-inset-shadow-y-offset");
    expect(rule!.includes("--tw-shadow-x-offset")).toBe(false);
  });
});
