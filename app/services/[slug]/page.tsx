import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/src/components/StructuredData";
import { getServiceBySlug, services, siteConfig } from "@/src/domain/site";
import { createPageMetadata } from "@/src/lib/metadata";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return createPageMetadata({
    title: `${service.name} 전국 무료견적`,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();
  return (
    <main>
      <StructuredData data={{ "@context": "https://schema.org", "@type": "Service", name: service.name, description: service.description, areaServed: "대한민국", provider: { "@type": "Organization", name: siteConfig.name } }} />
      <section className="page-hero"><div className="container narrow"><span className="eyebrow">SERVICE {service.symbol}</span><h1>{service.name}</h1><p>{service.description}</p><div className="button-row"><Link className="button button--primary" href={`/estimate?service=${service.slug}`}>무료견적 요청</Link><Link className="button button--secondary" href="/prices">비용 기준 보기</Link></div></div></section>
      <section className="section"><div className="container split-section"><div><span className="eyebrow">WORK SCOPE</span><h2>상담 전 확인하는 기준</h2><p>{service.priceBasis}</p></div><div className="factor-list">{service.highlights.map((item, index)=><div key={item}><span>0{index+1}</span><strong>{item}</strong></div>)}</div></div></section>
      <section className="section section--subtle"><div className="container narrow"><span className="eyebrow">PROCESS</span><h2>상담부터 완료까지</h2><div className="process-grid">{["현장 정보 접수","작업 범위 확인","일정·견적 안내","작업 및 마감 확인"].map((step,index)=><article key={step}><span>0{index+1}</span><h3>{step}</h3></article>)}</div></div></section>
    </main>
  );
}
