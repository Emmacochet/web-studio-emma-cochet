import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/site-shell";
import { getProjectBySlug, getProjectImageDataUrl, getProjects } from "@/lib/projects";

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

  const imageUrls = await Promise.all(
    project.images.map((imageName) => getProjectImageDataUrl(project.slug, imageName))
  );

  return (
    <SiteShell title={project.title}>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-500">
            {project.location ?? "Private commission"}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          <p className="max-w-2xl text-lg leading-8 text-stone-600">{project.description}</p>
          <Link href="/projects" className="inline-flex text-sm font-semibold text-stone-900 underline underline-offset-4">
            ← Back to all projects
          </Link>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-950">Project brief</h2>
          <p className="mt-4 text-sm leading-7 text-stone-600">
            Each project page is generated from a dedicated folder in the studio library, making it easy to add new commissions without changing the page template.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-6">
        {imageUrls.map((imageUrl, index) => (
          <figure key={`${project.slug}-${index}`} className="overflow-hidden rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
            <img src={imageUrl} alt={`${project.title} view ${index + 1}`} className="h-auto w-full rounded-2xl object-cover" />
          </figure>
        ))}
      </div>
    </SiteShell>
  );
}
