import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/site-shell";
import ImageCarousel from "@/components/image-carousel";
import { getT } from "@/lib/i18n";
import { sectionPath, type Locale } from "@/lib/i18n/config";
import { getProjectBySlug, getProjectImages } from "@/lib/projects";

export default async function ProjectDetailPage({ lang, slug }: { lang: Locale; slug: string }) {
  const t = getT(lang);
  const project = await getProjectBySlug(slug, lang);

  if (!project) {
    notFound();
  }

  const images = await getProjectImages(project);

  return (
    <SiteShell title={project.title}>
      <ImageCarousel images={images} variant="hero" />

      <div className="mt-6 flex flex-col items-center gap-6 border-t border-border pt-6 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {project.location ?? t("common.privateCommission")}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <p className="max-w-2xl whitespace-pre-line text-[15px] leading-7 text-body">{project.description}</p>
        <Link
          href={sectionPath(lang, "projects")}
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground transition hover:text-accent"
        >
          <span className="transition group-hover:-translate-x-1">←</span>
          {t("common.back")}
        </Link>
      </div>
    </SiteShell>
  );
}
