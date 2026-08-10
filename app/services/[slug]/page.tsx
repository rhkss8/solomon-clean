import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EstimateForm } from "@/src/components/EstimateForm";
import { StructuredData } from "@/src/components/StructuredData";
import { getServiceDetail } from "@/src/domain/service-details";
import { getServiceBySlug, services } from "@/src/domain/site";
import { buildFaqSchema, buildServiceSchema } from "@/src/domain/structured-data";
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
  return <>
    <StructuredData data={buildServiceSchema(service)} />
    <StructuredData data={buildFaqSchema(detail.faqs)} />
    <Suspense fallback={null}><EstimateForm initialService={service.slug} /></Suspense>
  </>;
}
