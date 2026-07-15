import Link from "next/link";
import SiteShell from "@/components/site-shell";
import { getProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <SiteShell title="that feels composed, calm, and lasting.">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="space-y-6">
          <p className="max-w-2xl text-lg leading-8 text-stone-600">
            Emma Cochet creates homes and cultural spaces with a precise eye for light, proportion, and atmosphere. Each commission is developed as a thoughtful study in materiality, flow, and contemporary living.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/projects" className="rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">
              Explore projects
            </Link>
            <Link href="/contact" className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100">
              Start a conversation
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-500">Featured focus</p>
          <h2 className="mt-3 text-2xl font-semibold text-stone-950">Residential architecture with sculptural clarity</h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            From intimate homes to ambitious cultural projects, the studio develops spaces that balance elegance and everyday ease.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-500">Recent work</p>
            <h3 className="mt-2 text-2xl font-semibold text-stone-950">A growing portfolio</h3>
          </div>
          <Link href="/projects" className="text-sm font-semibold text-stone-900 underline underline-offset-4">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="rounded-2xl border border-stone-200 bg-stone-50 p-5 transition hover:border-stone-300 hover:bg-white">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">{project.location ?? "Private commission"}</p>
              <h4 className="mt-3 text-lg font-semibold text-stone-950">{project.title}</h4>
              <p className="mt-2 text-sm leading-6 text-stone-600">{project.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
