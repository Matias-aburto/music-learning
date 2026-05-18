import type { Metadata } from "next";
import { Noto_Music, Nunito } from "next/font/google";

import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";

import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const notoMusic = Noto_Music({
  weight: "400",
  variable: "--font-noto-music",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${nunito.variable} ${notoMusic.variable} h-full antialiased`}
    >
      <body className={`${nunito.className} flex min-h-full flex-col`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
