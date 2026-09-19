import { promises as fs } from "fs";
import path from "path";
import { furnitureOrder } from "@/src/config/furniture-order";
import { sortBySlugOrder } from "@/lib/sort-by-order";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

export type FurnitureItem = {
  produit: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  material?: string;
  year?: string;
};

type FurnitureText = Pick<FurnitureItem, "title" | "description" | "produit">;

type FurnitureData = Omit<FurnitureItem, "slug"> & {
  translations?: Partial<Record<Locale, Partial<FurnitureText>>>;
};

async function getFurnitureDir() {
  return path.join(process.cwd(), "src", "furniture");
}

export async function getFurnitureItems(lang: Locale = defaultLocale): Promise<FurnitureItem[]> {
  const furnitureDir = await getFurnitureDir();
  const entries = await fs.readdir(furnitureDir, { withFileTypes: true });
  const itemDirs = sortBySlugOrder(
    entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name),
    furnitureOrder
  );

  const items = await Promise.all(
    itemDirs.map(async (slug) => {
      const dataPath = path.join(furnitureDir, slug, "data.json");
      const fileContents = await fs.readFile(dataPath, "utf8");
      const data = JSON.parse(fileContents) as FurnitureData;
      const text = data.translations?.[lang];

      return {
        slug,
        title: text?.title ?? data.title,
        description: text?.description ?? data.description,
        images: data.images,
        produit: text?.produit ?? data.produit,
        year: data.year,
      };
    })
  );

  return items;
}

export async function getFurnitureItemBySlug(slug: string, lang: Locale = defaultLocale): Promise<FurnitureItem | null> {
  const items = await getFurnitureItems(lang);
  return items.find((item) => item.slug === slug) ?? null;
}

export function getFurnitureImageUrl(slug: string, imageName: string) {
  return `/furniture/${slug}/${imageName}`;
}

export async function getFurnitureItemImages(item: FurnitureItem) {
  return item.images.map((imageName) => ({
    src: getFurnitureImageUrl(item.slug, imageName),
    alt: `${item.title} — ${imageName}`,
  }));
}
