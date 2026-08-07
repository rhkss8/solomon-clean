import Link from "next/link";
import { PriceGuideCalculator } from "@/src/components/PriceGuideCalculator";
import { PricePolicyNotice } from "@/src/components/PricePolicyNotice";
import { services } from "@/src/domain/site";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata = createPageMetadata({ title: "청소·폐기물 비용안내", description: "서비스별 비용을 결정하는 기준을 투명하게 확인하세요.", path: "/prices" });

export default function PricesPage() {
  return <main><section className="page-hero"><div className="container"><span className="eyebrow">PRICE GUIDE</span><h1>정확한 비용은<br />조건을 함께 봐야 합니다.</h1><p>실제 금액을 임의로 표시하지 않고, 어떤 정보가 견적 정확도를 높이는지 먼저 안내합니다.</p></div></section><section className="section"><div className="container"><PricePolicyNotice /></div></section><section className="section section--subtle"><div className="container"><div className="section-heading"><div><span className="eyebrow">WASTE PRICE GUIDE</span><h2>폐기물은 종류별로 확인하세요.</h2></div><p>산업·가정·생활·이사 폐기물의 비용 요인과 사진 준비사항을 나누어 안내합니다.</p></div><Link className="price-feature-link" href="/prices-waste"><span>05</span><div><strong>폐기물처리 상세 비용안내</strong><p>카테고리별 견적 기준과 처리 과정을 확인하세요.</p></div><b>4개 카테고리 보기 →</b></Link></div></section><section className="section"><div className="container"><div className="section-heading"><div><span className="eyebrow">QUOTE CHECK</span><h2>내 현장은 어떤 상담이 필요할까요?</h2></div></div><PriceGuideCalculator /></div></section><section className="section"><div className="container price-list">{services.map(service=><article key={service.slug}><div><span>{service.symbol}</span><h2>{service.name}</h2></div><p>{service.priceBasis}</p><div><Link className="text-link" href={service.slug === "waste-disposal" ? "/prices-waste" : `/services/${service.slug}`}>{service.slug === "waste-disposal" ? "상세 비용 보기 →" : "서비스 보기 →"}</Link><Link className="button button--primary" href={`/estimate?service=${service.slug}`}>견적 요청</Link></div></article>)}</div></section></main>;
}
