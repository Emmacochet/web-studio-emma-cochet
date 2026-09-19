"use client";

import { useState, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { createI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

export default function I18nProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  const [i18n] = useState(() => createI18n(lang));
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
