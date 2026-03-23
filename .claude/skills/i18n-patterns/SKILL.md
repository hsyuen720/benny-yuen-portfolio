---
name: i18n-patterns
description: Internationalization patterns for this portfolio project using next-intl. Use this skill when adding new translation keys, creating localized content, working with the locale routing, handling dates/numbers with locale formatting, or fetching remote translation files from Firebase Storage.
---

# Internationalization (i18n) Patterns

Guidelines for working with `next-intl` in this Next.js 15 portfolio project.

## Overview

- **Library:** `next-intl`
- **Supported locales:** Defined in `Languages` const object (`~/settings/i18n`)
- **Local messages:** `src/locales/en.json`
- **Remote messages:** Firebase Storage (`locales/{locale}.json`) — used in production
- **Routing:** Locale is a dynamic segment `[locale]` in the App Router

---

## 1. Locale Configuration

```ts
// ~/settings/i18n.ts
export const Languages = {
  English: "en",
  // Add new locales here
} as const;

export const AppTranslation = {
  Common: "common",
  Portfolio: "portfolio",
} as const;
```

**Adding a new locale:**
1. Add the value to the `Languages` const object
2. Create `src/locales/{locale}.json`
3. Upload the file to Firebase Storage at `locales/{locale}.json`
4. Add the locale to `generateStaticParams` in the layout (already uses `Object.values(Languages)`)

---

## 2. Translation File Structure

```json
// src/locales/en.json
{
  "common": {
    "title": "Benny Yuen | Portfolio",
    "description": "...",
    "author": "Benny Yuen"
  },
  "portfolio": {
    "navigation": {
      "about": "About",
      "experience": "Experience",
      "projects": "Projects"
    },
    "heroBanner": { ... },
    "about": { ... },
    "experience": { ... },
    "projects": { ... },
    "footer": { ... }
  }
}
```

**Namespace convention:** `AppTranslation.Portfolio + "." + sectionName`

---

## 3. Using Translations in Server Components

```tsx
import { getTranslations } from "next-intl/server";
import { AppTranslation } from "~/settings/i18n";

const MyModule = async () => {
  const t = await getTranslations(`${AppTranslation.Portfolio}.projects`);

  return <h2>{t("title")}</h2>;
};
```

**Always use `AppTranslation` const object** — never hardcode namespace strings.

---

## 4. Using Translations in Client Components

```tsx
"use client";
import { useTranslations } from "next-intl";
import { AppTranslation } from "~/settings/i18n";

const NavItem = () => {
  const t = useTranslations(`${AppTranslation.Portfolio}.navigation`);
  return <span>{t("about")}</span>;
};
```

---

## 5. Locale in Server Components

Use `setRequestLocale` at the top of page/layout server components for static rendering:

```tsx
import { setRequestLocale } from "next-intl/server";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  // ...
};
```

---

## 6. `ITranslation` — Firestore Localized Fields

Firestore documents store translatable fields as `ITranslation`:

```ts
// ~/types/data.ts
export type ITranslation = Record<ValueOf<typeof Languages>, string>;
```

**Rendering a localized Firestore field:**
```tsx
// In a server component, get the current locale from params
const { locale } = await props.params;

// Access the localized value
const localizedName = project.name[locale as ValueOf<typeof Languages>];
```

Or use `getFormat` which returns a `formatDate` helper already locale-aware:

```ts
import getFormat from "~/utils/getFormat";
const format = await getFormat();
const dateString = format.date(experience.fromDate.toDate());
```

---

## 7. Date and Number Formatting

Use `getFormat` (server-side) for locale-aware formatting:

```ts
import getFormat from "~/utils/getFormat";

const MyComponent = async () => {
  const format = await getFormat();

  // Format dates
  const dateStr = format.date(new Date());

  return <span>{dateStr}</span>;
};
```

---

## 8. Remote Translations (Production)

In production, `~/utils/i18n.ts` fetches updated messages from Firebase Storage, allowing copy updates without a rebuild:

```ts
// ~/utils/i18n.ts (simplified)
if (process.env.NODE_ENV !== "development") {
  const url = await getDownloadURL(ref(storage, `locales/${locale}.json`));
  const json = await (await fetch(url)).json();
  if (json) messages = json;
}
```

**Workflow for updating copy:**
1. Edit the JSON file locally
2. Upload to Firebase Storage: `locales/{locale}.json`
3. Call the revalidate API to clear translation cache

---

## 9. Middleware and Locale Routing

The `src/middleware.ts` handles locale detection and routing. The locale prefix appears in the URL:
- `example.com/en/` → English
- `example.com/zh/` → Chinese (when added)

When adding new locales, ensure middleware picks them up via the `Languages` const object.

---

## 10. Metadata Localization

Always localize `generateMetadata` using the `locale` parameter:

```tsx
export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: AppTranslation.Common });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      locale,
      title: t("title"),
      description: t("description"),
    },
  };
}
```

---

## 11. Testing i18n

For components using `useTranslations`, mock `next-intl` in tests:

```ts
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
```

For integration tests needing real messages, wrap with `NextIntlClientProvider`:

```tsx
import { NextIntlClientProvider } from "next-intl";
import messages from "~/locales/en.json";

render(
  <NextIntlClientProvider locale="en" messages={messages}>
    <ComponentUnderTest />
  </NextIntlClientProvider>
);
```
