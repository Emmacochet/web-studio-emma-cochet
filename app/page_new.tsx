import Link from "next/link";
import SiteShell from "@/components/site-shell";
import { getProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <SiteShell title="Emma Cochet — architecture composed for light, proportion, and calm">
      {/* ---------- HERO ---------- */}
      <section className="border-b border-[#DDD5C7]">
        <div className="grid gap-10 pb-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className="font-['IBM_Plex_Mono',ui-monospace,monospace] text-[11px] uppercase tracking-[0.35em] text-[#6B6459]">
              Studio Emma Cochet — Architecture &amp; Interiors
            </p>
            <h1 className="mt-6 font-['Fraunces',ui-serif,Georgia,serif] text-[2.75rem] leading-[1.05] tracking-[-0.01em] text-[#171310] sm:text-[3.5rem] lg:text-[4.25rem]">
              Spaces composed
              <br />
              in light, proportion
              <br />
              <span className="italic text-[#33453E]">and quiet.</span>
            </h1>
          </div>

          <div className="max-w-md space-y-6 lg:pb-2">
            <p className="text-[15px] leading-7 text-[#514B41]">
              Emma Cochet creates homes and cultural spaces with a precise eye
              for light, proportion, and atmosphere. Each commission is
              developed as a study in materiality, flow, and everyday
              living.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-['IBM_Plex_Mono',ui-monospace,monospace] text-[12px] uppercase tracking-[0.15em]">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-[#171310] transition hover:text-[#33453E]"
              >
                Explore projects
                <span className="transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[#6B6459] transition hover:text-[#33453E]"
              >
                Start a conversation
                <span className="transition group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Line-drawing plate — stands in for a hero photograph */}
        <div className="relative -mx-6 border-t border-[#DDD5C7] bg-[#F1ECE1] px-6 py-8 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16">
          <svg
            viewBox="0 0 960 420"
            className="h-auto w-full text-[#171310]"
            fill="none"
            aria-hidden="true"
          >
            <line x1="20" y1="360" x2="940" y2="360" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M180 360 V180 H540 V360 M180 180 L360 70 L540 180"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <line x1="180" y1="240" x2="540" y2="240" stroke="#C9C0B2" strokeWidth="1" strokeDasharray="2 6" />
            <line x1="180" y1="300" x2="540" y2="300" stroke="#C9C0B2" strokeWidth="1" strokeDasharray="2 6" />
            <rect x="215" y="255" width="42" height="45" stroke="currentColor" strokeWidth="1" />
            <rect x="295" y="255" width="42" height="45" stroke="currentColor" strokeWidth="1" />
            <rect x="463" y="255" width="42" height="45" stroke="currentColor" strokeWidth="1" />
            <rect x="330" y="308" width="60" height="52" stroke="currentColor" strokeWidth="1.1" />
            <circle cx="820" cy="110" r="46" stroke="currentColor" strokeWidth="1" />
            <line x1="820" y1="72" x2="820" y2="148" stroke="currentColor" strokeWidth="0.75" />
            <line x1="782" y1="110" x2="858" y2="110" stroke="currentColor" strokeWidth="0.75" />
            <text
              x="826"
              y="70"
              fontSize="10"
              fill="currentColor"
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
              letterSpacing="1"
            >
              N
            </text>
          </svg>
        </div>
      </section>

      {/* ---------- FEATURED FOCUS ---------- */}
      <section className="grid gap-8 border-b border-[#DDD5C7] py-14 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
        <div>
          <p className="font-['IBM_Plex_Mono',ui-monospace,monospace] text-[11px] uppercase tracking-[0.35em] text-[#6B6459]">
            Featured focus
          </p>
          <h2 className="mt-4 font-['Fraunces',ui-serif,Georgia,serif] text-[1.85rem] leading-tight text-[#171310]">
            Residential architecture with sculptural clarity
          </h2>
        </div>
        <p className="max-w-xl text-[15px] leading-7 text-[#514B41]">
          From intimate homes to ambitious cultural projects, the studio
          develops spaces that balance elegance and everyday ease — reading
          each site's light and history before a single wall is drawn.
        </p>
      </section>

      {/* ---------- RECENT WORK ---------- */}
      <section className="py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-['IBM_Plex_Mono',ui-monospace,monospace] text-[11px] uppercase tracking-[0.35em] text-[#6B6459]">
              Recent work
            </p>
            <h3 className="mt-3 font-['Fraunces',ui-serif,Georgia,serif] text-[1.85rem] text-[#171310]">
              A growing portfolio
            </h3>
          </div>
          <Link
            href="/projects"
            className="font-['IBM_Plex_Mono',ui-monospace,monospace] text-[12px] uppercase tracking-[0.15em] text-[#171310] underline decoration-[#C9C0B2] underline-offset-4 transition hover:text-[#33453E] hover:decoration-[#33453E]"
          >
            View all
          </Link>
        </div>

        <div className="mt-10 divide-y divide-[#DDD5C7] border-t border-[#DDD5C7]">
          {projects.slice(0, 3).map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group grid gap-2 py-7 transition sm:grid-cols-[3rem_1fr_1.4fr] sm:items-baseline sm:gap-6"
            >
              <span className="font-['IBM_Plex_Mono',ui-monospace,monospace] text-[12px] text-[#B9B0A0]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="font-['Fraunces',ui-serif,Georgia,serif] text-xl text-[#171310] transition group-hover:text-[#33453E]">
                  {project.title}
                </h4>
                <p className="mt-1 font-['IBM_Plex_Mono',ui-monospace,monospace] text-[11px] uppercase tracking-[0.2em] text-[#6B6459]">
                  {project.location ?? "Private commission"}
                </p>
              </div>
              <p className="text-[14px] leading-6 text-[#514B41] sm:text-right">
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
