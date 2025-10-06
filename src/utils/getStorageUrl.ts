import { getDownloadURL, ref } from "firebase/storage";
import { unstable_cache } from "next/cache";

import { storage } from "~/utils/firebase";

const getStorageUrl = async (filePath: string, revalidateTime: number = 86400) => {
  // Use Next.js cache with 1 hour revalidation
  const getCachedUrl = unstable_cache(
    async () => {
      const pathRef = ref(storage, filePath);
      const url = await getDownloadURL(pathRef);
      return url;
    },
    [`storage-url-${filePath}`],
    {
      revalidate: revalidateTime,
      tags: [`storage-${filePath}`],
    },
  );

  return getCachedUrl();
};
export default getStorageUrl;
