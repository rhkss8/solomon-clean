import type { ServiceRegion } from "./regions.ts";
import type { CleaningService } from "./site.ts";
import { siteConfig } from "./site.ts";

export type FrequentlyAskedQuestion = { question: string; answer: string };

/** Builds the single verified business entity used across public schemas. */
export function buildLocalBusinessSchema() {
  return { "@context": "https://schema.org", "@type": "LocalBusiness", "@id": `${siteConfig.url}/#business`, name: siteConfig.name, url: siteConfig.url, telephone: siteConfig.phone, email: siteConfig.email, areaServed: { "@type": "Country", name: "대한민국" }, description: siteConfig.description, sameAs: [siteConfig.blogUrl] };
}

/** Builds a service entity whose claims are all visible on the service page. */
export function buildServiceSchema(service: CleaningService) {
  return { "@context": "https://schema.org", "@type": "Service", name: service.name, description: service.description, url: new URL(`/services/${service.slug}`, siteConfig.url).toString(), areaServed: { "@type": "Country", name: "대한민국" }, provider: { "@id": `${siteConfig.url}/#business` } };
}

/** Builds FAQ structured data from the exact questions rendered in the page. */
export function buildFaqSchema(faqs: readonly FrequentlyAskedQuestion[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
}

/** Builds a regional service entity without inventing a local office address. */
export function buildRegionServiceSchema(region: ServiceRegion) {
  return { "@context": "https://schema.org", "@type": "Service", name: `${region.name} 종합청소 서비스`, description: region.description, url: new URL(`/regions/${region.slug}`, siteConfig.url).toString(), areaServed: region.coverage.map((name) => ({ "@type": "AdministrativeArea", name })), provider: { "@id": `${siteConfig.url}/#business` } };
}
