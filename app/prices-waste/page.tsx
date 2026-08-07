import Link from "next/link";
import { PricePolicyNotice } from "@/src/components/PricePolicyNotice";
import { wastePriceCategories } from "@/src/domain/waste-pricing";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata = createPageMetadata({
  title: "폐기물처리 비용안내",
  description: "산업·가정·생활·이사 폐기물의 견적 기준과 준비사항을 카테고리별로 확인하세요.",
  path: "/prices-waste",
});

export default function WastePricesPage() {
  return (
    <main>
      <section className="waste-price-hero waste-price-hero--overview"><div className="container"><span className="eyebrow">WASTE PRICE GUIDE</span><h1>폐기물 종류가 다르면<br />견적 기준도 달라집니다.</h1><p>차량 한 대라는 기준만으로 금액을 단정하지 않습니다. 품목, 물량, 반출 동선과 추가 작업을 구분해 확인하세요.</p><div className="waste-price-hero__actions"><Link className="button button--primary" href="/estimate?service=waste-disposal">사진 견적 요청</Link><Link className="button button--secondary" href="/services/waste-disposal">폐기물처리 안내</Link></div></div></section>
      <section className="section"><div className="container"><PricePolicyNotice /></div></section>
      <section className="section section--subtle"><div className="container"><div className="section-heading"><div><span className="eyebrow">SELECT CATEGORY</span><h2>처리할 폐기물을 선택하세요.</h2></div><p>카테고리별 비용 요인과 사진 체크리스트가 다릅니다.</p></div><div className="waste-category-grid">{wastePriceCategories.map((category, index) => <Link key={category.slug} href={`/prices-waste/${category.slug}`}><span>{String(index + 1).padStart(2, "0")}</span><h3>{category.name}</h3><p>{category.description}</p><strong>상세 비용안내 →</strong></Link>)}</div></div></section>
      <section className="section"><div className="container waste-estimate-principles"><div><span className="eyebrow">ESTIMATE PRINCIPLES</span><h2>견적서에서 확인할 항목</h2><p>실제 단가가 확정되면 운영 설정 한 곳에서 모든 비용 페이지에 반영됩니다.</p></div><dl><div><dt>처리 비용</dt><dd>폐기물 종류와 물량에 따른 처리 기준</dd></div><div><dt>운반 비용</dt><dd>차량 종류와 이동 횟수에 따른 기준</dd></div><div><dt>인력 비용</dt><dd>상차·분류·해체와 반출 난이도에 따른 기준</dd></div><div><dt>추가 작업</dt><dd>청소·소독·철거 등 선택 작업 범위</dd></div></dl></div></section>
      <section className="waste-price-cta"><div className="container"><div><span className="eyebrow">PHOTO ESTIMATE</span><h2>전체 물량이 보이는 사진을 보내주세요.</h2><p>전국 현장의 일정과 작업 조건을 확인해 상담합니다.</p></div><Link className="button button--light" href="/estimate?service=waste-disposal">무료견적 시작</Link></div></section>
    </main>
  );
}
