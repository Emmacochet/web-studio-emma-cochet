import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/site-shell";
import ImageCarousel from "@/components/image-carousel";
import { getFurnitureItemBySlug, getFurnitureItemImages, getFurnitureItems } from "@/lib/furniture";

export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await getFurnitureItems();
  return items.map((item) => ({ slug: item.slug }));
}

export default async function FurnitureItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getFurnitureItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const images = await getFurnitureItemImages(item);

  return (
    <SiteShell title={item.title}>
      <ImageCarousel images={images} variant="hero" />

      <div className="mt-10 flex flex-col items-center gap-6 border-t border-border pt-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {item.title ?? "Pièce sur mesure"}
          {item.year ? ` · ${item.year}` : ""}
        </p>
        <p className="max-w-2xl whitespace-pre-line text-[15px] leading-7 text-body">{item.description}</p>
        <Link
          href="/mobilier"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition hover:text-accent"
        >
          <span className="transition group-hover:-translate-x-1">←</span>
          Retour à la collection
        </Link>
      </div>
    </SiteShell>
  );
}
