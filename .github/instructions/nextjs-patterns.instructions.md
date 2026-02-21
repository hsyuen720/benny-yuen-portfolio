---
applyTo: "src/app/**,next.config.mjs,src/middleware.ts,src/modules/**"
---

# Next.js 15 App Router Patterns

Guidelines for this portfolio project using Next.js 15 with the App Router.

## Project Structure

```
src/app/
  [locale]/
    layout.tsx       – Root layout with fonts, providers, metadata
    page.tsx         – Home page (server component, lazy loads modules)
    loading.tsx      – Route-level loading UI
    not-found.tsx    – 404 page
    icon.tsx         – Dynamic favicon
  api/
    revalidate/      – API route for on-demand ISR revalidation
  robots.ts          – robots.txt generation
  sitemap.ts         – sitemap.xml generation
```

---

## 1. Server vs. Client Components

### Default to Server Components
All components are server components unless they import browser APIs, React hooks, or event handlers.

**Mark client components explicitly:**
```tsx
"use client"; // Must be the first line
```

**Current client components in this project:**
- `~/modules/navbar` – uses `useState`, `useEffect`, scroll listeners
- `~/contexts/home/provider` – context provider
- Components using `useHome`, `useInView`, `useOutsideClick`

### Passing Data from Server to Client
Serialize only the minimal required data. Avoid passing full Firestore documents.

```tsx
// Server Component
const projects = await getCollection<IProject>(AppCollection.Projects);

// Only pass the fields the client needs
<ClientCard id={p.id} name={p.name[locale]} />
```

---

## 2. Caching Strategy

### Static Generation with ISR
```tsx
// page.tsx – revalidate every 24 hours
export const revalidate = 86400; // seconds
```

### On-Demand Revalidation
Use the `/api/revalidate` route with a secret token and cache tags:

```ts
// Trigger from CMS webhooks or scripts/revalidate.sh
fetch(`${NEXT_PUBLIC_URL}/api/revalidate?secret=TOKEN&tag=experiences`)
```

### `unstable_cache` for Firestore Calls
Always use cache tags matching the Firestore collection name for targeted revalidation:

```ts
unstable_cache(
  async () => { /* query */ },
  [collection, id],
  { revalidate: 86400, tags: [collection, id] },
)();
```

Available tags (from `AppCollection`):
- `"experiences"`
- `"projects"`
- `"socialMedia"`

---

## 3. Lazy Loading Below-Fold Modules

Use `React.lazy` + `withSuspense` HOC for all below-the-fold page sections:

```tsx
import { lazy } from "react";
import withSuspense from "~/components/withSuspense";

const About = lazy(() => import("~/modules/about"));
const LazyAbout = withSuspense(About, { skeletonHeight: "300px", skeletonCount: 1 });
```

**Skeleton sizing guidelines:**
| Module | skeletonHeight | skeletonCount |
|---|---|---|
| About | 300px | 1 |
| Experiences | 150px | 3 |
| Projects | 200px | 2 |
| Footer | 80px | 1 |

---

## 4. Metadata

Always provide full metadata from `generateMetadata` using `next-intl`:

```tsx
export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: AppTranslation.Common });
  return {
    title: { template: `%s | ${t("author")}`, default: t("title") },
    description: t("description"),
    openGraph: { ... },
    robots: { index: true, follow: true },
  };
}
```

---

## 5. Image Optimization

Always use `next/image` instead of `<img>`. Required props:

```tsx
import Image from "next/image";

<Image
  src={url}
  alt={description}
  width={400}
  height={300}
  priority   // Only for above-the-fold / LCP images
/>
```

**Configured remote patterns (in `next.config.mjs`):**
- `firebasestorage.googleapis.com` – Firebase Storage images
- `opengraph.githubassets.com` – GitHub OG images

---

## 6. Fonts

Load fonts at the layout level with `display: "swap"` and `preload: true`:

```tsx
import { Quantico } from "next/font/google";

const font = Quantico({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
});
```

Do not import `next/font` inside page or component files — only in layouts.

---

## 7. Middleware

The middleware at `src/middleware.ts` handles internationalization routing. When adding new middleware logic:
- Keep it lightweight — it runs on every request
- Use `next-intl/middleware` for locale detection
- Do not import large modules into middleware

---

## 8. Environment Variables

| Variable | Usage |
|---|---|
| `NEXT_PUBLIC_FIREBASE_*` | Firebase client SDK (public) |
| `NEXT_PUBLIC_URL` | App base URL for OG metadata |
| `REVALIDATE_SECRET` | Token for `/api/revalidate` |

- Prefix with `NEXT_PUBLIC_` only for variables needed on the client
- Never expose `REVALIDATE_SECRET` or Firebase admin credentials client-side

---

## 9. Build Configuration (`next.config.mjs`)

Key settings:
- `compress: true` – Gzip compression
- `compiler.removeConsole` – Removes `console.*` in production
- `modularizeImports` – Transforms `react-icons` to per-icon imports
- `experimental.optimizePackageImports` – Tree-shakes `react-icons`, `luxon`, `next-intl`, `clsx`
- `serverExternalPackages` – Keeps firebase on the server bundle only
- Plugins: `withVanillaExtract` + `withNextIntl` wrap the config

---

## 10. Static Exports and `generateStaticParams`

For i18n static generation, always implement `generateStaticParams`:

```tsx
export function generateStaticParams() {
  return Object.values(Languages).map(locale => ({ locale }));
}
```
