# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `yarn dev`
- **Dev with local seed content (no Firestore):** `USE_SEED_DATA=1 yarn dev`
- **Build:** `yarn build`
- **Lint:** `yarn lint`
- **Type check:** `yarn tsc --noEmit`
- **Test all:** `yarn test`
- **Test single file:** `yarn test -- path/to/file.test.tsx`
- **Test watch:** `yarn test:watch`
- **Test coverage:** `yarn test:coverage`
- **E2E:** `yarn test:e2e` (Playwright, desktop + Pixel 7; starts its own seeded dev server on port 3100)
- **Cloud Functions:** `cd functions && npm run lint && npm test`

## Architecture

This is a Next.js 15 one-page portfolio using the App Router with `[locale]` dynamic segment for i18n (next-intl). Currently only English (`en`) is configured. The locale prefix is `as-needed` (hidden for default locale).

### Data Layer

- Firestore collections: `experiences`, `projects`, `tools`, `education`, `socialMedia`, plus the `content/home` document. Schema: `docs/firestore-content.md`.
- `src/utils/normalize.ts` turns raw documents into view models and still accepts the legacy fields (translation maps, `fromDate`); new data uses plain strings.
- `getCollection.ts` / `getDocument.ts` wrap reads in `unstable_cache` (24h, tagged by collection); the `.catch` sits outside the cache so failures are never cached.
- `src/utils/seed.ts` is the dev-only preview data used when `USE_SEED_DATA=1`; keep it real content, no placeholders.
- Copy: `src/locales/en.json` is merged with `locales/en.json` from Firebase Storage in production, and the **remote file wins**. After changing `en.json`, upload it to Storage too, keeping its `firebaseStorageDownloadTokens` metadata (without it `getDownloadURL` fails).
- Images come from Firebase Storage via `getStorageUrl.ts`.

### Revalidation and Deploys

- A write to any content collection fires a Cloud Function (`functions/src/index.ts`, region `europe-west1` because Firestore is in `eur3`) that calls `/api/revalidate?tag=<collection>`. Storage changes do not trigger it; use `sh scripts/revalidate.sh` or wait 24h. Setup: `docs/revalidation.md`.
- `.github/workflows/ci.yml`: lint, type check and unit tests on every PR and push to `main`. On `main`, it then POSTs to the Vercel Deploy Hook (secret `VERCEL_DEPLOY_HOOK`); `vercel.json` disables Vercel's own `main` deploys, so production only ships after CI passes. PRs still get Vercel previews. See `docs/deploy.md`.
- `.github/workflows/functions.yml` deploys the functions on pushes to `main` that touch `functions/**`, via Workload Identity Federation.

### Styling

Uses **Vanilla Extract** for zero-runtime CSS-in-JS. Style files are co-located with components as `styles.css.ts`. Theme tokens (colors, font sizes, radii, breakpoints, durations, `layout.navHeight`) and the `glow()` helper are in `src/styles/theme.css.ts`. Each section sets a `--band` CSS var (`page` or `deep`) that children read for their background. The design uses a dark theme (`#070707`) with gold accent (`#ffb703`).

### Path Aliases

All imports use `~/` prefix mapped to `src/` subdirectories: `~/components/*`, `~/contexts/*`, `~/hooks/*`, `~/modules/*`, `~/settings/*`, `~/styles/*`, `~/types/*`, `~/utils/*`.

### Code Organization

- `src/components/` — Reusable UI (button, heading, hairlineFigure, logo, skeleton, withSuspense)
- `src/modules/` — Page sections: navbar, heroBanner, projects, tools, experiences (git-branch `commitGraph`), education (isometric `bookStack`), contact, plus shared `section` and `socialMedia`
- `src/contexts/home/` — Home page context (active section tracking)
- `src/settings/` — App constants and i18n config
- `src/__tests__/` — Unit tests mirror the src structure; `e2e/` holds Playwright tests

### Key Conventions

- **Next.js plugins chained:** `withVanillaExtract(withNextIntl(nextConfig))` in `next.config.mjs`
- **Import ordering enforced by ESLint:** builtin > external > internal > sibling/parent > index, alphabetized, with newlines between groups
- **Prettier:** double quotes, trailing commas, 100 char print width
- **Husky pre-commit hook** runs `yarn lint`
- **Tests** use Jest + React Testing Library; Vanilla Extract `.css.ts` files are mocked with `identity-obj-proxy`, so class names are undefined in tests. Select elements by role or `data-*` attributes, not class names.
- **Dates** are formatted in the `Europe/Copenhagen` time zone (`formatMonthYear`, `yearOf` in `normalize.ts`).
- **Secrets** are referenced by name only in code, workflows and docs.
- **Node >= 22.0.0 required**
