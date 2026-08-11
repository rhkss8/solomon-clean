import Link from "next/link";
import { wastePriceCategories } from "@/src/domain/waste-pricing";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata = createPageMetadata({
  title: "폐기물처리 비용안내",
  description: "폐기물 물량과 종류, 층수, 엘리베이터와 주차 조건에 따른 견적 구성을 상세히 확인하세요.",
  path: "/prices-waste",
});

const costParts = [
  { number: "01", title: "폐기 물량 기준", description: "폐기물의 부피·무게·종류와 재활용 가능 여부를 기준으로 처리비용을 산정합니다.", basis: "1톤 1차당 400,000원~" },
  { number: "02", title: "사다리차 사용", description: "고층에서 대형 가구나 폐기물을 반출할 때 사다리차가 필요할 수 있습니다.", basis: "1시간당 120,000원~" },
  { number: "03", title: "엘리베이터 유무", description: "사다리차를 사용할 수 없으면 엘리베이터나 계단으로 반출하며 인력 운반비가 추가됩니다.", basis: "인력 운반 시 추가비용" },
] as const;

const quoteScenarios = [
  { situation: "고객이 폐기물을 직접 싣는 경우", items: ["폐기물 처리 400,000원~"], price: "400,000원~" },
  { situation: "폐기물을 1층에서 싣는 경우", items: ["폐기물 처리 400,000원~", "인건비 50,000원~"], price: "450,000원~" },
  { situation: "2층 이상 · 엘리베이터 사용 가능", items: ["폐기물 처리 400,000원~", "인건비 100,000원~"], price: "500,000원~" },
  { situation: "2층 이상 · 엘리베이터 사용 불가", items: ["폐기물 처리 400,000원~", "인건비 150,000원~"], price: "550,000원~" },
  { situation: "2층 이상 · 주차 불가 또는 긴 동선 · 엘리베이터 사용 가능", items: ["폐기물 처리 400,000원~", "인건비 150,000원~"], price: "550,000원~" },
  { situation: "2층 이상 · 주차 불가 또는 긴 동선 · 엘리베이터 사용 불가", items: ["폐기물 처리 400,000원~", "인건비 200,000원~"], price: "600,000원~" },
] as const;

const vehicleGuides = [
  { name: "1톤 반차", capacity: "소량 폐기물", price: "200,000원~", description: "가구 몇 점과 비교적 적은 생활폐기물에 적용되는 예상 기준입니다." },
  { name: "1톤 차량", capacity: "가정·생활·이사 폐기물", price: "400,000원~600,000원", description: "폐기물 종류, 재활용 가능 품목의 양과 반출 인력에 따라 견적이 달라집니다." },
  { name: "5톤 차량", capacity: "산업·건축·대량 폐기물", price: "800,000원~2,500,000원", description: "대량 물량과 집게차 작업 여부, 현장 진입 조건에 따라 범위가 달라집니다." },
] as const;

const changeReasons = [
  { title: "사진과 실제 물량의 차이", description: "보내지 않은 공간이나 겹쳐 있어 보이지 않던 폐기물이 현장에서 추가로 확인되면 차량과 처리량이 달라질 수 있습니다." },
  { title: "분류·해체 작업의 증가", description: "내용물이 섞여 있거나 대형 가구를 현장에서 해체해야 하면 작업 인원과 시간이 추가될 수 있습니다." },
  { title: "오염·재활용 가능 여부", description: "젖거나 오염된 물품, 혼합 폐기물은 재활용 가능 품목과 처리 방식이 달라 비용에 영향을 줍니다." },
  { title: "엘리베이터와 주차 조건", description: "엘리베이터를 사용할 수 없거나 차량을 가까이 세울 수 없으면 계단·장거리 운반 범위가 늘어납니다." },
  { title: "현장 장비와 안전 조건", description: "사다리차·집게차 사용, 보호장비 또는 별도 포장이 필요한 현장은 해당 항목을 작업 전에 구분해 안내합니다." },
] as const;

