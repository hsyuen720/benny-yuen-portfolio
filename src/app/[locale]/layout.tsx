import type { Metadata } from "next";
import { Quantico } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { Languages } from "~/settings/constants";
import type { ValueOf } from "~/utils/type";

import "./global.scss";

export function generateStaticParams() {
  return Object.values(Languages).map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Benny Yuen | Frontend Developer",
  description: "Hello I am a Frontend Developer",
};

const inter = Quantico({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: ValueOf<typeof Languages> };
}>;

export default function RootLayout({ children, params }: RootLayoutProps) {
  const messages = useMessages();
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
