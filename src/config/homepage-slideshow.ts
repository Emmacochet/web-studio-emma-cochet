import type { Locale } from "@/lib/i18n/config";

type SlideshowImageBase = {
  image: string;
  /** French alt text (default). */
  alt: string;
  /** Optional alt text per other language; falls back to `alt`. */
  altTranslations?: Partial<Record<Locale, string>>;
};

export type SlideshowImageConfig =
  | (SlideshowImageBase & { kind: "project"; project: string })
  | (SlideshowImageBase & { kind: "furniture"; item: string });

// Curated list of images (sourced from src/projects/<project>/<image> or
// src/furniture/<item>/<image>) shown in the homepage slideshow, in display
// order. Each slide links through to its project or furniture piece.
export const homepageSlideshowImages: SlideshowImageConfig[] = [
  {
    kind: "project",
    project: "notre-dame-des-champs",
    image: "260905 Rendu Chambre with noise.png",
    alt: "Vue 3D d'une chambre dans un appartement à Notre-Dame-des-Champs",
    altTranslations: { en: "3D view of a bedroom in an apartment in Notre-Dame-des-Champs" },
  },
  {
    kind: "furniture",
    item: "turning_the_tables",
    image: "table_accueil.jpg",
    alt: "Turning the tables",
  },
  {
    kind: "project",
    project: "algaetecture",
    image: "VISUAL-PITS.png",
    alt: "Vue 3D de puit de teinture végétale dans une manufacture",
    altTranslations: { en: "3D view of plant-dye pits in a manufactory" },
  },
  {
    kind: "project",
    project: "robespierre_montreuil",
    image: "IMG_3014.jpg",
    alt: "Robespierre Montreuil — vue intérieure",
    altTranslations: { en: "Robespierre Montreuil — interior view" },
  },
];
