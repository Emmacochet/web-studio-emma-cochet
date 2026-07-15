import Link from "next/link";
import SiteShell from "@/components/site-shell";
import { getProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <SiteShell title="Selected projects">
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group rounded-3xl border border-stone-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
              {project.location ?? "Private commission"}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-stone-950">
              {project.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-600">
              {project.description}
            </p>
            <div className="mt-6 inline-flex items-center text-sm font-semibold text-stone-900 transition group-hover:translate-x-1">
              View project →
            </div>
          </Link>
        ))}
      </div>
    </SiteShell>
  );
}
