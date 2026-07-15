import { promises as fs } from "fs";
import path from "path";

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

function getMimeType(imageName: string) {
  const extension = path.extname(imageName).toLowerCase();

  switch (extension) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    default:
      return "image/svg+xml";
  }
}

export async function getProjects(): Promise<Project[]> {
  const projectsDir = await getProjectsDir();
  const entries = await fs.readdir(projectsDir, { withFileTypes: true });
  const projectDirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

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

export async function getProjectImageDataUrl(slug: string, imageName: string) {
  const projectsDir = await getProjectsDir();
  const imagePath = path.join(projectsDir, slug, imageName);
  const fileBuffer = await fs.readFile(imagePath);
  return `data:${getMimeType(imageName)};base64,${fileBuffer.toString("base64")}`;
}
