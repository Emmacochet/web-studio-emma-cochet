import SiteShell from "@/components/site-shell";
import EntryGrid, { type GridEntry } from "@/components/entry-grid";
import { getFurnitureItemImages, getFurnitureItems } from "@/lib/furniture";
import { getT } from "@/lib/i18n";
import { sectionPath, type Locale } from "@/lib/i18n/config";

export default async function FurniturePage({ lang }: { lang: Locale }) {
  const t = getT(lang);
  const items = await getFurnitureItems(lang);

  const entries: GridEntry[] = await Promise.all(
    items.map(async (item) => ({
      slug: item.slug,
      title: item.title,
      eyebrow: item.produit ?? t("common.customPiece"),
      images: await getFurnitureItemImages(item),
    }))
  );

  return (
    <SiteShell title={t("furniture.title")}>
      <EntryGrid entries={entries} basePath={sectionPath(lang, "furniture")} />
    </SiteShell>
  );
}
