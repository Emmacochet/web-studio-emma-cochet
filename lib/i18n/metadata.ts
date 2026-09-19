import type { Metadata } from "next";
import { siteUrl } from "@/src/config/site";
import { getT } from "@/lib/i18n";
import { locales, sectionPath, type Locale } from "@/lib/i18n/config";

export function getRootMetadata(lang: Locale): Metadata {
  const t = getT(lang);
  const name = t("site.name");
  const description = t("site.description");

  return {
    metadataBase: new URL(siteUrl),
    title: name,
    description,
    alternates: {
      canonical: sectionPath(lang, "home"),
      languages: Object.fromEntries(locales.map((locale) => [locale, sectionPath(locale, "home")])),
    },
    openGraph: {
      title: name,
      description,
      url: `${siteUrl}${sectionPath(lang, "home")}`,
      siteName: name,
      locale: t("site.ogLocale"),
      type: "website",
    },
  };
}
