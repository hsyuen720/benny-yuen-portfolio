# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `yarn dev`
- **Build:** `yarn build`
- **Lint:** `yarn lint`
- **Test all:** `yarn test`
- **Test single file:** `yarn test -- path/to/file.test.tsx`
- **Test watch:** `yarn test:watch`
- **Test coverage:** `yarn test:coverage`

## Architecture

This is a Next.js 15 portfolio site using the App Router with `[locale]` dynamic segment for i18n (next-intl). Currently only English (`en`) is configured. The locale prefix is `as-needed` (hidden for default locale).

### Data Layer

Content is fetched from Firebase Firestore (collections: `experiences`, `projects`, `socialMedia`). Firebase config uses `NEXT_PUBLIC_FIREBASE_*` env vars. Images are served from Firebase Storage. Utility functions in `src/utils/` handle Firestore queries (`getCollection.ts`, `getDocument.ts`) and storage URLs (`getStorageUrl.ts`).

### Styling

Uses **Vanilla Extract** for zero-runtime CSS-in-JS. Style files are co-located with components as `styles.css.ts`. Theme tokens (colors, font sizes, border radii, shadows, breakpoints, durations) are in `src/styles/theme.css.ts`. Global styles and glassmorphism utilities are in `src/styles/`. The design uses a dark theme (`#070707` primary) with gold accent (`#ffb703`).

### Path Aliases

All imports use `~/` prefix mapped to `src/` subdirectories: `~/components/*`, `~/contexts/*`, `~/hooks/*`, `~/modules/*`, `~/settings/*`, `~/styles/*`, `~/types/*`, `~/utils/*`.

### Code Organization

- `src/components/` — Reusable UI components (Button, Heading, Image, Label, etc.)
- `src/modules/` — Page-level sections (navbar, heroBanner, about, experiences, projects, footer, socialMedia)
- `src/contexts/home/` — Home page context (active section tracking)
- `src/settings/` — App constants and i18n config
- `src/__tests__/` — Tests mirror the src structure

### Key Conventions

- **Next.js plugins chained:** `withVanillaExtract(withNextIntl(nextConfig))` in `next.config.mjs`
- **Import ordering enforced by ESLint:** builtin > external > internal > sibling/parent > index, alphabetized, with newlines between groups
- **Prettier:** double quotes, trailing commas, 100 char print width
- **Husky pre-commit hook** runs `yarn lint`
- **Tests** use Jest + React Testing Library, located in `src/__tests__/`; Vanilla Extract `.css.ts` files are mocked with `identity-obj-proxy`
- **Node >= 22.0.0 required**
