import type { ReactNode } from "react";
import I18nProvider from "@/components/i18n-provider";
import type { Locale } from "@/lib/i18n/config";

export default function LocaleLayout({ lang, children }: { lang: Locale; children: ReactNode }) {
  return (
    <html lang={lang} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <I18nProvider lang={lang}>{children}</I18nProvider>
      </body>
    </html>
  );
}
