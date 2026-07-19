import type { Metadata } from "next";
import { siteUrl } from "@/src/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Studio Emma Cochet",
  description: "Architecte d'intérieur",
  openGraph: {
    title: "Studio Emma Cochet",
    description: "Architecte d'intérieur",
    url: siteUrl,
    siteName: "Studio Emma Cochet",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
