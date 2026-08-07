import Link from "next/link";
import { PriceGuideCalculator } from "@/src/components/PriceGuideCalculator";
import { PricePolicyNotice } from "@/src/components/PricePolicyNotice";
import { PriceServiceCatalog } from "@/src/components/PriceServiceCatalog";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata = createPageMetadata({
  title: "청소·폐기물 비용안내",
  description: "서비스별 비용을 결정하는 기준과 카테고리별 상세 안내를 확인하세요.",
  path: "/prices",
});

const estimatePrinciples = [
  { number: "01", title: "작업 범위를 먼저 구분", description: "기본 작업과 추가 작업을 나누어 견적 조건을 확인합니다." },
  { number: "02", title: "현장 조건을 사전 확인", description: "사진, 면적, 오염도와 반출 동선을 기준으로 상담합니다." },
  { number: "03", title: "확정 내용을 견적서에 표시", description: "작업 범위와 부가세 적용 여부를 최종 견적서에서 확인합니다." },
] as const;

export default function PricesPage() {
  return (
    <main className="prices-hub">
      <section className="prices-hub__hero">
        <div className="container">
          <span className="eyebrow">PRICE & FREE ESTIMATE</span>
          <h1>예상비용.<br />무료 견적. 전국 상담.</h1>
          <p>필요한 서비스를 선택하면 비용이 달라지는 기준과 준비사항을 바로 확인할 수 있습니다.</p>
        </div>
      </section>

      <section className="prices-hub__catalog">
        <div className="container">
          <PriceServiceCatalog />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <PricePolicyNotice />
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section-heading section-heading--light">
            <div><span className="eyebrow">CLEAR ESTIMATE</span><h2>가격만 안내하고 끝내지 않습니다.</h2></div>
            <p>사진 상담부터 작업 범위 확인까지 같은 기준으로 안내합니다.</p>
          </div>
          <div className="price-principle-grid">
            {estimatePrinciples.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--subtle">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">QUOTE CHECK</span><h2>내 현장은 어떤 상담이 필요할까요?</h2></div>
            <p>간단한 조건을 선택하면 견적 정확도를 높이는 정보를 안내합니다.</p>
          </div>
          <PriceGuideCalculator />
        </div>
      </section>

      <section className="prices-hub__proof">
        <div className="container">
          <div><span className="eyebrow">WORK RECORDS</span><h2>비용만큼 중요한 건<br />실제 작업 결과입니다.</h2><p>공식 블로그에서 솔로몬의 현장 기록과 작업 과정을 직접 확인하세요.</p></div>
          <div className="prices-hub__proof-actions"><Link className="button button--primary" href="/portfolio">작업사례 확인</Link><Link className="button button--secondary" href="/estimate">무료견적 요청</Link></div>
        </div>
      </section>
    </main>
  );
}

