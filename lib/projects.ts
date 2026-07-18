import { promises as fs } from "fs";
import path from "path";
import { projectsOrder } from "@/src/config/projects-order";
import { sortBySlugOrder } from "@/lib/sort-by-order";

export type Project = {
  slug: string;
  title: string;
  description: string;
  images: string[];
  location?: string;
  year?: string;
};

async function getProjectsDir() {
  return path.join(process.cwd(), "src", "projects");
}

export async function getProjects(): Promise<Project[]> {
  const projectsDir = await getProjectsDir();
  const entries = await fs.readdir(projectsDir, { withFileTypes: true });
  const projectDirs = sortBySlugOrder(
    entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name),
    projectsOrder
  );

  const projects = await Promise.all(
    projectDirs.map(async (slug) => {
      const dataPath = path.join(projectsDir, slug, "data.json");
      const fileContents = await fs.readFile(dataPath, "utf8");
      const data = JSON.parse(fileContents) as Omit<Project, "slug">;

      return {
        slug,
        title: data.title,
        description: data.description,
        images: data.images,
        location: data.location,
        year: data.year,
      };
    })
  );

  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export function getProjectImageUrl(slug: string, imageName: string) {
  return `/projects/${slug}/${imageName}`;
}

export async function getProjectImages(project: Project) {
  return project.images.map((imageName) => ({
    src: getProjectImageUrl(project.slug, imageName),
    alt: `${project.title} — ${imageName}`,
  }));
}
