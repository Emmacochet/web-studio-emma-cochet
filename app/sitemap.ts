import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { getFurnitureItems } from "@/lib/furniture";
import { siteUrl } from "@/src/config/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, furnitureItems] = await Promise.all([getProjects(), getFurnitureItems()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/a-propos`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/mobilier`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const furnitureRoutes: MetadataRoute.Sitemap = furnitureItems.map((item) => ({
    url: `${siteUrl}/mobilier/${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...furnitureRoutes];
}
