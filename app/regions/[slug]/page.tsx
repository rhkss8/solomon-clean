import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceGrid } from "@/src/components/ServiceGrid";
import { StructuredData } from "@/src/components/StructuredData";
import { getServiceRegion, serviceRegions } from "@/src/domain/regions";
import { buildRegionServiceSchema } from "@/src/domain/structured-data";
import { createPageMetadata } from "@/src/lib/metadata";

export function generateStaticParams() { return serviceRegions.map((region) => ({ slug: region.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const region = getServiceRegion((await params).slug); return region ? createPageMetadata({ title: `${region.name} 청소·폐기물 무료견적`, description: region.description, path: `/regions/${region.slug}` }) : {}; }
export default async function RegionPage({ params }: { params: Promise<{ slug: string }> }) { const region = getServiceRegion((await params).slug); if (!region) notFound(); return <main><StructuredData data={buildRegionServiceSchema(region)} /><section className="page-hero"><div className="container narrow"><span className="eyebrow">REGIONAL SERVICE</span><h1>{region.headline}</h1><p>{region.description}</p><Link className="button button--primary" href="/estimate">이 지역 무료견적 요청</Link></div></section><section className="section section--subtle"><div className="container detail-columns"><div><span className="eyebrow">COVERAGE</span><h2>주요 상담 지역</h2><ul className="check-list">{region.coverage.map((area) => <li key={area}>{area}</li>)}</ul></div><div><span className="eyebrow">BEFORE QUOTE</span><h2>출장 견적 확인사항</h2><ul className="plain-list"><li>정확한 주소와 건물 출입 조건</li><li>현장 규모와 작업 희망일</li><li>차량·장비 반입과 폐기물 반출 조건</li></ul></div></div></section><section className="section"><div className="container"><div className="section-heading"><div><span className="eyebrow">SERVICE</span><h2>{region.name}에서 상담 가능한 서비스</h2></div></div><ServiceGrid /></div></section></main>; }
