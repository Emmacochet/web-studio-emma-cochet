import { homepageSlideshowImages } from "@/src/config/homepage-slideshow";
import { getProjectBySlug, getProjectImageUrl } from "@/lib/projects";
import { getFurnitureItemBySlug, getFurnitureImageUrl } from "@/lib/furniture";
import { sectionPath, type Locale } from "@/lib/i18n/config";

export type HomepageSlide = {
  src: string;
  alt: string;
  title: string;
  href: string;
};

export async function getHomepageSlides(lang: Locale): Promise<HomepageSlide[]> {
  return Promise.all(
    homepageSlideshowImages.map(async (entry) => {
      const alt = entry.altTranslations?.[lang] ?? entry.alt;

      if (entry.kind === "project") {
        const project = await getProjectBySlug(entry.project, lang);
        return {
          src: getProjectImageUrl(entry.project, entry.image),
          alt,
          title: project?.title ?? alt,
          href: `${sectionPath(lang, "projects")}/${entry.project}`,
        };
      }

      const item = await getFurnitureItemBySlug(entry.item, lang);
      return {
        src: getFurnitureImageUrl(entry.item, entry.image),
        alt,
        title: item?.title ?? alt,
        href: `${sectionPath(lang, "furniture")}/${entry.item}`,
      };
    })
  );
}
