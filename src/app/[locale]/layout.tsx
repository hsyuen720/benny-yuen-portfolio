import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Quantico } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, getMessages, setRequestLocale } from "next-intl/server";

import { AppTranslation, Languages } from "~/settings/i18n";

import "~/styles/global.css";

export function generateStaticParams() {
  return Object.values(Languages).map((locale) => ({ locale }));
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

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
    other: {
      preconnect: "https://firebasestorage.googleapis.com",
    },
  };
}

const inter = Quantico({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
});

type AppLayoutProps = Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>;

export default async function AppLayout(props: AppLayoutProps) {
  const params = await props.params;
  const { children } = props;
  setRequestLocale(params.locale);
  const messages = await getMessages();
  return (
    <html lang={params.locale}>
      <head>
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <link
          rel="preconnect"
          href="https://firebasestorage.googleapis.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          {children}
          <SpeedInsights />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
