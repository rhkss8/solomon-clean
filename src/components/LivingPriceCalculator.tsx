"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const sizes = [
  { label: "10평 이하", area: 10 },
  { label: "11~20평", area: 20 },
  { label: "21~30평", area: 30 },
  { label: "31~40평", area: 40 },
  { label: "41평 이상", area: 50 },
] as const;

const levels = [
  { id: "중", label: "생활 오염", min: 30_000, max: 70_000, description: "먼지·물때 중심" },
  { id: "상", label: "집중 청소", min: 70_000, max: 150_000, description: "기름때·곰팡이" },
  { id: "최상", label: "복합 오염", min: 150_000, max: 300_000, description: "악취·해충·장기방치" },
] as const;

type ExtraId = "staff" | "waste" | "equipment";

const extras = [
  { id: "staff", label: "추가 인력", min: 100_000, max: 200_000 },
  { id: "waste", label: "폐기물 1톤", min: 400_000, max: 600_000 },
  { id: "equipment", label: "사다리차·장비", min: 0, max: 0 },
] as const satisfies readonly { id: ExtraId; label: string; min: number; max: number }[];

const formatWon = (value: number) => `${Math.round(value / 10_000).toLocaleString("ko-KR")}만원`;

export function LivingPriceCalculator() {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<ExtraId[]>([]);

  const size = sizes[sizeIndex];
  const level = levels[levelIndex];
  const result = useMemo(() => {
    const selected = extras.filter((extra) => selectedExtras.includes(extra.id));
    return {
      min: size.area * level.min + selected.reduce((sum, extra) => sum + extra.min, 0),
      max: size.area * level.max + selected.reduce((sum, extra) => sum + extra.max, 0),
      needsConsultation: selectedExtras.includes("equipment"),
    };
  }, [level, selectedExtras, size]);

  const query = new URLSearchParams({
    service: "residential-cleaning",
    size: size.label,
    difficulty: level.id,
    extras: selectedExtras.map((id) => extras.find((extra) => extra.id === id)?.label).filter(Boolean).join(", "),
  });

  function toggleExtra(id: ExtraId) {
    setSelectedExtras((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <section className="living-calculator" aria-labelledby="living-calculator-title">
      <div className="living-calculator__top">
        <div><h2 id="living-calculator-title">우리 집 예상 청소비를<br />바로 계산해 보세요.</h2><p>평수와 오염 상태를 바꾸면 예상 금액이 즉시 반영됩니다.</p></div>
        <div className="living-calculator__result" aria-live="polite"><small>예상 범위</small><strong>{formatWon(result.min)}~{formatWon(result.max)}</strong>{result.needsConsultation ? <em>장비 비용 별도</em> : null}</div>
      </div>

      <div aria-labelledby="living-size-title" className="living-calculator__step" role="group">
        <h3 id="living-size-title"><span>1</span>공간 크기</h3>
        <div className="living-calculator__segmented">{sizes.map((option, index) => <button aria-pressed={index === sizeIndex} key={option.label} onClick={() => setSizeIndex(index)} type="button">{option.label}</button>)}</div>
      </div>

      <div aria-labelledby="living-level-title" className="living-calculator__step" role="group">
        <h3 id="living-level-title"><span>2</span>오염 난이도</h3>
        <div className="living-calculator__levels">{levels.map((option, index) => <button aria-pressed={index === levelIndex} key={option.id} onClick={() => setLevelIndex(index)} type="button"><b>{option.label}</b><small>{option.description}</small><em>평당 {formatWon(option.min)}~{formatWon(option.max)}</em></button>)}</div>
      </div>

      <div aria-labelledby="living-extra-title" className="living-calculator__step" role="group">
        <h3 id="living-extra-title"><span>3</span>추가 작업 <small>선택사항</small></h3>
        <div className="living-calculator__extras">{extras.map((extra) => <label key={extra.id}><input checked={selectedExtras.includes(extra.id)} onChange={() => toggleExtra(extra.id)} type="checkbox" /><span>{extra.label}</span><small>{extra.id === "equipment" ? "별도 견적" : `+${formatWon(extra.min)}~${formatWon(extra.max)}`}</small></label>)}</div>
      </div>

      <div className="living-calculator__footer"><p>참고용 예상 금액입니다. 정확한 비용은 현장 사진 확인 후 확정됩니다.</p><Link href={`/estimate?${query.toString()}`}>선택한 조건으로 무료견적</Link></div>
    </section>
  );
}
