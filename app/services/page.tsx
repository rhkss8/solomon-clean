import { ServiceGrid } from "@/src/components/ServiceGrid";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata = createPageMetadata({
  title: "청소 서비스 전체보기",
  description: "솔로몬종합청소의 입주·이사·상업·특수청소 및 폐기물 서비스를 확인하세요.",
  path: "/services",
});

export default function ServicesPage() {
  return <main><section className="page-hero"><div className="container"><span className="eyebrow">SERVICES</span><h1>필요한 청소를<br />한 곳에서 찾으세요.</h1><p>서비스를 선택하면 해당 카테고리에 맞는 무료견적 질문이 바로 시작됩니다.</p></div></section><section className="section"><div className="container"><ServiceGrid /></div></section></main>;
}
