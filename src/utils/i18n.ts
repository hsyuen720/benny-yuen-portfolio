import { getDownloadURL, ref } from "firebase/storage";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { Languages } from "~/settings/i18n";
import { ValueOf } from "~/types/common";
import { storage } from "~/utils/firebase";

const locales = Object.values(Languages);

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as ValueOf<typeof Languages>)) notFound();

  let messages = (await import(`../locales/${locale}.json`)).default;
  try {
    if (process.env.NODE_ENV !== "development") {
      const url = await getDownloadURL(ref(storage, `locales/${locale}.json`));
      const request = await fetch(url);
      const json = await request.json();
      if (json) messages = json;
    }
  } catch (error) {
    console.error(error);
  }

  return {
    messages,
  };
});
