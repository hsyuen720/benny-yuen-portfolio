import { doc, getDoc } from "firebase/firestore";
import { unstable_cache } from "next/cache";

import { AppCollection } from "~/settings/constants";
import type { ValueOf } from "~/types/common";
import { db } from "~/utils/firebase";

const getDocument = <T = object>(
  collection: ValueOf<typeof AppCollection>,
  id: string,
  revalidateTime: number = 86400,
) => {
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
  )();
};

export default getDocument;
