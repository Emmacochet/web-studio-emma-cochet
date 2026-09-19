import i18next, { type i18n } from "i18next";
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import { defaultLocale, type Locale } from "./config";

export const resources = {
  fr: { translation: fr },
  en: { translation: en },
};

export function createI18n(lang: Locale): i18n {
  const instance = i18next.createInstance();
  instance.init({
    lng: lang,
    fallbackLng: defaultLocale,
    resources,
    interpolation: { escapeValue: false },
    initAsync: false,
  });
  return instance;
}

export function getT(lang: Locale) {
  return createI18n(lang).t;
}