const faq = [
  { question: "사진만으로도 폐기물 견적을 받을 수 있나요?", answer: "전체 공간, 큰 품목, 출입구와 주차 위치가 보이는 사진을 보내주시면 1차 견적이 가능합니다. 사진으로 판단하기 어려운 대량 현장은 방문 확인을 안내할 수 있습니다." },
  { question: "가구 한 개나 소량도 수거할 수 있나요?", answer: "지역과 일정에 따라 가능합니다. 다만 차량과 인력이 이동하므로 소량은 지자체 대형폐기물 신고가 더 경제적일 수 있습니다. 품목 규격과 주소를 보내주시면 적합한 방법부터 안내합니다." },
  { question: "1톤 차량 한 대면 비용이 고정되나요?", answer: "같은 차량이라도 폐기물의 종류, 무게, 적재 높이, 분류 상태와 상차 난이도가 달라 금액은 고정되지 않습니다. 처리·운반·인력 항목을 구분한 견적을 확인해 주세요." },
  { question: "폐가전이나 재사용 가능한 가구도 함께 처리하나요?", answer: "품목 상태에 따라 재사용·재활용 가능 여부를 확인합니다. 매입이나 보상 가능 여부는 품목과 현장 조건을 확인한 뒤 별도로 안내합니다." },
  { question: "사다리차 비용은 언제 추가되나요?", answer: "계단 반출이 어렵거나 대형 가구가 출입구를 통과하지 못할 때 검토합니다. 장비가 필요하면 작업 전에 별도 항목으로 안내합니다." },
  { question: "청소나 소독도 같이 요청할 수 있나요?", answer: "폐기물을 모두 반출한 뒤 바닥·생활청소 또는 소독이 필요한 경우 함께 상담할 수 있습니다. 폐기물 처리 범위와 청소 범위는 견적서에서 분리합니다." },
  { question: "폐기물 관련 서류도 요청할 수 있나요?", answer: "사업장 등 증빙이 필요한 현장은 필요한 서류의 명칭과 제출처를 상담 단계에서 알려주세요. 현장 및 처리 유형에 따른 발급 가능 여부를 확인해 안내합니다." },
] as const;

