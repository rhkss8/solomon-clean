import Link from "next/link";
import { LivingPriceCalculator } from "@/src/components/LivingPriceCalculator";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata = createPageMetadata({
  title: "거주·일반청소 비용안내",
  description: "거주청소 평균 비용과 오염 난이도별 평당 단가, 인력·폐기물 추가비용을 확인하세요.",
  path: "/livingclean-price",
});

const cleaningRates = [
  { level: "중", price: "평당 30,000~70,000원", description: "생활 먼지와 물때, 주방·욕실의 일반적인 생활 오염을 청소하는 기준입니다." },
  { level: "상", price: "평당 70,000~150,000원", description: "찌든 기름때, 곰팡이, 반려동물 오염처럼 집중 세척이 필요한 현장 기준입니다." },
  { level: "최상", price: "평당 150,000~300,000원", description: "장기 방치, 심한 악취·해충 또는 복합 오염으로 전문 장비와 추가 인력이 필요한 기준입니다." },
] as const;

const additionalRates = [
  { title: "작업 인력", price: "1명당 100,000~200,000원", description: "평수, 오염도와 예상 작업시간에 따라 투입 인원을 정합니다." },
  { title: "폐기물 처리", price: "1톤 차량 400,000~600,000원", description: "버릴 가구·가전과 생활폐기물이 있으면 청소비와 별도로 산정합니다." },
  { title: "사다리차·장비", price: "필요 시 별도 안내", description: "엘리베이터 사용이 어렵거나 대형 물품 반출이 필요할 때 확인합니다." },
] as const;

const includedServices = [
  "문자·전화·비대면 상담",
  "사진 또는 방문 견적",
  "작업 구역 기본 소독·탈취",
  "간단한 물품 분류와 수납 정리",
] as const;

const changeReasons = [
  { title: "실제 오염도", description: "사진에서 보이지 않던 찌든 때, 곰팡이와 가구 뒤 오염이 확인되면 난이도가 달라질 수 있습니다." },
  { title: "평수와 공간 수", description: "전체 면적뿐 아니라 욕실·베란다·주방처럼 집중 작업이 필요한 공간 개수도 함께 반영합니다." },
  { title: "짐과 폐기물의 양", description: "짐을 옮기며 청소하거나 버릴 가구·생활폐기물이 많으면 인력과 폐기물 처리비가 추가됩니다." },
  { title: "엘리베이터와 주차", description: "장비와 폐기물을 장거리로 운반하거나 계단을 이용해야 하면 작업시간과 인력이 늘어납니다." },
] as const;

const faq = [
  ["거주청소 평균 비용은 얼마인가요?", "예상 평균 비용은 약 350,000원이며 일반적인 범위는 250,000원부터 1,500,000원입니다. 평수와 오염 난이도에 따라 실제 견적은 달라집니다."],
  ["입주청소와 거주청소는 무엇이 다른가요?", "입주청소는 짐이 없는 공간의 공사 먼지와 새집 오염 제거가 중심이고, 거주청소는 짐이 있는 상태에서 생활 오염과 공간별 집중 청소를 진행합니다."],
  ["폐기물 처리도 함께 요청할 수 있나요?", "가능합니다. 폐가구·폐가전과 생활폐기물은 청소비와 구분해 1톤 차량과 반출 인력 기준으로 안내합니다."],
  ["사진으로 견적을 받을 수 있나요?", "전체 공간과 오염이 심한 구역, 버릴 물품을 여러 방향에서 촬영해 보내주시면 1차 견적을 안내합니다."],
  ["청소 시간은 얼마나 걸리나요?", "평수, 오염도, 짐의 양과 투입 인원에 따라 달라집니다. 일정 확정 전에 예상 작업시간을 함께 안내합니다."],
] as const;

