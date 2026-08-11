"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const incidentTypes = [
  { label: "심한 악취", query: "심한 악취", base: 500_000, note: "원인 제거와 탈취 중심" },
  { label: "해충·곰팡이", query: "해충·곰팡이", base: 650_000, note: "세척·소독 범위 확인" },
  { label: "장기 방치", query: "장기 방치", base: 850_000, note: "폐기·세척·탈취 복합" },
  { label: "고독사·유품 현장", query: "고독사·유품 현장", base: 1_000_000, note: "오염 침투와 안전 확인" },
] as const;

const ranges = [
  { label: "한 지점", space: "아파트", period: "1주 이내", multiplier: 1, note: "바닥·벽 일부" },
  { label: "방 하나", space: "아파트", period: "1개월 이내", multiplier: 1.45, note: "독립된 한 공간" },
  { label: "여러 공간", space: "아파트", period: "3개월 이내", multiplier: 2.15, note: "방과 공용공간" },
  { label: "집 전체", space: "아파트", period: "3개월 이상", multiplier: 3.1, note: "전체 격리·복구 검토" },
] as const;

const formatWon = (value: number) => `${Math.round(value / 10_000).toLocaleString("ko-KR")}만원`;

export function DeepCleaningPriceCalculator() {
  const [incidentIndex, setIncidentIndex] = useState(0);
  const [rangeIndex, setRangeIndex] = useState(0);
  const [demolition, setDemolition] = useState(false);
  const [night, setNight] = useState(false);
  const incident = incidentTypes[incidentIndex];
  const range = ranges[rangeIndex];
  const estimate = useMemo(() => {
    const cleaning = incident.base * range.multiplier;
    const restoration = demolition ? 300_000 * Math.max(1, rangeIndex + 1) : 0;
    const subtotal = cleaning + restoration;
    return { cleaning, restoration, total: night ? subtotal * 1.5 : subtotal };
  }, [demolition, incident.base, night, range.multiplier, rangeIndex]);
  const low = Math.max(500_000, Math.round(estimate.total * .85 / 10_000) * 10_000);
  const high = Math.round(estimate.total * 1.2 / 10_000) * 10_000;
  const query = new URLSearchParams({ service: "deep-cleaning", contamination: incident.query, space: range.space, period: range.period });

  return (
    <section className="deep-price-calculator" aria-labelledby="deep-calculator-title">
      <header><div><h2 id="deep-calculator-title">사진 상담 전,<br />작업 범위를 가늠해 보세요.</h2><p>노출이 부담스러운 현장은 사진을 비공개로 확인합니다.</p></div><div aria-live="polite"><small>현재 예상 범위</small><strong>{formatWon(low)}–{formatWon(high)}</strong><span>VAT 별도 · 현장 안전 확인 후 확정</span></div></header>
      <div className="deep-price-calculator__body">
        <div className="deep-price-calculator__controls">
          <section aria-labelledby="deep-kind-title"><h3 id="deep-kind-title">어떤 작업이 필요한가요?</h3><div className="deep-price-calculator__choices">{incidentTypes.map((option, index) => <button aria-pressed={incidentIndex === index} key={option.label} onClick={() => setIncidentIndex(index)} type="button"><b>{option.label}</b><span>{option.note}</span></button>)}</div></section>
          <section aria-labelledby="deep-range-title"><h3 id="deep-range-title">오염 범위는 어디까지인가요?</h3><div className="deep-price-calculator__range">{ranges.map((option, index) => <button aria-pressed={rangeIndex === index} key={option.label} onClick={() => setRangeIndex(index)} type="button"><b>{option.label}</b><span>{option.note}</span></button>)}</div></section>
          <div className="deep-price-calculator__toggles"><label><input checked={demolition} onChange={(event) => setDemolition(event.target.checked)} type="checkbox" /><span><b>바닥·벽 철거 가능성</b><small>침투 오염 복구 범위 추가</small></span></label><label><input checked={night} onChange={(event) => setNight(event.target.checked)} type="checkbox" /><span><b>야간 비공개 작업</b><small>공개 기준 최종 비용 1.5배</small></span></label></div>
        </div>
        <aside><h3>선택한 조건</h3><dl><div><dt>기본 특수청소</dt><dd>{formatWon(estimate.cleaning)}</dd></div>{demolition ? <div><dt>철거 예상분</dt><dd>{formatWon(estimate.restoration)}</dd></div> : null}{night ? <div><dt>야간 작업</dt><dd>1.5배 적용</dd></div> : null}</dl><p>바닥 아래나 벽지 뒤쪽으로 오염이 침투한 경우 실제 복구 범위가 달라질 수 있습니다.</p><Link href={`/estimate?${query.toString()}`}>이 조건으로 비공개 견적 요청</Link></aside>
      </div>
    </section>
  );
}
