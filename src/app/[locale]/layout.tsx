import { Quantico } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, getMessages, setRequestLocale } from "next-intl/server";

import { AppTranslation, Languages } from "~/settings/i18n";

import "./global.scss";

export function generateStaticParams() {
  return Object.values(Languages).map((locale) => ({ locale }));
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const t = await getTranslations({ locale: params.locale, namespace: AppTranslation.Common });
  return { title: t("title"), description: "I am Benny" };
}

const inter = Quantico({ weight: ["400", "700"], subsets: ["latin"] });

type AppLayoutProps = Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>;

export default async function AppLayout(props: AppLayoutProps) {
  const params = await props.params;
  const { children } = props;
  setRequestLocale(params.locale);
  const messages = await getMessages();
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
