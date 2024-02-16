import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { Languages } from "~/settings/i18n";
import { ValueOf } from "~/types/common";

const locales = Object.values(Languages);

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as ValueOf<typeof Languages>)) notFound();

  return {
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
