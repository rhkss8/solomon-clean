import Link from "next/link";
import { pricesPageContent } from "@/src/config/content/prices-page";
import { pricePolicy } from "@/src/config/operations/pricing";
import { services } from "@/src/domain/site";

function getServicePriceLabel(serviceSlug: string) {
  const draftPrice = pricesPageContent.servicePrices[serviceSlug as keyof typeof pricesPageContent.servicePrices];
  if (pricesPageContent.status === "draft" && draftPrice) return draftPrice;
  const rate = pricePolicy.serviceRates[serviceSlug];
  if (!rate || rate.amount === null || pricePolicy.publicationStatus === "consultation-only") {
    return "상담 견적";
  }

  return `${rate.amount.toLocaleString("ko-KR")}원 / ${rate.unit}`;
}

function getServicePriceHref(serviceSlug: string) {
  return serviceSlug === "waste-disposal"
    ? "/prices-waste"
    : `/services/${serviceSlug}`;
}

export function PriceServiceCatalog() {
  return (
    <div className="price-service-catalog">
      {services.map((service) => (
        <Link key={service.slug} href={getServicePriceHref(service.slug)}>
          <span className="price-service-catalog__number">{service.symbol}</span>
          <div>
            <small>{service.name} 예상 비용</small>
            <strong>{getServicePriceLabel(service.slug)}</strong>
            <p>{service.priceBasis}</p>
          </div>
          <b>{service.slug === "waste-disposal" ? "카테고리별 비용 확인" : "비용 기준 확인"} →</b>
        </Link>
      ))}
    </div>
  );
}
