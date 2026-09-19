import FurnitureDetailPage from "@/components/pages/furniture-detail-page";
import { getFurnitureItems } from "@/lib/furniture";

export const dynamicParams = false;

export async function generateStaticParams() {
  const items = await getFurnitureItems("fr");
  return items.map((item) => ({ slug: item.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <FurnitureDetailPage lang="fr" slug={slug} />;
}
