import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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

  return {
    title: {
      template: `%s | ${t("author")}`,
      default: t("title"),
    },
    description: t("description"),
    keywords: [
      "Frontend Developer",
      "Full Stack Developer",
      "React",
      "Next.js",
      "TypeScript",
      "NodeJS",
    ],
    authors: [{ name: t("author") }],
    creator: t("author"),
    publisher: t("author"),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: process.env.NEXT_PUBLIC_URL,
      siteName: t("title"),
      locale: params.locale,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "dpQk_UFBjZcwMt2xmEIo4M3YdQCEF5q9aS_IILpu8OM",
    },
  };
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
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
