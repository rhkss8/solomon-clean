import Link from "next/link";
import { services } from "@/src/domain/site";

/** Reusable service discovery grid driven by the central service catalog. */
export function ServiceGrid({ limit }: { limit?: number }) {
  const visibleServices = typeof limit === "number" ? services.slice(0, limit) : services;
  return (
    <div className="service-grid">
      {visibleServices.map((service) => (
        <Link className="service-card" href={`/services/${service.slug}`} key={service.slug}>
          <span className="service-card__number">{service.symbol}</span>
          <h3>{service.name}</h3>
          <p>{service.shortDescription}</p>
          <span className="text-link">자세히 보기 →</span>
        </Link>
      ))}
    </div>
  );
}
