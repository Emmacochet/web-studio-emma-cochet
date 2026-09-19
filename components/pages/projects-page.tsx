import SiteShell from "@/components/site-shell";
import EntryGrid, { type GridEntry } from "@/components/entry-grid";
import { getT } from "@/lib/i18n";
import { sectionPath, type Locale } from "@/lib/i18n/config";
import { getProjectImages, getProjects } from "@/lib/projects";

export default async function ProjectsPage({ lang }: { lang: Locale }) {
  const t = getT(lang);
  const projects = await getProjects(lang);

  const entries: GridEntry[] = await Promise.all(
    projects.map(async (project) => ({
      slug: project.slug,
      title: project.title,
      eyebrow: project.location ?? t("common.privateCommission"),
      images: await getProjectImages(project),
    }))
  );

  return (
    <SiteShell title={t("projects.title")}>
      <EntryGrid entries={entries} basePath={sectionPath(lang, "projects")} />
    </SiteShell>
  );
}
