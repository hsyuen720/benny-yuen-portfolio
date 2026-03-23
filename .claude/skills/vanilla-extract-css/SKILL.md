---
name: vanilla-extract-css
description: Vanilla Extract CSS-in-JS styling patterns for this portfolio project. Use this skill when writing or reviewing style files (*.css.ts), working with theme tokens, responsive design, dark/light variants, animations, or when a component needs new styles.
---

# Vanilla Extract CSS Patterns

Styling guide for this portfolio project using `@vanilla-extract/css`.

## Overview

All styles live in co-located `styles.css.ts` files next to their component. Vanilla Extract is **zero-runtime** — styles are extracted at build time into real CSS files.

---

## 1. File Naming and Co-location

```
src/components/button/
├── index.tsx        ← component
└── styles.css.ts    ← styles (always this name)
```

Import styles as a namespace:
```tsx
import * as styles from "./styles.css";
```

---

## 2. Theme Tokens

**Always use theme tokens instead of raw values.** Import from `~/styles/theme.css`:

```ts
import {
  colors,
  transition,
  borderRadii,
  breakpoint,
  shadows,
  zIndices,
  sectionPaddingHorizontal,
} from "~/styles/theme.css";
```

### Available Token Categories

| Token | Usage |
|---|---|
| `colors.primary` | Primary brand color |
| `colors.primaryText` | Main text color |
| `transition("fast" \| "slow", property)` | CSS transition shorthand |
| `borderRadii["2xl"]` | Rounded corners |
| `shadows.*` | Box shadows |
| `zIndices.header` | Z-index for navbar |
| `breakpoint` | Mobile breakpoint value |
| `sectionPaddingHorizontal.md / .sm` | Section horizontal padding |

---

## 3. Defining Styles

### Basic Style
```ts
import { style } from "@vanilla-extract/css";
import { colors } from "~/styles/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: colors.primary,
});
```

### CSS Custom Properties (vars)
Use `vars` for dynamic values within a style block:
```ts
export const content = style({
  vars: {
    "--gap": "0.75em",
    "--n": "3",
  },
  gap: "var(--gap)",
  gridTemplateColumns: "repeat(auto-fit, minmax(max(18em, (100% - (var(--n) - 1) * var(--gap)) / var(--n)), 1fr))",
});
```

### Responsive Styles
Use `@media` inside `style()` with the `breakpoint` token:
```ts
import { breakpoint } from "~/styles/theme.css";

export const section = style({
  padding: "4em",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      padding: "2em",
    },
  },
});
```

### Pseudo-selectors and Nested Selectors
```ts
export const link = style({
  color: colors.primary,
  selectors: {
    "&:hover": { opacity: 0.8 },
    "&:nth-of-type(1)": { transform: "translateY(-2px)" },
  },
});
```

---

## 4. Variant Patterns

Vanilla Extract does not have a built-in variant API in this project — use separate named exports and combine with `clsx`:

```ts
// styles.css.ts
export const container = style({ ... });
export const isDark = style({
  vars: { "--main-color": "#0b0c10" },
});
```

```tsx
// index.tsx
import clsx from "clsx";
import * as styles from "./styles.css";

<div className={clsx(styles.container, isDark && styles.isDark)} />
```

---

## 5. Global Styles

Global CSS (resets, custom properties, body styles) lives in `~/styles/global.css.ts`. Import it once in the root layout:

```tsx
// app/[locale]/layout.tsx
import "~/styles/global.css";
```

Do **not** import `global.css` in component or module files.

---

## 6. Animations and Transitions

### CSS Transitions with Theme Token
```ts
import { transition } from "~/styles/theme.css";

export const element = style({
  transition: transition("fast", "background-color"),
  // or
  transition: transition("slow", "all"),
});
```

### Keyframe Animations
```ts
import { keyframes, style } from "@vanilla-extract/css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const animated = style({
  animation: `${fadeIn} 300ms ease-in-out`,
});
```

---

## 7. Typography and Units

- Use `em` for component-relative sizing (scales with font-size)
- Use `rem` for fixed minimum sizes (e.g., `minWidth: "1.75rem"`)
- Avoid `px` except for borders (`border: "0.25em solid ..."`)

---

## 8. clip-path for Section Shapes

This project uses `clip-path: polygon(...)` to create angled section transitions:

```ts
// Angled top and bottom
export const about = style({
  clipPath: "polygon(0 6%, 100% 0%, 100% 94%, 0% 100%)",
});

// Angled top only
export const projects = style({
  clipPath: "polygon(0 0, 100% 3%, 100% 100%, 0% 100%)",
});
```

---

## 9. `willChange` for Animated Elements

Only add `willChange` to elements that animate frequently and benefit from GPU compositing:

```ts
export const line = style({
  willChange: "transform, opacity",
  transition: "transform 200ms ease-in-out, opacity 200ms ease-in-out",
});
```

Do not overuse `willChange` — it consumes GPU memory.

---

## 10. Jest Mocking

Vanilla Extract style files are mocked in tests via `identity-obj-proxy`:
```ts
// jest.config.ts
moduleNameMapper: {
  "\\.css\\.ts$": "identity-obj-proxy",
}
```

Style class names will return their property name as a string in tests. Do not assert on specific class name values.
