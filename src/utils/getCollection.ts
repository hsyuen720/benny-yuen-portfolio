import {
  collection as collectionRef,
  getDocs,
  orderBy,
  query,
  type QueryConstraint,
} from "firebase/firestore";
import { unstable_cache } from "next/cache";

import { AppCollection } from "~/settings/constants";
import type { ValueOf } from "~/types/common";
import { db } from "~/utils/firebase";
import { getSeedCollection } from "~/utils/seed";

const getCollection = <T = object>(
  collection: ValueOf<typeof AppCollection>,
  options: {
    orderBy?: string;
    order?: "asc" | "desc";
  } = {},
  revalidateTime: number = 86400,
) => {
  const seeded = getSeedCollection(collection);
  if (seeded) return Promise.resolve(seeded as Array<T>);
  return unstable_cache(
    async () => {
      const ref = collectionRef(db, collection);
      const sorting: QueryConstraint[] = [];
      if (options.orderBy) {
        sorting.push(orderBy(options.orderBy, options.order ?? "asc"));
      }
      const q = query(ref, ...sorting);
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return (data ?? []) as Array<T>;
    },
    [collection, JSON.stringify(options)],
    {
      revalidate: revalidateTime,
      tags: [collection],
    },
  )().catch((error: unknown) => {
    // A denied or failed read must not take the page down: the section falls back to its bundled copy
    console.error(`getCollection(${collection}) failed`, error);
    return [] as Array<T>;
  });
};

export default getCollection;
