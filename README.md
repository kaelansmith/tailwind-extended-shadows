# Tailwind Extended Shadows

A TailwindCSS plugin that gives you fine-grain control over your box-shadows via simple utility classes (including magic utilities for auto-generating beautifully layered/stacked shadows).

**Visual Demo Playground:** https://play.tailwindcss.com/6rFqo93e6h

## Table of Contents

- [Usage](#usage)
  - [1. Shadow x & y offsets](#1-control-box-shadow-x--y-offsets)
  - [2. Shadow blur](#2-control-box-shadow-blur)
  - [3. Shadow spread](#3-control-box-shadow-spread)
  - [4. Shadow opacity](#4-control-box-shadow-opacity)
  - [5. Shadow layering/stacking](#shadow-layeringstacking)
    - [Control the number of layers](#1-control-the-number-of-layers)
    - [Control how the layers "scale"](#2-control-how-the-layers-scale)
    - [Control easing of layer scaling](#3-apply-easing-function-to-adjust-how-layers-scale)
    - [Layering Tips](#layering-tips)
  - [6. Inset shadows](#6-inset-shadows)
- [CSS Output](#css-output)
- [Installation](#install)
  - [tailwind-merge compatibility plugin](#tailwind-merge-compatibility-plugin)
- [Testing](#testing)

## Usage

### 1. Control box-shadow **`x` & `y` offsets**

**Class Syntax**: `shadow-{x|y}-{theme.boxShadowOffset}`

**Description**: Shifts the shadow's position in the direction you specify

**Examples**:

- `shadow-y-1` (pulls shadow downwards by `theme.boxShadowOffset.1` units),
- `-shadow-y-2` (pulls shadow upwards by `theme.boxShadowOffset.2` units),
- `shadow-x-px` (pulls shadow to the right by `1px`),
- `-shadow-x-[3px]` (pulls shadow to the left by `3px` via arbitrary values syntax)

**Configure**: Override/extend offset classes/values via `tailwind.config.js` > `theme` > `extend` > `boxShadowOffset`. Learn more about Tailwind theming [here](https://tailwindcss.com/docs/theme#extending-the-default-theme).

<details>
 <summary>Default Theme Values:</summary>
  `theme.boxShadowOffset` defaults to:

```js
module.exports = {
  /* ... */
  theme: {
    boxShadowOffset: {
      px: "1px",
      0: "0",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
    },
  },
};
```

</details>

---

### 2. Control box-shadow **`blur`**

**Class Syntax**: `shadow-blur-{theme.boxShadowBlur}`

**Description**: Controls the sharpness/softness of the shadow.

**Examples**:

- `shadow-blur-1` (blurs the shadow by `theme.boxShadowBlur.1` units),
- `shadow-blur-2` (blurs the shadow by `theme.boxShadowBlur.2` units),
- `shadow-blur-px` (blurs the shadow by `1px`),
- `shadow-blur-[3px]` (blurs the shadow by `3px` via arbitrary values syntax)

**Configure**: Override/extend blur classes/values via `tailwind.config.js` > `theme` > `extend` > `boxShadowBlur`.

<details>
 <summary>Default Theme Values:</summary>
  `theme.boxShadowBlur` defaults to:

```js
module.exports = {
  /* ... */
  theme: {
    boxShadowBlur: {
      px: "1px",
      0: "0",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      11: "2.75rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
    },
  },
};
```

</details>

---

### 3. Control box-shadow **`spread`**

**Class Syntax**: `shadow-spread-{theme.boxShadowSpread}`

**Description**: Expands or contracts the shadow surface area omnidirectionally

**Examples**:

- `shadow-spread-1` (expands the shadow by `theme.boxShadowSpread.1` units),
- `shadow-spread-2` (expands the shadow by `theme.boxShadowSpread.2` units),
- `-shadow-spread-px` (contracts the shadow by `1px`),
- `-shadow-spread-[3px]` (contracts the shadow by `3px` via arbitrary values syntax)

**Configure**: Override/extend spread classes/values via `tailwind.config.js` > `theme` > `extend` > `boxShadowSpread`.

<details>
 <summary>Default Theme Values:</summary>
  `theme.boxShadowSpread` defaults to:

```js
module.exports = {
  /* ... */
  theme: {
    boxShadowSpread: {
      px: "1px",
      0: "0",
      0.5: "0.125rem",
      1: "0.25rem",
      1.5: "0.375rem",
      2: "0.5rem",
      2.5: "0.625rem",
      3: "0.75rem",
      3.5: "0.875rem",
      4: "1rem",
    },
  },
};
```

</details>

---

### 4. Control box-shadow **`opacity`**

**Class Syntax**: `shadow-opacity-{theme.boxShadowOpacity}`

**Description**: Shadow colors are still controlled by the built-in `shadow-{color}/{opacity}` classes; however, there are scenarios where you may wish to override the opacity without redeclaring the color, in which case you can use the new `shadow-opacity-*` class.

**Examples**:

- `shadow-opacity-15` (sets shadow color opacity to `0.15`),
- `shadow-opacity-0` (sets shadow color opacity to `0`, i.e. fully transparent),
- `shadow-opacity-100` (sets shadow color opacity to `1`, i.e. fully opaque),

**Configure**: Override/extend shadow opacity classes/values via `tailwind.config.js` > `theme` > `extend` > `boxShadowOpacity`.

<details>
 <summary>Default Theme Values:</summary>
  `theme.boxShadowOpacity` defaults to:

```js
module.exports = {
  /* ... */
  theme: {
    boxShadowOpacity: {
      0: "0",
      5: "5",
      10: "10",
      15: "15",
      /* ... */
      100: "100",
    },
  },
};
```

</details>

---

> [!NOTE]  
> Tailwind's built-in `shadow-{size}` classes continue to work as is, applying their own default offset + blur + spread values. When present, the new offset/blur/spread classes simply override those defaults. A `shadow-{size}` class is actually still required to be used alongside the offset/blur/spread classes, otherwise the `box-shadow` property won't be set.

## 6. Inset shadows

Every outer-shadow utility in this plugin has an inset counterpart under the **Tailwind v4-aligned** `inset-shadow-*` / `inset-shadows-*` prefixes. These write to Tailwind's `--tw-inset-shadow` slot (and parallel `--tw-inset-shadow-*` CSS variables), so they compose cleanly alongside outer `shadow-*` utilities — and the naming matches v4 so a future v4 compat path can reuse the same class names.

This package also **polyfills** Tailwind v4's inset size + color utilities for Tailwind v3 projects.

| Outer | Inset (v4-aligned) |
| --- | --- |
| `shadow-{size}` | `inset-shadow` / `inset-shadow-{2xs\|xs\|sm}` / `inset-shadow-none` |
| `shadow-{color}` | `inset-shadow-{color}` |
| `shadow-x-*` / `shadow-y-*` | `inset-shadow-x-*` / `inset-shadow-y-*` |
| `shadow-blur-*` | `inset-shadow-blur-*` |
| `shadow-spread-*` | `inset-shadow-spread-*` |
| `shadow-opacity-*` | `inset-shadow-opacity-*` |
| `shadows-{n}` | `inset-shadows-{n}` |
| `shadows-scale-*` | `inset-shadows-scale-*` |
| `shadows-ease-{in,out}` | `inset-shadows-ease-{in,out}` |

**Base class**: an `inset-shadow-{size}` class is required (same pattern as needing `shadow-{size}` for outer utilities). Defaults:

| Class | Geometry |
| --- | --- |
| `inset-shadow` / `inset-shadow-sm` | `inset 0 2px 4px 0 …` (matches v3 `shadow-inner` / v4 `inset-shadow-sm`) |
| `inset-shadow-2xs` | `inset 0 1px 0 0 …` (1px top-edge highlight) |
| `inset-shadow-xs` | `inset 0 1px 1px 0 …` |
| `inset-shadow-none` | clears the inset slot only |

v3 `shadow-inner` is routed into the same `--tw-inset-shadow-*` variable stack. `shadow-none` clears the **outer** slot only; use `inset-shadow-none` to clear inset.

**Configure sizes** via `tailwind.config.js` > `theme` > `extend` > `insetBoxShadow`.

<details>
 <summary>Default Theme Values:</summary>
  `theme.insetBoxShadow` defaults to:

```js
module.exports = {
  /* ... */
  theme: {
    insetBoxShadow: {
      DEFAULT: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      "2xs": "inset 0 1px 0 0 rgb(0 0 0 / 0.05)",
      xs: "inset 0 1px 1px 0 rgb(0 0 0 / 0.05)",
      sm: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      none: "none",
    },
  },
};
```

</details>

**Examples**:

```html
<!-- Default inset shadow, nudged + recolored -->
<div class="inset-shadow inset-shadow-y-1 inset-shadow-blur-2 inset-shadow-black/10"></div>

<!-- 1px top-edge highlight (common UI pattern; replaces kit highlight-* ) -->
<div class="inset-shadow-2xs inset-shadow-white/20"></div>

<!-- Outer + inset together -->
<div class="shadow-lg shadow-black/20 inset-shadow-sm inset-shadow-white/15"></div>

<!-- Layered inset shadows -->
<div
  class="inset-shadow-sm inset-shadows-3 inset-shadows-scale-2 inset-shadows-ease-out inset-shadow-black/10"
></div>
```

Offset, blur, spread, opacity, and layer theme scales are shared with the outer utilities (`theme.boxShadowOffset`, `boxShadowBlur`, `boxShadowSpread`, `boxShadowOpacity`, `boxShadowLayers`, `boxShadowLayersScale`). Colors use `theme.boxShadowColor`, same as `shadow-{color}`.

> **Migration tip:** a kit-style `highlight-white/20` is equivalent to `inset-shadow-2xs inset-shadow-white/20`.

## Shadow layering/stacking

Tailwind Extended Shadows provides a few utility classes to auto-generate shadow "layers" (i.e. shadows stacked on top of each other); layering shadows can help you achieve more realistic, smooth, and/or sharp shadows -- [here's a good article](https://tobiasahlin.com/blog/layered-smooth-box-shadows/) that demonstrates its power.

### 1. Control the number of layers

**Class Syntax**: `shadows-{theme.boxShadowLayers}`

**Description**: Auto-generates the number of shadow layers specified (theme options default to between 2 and 8 layers). You must specify a "base" shadow using the built-in Tailwind shadow classes (optionally using the `offset`/`blur`/`spread`/`opacity` utilities described above); the additional shadow layers will be auto-generated based on the "base" shadow (with pure CSS, thanks to a combination of CSS custom properties + `calc()`).

**Examples**:

- `shadows-3` (generates 2 shadow layers in addition to the "base" layer),
- `shadows-5` (generates 4 shadow layers in addition to the "base" layer),

**Configure**: Override/extend `shadows-*` classes/values via `tailwind.config.js` > `theme` > `extend` > `boxShadowLayers`.

<details>
 <summary>Default Theme Values:</summary>
  `theme.boxShadowLayers` defaults to:

```js
module.exports = {
  /* ... */
  theme: {
    boxShadowLayers: {
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
    },
  },
};
```

</details>

---

### 2. Control how the layers "scale"

**Class Syntax**: `shadows-scale-{theme.boxShadowLayersScale}`

**Description**: By default, each generated layer uses the same `x`/`y`/`blur`/`spread` values as the "base" shadow -- i.e. the base shadow is simply repeated on top of itself, which isn't usually ideal. The `shadows-scale-*` utility provides a way to specify a "multiplier" to generate each layer's `x`/`y`/`blur` in a way that scales from smallest to biggest (note: `spread` stays the same across all layers, as scaling this value is almost never desirable in my experience).

**Examples**:

- `shadows-scale-2` -- multiplies the base `x`/`y`/`blur` values by `2` to the power of the current layer number; example output:

```js
// using layer utilities "shadows-5 shadows-scale-2":
0px 1px 1px 0px rgb(0 0 0 / 0.1) // base values
0px 2px 2px 0px rgb(0 0 0 / 0.1) // base values * 2^1
0px 4px 4px 0px rgb(0 0 0 / 0.1) // base values * 2^2
0px 8px 8px 0px rgb(0 0 0 / 0.1) // base values * 2^3
0px 16px 16px 0px rgb(0 0 0 / 0.1) // base values * 2^4
```

**Configure**: Override/extend `shadows-scale-*` classes/values via `tailwind.config.js` > `theme` > `extend` > `boxShadowLayersScale`.

<details>
 <summary>Default Theme Values:</summary>
  `theme.boxShadowLayersScale` defaults to:

```js
module.exports = {
  /* ... */
  theme: {
    boxShadowLayersScale: {
      1: "1",
      1.25: "1.25",
      1.5: "1.5",
      1.75: "1.75",
      /* ... */
      4.75: "4.75",
      5: "5",
    },
  },
};
```

</details>

---

### 3. Apply easing function to adjust how layers "scale"

**Class Syntax**: `shadows-ease-{in,out}`

**Description**: In addition to `shadows-scale-*`, you can specify an easing function to inject into the scaling math. This allows the shadow layers to scale in a more fluid/less linear way. Currently only supports "quadratic" easing (due to limitations in CSS' ability to do complex math).

**Examples**:

- `shadows-ease-in` -- scales the shadow layers starting slowly and accelerating towards the end.
- `shadows-ease-out` -- scales the shadow layers starting fast and decelerating towards the end.

**Configure**: Unfortunately this class group is not configurable via your Tailwind theme, as it requires writing unique JS for each variation to ensure proper easing math is applied.

---

### Layering Tips

- Adding layers darkens your shadows -- to counteract this, reduce your base shadow color opacity
- Because layer scaling is based on the "base" shadow values, you'll usually want to keep your base shadow values on the small side; i.e. use `shadow-sm` rather than `shadow-xl` when pairing it with `shadows-{2-8}`
- Sometimes there's no visible difference when applying the `shadows-ease-{in,out}` classes; their effect becomes more apparent when using higher base offset/blur and/or scaling values

## Playground

Use the following Tailwind Playground to quickly test out these new shadow classes in real-time: https://play.tailwindcss.com/6rFqo93e6h

## CSS Output:

Default output without `tailwind-extended-shadows` installed:

```css
.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px
      var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(
      --tw-ring-shadow,
      0 0 #0000
    ), var(--tw-shadow);
}
.shadow-slate-900\/15 {
  --tw-shadow-color: rgb(15 23 42 / 0.15);
  --tw-shadow: var(--tw-shadow-colored);
}
```

With `tailwind-extended-shadows` installed:

```css
.shadow-lg {
  /* The following CSS properties use the .shadow-lg default values */
  --tw-shadow-x-offset: 0px;
  --tw-shadow-y-offset: 4px;
  --tw-shadow-blur: 6px;
  --tw-shadow-spread: -4px;
  --tw-shadow-opacity: 1;
  --tw-shadow-layers: 0 0 #0000;
  --tw-shadows-multiplier: 1;
  --tw-shadow-layer-base: 0px 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 /
            0.1)), var(--tw-shadow-x-offset) var(--tw-shadow-y-offset) var(
        --tw-shadow-blur
      ) var(--tw-shadow-spread) var(--tw-shadow-color, rgb(0 0 0 / 0.1));
  --tw-shadow: var(--tw-shadow-layer-base);
  box-shadow: var(--tw-inset-shadow, 0 0 #0000), var(
      --tw-ring-offset-shadow,
      0 0 #0000
    ), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-slate-900\/15 {
  /* adds support for opacity and doesn't set `--tw-shadow` anymore due to re-structure */
  --tw-shadow-color: rgb(15 23 42 / var(--tw-shadow-opacity, 0.15));
  --tw-shadow-opacity: 0.15;
}
.shadow-y-2 {
  /* overrides the `--tw-shadow-y-offset` value set by `shadow-lg` */
  --tw-shadow-y-offset: 0.5rem;
}
.shadow-x-2 {
  /* overrides the `--tw-shadow-x-offset` value set by `shadow-lg` */
  --tw-shadow-x-offset: 0.5rem;
}
.-shadow-spread-2 {
  /* overrides the `--tw-shadow-spread` value set by `shadow-lg` */
  --tw-shadow-spread: -0.5rem;
}
.shadow-blur-4 {
  /* overrides the `--tw-shadow-blur` value set by `shadow-lg` */
  --tw-shadow-blur: 1rem;
}
.shadows-4 {
  --tw-shadows-multiplier: 1;
  --tw-shadow-layers: calc(
        var(--tw-shadow-x-offset) * var(--tw-shadows-multiplier)
      ) calc(var(--tw-shadow-y-offset) * var(--tw-shadows-multiplier)) calc(
        var(--tw-shadow-blur) * var(--tw-shadows-multiplier)
      ) var(--tw-shadow-spread) var(--tw-shadow-color, rgb(0 0 0 / 0.1)), calc(
        var(--tw-shadow-x-offset) * var(--tw-shadows-multiplier) * var(--tw-shadows-multiplier)
      ) calc(
        var(--tw-shadow-y-offset) * var(--tw-shadows-multiplier) * var(--tw-shadows-multiplier)
      )
      calc(
        var(--tw-shadow-blur) * var(--tw-shadows-multiplier) * var(--tw-shadows-multiplier)
      ) var(--tw-shadow-spread) var(--tw-shadow-color, rgb(0 0 0 / 0.1)),
    calc(
        var(--tw-shadow-x-offset) * var(--tw-shadows-multiplier) * var(
            --tw-shadows-multiplier
          ) * var(--tw-shadows-multiplier)
      ) calc(
        var(--tw-shadow-y-offset) * var(--tw-shadows-multiplier) * var(
            --tw-shadows-multiplier
          ) * var(--tw-shadows-multiplier)
      )
      calc(
        var(--tw-shadow-blur) * var(--tw-shadows-multiplier) * var(
            --tw-shadows-multiplier
          ) * var(--tw-shadows-multiplier)
      ) var(--tw-shadow-spread) var(--tw-shadow-color, rgb(0 0 0 / 0.1));
  --tw-shadow: var(--tw-shadow-layer-base), var(--tw-shadow-layers);
}
.shadows-4.shadows-ease-in {
  /* overrides the `--tw-shadow-layers` value set by `shadows-4`, applying extra "ease-in" math */
  --tw-shadow-layers: calc(
        calc(var(--tw-shadow-x-offset) * var(--tw-shadows-multiplier)) * 0.25 *
          0.25
      ) calc(
        calc(var(--tw-shadow-y-offset) * var(--tw-shadows-multiplier)) * 0.25 *
          0.25
      )
      calc(
        calc(var(--tw-shadow-blur) * var(--tw-shadows-multiplier)) * 0.25 * 0.25
      ) var(--tw-shadow-spread) var(--tw-shadow-color, rgb(0 0 0 / 0.1)), calc(
        calc(
            var(--tw-shadow-x-offset) * var(--tw-shadows-multiplier) * var(--tw-shadows-multiplier)
          ) * 0.5 * 0.5
      ) calc(
        calc(
            var(--tw-shadow-y-offset) * var(--tw-shadows-multiplier) * var(--tw-shadows-multiplier)
          ) * 0.5 * 0.5
      )
      calc(
        calc(
            var(--tw-shadow-blur) * var(--tw-shadows-multiplier) * var(--tw-shadows-multiplier)
          ) * 0.5 * 0.5
      ) var(--tw-shadow-spread) var(--tw-shadow-color, rgb(0 0 0 / 0.1)),
    calc(
        calc(
            var(--tw-shadow-x-offset) * var(--tw-shadows-multiplier) * var(
                --tw-shadows-multiplier
              ) * var(--tw-shadows-multiplier)
          ) * 0.75 * 0.75
      ) calc(
        calc(
            var(--tw-shadow-y-offset) * var(--tw-shadows-multiplier) * var(
                --tw-shadows-multiplier
              ) * var(--tw-shadows-multiplier)
          ) * 0.75 * 0.75
      )
      calc(
        calc(
            var(--tw-shadow-blur) * var(--tw-shadows-multiplier) * var(
                --tw-shadows-multiplier
              ) * var(--tw-shadows-multiplier)
          ) * 0.75 * 0.75
      ) var(--tw-shadow-spread) var(--tw-shadow-color, rgb(0 0 0 / 0.1));
}
.shadows-scale-3 {
  /* overrides the `--tw-shadows-multiplier` value set by `shadows-4` */
  --tw-shadows-multiplier: 3;
}
```

As you can see, Tailwind Extended Shadows will increase the size of your CSS ouput, especially when using a large amount of layers combined with the easing utilities -- but it's arguably a negligible difference in the grand scheme of things.

## Install

```bash
npm i tailwind-extended-shadows
```

Then add the plugin to your `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  /* --- */
  plugins: [require("tailwind-extended-shadows")],
};
```

### `tailwind-merge` compatibility plugin

If you're using the wonderful `tailwind-merge` package to take care of removing conflicting Tailwind classes at runtime, make sure to use our `withExtendedShadows` compatibility plugin from the separate [`tailwind-extended-shadows-merge`](https://github.com/kaelansmith/tailwind-extended-shadows-merge) package; otherwise, the extra shadow utility classes will be considered conflicting and will get stripped out when they shouldn't.

```js
import { extendTailwindMerge } from "tailwind-merge";
import { withExtendedShadows } from "tailwind-extended-shadows-merge";

export const twMerge = extendTailwindMerge(withExtendedShadows);
```

## Testing

This package includes Vitest + PostCSS/Tailwind **v3** compile tests that assert generated CSS for both outer and inset utilities.

From the package root:

```bash
npm test          # builds dist/, then runs vitest once
npm run test:watch  # vitest in watch mode (run npm run build first if src changed)
```

Tests live in `tests/` and exercise the built CommonJS entry (`dist/index.js`).

---

### Made by Kaelan Smith

- [Personal Website](https://kaelansmith.com)
- [Twitter/X](https://twitter.com/kaelancsmith)
- [Github](https://github.com/kaelansmith/)
