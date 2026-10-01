import { describe, expect, it } from "vitest";
import { generateCss, getRule, ruleIncludes } from "./generateCss";

describe("inset shadow utilities", () => {
  it("polyfills v4 inset-shadow sizes (bare, 2xs, xs, sm, none)", async () => {
    const css = await generateCss({
      content: `<div class="inset-shadow inset-shadow-2xs inset-shadow-xs inset-shadow-sm inset-shadow-none"></div>`,
    });

    const bare = getRule(css, "inset-shadow");
    expect(bare).toBeTruthy();
    expect(
      ruleIncludes(bare, [
        "--tw-inset-shadow-x-offset: 0px",
        "--tw-inset-shadow-y-offset: 2px",
        "--tw-inset-shadow-blur: 4px",
        "--tw-inset-shadow-spread: 0px",
      ]),
    ).toBe(true);

    const twoXs = getRule(css, "inset-shadow-2xs");
    expect(
      ruleIncludes(twoXs, [
        "--tw-inset-shadow-x-offset: 0px",
        "--tw-inset-shadow-y-offset: 1px",
        "--tw-inset-shadow-blur: 0px",
        "--tw-inset-shadow-spread: 0px",
      ]),
    ).toBe(true);

    const xs = getRule(css, "inset-shadow-xs");
    expect(
      ruleIncludes(xs, [
        "--tw-inset-shadow-y-offset: 1px",
        "--tw-inset-shadow-blur: 1px",
      ]),
    ).toBe(true);

    const sm = getRule(css, "inset-shadow-sm");
    expect(
      ruleIncludes(sm, [
        "--tw-inset-shadow-y-offset: 2px",
        "--tw-inset-shadow-blur: 4px",
      ]),
    ).toBe(true);

    const none = getRule(css, "inset-shadow-none");
    expect(none).toContain("--tw-inset-shadow: 0 0 #0000");
    expect(none!.includes("--tw-shadow: 0 0 #0000")).toBe(false);
  });

  it("supports inset-shadow color with opacity modifier", async () => {
    const css = await generateCss({
      content: `<div class="inset-shadow-sm inset-shadow-black/20"></div>`,
    });
    const rule = getRule(css, "inset-shadow-black/20");
    expect(rule).toBeTruthy();
    expect(rule!).toContain("--tw-inset-shadow-color");
    expect(rule!).toContain("--tw-inset-shadow-opacity");
  });

  it("supports inset property overrides", async () => {
    const css = await generateCss({
      content: `<div class="inset-shadow-sm inset-shadow-y-px inset-shadow-blur-0 inset-shadow-spread-0 inset-shadow-x-1"></div>`,
    });
    expect(getRule(css, "inset-shadow-y-px")).toContain(
      "--tw-inset-shadow-y-offset",
    );
    expect(getRule(css, "inset-shadow-blur-0")).toContain(
      "--tw-inset-shadow-blur",
    );
    expect(getRule(css, "inset-shadow-spread-0")).toContain(
      "--tw-inset-shadow-spread",
    );
    expect(getRule(css, "inset-shadow-x-1")).toContain(
      "--tw-inset-shadow-x-offset",
    );
  });

  it("supports inset layers, scale, and ease", async () => {
    const css = await generateCss({
      content: `<div class="inset-shadow-sm inset-shadows-3 inset-shadows-scale-2 inset-shadows-ease-out"></div>`,
    });
    const layers = getRule(css, "inset-shadows-3");
    expect(layers).toContain("--tw-inset-shadow-layers");
    expect(layers).toContain("inset ");
    expect(getRule(css, "inset-shadows-scale-2")).toContain(
      "--tw-inset-shadows-multiplier",
    );
    expect(css).toMatch(/\.inset-shadows-3\.inset-shadows-ease-out/);
  });

  it("composes outer + inset in one box-shadow declaration", async () => {
    const css = await generateCss({
      content: `<div class="shadow-md inset-shadow-sm"></div>`,
    });
    const outer = getRule(css, "shadow-md");
    const inset = getRule(css, "inset-shadow-sm");
    expect(outer).toContain("var(--tw-inset-shadow");
    expect(outer).toContain("var(--tw-shadow");
    expect(inset).toContain("var(--tw-inset-shadow");
    expect(inset).toContain("var(--tw-shadow");
    expect(outer).toContain("--tw-shadow-x-offset");
    expect(inset).toContain("--tw-inset-shadow-x-offset");
    expect(inset!.includes("--tw-shadow-x-offset")).toBe(false);
  });

  it("does not overwrite outer CSS vars from inset utilities", async () => {
    const css = await generateCss({
      content: `<div class="inset-shadow-sm inset-shadow-x-2 inset-shadow-opacity-50"></div>`,
    });
    const x = getRule(css, "inset-shadow-x-2");
    const opacity = getRule(css, "inset-shadow-opacity-50");
    expect(x).toContain("--tw-inset-shadow-x-offset");
    expect(x!.includes("--tw-shadow-x-offset")).toBe(false);
    expect(opacity).toContain("--tw-inset-shadow-opacity");
    expect(opacity!.includes("--tw-shadow-opacity")).toBe(false);
  });

  it("parses shorter inset theme values (2–3 length tokens)", async () => {
    const css = await generateCss({
      content: `<div class="inset-shadow-short inset-shadow-mid"></div>`,
      theme: {
        insetBoxShadow: {
          short: "inset 0 1px rgb(0 0 0 / 0.05)",
          mid: "inset 0 1px 1px rgb(0 0 0 / 0.05)",
        },
      },
    });
    const short = getRule(css, "inset-shadow-short");
    expect(
      ruleIncludes(short, [
        "--tw-inset-shadow-y-offset: 1px",
        "--tw-inset-shadow-blur: 0px",
        "--tw-inset-shadow-spread: 0px",
      ]),
    ).toBe(true);

    const mid = getRule(css, "inset-shadow-mid");
    expect(
      ruleIncludes(mid, [
        "--tw-inset-shadow-blur: 1px",
        "--tw-inset-shadow-spread: 0px",
      ]),
    ).toBe(true);
  });
});
