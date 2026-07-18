"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { siteContact } from "@/src/config/contact";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/mobilier", label: "Mobilier" },
  { href: "/contact", label: "Contact" },
  { href: "/a-propos", label: "À propos" },
];

export default function SiteShell({
  children,
  title,
  narrowMargins = false,
}: {
  children: ReactNode;
  title?: string;
  /** Drops the main content area's horizontal padding, e.g. for full-width hero content. */
  narrowMargins?: boolean;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.2em] focus:text-foreground focus:outline focus:outline-2 focus:outline-accent"
      >
        Aller au contenu principal
      </a>
      <header className="sticky top-0 z-20 shrink-0 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8 lg:px-12 uppercase">
          <Link
            href="/"
            className="pr-2 font-serif text-lg tracking-tight text-foreground transition hover:text-accent"
          >
            Studio Emma Cochet
          </Link>
          <nav aria-label="Navigation principale" className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted sm:flex sm:gap-6">
            {links.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap underline-offset-4 transition hover:text-foreground ${
                    isActive ? "text-foreground underline" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-4 border-l border-border pl-6 sm:pl-8">
              <a
                href={siteContact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted transition hover:text-accent"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={siteContact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted transition hover:text-accent"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                  <rect x="2" y="2" width="20" height="20" rx="3" />
                  <line x1="7" y1="10" x2="7" y2="17" />
                  <circle cx="7" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  <path d="M11 17v-4.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5V17" />
                  <line x1="11" y1="10" x2="11" y2="17" />
                </svg>
              </a>
            </div>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-8 w-11 items-center justify-center text-foreground sm:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
              {isMenuOpen ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>

        <nav
          id="mobile-menu"
          aria-label="Navigation mobile"
          hidden={!isMenuOpen}
          className="absolute inset-x-0 top-full border-t border-border bg-background px-4 py-5 font-mono text-[13px] uppercase tracking-[0.2em] text-muted shadow-lg sm:hidden"
        >
            <div className="flex flex-col gap-5">
              {links.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition hover:text-foreground ${
                      isActive ? "text-foreground underline underline-offset-4" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 flex items-center gap-5 border-t border-border pt-6">
              <a
                href={siteContact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted transition hover:text-accent"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={siteContact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted transition hover:text-accent"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="3" />
                  <line x1="7" y1="10" x2="7" y2="17" />
                  <circle cx="7" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  <path d="M11 17v-4.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5V17" />
                  <line x1="11" y1="10" x2="11" y2="17" />
                </svg>
              </a>
            </div>
          </nav>
      </header>

      <main id="main-content" className="flex flex-1 flex-col">
        <div
        // Adjust welcome image dimensions using the max-w and py for narrowMargings == True
          className={`mx-auto flex w-full flex-1 flex-col pt-6 pb-8 ${
            narrowMargins ? "px-[4%] max-w-full sm:py-8 lg:px-4 lg:max-w-[70vw] lg:pt-8" : "px-4 sm:px-8 lg:px-12 max-w-6xl sm:py-12 lg:pt-12"
          }`}
        >
          {title ? <h1 className="sr-only">{title}</h1> : null}
          {children}
        </div>
      </main>

      <footer className="shrink-0 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-row items-center justify-between gap-2 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.05em] text-muted sm:text-[11px] sm:tracking-[0.15em] sm:px-8 lg:px-12">
          <p className="whitespace-nowrap">© 2026 Emma Cochet</p>
          <a
            href={`mailto:${siteContact.email}`}
            className="whitespace-nowrap font-medium text-foreground transition hover:text-accent"
          >
            {siteContact.email}
          </a>
        </div>
      </footer>
    </div>
  );
}
