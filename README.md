# Tailwind Extended Shadows

A TailwindCSS plugin that gives you fine-grain control over your box-shadows via simple utility classes (including magic utilities for auto-generating beautifully layered/stacked shadows).

**Visual Demo Playground:** https://play.tailwindcss.com/Wk1G8cIkr3

### 1. Control box-shadow **`x` & `y` offsets**

**Class Syntax**: `shadow-{x|y}-{theme.spacing}`

**Description**: Shifts the shadow's position in the direction you specify

**Examples**:

- `shadow-y` (pulls shadow downwards by `theme.spacing.1` units),
- `-shadow-y-2` (pulls shadow upwards by `theme.spacing.2` units),
- `shadow-x-3` (pulls shadow to the right by `theme.spacing.3` units),
- `-shadow-x-[3px]` (pulls shadow to the left by `3px` via arbitrary values syntax)

### 2. Control box-shadow **`spread`**

**Class Syntax**: `shadow-spread-{theme.spacing}`

**Description**: Expands or contracts the shadow surface area omnidirectionally

**Examples**:

- `shadow-spread` (expands the shadow by `theme.spacing.1` units),
- `shadow-spread-2` (expands the shadow by `theme.spacing.2` units),
- `-shadow-spread-3` (contracts the shadow by `theme.spacing.3` units),
- `-shadow-spread-[3px]` (contracts the shadow by `3px` via arbitrary values syntax)

---

**Note:** Tailwind's built-in `shadow-{size}` classes continue to work as is, applying their own default offset + spread values. When present, the new offset/spread classes simply override those defaults, and `shadow-{size}` ends up only controlling the shadow `blur` value. You also continue to control shadow color with the built-in `shadow-{color}/{opacity}` classes.

## Shadow layering/stacking

Tailwind Extended Shadows provides a few utility classes to auto-generate shadow "layers" (i.e. shadows stacked on top of each other); layering shadows can help you achieve more realistic, smooth, and/or sharp shadows -- [here's a good article](https://tobiasahlin.com/blog/layered-smooth-box-shadows/) that demonstrates its power.

### 1. Control the number of layers

**Class Syntax**: `shadows-{2-8}`

**Description**: Auto-generates the number of shadow layers specified (between 2 and 8). You must specify a "base" shadow using the built-in Tailwind shadow classes (and optionally using the `offset`/`spread` utilities described above); the additional shadow layers will be auto-generated based on the "base" shadow (with pure CSS, thanks to a combination of CSS custom properties + `calc()`).

### 2. Control how the layers "scale"

**Class Syntax**: `shadows-scale-{1-5, increments of 0.25}`

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

### 3. Specify easing function to adjust how layers "scale"

**Class Syntax**: `shadows-ease-{in,out}`

**Description**: In addition to `shadows-scale-*`, you can specify an easing function to inject into the scaling math. This allows the shadow layers to scale in a more fluid/less linear way. Currently only supports "quadratic" easing (due to limitations in CSS' ability to do complex math).

**Examples**:

- `shadows-ease-in` -- scales the shadow layers starting slowly and accelerating towards the end.
- `shadows-ease-out` -- scales the shadow layers starting fast and decelerating towards the end.

### Layering Tips

- Adding layers darkens your shadows -- to counteract this, reduce your base shadow color opacity
- Because layer scaling is based on the "base" shadow values, you'll usually want to keep your base shadow values on the small side; i.e. use `shadow-sm` rather than `shadow-xl` when pairing it with `shadows-{2-8}`
- Sometimes there's no visible difference when applying the `shadows-ease-{in,out}` classes; their effect becomes more apparent when using higher base offset/blur and/or scaling values

## Playground

Use the following Tailwind Playground to quickly test out these new shadow classes in real-time: https://play.tailwindcss.com/Wk1G8cIkr3

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
```

With `tailwind-extended-shadows` installed:

```css
.shadow-lg {
  /* The following CSS properties use the .shadow-lg default values */
  --tw-shadow-x-offset: 0;
  --tw-shadow-y-offset: 10px;
  --tw-shadow-blur: 15px;
  --tw-shadow-spread: -3px;
  --tw-shadow-color: rgb(0 0 0 / 0.1);
  --tw-shadow: var(--tw-shadow-x-offset) var(--tw-shadow-y-offset) var(
      --tw-shadow-blur
    ) var(--tw-shadow-spread) var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(
      --tw-ring-shadow,
      0 0 #0000
    ), var(--tw-shadow);
}
.shadow-b-2 {
  /* When present, this overrides the `--tw-shadow-y-offset` value set by `shadow-lg` */
  --tw-shadow-y-offset: 0.5rem;
}
.-shadow-spread-2 {
  /* When present, this overrides the `--tw-shadow-spread` value set by `shadow-lg` */
  --tw-shadow-spread: -0.5rem;
}
```

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

## `tailwind-merge` compatibility plugin

If you're using the wonderful `tailwind-merge` package to take care of removing conflicting Tailwind classes at runtime, make sure to use the `tailwind-extended-shadows` compatibility plugin; otherwise, the spread/offset classes are considered to be conflicting and will get stripped out when they shouldn't.

```js
import { extendTailwindMerge } from "tailwind-merge";
import { withExtendedShadows } from "tailwind-extended-shadows";

export const twMerge = extendTailwindMerge(withExtendedShadows);
```

---

### Made by Kaelan Smith

- [Personal Website](https://kaelansmith.com)
- [Twitter/X](https://twitter.com/kaelancsmith)
- [Github](https://github.com/kaelansmith/)
