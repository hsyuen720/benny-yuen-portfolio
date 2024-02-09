import type { Metadata } from "next";
import { Quantico } from "next/font/google";

import "./global.scss";

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
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={"en"}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
