import { describe, expect, it } from "vitest";
import { generateCss, getRule, ruleIncludes } from "./generateCss";

describe("outer shadow utilities (regression)", () => {
  it("emits outer CSS vars for shadow-md", async () => {
    const css = await generateCss({ content: `<div class="shadow-md"></div>` });
    const rule = getRule(css, "shadow-md");
    expect(rule).toBeTruthy();
    expect(
      ruleIncludes(rule, [
        "--tw-sx",
        "--tw-sy",
        "--tw-sb",
        "--tw-ss",
        "--tw-slb",
        "box-shadow:",
        "var(--tw-inset-shadow",
        "var(--tw-shadow",
      ]),
    ).toBe(true);
    // Outer size must not write inset offset vars
    expect(rule!.includes("--tw-isx")).toBe(false);
  });

  it("supports shadow-x / shadow-y / shadow-blur overrides", async () => {
    const css = await generateCss({
      content: `<div class="shadow-lg shadow-x-1 shadow-y-2 shadow-blur-3"></div>`,
    });
    expect(getRule(css, "shadow-x-1")).toContain("--tw-sx");
    expect(getRule(css, "shadow-y-2")).toContain("--tw-sy");
    expect(getRule(css, "shadow-blur-3")).toContain("--tw-sb");
  });

  it("supports shadow color with opacity modifier", async () => {
    const css = await generateCss({
      content: `<div class="shadow-md shadow-black/20"></div>`,
    });
    const rule = getRule(css, "shadow-black/20");
    expect(rule).toBeTruthy();
    expect(rule!).toContain("--tw-shadow-color");
    expect(rule!).toContain("--tw-so");
  });

  it("supports layered shadows", async () => {
    const css = await generateCss({
      content: `<div class="shadow-sm shadows-3 shadows-scale-2 shadows-ease-out"></div>`,
    });
    expect(getRule(css, "shadows-3")).toContain("--tw-sl");
    expect(getRule(css, "shadows-scale-2")).toContain(
      "--tw-sm",
    );
    expect(css).toMatch(/\.shadows-3\.shadows-ease-out/);
  });

  it("emits single-rule eased layers without compound selectors", async () => {
    const css = await generateCss({
      content: `<div class="shadow-sm shadows-out-4 shadows-in-3"></div>`,
    });
    const out = getRule(css, "shadows-out-4");
    expect(out).toContain("--tw-sl");
    expect(out).toContain("--tw-sp3: calc(var(--tw-sp2) * var(--tw-sm))");
    expect(getRule(css, "shadows-in-3")).toContain("--tw-sl");
    expect(css).not.toMatch(/shadows-ease/);
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
    expect(insetRule).toContain("--tw-isx");
  });

  it("routes shadow-inner to the inset var stack", async () => {
    const css = await generateCss({
      content: `<div class="shadow-inner"></div>`,
    });
    const rule = getRule(css, "shadow-inner");
    expect(rule).toBeTruthy();
    expect(rule!).toContain("--tw-isx");
    expect(rule!).toContain("--tw-isy");
    expect(rule!.includes("--tw-sx")).toBe(false);
  });
});