export default function LivingCleanPricePage() {
  return (
    <main className="living-price living-price--priced">
      <section className="living-price__hero">
        <div className="container living-priced-hero">
          <div>
            <p className="living-price__label">거주·일반청소 비용</p>
            <h1>우리 집 상태에 맞는<br />청소비용을 확인하세요.</h1>
            <p>평수만으로 금액을 정하지 않습니다. 생활 오염의 난이도, 짐과 폐기물, 필요한 인원을 함께 확인합니다.</p>
            <div className="living-price__actions"><Link className="button button--primary" href="/estimate?service=residential-cleaning">청소 무료견적</Link><a className="button button--secondary" href="#rate-table">난이도별 단가 보기</a></div>
          </div>
          <aside className="living-price-summary" aria-label="거주청소 예상 비용">
            <span>예상 평균 비용</span>
            <strong>350,000원</strong>
            <p>서비스 내용과 현장 상태에 따라 실제 금액은 달라질 수 있습니다.</p>
            <div className="living-price-summary__range"><div><b>25만원</b><i style={{ height: "28%" }} /><small>최소</small></div><div><b>35만원</b><i style={{ height: "48%" }} /><small>평균</small></div><div><b>150만원</b><i style={{ height: "100%" }} /><small>최대</small></div></div>
            <em>예상 가격 기준 · VAT 별도</em>
          </aside>
        </div>
      </section>

      <section className="living-calculator-section"><div className="container"><LivingPriceCalculator /></div></section>

      <section className="section" id="rate-table">
        <div className="container">
          <div className="section-heading"><div><h2>오염 난이도별<br />평당 청소비용</h2></div><p>같은 평수라도 오염 범위와 필요한 세척 방식에 따라 단가가 달라집니다.</p></div>
          <div className="living-rate-table">
            <div className="living-rate-table__head"><strong>난이도</strong><strong>예상 단가</strong><strong>적용 기준</strong></div>
            {cleaningRates.map((rate) => <article key={rate.level}><b>{rate.level}</b><strong>{rate.price}</strong><p>{rate.description}</p></article>)}
          </div>
          <p className="living-price__notice">※ VAT 별도 · 정확한 난이도는 현장 사진 또는 방문 견적 후 확정합니다.</p>
        </div>
      </section>

      <section className="section section--subtle">
        <div className="container">
          <div className="section-heading"><div><h2>인력·폐기물<br />추가비용</h2></div><p>청소 외 작업은 견적서에서 별도 항목으로 구분합니다.</p></div>
          <div className="living-additional-rates">{additionalRates.map((rate) => <article key={rate.title}><h3>{rate.title}</h3><strong>{rate.price}</strong><p>{rate.description}</p></article>)}</div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container living-price-included">
          <div><h2>기본 견적에<br />무료로 확인합니다.</h2><p>유료 추가 작업은 시작 전에 범위와 금액을 따로 안내합니다.</p></div>
          <ul>{includedServices.map((service) => <li key={service}><span>무료</span><strong>{service}</strong></li>)}</ul>
        </div>
      </section>

      <section className="section">
        <div className="container living-price-changes">
          <div><h2>견적이 달라지는 이유</h2><p>아래 조건을 사진과 함께 정확히 전달하면 현장에서 금액이 바뀌는 일을 줄일 수 있습니다.</p></div>
          <div>{changeReasons.map((reason) => <article key={reason.title}><h3>{reason.title}</h3><p>{reason.description}</p></article>)}</div>
        </div>
      </section>

      <section className="section section--subtle"><div className="container waste-price-faq"><div><h2>거주·일반청소<br />자주 묻는 질문</h2></div><div>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>

      <section className="waste-price-cta"><div className="container"><div><h2>청소할 공간을 사진으로 보여주세요.</h2><p>전체 공간, 오염이 심한 곳과 버릴 물품을 함께 보내주시면 견적이 더 정확해집니다.</p></div><Link className="button button--light" href="/estimate?service=residential-cleaning">청소서비스 무료견적</Link></div></section>
    </main>
  );
}