export default function WastePricesPage() {
  return (
    <main className="waste-guide">
      <section className="waste-guide__hero">
        <div className="container waste-guide__hero-layout">
          <div>
            <h1>폐기물처리<br />비용 안내</h1>
            <p>같은 1톤 차량이라도 폐기물 종류와 반출 조건에 따라 비용은 달라집니다. 처리비·운반비·인건비를 나누어 확인하세요.</p>
            <div className="waste-price-hero__actions"><Link className="button button--primary" href="/estimate?service=waste-disposal">사진으로 무료견적</Link><a className="button button--secondary" href="#quote-table">비용 구성 확인</a></div>
          </div>
          <aside className="waste-guide__quote-card" aria-label="폐기물 예상 견적 안내">
            <span>예상 견적 비용</span>
            <strong>평균 400,000원</strong>
            <p>참고 데이터 기준 예상 비용이며 서비스 내용과 현장 조건에 따라 실제 금액은 달라질 수 있습니다.</p>
            <div className="waste-guide__price-bars" aria-label="최소 평균 최대 예상 비용">
              <div><b>20만원</b><i style={{ height: "30%" }} /><span>최소비용</span></div>
              <div><b>40만원</b><i style={{ height: "55%" }} /><span>평균비용</span></div>
              <div><b>150만원</b><i style={{ height: "100%" }} /><span>최대비용</span></div>
            </div>
            <small>※ 예상 가격 기준 · VAT 별도</small>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading"><div><h2>폐기물 처리비용은<br />세 부분으로 구성됩니다.</h2></div><p>최종 금액만 보지 말고 어떤 작업이 포함되었는지 확인하면 현장 추가비용을 줄일 수 있습니다.</p></div>
          <div className="waste-cost-parts">{costParts.map((part) => <article key={part.title}><span>{part.number}</span><h3>{part.title}</h3><p>{part.description}</p><strong>{part.basis}</strong></article>)}</div>
        </div>
      </section>

      <section className="section section--subtle" id="quote-table">
        <div className="container">
          <div className="section-heading"><div><h2>상황별 견적 구성</h2></div><p>표의 항목은 일반적인 산정 방식입니다. 실제 현장은 사진 또는 방문 확인 후 확정합니다.</p></div>
          <div className="waste-quote-table" role="table" aria-label="상황별 폐기물 견적 구성">
            <div className="waste-quote-table__head" role="row"><strong role="columnheader">현장 상황</strong><strong role="columnheader">비용 구성</strong><strong role="columnheader">예상 합계</strong></div>
            {quoteScenarios.map((scenario) => <div role="row" key={scenario.situation}><strong role="cell">{scenario.situation}</strong><p role="cell">{scenario.items.map((item) => <span key={item}>{item}</span>)}</p><b role="cell">{scenario.price}</b></div>)}
          </div>
          <p className="waste-guide__vat">※ VAT 별도 · 폐기물 종류와 실제 물량에 따라 변동될 수 있습니다.</p>
          <div className="waste-guide__inline-action"><p>전체 물량과 반출 동선 사진을 함께 보내면 더 정확하게 안내할 수 있습니다.</p><Link href="/estimate?service=waste-disposal">폐기물 무료견적 →</Link></div>
        </div>
      </section>

      <section className="section waste-vehicle-section"><div className="container"><div className="section-heading"><div><h2>차량별 예상 작업 범위</h2></div><p>폐기물 종류, 재활용 가능 품목과 반출 조건에 따라 실제 견적은 달라질 수 있습니다.</p></div><div className="waste-vehicle-grid">{vehicleGuides.map((vehicle) => <article key={vehicle.name}><div><h3>{vehicle.name}</h3><strong>{vehicle.capacity}</strong></div><p>{vehicle.description}</p><span>{vehicle.price}</span></article>)}</div></div></section>

      <section className="section section--dark">
        <div className="container waste-change-reasons">
          <div><h2>견적과 실제 금액이<br />달라지는 이유</h2><p>현장에서 확인되는 조건이 달라질 때 어떤 항목이 변하는지 작업 전에 다시 설명합니다.</p></div>
          <div>{changeReasons.map((reason) => <article key={reason.title}><h3>{reason.title}</h3><p>{reason.description}</p></article>)}</div>
        </div>
      </section>

      <section className="section section--subtle"><div className="container"><div className="section-heading"><div><h2>처리할 폐기물을 선택하세요.</h2></div><p>카테고리를 선택하면 해당 항목이 담긴 무료견적 요청으로 바로 이동합니다.</p></div><div className="waste-category-grid">{wastePriceCategories.map((category, index) => <Link key={category.slug} href={`/estimate?service=waste-disposal&category=${category.slug}`}><span>{String(index + 1).padStart(2, "0")}</span><h3>{category.name}</h3><p>{category.description}</p><strong>이 카테고리로 견적받기 →</strong></Link>)}</div></div></section>

      <section className="section"><div className="container waste-price-faq"><div><h2>자주 묻는 질문</h2><p>소량 수거부터 서류, 추가 작업까지 견적 전에 많이 묻는 내용을 정리했습니다.</p></div><div>{faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>

      <section className="waste-price-cta"><div className="container"><div><h2>사진을 많이 보내주실수록<br />견적이 정확해집니다.</h2><p>전체 공간, 큰 품목, 출입구와 주차 위치가 보이도록 촬영해 주세요.</p></div><Link className="button button--light" href="/estimate?service=waste-disposal">폐기물처리 무료견적</Link></div></section>
    </main>
  );
}
