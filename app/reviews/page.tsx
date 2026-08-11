import Link from "next/link";
import { CustomerReviewGrid } from "@/src/components/CustomerReviewGrid";
import { primaryServiceCategories } from "@/src/config/primary-service-categories";
import { isServiceSlug, siteConfig } from "@/src/domain/site";
import { createPageMetadata } from "@/src/lib/metadata";
import { getCustomerReviews } from "@/src/server/customer-review-feed";

export const metadata = createPageMetadata({
  title: "고객 리뷰",
  description: "청소·폐기물·정리 서비스별 고객 리뷰 영역을 확인하세요. 현재는 API 연결 전 예시 데이터로 구성되어 있습니다.",
  path: "/reviews",
});

export default async function ReviewsPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const selectedService = service && isServiceSlug(service) ? service : undefined;
  const { reviews, total, source } = await getCustomerReviews({ serviceSlug: selectedService });

  return (
    <main className="customer-reviews-page">
      <section className="customer-reviews-hero"><div className="container"><div className="customer-reviews-hero__copy"><h1>고객의 경험을<br />서비스별로 확인하세요.</h1><p>상담 과정과 작업 범위에 관한 이야기를 한곳에 모으는 공간입니다.</p></div><div className="customer-reviews-hero__count"><strong>{total}개</strong><span>{selectedService ? "선택한 서비스의 예시 리뷰" : "현재 준비된 예시 리뷰"}</span></div></div></section>

      <section className="customer-reviews-content section"><div className="container">
        {source === "placeholder" && <aside className="customer-review-demo-notice"><strong>현재는 화면 구성을 위한 예시 데이터입니다.</strong><p>실제 리뷰 API가 연결되면 이 안내는 제거되고, 동일한 카드와 필터에 운영 데이터가 표시됩니다.</p></aside>}
        <nav className="customer-review-filters" aria-label="리뷰 서비스 필터">
          <Link aria-current={!selectedService ? "page" : undefined} href="/reviews">전체</Link>
          {primaryServiceCategories.map((category) => <Link aria-current={selectedService === category.slug ? "page" : undefined} href={`/reviews?service=${category.slug}`} key={category.slug}>{category.label}</Link>)}
        </nav>
        <CustomerReviewGrid reviews={reviews} />
      </div></section>

      <section className="customer-reviews-cta"><div className="container"><div><h2>내 현장도 사진으로 먼저 상담하세요.</h2><p>지역과 필요한 서비스, 현장 사진을 보내주시면 작업 범위를 확인합니다.</p></div><div><Link href="/estimate">무료견적 신청</Link><a href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank">카카오 상담</a></div></div></section>
    </main>
  );
}
