---
name: firebase-patterns
description: Firebase Firestore and Storage integration patterns for this portfolio project. Use this skill when working with data fetching utilities (getCollection, getDocument, getStorageUrl), adding new Firebase collections, handling cache invalidation, or working with Firebase types.
---

# Firebase Patterns

Guidelines for Firebase Firestore and Storage usage in this Next.js portfolio project.

## Setup

Firebase is initialized once in `~/utils/firebase.ts`:

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const app = initializeApp(option);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

Import `db` or `storage` from this file — never re-initialize Firebase.

---

## 1. Data Fetching Utilities

### `getCollection` — Fetch a Firestore Collection

```ts
import getCollection from "~/utils/getCollection";
import { AppCollection } from "~/settings/constants";
import type { IProject } from "~/types/data";

const projects = await getCollection<IProject>(AppCollection.Projects, {
  orderBy: "date",
  order: "desc",
});
```

**Signature:**
```ts
getCollection<T>(
  collection: ValueOf<typeof AppCollection>,
  options?: { orderBy?: string; order?: "asc" | "desc" },
  revalidateTime?: number  // default: 86400 (24h)
): Promise<Array<T>>
```

### `getDocument` — Fetch a Single Firestore Document

```ts
import getDocument from "~/utils/getDocument";

const profile = await getDocument<IProfile>(AppCollection.Profile, "main");
```

**Signature:**
```ts
getDocument<T>(
  collection: ValueOf<typeof AppCollection>,
  id: string,
  revalidateTime?: number  // default: 86400 (24h)
): Promise<T | null>
```

### `getStorageUrl` — Get Firebase Storage Download URL

```ts
import getStorageUrl from "~/utils/getStorageUrl";

const photoUrl = await getStorageUrl("photos/profile.jpg");
```

**Signature:**
```ts
getStorageUrl(
  filePath: string,
  revalidateTime?: number  // default: 86400 (24h)
): Promise<string>
```

---

## 2. Collections Registry

All collection names are defined in `AppCollection` — never use raw strings:

```ts
// ~/settings/constants.ts
export const AppCollection = {
  Experiences: "experiences",
  Projects:    "projects",
  SocialMedia: "socialMedia",
};
```

**Adding a new collection:**
1. Add the key/value to `AppCollection` in `~/settings/constants.ts`
2. Define a TypeScript interface in `~/types/data.ts`
3. Use `getCollection` or `getDocument` — do not query Firestore directly in components

---

## 3. TypeScript Data Types

All Firestore document shapes are defined in `~/types/data.ts`:

```ts
export interface IExperience {
  id: string;
  company: ITranslation;      // { en: string, ... }
  positions: ITranslation[];
  fromDate: Timestamp;
  toDate: Timestamp | null;
  descriptions: ITranslation[];
  technologies: string[];
}

export interface IProject {
  id: string;
  date: Timestamp;
  name: ITranslation;
  description: ITranslation;
  technologies: string[];
  url?: string;
  repository?: string;
  photo?: string;
}

export interface ISocialMedia {
  id: "github" | "linkedin" | "email";
  value: string;
  order: number;
}

// Localized translation map
export type ITranslation = Record<ValueOf<typeof Languages>, string>;
```

---

## 4. Handling Firebase Timestamps

Firestore `Timestamp` objects are not plain JSON-serializable dates. Use the helper pattern from `~/modules/experiences/index.tsx`:

```ts
const convertToDate = (timestamp: unknown): Date => {
  if (
    typeof timestamp === "object" &&
    timestamp !== null &&
    "toDate" in timestamp &&
    typeof (timestamp as any).toDate === "function"
  ) {
    return (timestamp as any).toDate();
  }
  // Fallback for plain date objects or number
  if (timestamp instanceof Date) return timestamp;
  return new Date(timestamp as number);
};
```

Always use this helper when components might receive timestamps that have been serialized across the server→client boundary.

---

## 5. Cache Invalidation

### Cache Tags
Each `unstable_cache` call is tagged with the collection name. Revalidation targets by tag:

```bash
# scripts/revalidate.sh
curl -X POST "${NEXT_PUBLIC_URL}/api/revalidate?secret=${SECRET}&tag=experiences"
curl -X POST "${NEXT_PUBLIC_URL}/api/revalidate?secret=${SECRET}&tag=projects"
curl -X POST "${NEXT_PUBLIC_URL}/api/revalidate?secret=${SECRET}&tag=socialMedia"
```

### On-Demand vs. Time-Based
- **Time-based:** 24h revalidation covers most use cases (portfolio data is rarely updated)
- **On-demand:** Call the revalidate API after updating Firestore data via CMS or scripts

---

## 6. Environment Variables

Required Firebase env vars (add to `.env.local`):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

These are safe to expose client-side (Firebase Security Rules protect data access). Never put Firebase Admin SDK credentials in `NEXT_PUBLIC_` variables.

---

## 7. Server External Packages

Firebase is configured as a server external package to avoid bundling it client-side:

```mjs
// next.config.mjs
serverExternalPackages: [
  "firebase-admin",
  "firebase",
  "@firebase/app",
  "@firebase/firestore",
  "@firebase/storage",
],
```

Do not import Firebase directly in client components — only use it via server-side utility functions.

---

## 8. Mocking in Tests

Firebase utilities are automatically mocked in Jest. When testing components that depend on Firebase data, mock the utility functions:

```ts
jest.mock("~/utils/getCollection", () => jest.fn().mockResolvedValue([]));
jest.mock("~/utils/getDocument", () => jest.fn().mockResolvedValue(null));
jest.mock("~/utils/getStorageUrl", () => jest.fn().mockResolvedValue("https://example.com/photo.jpg"));
```
