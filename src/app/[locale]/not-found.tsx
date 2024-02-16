import Link from "next/link";
import { useTranslations } from "next-intl";

import { AppTranslation } from "~/settings/i18n";

export default function NotFound() {
  const t = useTranslations(AppTranslation.Common);
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
