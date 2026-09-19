import SiteShell from "@/components/site-shell";
import ImageSlideshow from "@/components/image-slideshow";
import { getHomepageSlides } from "@/lib/homepage-slideshow";
import { getT } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

export default async function HomePage({ lang }: { lang: Locale }) {
  const slides = await getHomepageSlides(lang);
  const t = getT(lang);

  return (
    <SiteShell title={t("home.title")} narrowMargins>
      <ImageSlideshow slides={slides} />
    </SiteShell>
  );
}
