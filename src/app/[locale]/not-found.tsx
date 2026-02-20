import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { AppTranslation } from "~/settings/i18n";

export default async function NotFound() {
  const t = await getTranslations(AppTranslation.Common);
  return (
    <div>
      <h2>
        Not Found
        {t("title")}
      </h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
