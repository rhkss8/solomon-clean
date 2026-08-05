import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/src/components/StructuredData";
import { getServiceDetail } from "@/src/domain/service-details";
import { getServiceBySlug, services, siteConfig } from "@/src/domain/site";
import { createPageMetadata } from "@/src/lib/metadata";

export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getServiceBySlug((await params).slug);
  return service ? createPageMetadata({ title: `${service.name} 전국 무료견적`, description: service.description, path: `/services/${service.slug}` }) : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();
  const detail = getServiceDetail(service.slug);
  if (!detail) notFound();
  return <main>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "Service", name: service.name, description: service.description, areaServed: "대한민국", provider: { "@type": "Organization", name: siteConfig.name } }} />
    <StructuredData data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: detail.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />
    <section className="page-hero"><div className="container narrow"><span className="eyebrow">SERVICE {service.symbol}</span><h1>{service.name}</h1><p>{service.description}</p><div className="button-row"><Link className="button button--primary" href={`/estimate?service=${service.slug}`}>무료견적 요청</Link><Link className="button button--secondary" href="/prices">비용 기준 보기</Link></div></div></section>
    <section className="section"><div className="container detail-columns"><div><span className="eyebrow">WORK SCOPE</span><h2>기본 작업 범위</h2><ul className="check-list">{detail.workScopes.map((item) => <li key={item}>{item}</li>)}</ul></div><div><span className="eyebrow">SITE CHECK</span><h2>견적 전 확인사항</h2><ul className="check-list">{detail.siteChecks.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
    <section className="section section--subtle"><div className="container"><div className="section-heading"><div><span className="eyebrow">PROCESS</span><h2>상담부터 완료까지</h2></div></div><div className="process-grid">{detail.process.map((step, index) => <article key={step}><span>0{index + 1}</span><h3>{step}</h3></article>)}</div></div></section>
    <section className="section"><div className="container detail-columns"><div><span className="eyebrow">PRICE BASIS</span><h2>비용 결정 기준</h2><p className="detail-lead">{service.priceBasis}</p><Link className="text-link" href={`/estimate?service=${service.slug}`}>현장 정보로 견적 요청 →</Link></div><div><span className="eyebrow">NOT INCLUDED</span><h2>기본 범위에서 제외</h2><ul className="plain-list">{detail.exclusions.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>
    <section className="section section--dark"><div className="container narrow"><span className="eyebrow">FAQ</span><h2>자주 묻는 질문</h2><div className="faq-list">{detail.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
  </main>;
}
