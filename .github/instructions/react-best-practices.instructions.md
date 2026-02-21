---
applyTo: "src/components/**,src/modules/**,src/contexts/**,src/hooks/**,src/app/**/page.tsx"
---

# React Best Practices

Performance optimization guide for this Next.js 15 / React 19 portfolio project, based on Vercel React Best Practices.

## When to Apply

Reference these guidelines when:
- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times

---

## 1. Eliminating Waterfalls (CRITICAL)

### Parallel Async Calls
Never await independent async operations sequentially. Use `Promise.all()`.

**Bad:**
```tsx
const projects = await getCollection(AppCollection.Projects);
const t = await getTranslations(...);
```

**Good:**
```tsx
const [projects, t] = await Promise.all([
  getCollection(AppCollection.Projects),
  getTranslations(...),
]);
```

### Defer Awaits to the Branch Where They're Needed
```ts
// Bad – always awaits even when skipProcessing is true
async function handleRequest(userId: string, skip: boolean) {
  const data = await fetchUserData(userId);
  if (skip) return { skipped: true };
  return processUserData(data);
}

// Good – only awaits when needed
async function handleRequest(userId: string, skip: boolean) {
  if (skip) return { skipped: true };
  const data = await fetchUserData(userId);
  return processUserData(data);
}
```

### Use Suspense to Stream Content
Wrap async server components in `<Suspense>` with skeleton fallbacks (already done via `withSuspense` HOC in this project).

```tsx
const LazyAbout = withSuspense(About, { skeletonHeight: "300px", skeletonCount: 1 });
```

---

## 2. Bundle Size Optimization (CRITICAL)

### Avoid Barrel Imports
Import directly from the source, not from an index re-export barrel.

**Bad:**
```ts
import { FaCode, FaLink, FaVial } from "react-icons/fa";
```

**This project already handles it** via `modularizeImports` in `next.config.mjs`:
```mjs
modularizeImports: {
  "react-icons/fa": { transform: "react-icons/fa/{{member}}" },
},
```

### Dynamic Imports for Heavy Components
Use `next/dynamic` for components only needed after interaction or for below-the-fold sections.

```tsx
// This project already uses React.lazy + withSuspense for below-fold modules:
const About = lazy(() => import("~/modules/about"));
const LazyAbout = withSuspense(About, { skeletonHeight: "300px", skeletonCount: 1 });
```

### Conditional Module Loading
Only import heavy libs when activated. Don't import at the top of client components if used conditionally.

---

## 3. Server-Side Performance (HIGH)

### Prefer Server Components by Default
Modules in `~/modules/` and `~/components/` should be server components unless they require client state or effects. Mark client components explicitly with `"use client"`.

### Use `unstable_cache` for Firestore/Storage Calls
All Firebase data fetching should go through `unstable_cache` (already implemented in `getCollection`, `getDocument`, `getStorageUrl`).

```ts
// Pattern already used in this project:
return unstable_cache(
  async () => { /* firebase call */ },
  [cacheKey],
  { revalidate: 86400, tags: [collection] },
)();
```

### Use `React.cache()` for Per-Request Deduplication
When the same data is needed by multiple components in one render, wrap with `React.cache()`.

```ts
import { cache } from "react";
export const getUser = cache(async (id: string) => {
  return getDocument("users", id);
});
```

### Minimize Data Passed to Client Components
Only serialize props that the client actually needs. Avoid passing full Firestore documents to client components.

---

## 4. Client-Side Data Fetching (MEDIUM-HIGH)

### Avoid Client-Side Fetching for Static/Cached Data
This project fetches data server-side via async Server Components. Avoid converting these to `useEffect` + `fetch` patterns.

### Use Passive Event Listeners for Scroll
When adding scroll listeners (e.g., `useInView`, navbar scroll), always use `{ passive: true }`.

```ts
window.addEventListener("scroll", onScroll, { passive: true });
```

---

## 5. Re-render Optimization (MEDIUM)

### Lazy State Initialization
When initial state is expensive to compute, pass a function to `useState`.

```tsx
// Bad – parses on every render
const [config, setConfig] = useState(JSON.parse(localStorage.getItem("config") ?? "{}"));

// Good – parses only once
const [config, setConfig] = useState(() => JSON.parse(localStorage.getItem("config") ?? "{}"));
```

### Don't Subscribe to State Only Used in Callbacks
Use `useRef` for values only needed inside event handlers (not needed for rendering).

```tsx
// Bad – re-renders component on every scroll
const [scrollY, setScrollY] = useState(0);
const handler = () => doSomething(scrollY);

// Good – no re-render
const scrollYRef = useRef(0);
const handler = () => doSomething(scrollYRef.current);
```

### Hoist Default Non-Primitive Props
Props with non-primitive defaults cause re-renders on every parent render.

```tsx
// Bad – new object on every render
<Component style={{ margin: 0 }} />

// Good – stable reference
const DEFAULT_STYLE = { margin: 0 };
<Component style={DEFAULT_STYLE} />
```

### Use `startTransition` for Non-Urgent Updates
For UI updates that can be deferred (e.g., filtering/sorting lists).

```tsx
import { startTransition } from "react";
startTransition(() => setFilter(newFilter));
```

### Functional setState for Stable Callbacks
```tsx
// Good – doesn't produce new function reference each render
const increment = useCallback(() => setCount(c => c + 1), []);
```

---

## 6. Rendering Performance (MEDIUM)

### Hoist Static JSX Outside Components
```tsx
// Bad – recreated every render
const MyComponent = () => {
  const icon = <FaCode size={16} />;
  return <div>{icon}</div>;
};

// Good – stable reference
const ICON = <FaCode size={16} />;
const MyComponent = () => <div>{ICON}</div>;
```

### Use Ternary, Not `&&` for Conditionals
```tsx
// Bad – renders "0" when count is falsy
{count && <Badge>{count}</Badge>}

// Good
{count ? <Badge>{count}</Badge> : null}
```

### Suppressing Expected Hydration Mismatches
Only suppress hydration warnings when the mismatch is expected and safe (e.g., locale-specific formatting).

---

## 7. JavaScript Performance (LOW-MEDIUM)

### Build Maps for Repeated Lookups
```ts
// Bad – O(n) per lookup
const getItem = (id: string) => items.find(i => i.id === id);

// Good – O(1) per lookup
const itemMap = new Map(items.map(i => [i.id, i]));
const getItem = (id: string) => itemMap.get(id);
```

### Combine Multiple Iterations
Avoid chaining `.filter().map()` where a single `.reduce()` or loop suffices.

### Use `toSorted()` for Immutable Sorting
```ts
// Bad – mutates
const sorted = items.sort(compareFn);

// Good – immutable
const sorted = items.toSorted(compareFn);
```

---

## 8. Advanced Patterns (LOW)

### Initialize App State Once
Use a module-level variable or `useRef` for one-time initialization (e.g., Firebase app init – already done in `~/utils/firebase.ts`).

### `useLatest` for Stable Callback Refs
For callbacks that close over frequently changing values, store in a ref so the handler is always current without needing `useCallback` dependencies.

```ts
function useLatest<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => { ref.current = value; });
  return ref;
}
```

---

## Quick Reference

| Priority | Category | Impact |
|---|---|---|
| 1 | Eliminating Waterfalls | CRITICAL |
| 2 | Bundle Size Optimization | CRITICAL |
| 3 | Server-Side Performance | HIGH |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH |
| 5 | Re-render Optimization | MEDIUM |
| 6 | Rendering Performance | MEDIUM |
| 7 | JavaScript Performance | LOW-MEDIUM |
| 8 | Advanced Patterns | LOW |
