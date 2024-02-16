import { Quantico } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { AppTranslation, Languages } from "~/settings/i18n";
import type { ValueOf } from "~/types/common";

import "./global.scss";

export function generateStaticParams() {
  return Object.values(Languages).map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: ValueOf<typeof Languages> };
}) {
  const t = await getTranslations({ locale: params.locale, namespace: AppTranslation.Common });
  return {
    title: t("title"),
    description: "I am Benny",
  };
}

const inter = Quantico({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type AppLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: ValueOf<typeof Languages> };
}>;

export default function AppLayout({ children, params }: AppLayoutProps) {
  unstable_setRequestLocale(params.locale);
  const messages = useMessages();
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
