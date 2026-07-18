import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/site-shell";
import ImageCarousel from "@/components/image-carousel";
import { getProjectBySlug, getProjectImages, getProjects } from "@/lib/projects";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const images = await getProjectImages(project);

  return (
    <SiteShell title={project.title}>
      <ImageCarousel images={images} variant="hero" />

      <div className="mt-6 flex flex-col items-center gap-6 border-t border-border pt-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {project.location ?? "Commande privée"}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <p className="max-w-2xl whitespace-pre-line text-[15px] leading-7 text-body">{project.description}</p>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition hover:text-accent"
        >
          <span className="transition group-hover:-translate-x-1">←</span>
          Retour à tous les projets
        </Link>
      </div>
    </SiteShell>
  );
}
