import type { Metadata } from "next";
import { siteUrl } from "@/src/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Emma Cochet | Studio d'architecture",
  description: "Un portfolio d'architecture contemporaine présentant des projets résidentiels et culturels.",
  openGraph: {
    title: "Emma Cochet | Studio d'architecture",
    description: "Un portfolio d'architecture contemporaine présentant des projets résidentiels et culturels.",
    url: siteUrl,
    siteName: "Emma Cochet",
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
