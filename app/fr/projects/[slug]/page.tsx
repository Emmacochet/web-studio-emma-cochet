import ProjectDetailPage from "@/components/pages/project-detail-page";
import { getProjects } from "@/lib/projects";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects("fr");
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectDetailPage lang="fr" slug={slug} />;
}
