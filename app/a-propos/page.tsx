import Image from "next/image";
import SiteShell from "@/components/site-shell";

export default function AboutPage() {
  return (
    <SiteShell title="À propos">
      <div className="grid gap-14 border-border md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div className="space-y-6">
          <div className="relative mx-8 aspect-[4/5] overflow-hidden bg-background sm:mx-12 md:mx-0">
            <Image
              src="/a-propos/pp3.jpeg"
              alt="Portrait d'Emma Cochet"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <p>Fondatrice — Architecte d'intérieur</p>
            <p>Paris, France</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">À propos</p>
            <h2 className="mt-4 font-serif text-2xl leading-snug text-foreground">
              Entre ancien et contemporain.
            </h2>
          </div>

          <div className="space-y-5 text-[15px] leading-7 text-body">
            <p>
              Emma Cochet est une architecte d'intérieur basée à Paris, diplômée du Royal College of Art à Londres. Son parcours a nourri une sensibilité particulière pour la mise en valeur et le respect de l'existant, avec un dialogue subtil entre ancien et contemporain.
            </p>
            <p>
              Cette approche se prolonge dans sa collection de mobilier, où elle donne une nouvelle vie à des pièces anciennes à travers une écriture contemporaine et audacieuse.
            </p>
          </div>

        </div>
      </div>
    </SiteShell>
  );
}
