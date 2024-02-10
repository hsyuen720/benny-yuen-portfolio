import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { Languages } from "~/settings/constants";

export default getRequestConfig(async ({ locale }) => {
  if (!Object.values(Languages).includes(locale as any)) {
    return notFound();
  }
  return {
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
