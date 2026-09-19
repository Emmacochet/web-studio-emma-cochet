import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/site-shell";
import ImageCarousel from "@/components/image-carousel";
import { getFurnitureItemBySlug, getFurnitureItemImages } from "@/lib/furniture";
import { getT } from "@/lib/i18n";
import { sectionPath, type Locale } from "@/lib/i18n/config";

export default async function FurnitureDetailPage({ lang, slug }: { lang: Locale; slug: string }) {
  const t = getT(lang);
  const item = await getFurnitureItemBySlug(slug, lang);

  if (!item) {
    notFound();
  }

  const images = await getFurnitureItemImages(item);

  return (
    <SiteShell title={item.title}>
      <ImageCarousel images={images} variant="hero" />

      <div className="mt-10 flex flex-col items-center gap-6 border-t border-border pt-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {item.title ?? t("common.customPiece")}
          {item.year ? ` · ${item.year}` : ""}
        </p>
        <p className="max-w-2xl whitespace-pre-line text-[15px] leading-7 text-body">{item.description}</p>
        <Link
          href={sectionPath(lang, "furniture")}
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition hover:text-accent"
        >
          <span className="transition group-hover:-translate-x-1">←</span>
          {t("common.back")}
        </Link>
      </div>
    </SiteShell>
  );
}
