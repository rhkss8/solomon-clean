import Link from "next/link";
import { services } from "@/src/domain/site";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata = createPageMetadata({ title: "청소·폐기물 비용안내", description: "서비스별 비용을 결정하는 기준을 투명하게 확인하세요.", path: "/prices" });

export default function PricesPage() {
  return <main><section className="page-hero"><div className="container"><span className="eyebrow">PRICE GUIDE</span><h1>정확한 비용은<br />조건을 함께 봐야 합니다.</h1><p>표시된 기준은 상담을 돕기 위한 안내이며 실제 견적은 현장 정보 확인 후 결정됩니다.</p></div></section><section className="section"><div className="container price-list">{services.map(service=><article key={service.slug}><div><span>{service.symbol}</span><h2>{service.name}</h2></div><p>{service.priceBasis}</p><div><Link className="text-link" href={`/services/${service.slug}`}>서비스 보기 →</Link><Link className="button button--primary" href={`/estimate?service=${service.slug}`}>견적 요청</Link></div></article>)}</div></section></main>;
}
