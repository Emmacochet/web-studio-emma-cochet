export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

export type SectionKey = "home" | "projects" | "furniture" | "contact" | "about";

export const sectionSlugs: Record<SectionKey, Record<Locale, string>> = {
  home: { fr: "", en: "" },
  projects: { fr: "projects", en: "projects" },
  furniture: { fr: "mobilier", en: "furniture" },
  contact: { fr: "contact", en: "contact" },
  about: { fr: "a-propos", en: "about" },
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function sectionPath(lang: Locale, section: SectionKey) {
  const slug = sectionSlugs[section][lang];
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}

export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return isLocale(first) ? first : defaultLocale;
}

export function switchLocalePath(pathname: string, target: Locale) {
  const [, section, ...rest] = pathname.split("/").filter(Boolean);

  if (!section) return `/${target}`;

  const match = (Object.keys(sectionSlugs) as SectionKey[]).find((key) =>
    locales.some((locale) => sectionSlugs[key][locale] === section)
  );
  const translated = match ? sectionSlugs[match][target] : section;

  return `/${[target, translated, ...rest].join("/")}`;
}
