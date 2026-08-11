import Image from "next/image";
import Link from "next/link";
import { HoardingPriceCalculator } from "@/src/components/HoardingPriceCalculator";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata = createPageMetadata({
  title: "쓰레기집청소 비용안내",
  description: "쓰레기집청소 평균 비용과 청소·폐기물·사다리차·야간 작업의 비용 기준을 확인하세요.",
  path: "/prices-clean",
});

const costFactors = [
  { title: "청소", price: "1평당 5만원~", description: "면적과 오염도, 필요한 세척 범위로 산정" },
  { title: "폐기물", price: "1톤당 50만원~", description: "쓰레기 종류와 실제 반출 물량으로 산정" },
  { title: "사다리차", price: "시간당 12만원~", description: "고층이거나 계단 반출이 어려울 때 적용" },
  { title: "야간 작업", price: "최종 비용 × 1.5", description: "이웃 노출을 줄이는 비공개 시간대 작업" },
] as const;

const faq = [
  ["사진만으로 견적을 받을 수 있나요?", "전체 공간과 쓰레기 높이, 주방·욕실, 현관부터 차량까지의 동선을 촬영하면 1차 견적을 받을 수 있습니다."],
  ["주변에 알려지지 않게 진행할 수 있나요?", "가능한 시간대와 차량 위치를 먼저 협의합니다. 야간 비공개 작업은 공개 단가 기준 최종 비용의 1.5배가 적용됩니다."],
  ["소독과 탈취도 포함되나요?", "기본 소독·탈취는 포함하되 해충 방역, 강력 탈취와 곰팡이 제거는 상태를 확인해 별도로 안내합니다."],
] as const;

export default function HoardingCleanPricePage() {
  return (
    <main className="hoarding-price-page">
      <section className="hoarding-price-hero">
        <div className="container">
          <div className="hoarding-price-hero__copy"><h1>버리는 양과<br />오염 상태가 비용을<br />정합니다.</h1><p>긴 설명 대신 실제 견적을 바꾸는 네 가지 조건만 확인하세요. 사진이 정확할수록 현장 추가비용을 줄일 수 있습니다.</p><div><Link className="button button--primary" href="/estimate?service=hoarding-cleanup">비공개 사진견적</Link><a className="button button--secondary" href="#calculator">예상비용 계산</a></div></div>
          <figure className="hoarding-price-hero__visual"><div className="hoarding-price-hero__scene"><Image alt="전문 작업자가 주거공간의 물품을 분류하고 폐기물을 반출하는 쓰레기집청소 작업 이미지" fill priority sizes="(max-width: 900px) 100vw, 44vw" src="/generated/hoarding-cleanup-hero-v1.png" /></div><figcaption><span>분류</span><span>반출</span><span>청소</span><span>탈취</span></figcaption></figure>
          <div className="hoarding-price-hero__numbers"><div><strong>25만원</strong><span>최소</span></div><div><strong>83만원</strong><span>평균</span></div><div><strong>300만원</strong><span>최대</span></div></div>
        </div>
      </section>

      <section className="hoarding-calculator-wrap" id="calculator"><div className="container"><HoardingPriceCalculator /></div></section>

      <section className="section hoarding-cost-section"><div className="container"><div className="section-heading"><h2>견적을 바꾸는<br />네 가지 기준</h2><p>공개 단가에서 핵심만 추렸습니다. 실제 금액은 각 항목의 물량과 난이도를 합산합니다.</p></div><div className="hoarding-cost-list">{costFactors.map((factor) => <article key={factor.title}><h3>{factor.title}</h3><strong>{factor.price}</strong><p>{factor.description}</p></article>)}</div></div></section>

      <section className="hoarding-visual-story"><div className="container"><div className="hoarding-visual-story__image"><Image alt="폐기물 반출 작업을 설명하는 이미지" fill sizes="(max-width: 800px) 100vw, 50vw" src="/services/quick-menu-v4/waste-disposal.jpg" /></div><div><h2>비용의 절반은<br />버리는 과정에서 생깁니다.</h2><p>봉투 개수보다 실제 부피와 무게가 중요합니다. 가구 해체, 계단 운반, 차량 접근이 필요한지도 함께 확인합니다.</p><ul><li><b>먼저 남길 물건 표시</b><span>서류·귀중품은 임의로 버리지 않습니다.</span></li><li><b>전체 물량 촬영</b><span>방마다 입구와 안쪽을 모두 보여주세요.</span></li><li><b>반출 동선 확인</b><span>층수·승강기·주차 위치를 함께 확인합니다.</span></li></ul></div></div></section>

      <section className="hoarding-care-section"><div className="container"><div><h2>청소 후에도 냄새가 남는다면<br />심화 작업이 필요합니다.</h2><p>기본 소독·탈취로 해결되지 않는 해충, 곰팡이와 장기 방치 악취는 별도 공정으로 구분합니다.</p><Link href="/estimate?service=hoarding-cleanup">오염 상태 사진으로 상담</Link></div><figure><Image alt="소독과 탈취가 필요한 특수청소 작업을 상징하는 이미지" fill sizes="(max-width: 800px) 100vw, 42vw" src="/services/quick-menu-v4/deep-cleaning.jpg" /></figure></div></section>

      <section className="section section--subtle"><div className="container waste-price-faq"><div><h2>견적 전<br />자주 묻는 질문</h2></div><div>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>

      <section className="waste-price-cta"><div className="container"><div><h2>보여주기 어려운 공간도 비공개로 상담합니다.</h2><p>전체 사진 3~5장과 지역만 보내주시면 필요한 차량·인원·작업 범위를 먼저 확인합니다.</p></div><Link className="button button--light" href="/estimate?service=hoarding-cleanup">쓰레기집청소 무료견적</Link></div></section>
    </main>
  );
}
