# Firestore content

The page reads everything below on the server. Each collection is cached under its own tag, so a
write refreshes the site once revalidation is wired up (see `revalidation.md`).

Text fields accept a plain string or the older per-locale object (`{ "en": "..." }`). Fields marked
"legacy fallback" are read only when the new field is missing, so current data keeps rendering
while you migrate.

## `content/home` (new document)

| Field             | Type   | Sample                                                                                                                                 |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `intro`           | string | Seven years on health insurance, hospitality and enterprise apps in Hong Kong. Now in Copenhagen, building AI meeting notes at Jurnie. |
| `experienceIntro` | string | Four teams since 2019, from a clinic CMS in Hong Kong to meeting notes in Copenhagen.                                                  |

If the document is missing, the copy bundled in `src/locales/en.json` is shown.

## `projects` (edit each document)

| Field      | Type                                 | Notes                                                                                                                            | Legacy fallback     |
| ---------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `title`    | string                               | Treklay                                                                                                                          | `name`              |
| `summary`  | string                               | One or two sentences.                                                                                                            | `description`       |
| `stack`    | array of `{label, value}` or strings | Featured cards show `{label, value}` rows, e.g. `{label: "App", value: "Expo, React Native"}`. Strings are joined into one line. | `technologies`      |
| `links`    | map `{code?, demo?}`                 | `code`: repository URL. `demo`: live URL.                                                                                        | `repository`, `url` |
| `image`    | string (URL)                         | Full download URL (Firebase Storage). Without it, the card shows the Hairline `Exploded` figure.                                 | `photo`             |
| `featured` | boolean                              | `true` for at most two projects. The first (by `order`) gets the large card.                                                     | default `false`     |
| `order`    | number                               | Ascending. Documents without it come last, newest `date` first.                                                                  | `date`              |
| `status`   | string                               | `live` hides the badge. Any other value is shown as the badge text, e.g. `In development`.                                       | default `live`      |

Sample featured documents from the design:

- Treklay: `featured: true`, `order: 1`, `status: "In development"`, summary "Shared and personal
  budgets in one app. Each book and wallet shows its net balance on a single home screen.", stack
  rows App / API / Delivery, `links.code` to the GitHub repository. Add a real screenshot as `image`.
- React SVG Annotation: `featured: true`, `order: 2`, summary "An open-source React library for
  drawing freehand lines and shapes on top of any image.", stack `["React", "SVG", "Storybook"]`.

Every non-featured project is listed under "More projects" (first five, then "Show all projects").

## `experiences` (edit each document)

| Field      | Type                | Sample                      | Legacy fallback   |
| ---------- | ------------------- | --------------------------- | ----------------- |
| `role`     | string              | Software Engineer           | `positions[0]`    |
| `company`  | string              | Jurnie                      | (same field)      |
| `location` | string              | Copenhagen                  | hidden if missing |
| `workMode` | string              | part-time / remote / hybrid | hidden if missing |
| `start`    | timestamp           | 2026-08-01                  | `fromDate`        |
| `end`      | timestamp or `null` | `null` for the current job  | `toDate`          |
| `summary`  | string              | One sentence.               | `descriptions[0]` |

Sorted newest first by start date. The newest job with no `end` gets the gold dot. Each document
adds one commit to the commit graph, labelled with its start year.

Missing today: a Jurnie document (Aug 2026 – present, Copenhagen, part-time, "Building the Next.js
web app and the Tauri desktop client for AI meeting transcription and notes."), and `location`,
`workMode` and one-sentence `summary` on the existing three. Melco's `end` should become Jul 2026.

## `tools` (new collection)

One document per row.

| Field    | Type                | Sample                                       |
| -------- | ------------------- | -------------------------------------------- |
| `group`  | `"ai"` or `"stack"` | ai                                           |
| `name`   | string              | Claude Code                                  |
| `detail` | string              | My main coding agent, on Treklay and at work |
| `order`  | number              | 1                                            |

Sample rows from the design:

- ai: Claude Code / Specs first ("Every task starts as a written spec before any prompt") / Agent
  pipeline ("A developer agent builds, a QA agent checks, I review") / Parallel work ("Git
  worktrees so several agents can work at once").
- stack: Web ("TypeScript, React, Next.js, Tauri") / Mobile ("React Native, Expo, Detox,
  Fastlane") / Server ("Node.js, NestJS, Firebase").

An empty group is not rendered.

## `education` (new collection)

| Field         | Type   | Sample                          |
| ------------- | ------ | ------------------------------- |
| `degree`      | string | MSc Computer Science            |
| `institution` | string | Technical University of Denmark |
| `start`       | string | 2025                            |
| `end`         | string | 2027 (expected)                 |
| `order`       | number | 1                               |

The whole Education section is hidden while the collection is empty.

## `socialMedia` (unchanged)

Documents `email`, `github`, `linkedin` with `value` and `order`. Email is always shown first.

## Firebase Storage: `locales/en.json`

In production the site overlays `locales/en.json` from Storage on the bundled
`src/locales/en.json`. Keys missing from the Storage file now fall back to the bundle, but keys
present there still win, so the old copy (for example the old projects subtitle and page title)
keeps showing until you upload the new `src/locales/en.json` to that path.

## Previewing with placeholder content (dev only)

`USE_SEED_DATA=1 yarn dev` serves the sample content in `src/utils/seed.ts` instead of Firestore
for every collection except `socialMedia`. It only works under `next dev` and never writes to
Firestore. Delete `src/utils/seed.ts`, its test and its two call sites in `getCollection.ts` and
`getDocument.ts` once the real content is in.

A project without `image` shows the Hairline `Exploded` figure in its media panel.
