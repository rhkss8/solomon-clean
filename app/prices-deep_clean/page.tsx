import Image from "next/image";
import Link from "next/link";
import { DeepCleaningPriceCalculator } from "@/src/components/DeepCleaningPriceCalculator";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata = createPageMetadata({ title: "특수청소 비용안내", description: "특수청소 최소·평균·최대 비용과 청소, 특수폐기물, 철거, 야간 작업의 산정 기준을 확인하세요.", path: "/prices-deep_clean" });

const priceFactors = [
  ["오염 제거", "1평당 5만원~", "표면 오염과 필요한 세척 반복 횟수"],
  ["특수폐기물", "1톤당 50만원~", "오염 폐기물의 종류와 실제 반출량"],
  ["철거·샌딩", "1평당 10만원~", "바닥재·벽지 아래로 오염이 침투한 경우"],
  ["야간 작업", "최종 비용 × 1.5", "노출을 줄이는 비공개 시간대 작업"],
] as const;
const faqs = [
  ["사진만으로 비용을 알 수 있나요?", "표면 상태는 사진으로 1차 안내가 가능하지만 바닥 하부, 벽지 이면과 환기구 내부는 현장에서 확인해야 확정할 수 있습니다."],
  ["일반청소와 무엇이 다른가요?", "오염원을 먼저 격리하고 보호장비를 착용한 뒤 제거·세척·소독·탈취 순서로 작업합니다."],
  ["철거는 무조건 필요한가요?", "아닙니다. 표면 세척으로 해결되지 않고 오염이 구조재까지 침투한 구역만 별도로 범위를 안내합니다."],
] as const;

export default function DeepCleaningPricePage() {
  return <main className="deep-price-page">
    <section className="deep-price-hero"><div className="container"><div className="deep-price-hero__copy"><h1>보이지 않는 오염까지<br />작업 범위에 넣습니다.</h1><p>특수청소 비용은 평수보다 오염의 깊이에서 달라집니다. 표면 세척, 격리, 철거와 탈취 범위를 나누어 확인하세요.</p><div><Link className="button button--primary" href="/estimate?service=deep-cleaning">비공개 사진견적</Link><a className="button button--secondary" href="#deep-calculator">예상범위 계산</a></div></div><figure><div className="deep-price-hero__scene"><Image alt="보호장비를 착용한 전문 작업자가 오염 구역을 격리하고 산업용 장비로 특수청소하는 현장" fill priority sizes="(max-width: 900px) 100vw, 52vw" src="/generated/special-cleaning-hero-v1.png" /></div><figcaption><span>격리</span><span>제거</span><span>소독</span><span>탈취</span></figcaption></figure><div className="deep-price-hero__numbers"><div><strong>50만원</strong><span>최소</span></div><div><strong>100만원</strong><span>평균</span></div><div><strong>370만원</strong><span>최대</span></div></div></div></section>
    <section className="deep-price-calculator-wrap" id="deep-calculator"><div className="container"><DeepCleaningPriceCalculator /></div></section>
    <section className="deep-price-factors"><div className="container"><div className="deep-price-factors__heading"><h2>견적서는 네 구역으로<br />나누어 확인하세요.</h2><p>작업 범위가 한 줄로 뭉쳐 있으면 추가비용을 판단하기 어렵습니다.</p></div><div className="deep-price-factors__list">{priceFactors.map(([title, price, description]) => <article key={title}><h3>{title}</h3><strong>{price}</strong><p>{description}</p></article>)}</div></div></section>
    <section className="deep-price-process"><div className="container"><div className="deep-price-process__visual"><Image alt="특수청소 현장에서 사용하는 격리막과 산업용 공기정화 장비" fill sizes="(max-width: 820px) 100vw, 54vw" src="/generated/special-cleaning-hero-v1.png" /></div><div><h2>닦기 전에<br />오염이 번지는 길부터 막습니다.</h2><ol><li><b>현장 격리</b><span>오염 구역과 생활 구역의 동선을 분리합니다.</span></li><li><b>오염원 제거</b><span>폐기물과 침투 범위를 확인해 제거합니다.</span></li><li><b>세척·소독</b><span>재질에 맞춰 반복 세척하고 필요한 구역을 소독합니다.</span></li><li><b>탈취·확인</b><span>악취 원인이 남았는지 최종 확인합니다.</span></li></ol></div></div></section>
    <section className="section section--subtle"><div className="container waste-price-faq"><div><h2>견적 전<br />자주 묻는 질문</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    <section className="waste-price-cta"><div className="container"><div><h2>현장 정보는 필요한 담당자만 확인합니다.</h2><p>전체 공간, 오염이 심한 지점과 출입 동선을 촬영하면 1차 범위를 빠르게 안내할 수 있습니다.</p></div><Link className="button button--light" href="/estimate?service=deep-cleaning">특수청소 비공개 견적</Link></div></section>
  </main>;
}
