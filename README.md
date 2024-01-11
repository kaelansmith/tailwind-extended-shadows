# tailwind-extended-shadows

A TailwindCSS plugin that adds extra box-shadow utility classes, providing you with fine-grain control over:

### 1. Box-shadow **`x` & `y` offsets**

**Description**: Shifts the shadow's position in the direction you specify

**Syntax**: `shadow-{t|r|b|l}-{theme.spacing}`

**Examples**:

- `shadow-t` (pulls shadow upwards by `theme.spacing.1` units),
- `shadow-b-2` (pulls shadow downwards by `theme.spacing.2` units),
- `shadow-l-3` (pulls shadow to the left by `theme.spacing.3` units),
- `shadow-r-[3px]` (pulls shadow to the right by `3px` via arbitrary values syntax)

### 2. Box-shadow **`spread`**

**Description**: Expands or contracts the shadow surface area omnidirectionally

**Syntax**: `shadow-spread-{theme.spacing}`

**Examples**:

- `shadow-spread` (expands the shadow by `theme.spacing.1` units),
- `shadow-spread-2` (expands the shadow by `theme.spacing.2` units),
- `-shadow-spread-3` (contracts the shadow by `theme.spacing.3` units),
- `-shadow-spread-[3px]` (contracts the shadow by `3px` via arbitrary values syntax)

**Note:** Tailwind's built-in `shadow-{size}` classes continue to work as is, applying their own default offset + spread values. When present, these new offset/spread classes simply override those defaults, and `shadow-{size}` ends up only controlling the shadow `blur` value.

## Playground

Use the following Tailwind Playground to quickly test out these new shadow classes in real-time: https://play.tailwindcss.com/9X5nqVNd1d

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
