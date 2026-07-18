import SiteShell from "@/components/site-shell";
import ImageSlideshow from "@/components/image-slideshow";
import { getHomepageSlides } from "@/lib/homepage-slideshow";

export default async function Home() {
  const slides = await getHomepageSlides();

  return (
    <SiteShell title="Studio Emma Cochet — Architecture" narrowMargins>
      <ImageSlideshow slides={slides} />
    </SiteShell>
  );
}
