import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { getFurnitureItems } from "@/lib/furniture";
import { locales, sectionPath, type SectionKey } from "@/lib/i18n/config";
import { siteUrl } from "@/src/config/site";

export const dynamic = "force-static";

const staticSections: { section: SectionKey; changeFrequency: "monthly" | "yearly"; priority: number }[] = [
  { section: "home", changeFrequency: "monthly", priority: 1 },
  { section: "about", changeFrequency: "yearly", priority: 0.6 },
  { section: "contact", changeFrequency: "yearly", priority: 0.6 },
  { section: "projects", changeFrequency: "monthly", priority: 0.8 },
  { section: "furniture", changeFrequency: "monthly", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, furnitureItems] = await Promise.all([getProjects(), getFurnitureItems()]);

  return locales.flatMap((lang) => [
    ...staticSections.map(({ section, changeFrequency, priority }) => ({
      url: `${siteUrl}${sectionPath(lang, section)}`,
      changeFrequency,
      priority,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}${sectionPath(lang, "projects")}/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...furnitureItems.map((item) => ({
      url: `${siteUrl}${sectionPath(lang, "furniture")}/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);
}
