import SiteShell from "@/components/site-shell";
import EntryGrid, { type GridEntry } from "@/components/entry-grid";
import { getProjectImages, getProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  const entries: GridEntry[] = await Promise.all(
    projects.map(async (project) => ({
      slug: project.slug,
      title: project.title,
      eyebrow: project.location ?? "Commande privée",
      images: await getProjectImages(project),
    }))
  );

  return (
    <SiteShell title="Projets">
      <EntryGrid entries={entries} basePath="/projects" />
    </SiteShell>
  );
}
