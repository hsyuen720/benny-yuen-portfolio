import type { Metadata } from "next";
import { Quantico } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { AppTranslation, Languages } from "~/settings/constants";
import type { ValueOf } from "~/utils/type";

import "./global.scss";

export function generateStaticParams() {
  return Object.values(Languages).map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: ValueOf<typeof Languages> };
}) {
  const t = await getTranslations({ locale: params.locale, namespace: AppTranslation.Portfolio });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const inter = Quantico({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: ValueOf<typeof Languages> };
}>;

export default function RootLayout({ children, params }: RootLayoutProps) {
  unstable_setRequestLocale(params.locale);
  const messages = useMessages();
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
