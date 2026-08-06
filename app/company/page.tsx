import Link from "next/link";
import { BusinessEvidencePanel } from "@/src/components/BusinessEvidencePanel";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata = createPageMetadata({ title: "회사소개", description: "공간의 문제를 끝까지 해결하는 청소하는사람들을 소개합니다.", path: "/company" });

export default function CompanyPage() {
  return <main><section className="page-hero page-hero--dark"><div className="container narrow"><span className="eyebrow">ABOUT CLEANING PEOPLE</span><h1>깨끗한 공간을 넘어<br />다시 시작할 수 있도록.</h1><p>청소하는사람들은 생활공간과 사업장의 복잡한 청소 문제를 한 번에 상담할 수 있는 전국 종합청소 서비스입니다.</p></div></section><section className="section"><div className="container split-section"><div><span className="eyebrow">OUR STANDARD</span><h2>과장보다 과정,<br />가격보다 기준을 먼저.</h2></div><div className="prose"><p>현장마다 필요한 청소는 다릅니다. 청소하는사람들은 사진과 기본 조건을 먼저 확인하고, 작업 범위와 비용을 바꾸는 요소를 설명하는 상담을 지향합니다.</p><p>현재 홈페이지는 실제 운영 정보와 작업 기록을 단계적으로 연결하고 있습니다. 확인되지 않은 실적이나 보장 내용을 광고 문구로 사용하지 않습니다.</p><Link className="button button--primary" href="/estimate">상담 시작하기</Link></div></div></section><section className="section section--subtle"><div className="container"><BusinessEvidencePanel /></div></section></main>;
}
