import SiteShell from "@/components/site-shell";
import EntryGrid, { type GridEntry } from "@/components/entry-grid";
import { getFurnitureItemImages, getFurnitureItems } from "@/lib/furniture";

export default async function MobilierPage() {
  const items = await getFurnitureItems();

  const entries: GridEntry[] = await Promise.all(
    items.map(async (item) => ({
      slug: item.slug,
      title: item.title,
      eyebrow: item.produit ?? "Pièce sur mesure",
      images: await getFurnitureItemImages(item),
    }))
  );

  return (
    <SiteShell title="Collection de mobilier">
      <EntryGrid entries={entries} basePath="/mobilier" />
    </SiteShell>
  );
}
