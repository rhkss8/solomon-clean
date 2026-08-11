"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const spaces = [
  { label: "원룸", area: 8, query: "원룸" },
  { label: "투룸", area: 14, query: "투룸" },
  { label: "아파트·빌라", area: 24, query: "아파트·빌라" },
  { label: "주택", area: 32, query: "주택" },
] as const;

const levels = [
  { label: "바닥 일부", query: "바닥에 일부 쌓임", multiplier: 1, description: "생활 쓰레기 위주" },
  { label: "허리 높이", query: "허리 높이까지 쌓임", multiplier: 1.35, description: "분류·반출 증가" },
  { label: "이동 어려움", query: "이동이 어려울 정도", multiplier: 1.75, description: "대량 적치 상태" },
  { label: "악취·해충", query: "악취·해충이 심함", multiplier: 2.1, description: "심화 탈취·방역" },
] as const;

const volumes = [
  { label: "방 한쪽", tons: 0.5, description: "벽면 일부에 모인 정도" },
  { label: "방 하나 가득", tons: 1, description: "바닥부터 허리 높이 정도" },
  { label: "방 2~3개 가득", tons: 3, description: "여러 공간에 대량 적치" },
  { label: "집 전체", tons: 5, description: "통로 확보가 어려운 정도" },
] as const;

const formatWon = (value: number) => `${Math.round(value / 10_000).toLocaleString("ko-KR")}만원`;

export function HoardingPriceCalculator() {
  const [spaceIndex, setSpaceIndex] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);
  const [volumeIndex, setVolumeIndex] = useState(1);
  const [night, setNight] = useState(false);
  const [ladder, setLadder] = useState(false);

  const space = spaces[spaceIndex];
  const level = levels[levelIndex];
  const volume = volumes[volumeIndex];
  const estimate = useMemo(() => {
    const cleaning = space.area * 50_000 * level.multiplier;
    const waste = volume.tons * 500_000;
    const equipment = ladder ? 120_000 : 0;
    const subtotal = cleaning + waste + equipment;
    return { cleaning, waste, equipment, total: night ? subtotal * 1.5 : subtotal };
  }, [ladder, level.multiplier, night, space.area, volume.tons]);

  const query = new URLSearchParams({ service: "hoarding-cleanup", space: space.query, level: level.query });
  query.append("care", "가구·가전 버릴 게 있어요");
  if (levelIndex === 3) query.append("care", "벌레 제거 및 탈취·소독·방역");
  if (night) query.append("care", "스페셜 케어 (3개월 이상 방치)");

  return (
    <section className="hoarding-calculator" aria-labelledby="hoarding-calculator-title">
      <header>
        <div><h2 id="hoarding-calculator-title">사진 상담 전에<br />예상 범위를 계산하세요.</h2><p>카피사이트 공개 단가를 기준으로 계산한 참고 금액입니다.</p></div>
        <div aria-live="polite"><small>현재 예상 금액</small><strong>{formatWon(estimate.total)} 내외</strong><span>VAT 별도 · 현장 확인 후 확정</span></div>
      </header>

      <div className="hoarding-calculator__body">
        <div className="hoarding-calculator__controls">
          <section aria-labelledby="hoarding-space-title"><h3 id="hoarding-space-title">공간 형태</h3><div className="hoarding-calculator__options">{spaces.map((option, index) => <button aria-pressed={spaceIndex === index} key={option.label} onClick={() => setSpaceIndex(index)} type="button">{option.label}</button>)}</div></section>
          <section aria-labelledby="hoarding-level-title"><h3 id="hoarding-level-title">현재 적치 상태</h3><div className="hoarding-calculator__levels">{levels.map((option, index) => <button aria-pressed={levelIndex === index} key={option.label} onClick={() => setLevelIndex(index)} type="button"><b>{option.label}</b><small>{option.description}</small></button>)}</div></section>
          <section aria-labelledby="hoarding-volume-title"><h3 id="hoarding-volume-title">쓰레기가 얼마나 쌓여 있나요?</h3><div className="hoarding-calculator__volumes">{volumes.map((option, index) => <button aria-pressed={volumeIndex === index} key={option.label} onClick={() => setVolumeIndex(index)} type="button"><b>{option.label}</b><small>{option.description}</small></button>)}</div><p className="hoarding-calculator__volume-note">눈에 보이는 정도만 선택하세요. 실제 물량은 사진 확인 후 차량 기준으로 조정합니다.</p></section>
          <div className="hoarding-calculator__toggles"><label><input checked={night} onChange={(event) => setNight(event.target.checked)} type="checkbox" /><span><b>야간 비공개 작업</b><small>최종 비용 1.5배</small></span></label><label><input checked={ladder} onChange={(event) => setLadder(event.target.checked)} type="checkbox" /><span><b>사다리차 사용</b><small>1시간 기준 12만원</small></span></label></div>
        </div>

        <aside aria-label="예상 비용 구성">
          <h3>비용 구성</h3>
          <dl><div><dt>청소</dt><dd>{formatWon(estimate.cleaning)}</dd></div><div><dt>폐기물 처리</dt><dd>{formatWon(estimate.waste)}</dd></div>{ladder ? <div><dt>사다리차</dt><dd>{formatWon(estimate.equipment)}</dd></div> : null}{night ? <div><dt>야간 작업</dt><dd>1.5배 적용</dd></div> : null}</dl>
          <p>숨은 폐기물, 음식물 오염, 해충 상태에 따라 실제 견적은 달라질 수 있습니다.</p>
          <Link href={`/estimate?${query.toString()}`}>이 조건으로 사진 견적 요청</Link>
        </aside>
      </div>
    </section>
  );
}
