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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
