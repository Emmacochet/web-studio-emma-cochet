import { homepageSlideshowImages } from "@/src/config/homepage-slideshow";
import { getProjectBySlug, getProjectImageUrl } from "@/lib/projects";
import { getFurnitureItemBySlug, getFurnitureImageUrl } from "@/lib/furniture";

export type HomepageSlide = {
  src: string;
  alt: string;
  title: string;
  href: string;
};

export async function getHomepageSlides(): Promise<HomepageSlide[]> {
  return Promise.all(
    homepageSlideshowImages.map(async (entry) => {
      if (entry.kind === "project") {
        const project = await getProjectBySlug(entry.project);
        return {
          src: getProjectImageUrl(entry.project, entry.image),
          alt: entry.alt,
          title: project?.title ?? entry.alt,
          href: `/projects/${entry.project}`,
        };
      }

      const item = await getFurnitureItemBySlug(entry.item);
      return {
        src: getFurnitureImageUrl(entry.item, entry.image),
        alt: entry.alt,
        title: item?.title ?? entry.alt,
        href: `/mobilier/${entry.item}`,
      };
    })
  );
}
