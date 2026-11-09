import { doc, getDoc } from "firebase/firestore";
import { unstable_cache } from "next/cache";

import { AppCollection } from "~/settings/constants";
import type { ValueOf } from "~/types/common";
import { db } from "~/utils/firebase";
import { getSeedDocument } from "~/utils/seed";

const getDocument = <T = object>(
  collection: ValueOf<typeof AppCollection>,
  id: string,
  revalidateTime: number = 86400,
) => {
  const seeded = getSeedDocument(collection, id);
  if (seeded !== undefined) return Promise.resolve(seeded as T | null);
  return unstable_cache(
    async () => {
      const docRef = doc(db, collection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          ...docSnap.data(),
          id: docSnap.id,
        } as T;
      }
      return null;
    },
    [collection, id],
    {
      revalidate: revalidateTime,
      tags: [collection, id],
    },
  )().catch((error: unknown) => {
    // A denied or failed read must not take the page down: callers fall back to the bundled copy
    console.error(`getDocument(${collection}/${id}) failed`, error);
    return null;
  });
};

export default getDocument;
