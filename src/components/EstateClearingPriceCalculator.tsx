"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const spaces = [
  { label: "원룸", query: "오피스텔", volume: "방 1개 이하", base: 350_000, note: "작은 주거공간" },
  { label: "투룸", query: "빌라·주택", volume: "방 2~3개", base: 800_000, note: "방 2개와 공용공간" },
  { label: "쓰리룸", query: "아파트", volume: "집 전체", base: 1_250_000, note: "방 3개 이상" },
  { label: "단독주택", query: "빌라·주택", volume: "집 전체", base: 1_600_000, note: "창고·마당 포함 가능" },
] as const;
const volumes = [
  { label: "1톤 반차", multiplier: .75, note: "큰 가구가 적은 편" },
  { label: "1톤 한차", multiplier: 1, note: "일반적인 원룸 물량" },
  { label: "1톤 두차", multiplier: 1.65, note: "가구·생활물품이 많음" },
  { label: "사진 확인", multiplier: 1.2, note: "양을 가늠하기 어려움" },
] as const;
const formatWon = (value: number) => `${Math.round(value / 10_000).toLocaleString("ko-KR")}만원`;

export function EstateClearingPriceCalculator() {
  const [spaceIndex, setSpaceIndex] = useState(0);
  const [volumeIndex, setVolumeIndex] = useState(1);
  const [cleaning, setCleaning] = useState(true);
  const [stairs, setStairs] = useState(false);
  const space = spaces[spaceIndex];
  const volume = volumes[volumeIndex];
  const estimate = useMemo(() => {
    const sorting = space.base * volume.multiplier;
    const cleaningCost = cleaning ? 150_000 * Math.max(1, spaceIndex + 1) : 0;
    const access = stairs ? 120_000 : 0;
    return { sorting, cleaningCost, access, total: sorting + cleaningCost + access };
  }, [cleaning, space.base, spaceIndex, stairs, volume.multiplier]);
  const query = new URLSearchParams({ service: "estate-clearing", space: space.query, volume: space.volume });
  query.append("work", "유품 분류"); query.append("work", "가구·폐기물 반출");
  if (cleaning) query.append("work", "청소");

  return <section className="estate-calculator" aria-labelledby="estate-calculator-title">
    <header><div><h2 id="estate-calculator-title">남길 것과 보낼 것을<br />먼저 나눠보세요.</h2><p>유품의 양과 반출 환경을 기준으로 한 참고 범위입니다.</p></div><div aria-live="polite"><small>현재 예상 비용</small><strong>{formatWon(estimate.total)} 내외</strong><span>VAT 별도 · 사진 확인 후 확정</span></div></header>
    <div className="estate-calculator__body"><div className="estate-calculator__controls">
      <section><h3>정리할 공간</h3><div className="estate-calculator__options">{spaces.map((option,index)=><button aria-pressed={spaceIndex===index} key={option.label} onClick={()=>setSpaceIndex(index)} type="button"><b>{option.label}</b><span>{option.note}</span></button>)}</div></section>
      <section><h3>반출할 물품의 양</h3><div className="estate-calculator__options">{volumes.map((option,index)=><button aria-pressed={volumeIndex===index} key={option.label} onClick={()=>setVolumeIndex(index)} type="button"><b>{option.label}</b><span>{option.note}</span></button>)}</div></section>
      <div className="estate-calculator__toggles"><label><input checked={cleaning} onChange={(event)=>setCleaning(event.target.checked)} type="checkbox"/><span><b>퇴실 청소 포함</b><small>반출 후 기본 청소</small></span></label><label><input checked={stairs} onChange={(event)=>setStairs(event.target.checked)} type="checkbox"/><span><b>계단·긴 동선</b><small>인력 운반 추가</small></span></label></div>
    </div><aside><h3>예상 구성</h3><dl><div><dt>분류·반출</dt><dd>{formatWon(estimate.sorting)}</dd></div>{cleaning?<div><dt>퇴실 청소</dt><dd>{formatWon(estimate.cleaningCost)}</dd></div>:null}{stairs?<div><dt>운반 동선</dt><dd>{formatWon(estimate.access)}</dd></div>:null}</dl><p>서랍·창고 등 사진에 보이지 않는 물량과 대형가구 해체 여부에 따라 달라질 수 있습니다.</p><Link href={`/estimate?${query.toString()}`}>이 조건으로 유품정리 견적</Link></aside></div>
  </section>;
}
