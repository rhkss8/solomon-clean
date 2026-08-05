import Link from "next/link";
import { services } from "@/src/domain/site";

const categoryLabels: Record<string, string> = {
  residential: "HOME CARE",
  commercial: "BUSINESS CARE",
  waste: "WASTE CARE",
  special: "SPECIAL CARE",
  organizing: "LIFE CARE",
};

/** Reusable service discovery grid driven by the central service catalog. */
export function ServiceGrid({ limit }: { limit?: number }) {
  const visibleServices = typeof limit === "number" ? services.slice(0, limit) : services;
  return (
    <div className="service-grid">
      {visibleServices.map((service, index) => (
        <Link className="service-card" href={`/services/${service.slug}`} key={service.slug}>
          <div className={`service-card__visual service-card__visual--${index + 1}`} aria-hidden="true">
            <span>{categoryLabels[service.category]}</span>
            <small>{service.symbol}</small>
          </div>
          <div className="service-card__body">
            <h3>{service.name}</h3>
            <p>{service.shortDescription}</p>
            <span className="service-card__link">서비스 알아보기 <i>↗</i></span>
          </div>
        </Link>
      ))}
    </div>
  );
}
