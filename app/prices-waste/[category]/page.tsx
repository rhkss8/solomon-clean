import { notFound } from "next/navigation";
import { WastePriceCategoryPage } from "@/src/components/WastePriceCategoryPage";
import { createPageMetadata } from "@/src/lib/metadata";
import { getWastePriceCategory, wastePriceCategories } from "@/src/domain/waste-pricing";

export function generateStaticParams() {
  return wastePriceCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = getWastePriceCategory(categorySlug);
  if (!category) return {};
  return createPageMetadata({
    title: `${category.name} 비용안내`,
    description: `${category.name} 견적 기준과 준비할 사진, 작업 과정을 확인하세요.`,
    path: `/prices-waste/${category.slug}`,
  });
}

export default async function WasteCategoryPricePage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = getWastePriceCategory(categorySlug);
  if (!category) notFound();
  return <WastePriceCategoryPage category={category} />;
}
