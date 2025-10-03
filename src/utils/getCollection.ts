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

const getCollection = <T = object>(
  collection: ValueOf<typeof AppCollection>,
  options: {
    orderBy?: string;
    order?: "asc" | "desc";
  } = {},
  revalidateTime: number = 86400,
) => {
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
  )();
};

export default getCollection;
