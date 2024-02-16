import { Quantico } from "next/font/google";

import { Languages } from "~/settings/i18n";
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
  return {
    title: "Hello",
    description: "I am Benny",
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
  return (
    <html lang={params.locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
