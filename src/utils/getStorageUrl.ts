import { getDownloadURL, ref } from "firebase/storage";

import { storage } from "~/utils/firebase";

const getStorageUrl = async (filePath: string) => {
  const pathRef = ref(storage, filePath);
  const url = await getDownloadURL(pathRef);
  return url;
};
export default getStorageUrl;
