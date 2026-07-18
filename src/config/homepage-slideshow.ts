export type SlideshowImageConfig =
  | { kind: "project"; project: string; image: string; alt: string }
  | { kind: "furniture"; item: string; image: string; alt: string };

// Curated list of images (sourced from src/projects/<project>/<image> or
// src/furniture/<item>/<image>) shown in the homepage slideshow, in display
// order. Each slide links through to its project or furniture piece.
export const homepageSlideshowImages: SlideshowImageConfig[] = [
  { kind: "project", project: "algaetecture", image: "VISUAL-PITS.png", alt: "Vue 3D de puit de teinture végétale dans une manufacture" },
  { kind: "project", project: "robespierre_montreuil", image: "IMG_3014.jpg", alt: "Robespierre Montreuil — vue intérieure" },
  { kind: "furniture", item: "turning_the_tables", image: "table.JPG", alt: "Turning the tables" },
];
