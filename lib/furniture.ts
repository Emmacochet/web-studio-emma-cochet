import { promises as fs } from "fs";
import path from "path";
import { furnitureOrder } from "@/src/config/furniture-order";
import { sortBySlugOrder } from "@/lib/sort-by-order";

export type FurnitureItem = {
  produit: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  material?: string;
  year?: string;
};

async function getFurnitureDir() {
  return path.join(process.cwd(), "src", "furniture");
}

export async function getFurnitureItems(): Promise<FurnitureItem[]> {
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
      const data = JSON.parse(fileContents) as Omit<FurnitureItem, "slug">;

      return {
        slug,
        title: data.title,
        description: data.description,
        images: data.images,
        produit: data.produit,
        year: data.year,
      };
    })
  );

  return items;
}

export async function getFurnitureItemBySlug(slug: string): Promise<FurnitureItem | null> {
  const items = await getFurnitureItems();
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
