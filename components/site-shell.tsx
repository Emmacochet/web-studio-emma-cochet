import Link from "next/link";
import type { ReactNode } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function SiteShell({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-stone-50/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.35em] text-stone-700">
            Emma Cochet
          </Link>
          <nav className="flex items-center gap-4 text-sm text-stone-600 sm:gap-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-stone-950">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mb-10 border-l-2 border-stone-300 pl-4">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-500">
              Architecture studio
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
              {title}
            </h1>
          </div>
          {children}
        </div>
      </main>

      <footer className="border-t border-stone-200 bg-white/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 Emma Cochet. Designed for thoughtful living.</p>
          <a href="mailto:hello@emmacochet.com" className="font-medium text-stone-900 hover:text-stone-700">
            hello@emmacochet.com
          </a>
        </div>
      </footer>
    </div>
  );
}
