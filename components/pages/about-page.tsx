import Image from "next/image";
import SiteShell from "@/components/site-shell";
import { getT } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

export default function AboutPage({ lang }: { lang: Locale }) {
  const t = getT(lang);

  return (
    <SiteShell title={t("about.title")}>
      <div className="grid gap-14 border-border md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div className="space-y-6">
          <div className="relative mx-8 aspect-[4/5] overflow-hidden bg-background sm:mx-12 md:mx-0">
            <Image
              src="/a-propos/pp3.jpeg"
              alt={t("about.portraitAlt")}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <p>{t("about.role")}</p>
            <p>{t("about.location")}</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{t("about.title")}</p>
          </div>

          <div className="space-y-5 text-[15px] leading-7 text-body">
            <p>{t("about.paragraph1")}</p>
            <p>{t("about.paragraph2")}</p>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
