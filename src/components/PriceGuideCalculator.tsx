"use client";

import Link from "next/link";
import { useState } from "react";
import { calculatePriceGuide, type PriceGuideInput } from "@/src/domain/pricing";
import { services } from "@/src/domain/site";

const initialInput: PriceGuideInput = { serviceSlug: services[0].slug, scale: "medium", condition: "normal", access: "easy", hasExtraWork: false };

/** Collects quote-driving conditions and explains the required consultation depth. */
export function PriceGuideCalculator() {
  const [input, setInput] = useState(initialInput);
  const result = calculatePriceGuide(input);

  function updateInput<Key extends keyof PriceGuideInput>(key: Key, value: PriceGuideInput[Key]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return <div className="price-calculator">
    <div className="price-calculator__form">
      <label>서비스<select value={input.serviceSlug} onChange={(event) => updateInput("serviceSlug", event.target.value)}>{services.map((service) => <option key={service.slug} value={service.slug}>{service.name}</option>)}</select></label>
      <label>현장 규모<select value={input.scale} onChange={(event) => updateInput("scale", event.target.value as PriceGuideInput["scale"])}><option value="small">작은 공간·적은 물량</option><option value="medium">일반적인 규모</option><option value="large">넓은 공간·많은 물량</option></select></label>
      <label>오염 상태<select value={input.condition} onChange={(event) => updateInput("condition", event.target.value as PriceGuideInput["condition"])}><option value="light">가벼운 오염</option><option value="normal">일반 오염</option><option value="heavy">심한 오염·장기 방치</option></select></label>
      <label>작업 접근<select value={input.access} onChange={(event) => updateInput("access", event.target.value as PriceGuideInput["access"])}><option value="easy">주차·이동이 원활함</option><option value="limited">계단·주차·상차 제약 있음</option></select></label>
      <label className="check-field"><input checked={input.hasExtraWork} onChange={(event) => updateInput("hasExtraWork", event.target.checked)} type="checkbox" /> 철거·곰팡이·소독 등 추가 작업이 필요합니다.</label>
    </div>
    <aside className={`price-calculator__result price-calculator__result--${result.level}`}><span className="eyebrow">CONSULTATION GUIDE</span><h2>{result.title}</h2><p>{result.description}</p><ul>{result.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul><Link className="button button--primary" href={`/estimate?service=${input.serviceSlug}`}>이 조건으로 견적 요청</Link></aside>
  </div>;
}
