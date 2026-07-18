import Link from "next/link";
import ImageCarousel, { type CarouselImage } from "@/components/image-carousel";

export type GridEntry = {
  slug: string;
  title: string;
  eyebrow?: string;
  images: CarouselImage[];
};

export default function EntryGrid({
  entries,
  basePath,
}: {
  entries: GridEntry[];
  basePath: string;
}) {
  return (
    <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2">
      {entries.map((entry, index) => (
        <Link key={entry.slug} href={`${basePath}/${entry.slug}`} className="group block">
          <ImageCarousel images={entry.images.slice(0, 1)} variant="card" aspectClassName="aspect-[4/3]" />
          <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-border pt-3">
            <div>
              <h2 className="font-serif text-xl text-foreground transition group-hover:text-accent">
                {entry.title}
              </h2>
              {entry.eyebrow ? (
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {entry.eyebrow}
                </p>
              ) : null}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
