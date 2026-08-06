import Link from "next/link";
import { serviceRegions } from "@/src/domain/regions";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata = createPageMetadata({ title: "전국 청소 서비스 지역", description: "청소하는사람들의 전국 권역별 청소·폐기물 상담 범위를 확인하세요.", path: "/regions" });
export default function RegionsPage() { return <main><section className="page-hero"><div className="container"><span className="eyebrow">NATIONWIDE</span><h1>전국 현장을<br />상담합니다.</h1><p>현장 위치와 규모에 따라 출장 일정, 인원, 차량 조건을 먼저 확인합니다.</p></div></section><section className="section"><div className="container region-grid">{serviceRegions.map((region) => <Link className="region-card" href={`/regions/${region.slug}`} key={region.slug}><span>{region.name}</span><h2>{region.headline}</h2><p>{region.description}</p><strong>상담 지역 확인 →</strong></Link>)}</div></section></main>; }
