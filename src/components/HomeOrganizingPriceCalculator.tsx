"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const zones = [
  { label: "옷방", note: "의류·잡화 동선", base: 260_000 },
  { label: "주방", note: "팬트리·조리도구", base: 300_000 },
  { label: "거실", note: "가족 공용 물품", base: 240_000 },
  { label: "창고·베란다", note: "계절·생활용품", base: 280_000 },
] as const;
const sizes = [
  { label: "10평 이하", multiplier: .8 }, { label: "11~20평", multiplier: 1 },
  { label: "21~30평", multiplier: 1.35 }, { label: "31평 이상", multiplier: 1.75 },
] as const;
const formatWon = (value:number)=>`${Math.round(value/10_000).toLocaleString("ko-KR")}만원`;

export function HomeOrganizingPriceCalculator(){
  const [selected,setSelected]=useState<number[]>([0]);
  const [sizeIndex,setSizeIndex]=useState(1);
  const [consulting,setConsulting]=useState(true);
  const [supplies,setSupplies]=useState(false);
  const toggle=(index:number)=>setSelected((current)=>current.includes(index)?(current.length===1?current:current.filter((item)=>item!==index)):[...current,index]);
  const estimate=useMemo(()=>{
    const organizing=selected.reduce((sum,index)=>sum+zones[index].base,0)*sizes[sizeIndex].multiplier;
    const consultingCost=consulting?120_000:0;
    const supplyGuide=supplies?80_000:0;
    return {organizing,consultingCost,supplyGuide,total:organizing+consultingCost+supplyGuide};
  },[consulting,selected,sizeIndex,supplies]);
  const query=new URLSearchParams({service:"home-organizing",size:sizes[sizeIndex].label});
  selected.forEach((index)=>query.append("zone",zones[index].label));
  query.append("goal","물건 분류"); if(consulting) query.append("goal","수납 위치 설계"); if(supplies) query.append("goal","수납용품 추천");
  return <section className="tidy-calculator" aria-labelledby="tidy-calculator-title"><header><div><h2 id="tidy-calculator-title">정리가 필요한 곳만<br/>골라서 계산하세요.</h2><p>평균 48만원을 기준으로 공간과 서비스 범위를 반영한 참고 금액입니다.</p></div><div aria-live="polite"><small>현재 예상 비용</small><strong>{formatWon(estimate.total)} 내외</strong><span>수납용품 구매비 별도 · 사진 확인 후 확정</span></div></header><div className="tidy-calculator__body"><div className="tidy-calculator__controls"><section><h3>정리가 필요한 공간 <small>복수 선택</small></h3><div className="tidy-calculator__zones">{zones.map((zone,index)=><button aria-pressed={selected.includes(index)} key={zone.label} onClick={()=>toggle(index)} type="button"><b>{zone.label}</b><span>{zone.note}</span></button>)}</div></section><section><h3>집 전체 크기</h3><div className="tidy-calculator__sizes">{sizes.map((size,index)=><button aria-pressed={sizeIndex===index} key={size.label} onClick={()=>setSizeIndex(index)} type="button">{size.label}</button>)}</div></section><div className="tidy-calculator__toggles"><label><input checked={consulting} onChange={(event)=>setConsulting(event.target.checked)} type="checkbox"/><span><b>유지 방법 컨설팅</b><small>가족 동선과 수납 규칙 설계</small></span></label><label><input checked={supplies} onChange={(event)=>setSupplies(event.target.checked)} type="checkbox"/><span><b>수납용품 제안</b><small>규격·수량 추천 비용</small></span></label></div></div><aside><h3>예상 구성</h3><dl><div><dt>공간 정리</dt><dd>{formatWon(estimate.organizing)}</dd></div>{consulting?<div><dt>유지 컨설팅</dt><dd>{formatWon(estimate.consultingCost)}</dd></div>:null}{supplies?<div><dt>용품 설계</dt><dd>{formatWon(estimate.supplyGuide)}</dd></div>:null}</dl><p>물품 수, 가족 수, 기존 수납장의 구조에 따라 작업 인원과 시간이 달라질 수 있습니다.</p><Link href={`/estimate?${query.toString()}`}>이 조건으로 사진 견적 요청</Link></aside></div></section>;
}
