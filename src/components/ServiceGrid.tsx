import Link from "next/link";
import { services } from "@/src/domain/site";

const serviceIcons: Record<string, string> = {
  "move-in-cleaning": "🏠",
  "residential-cleaning": "✨",
  "commercial-cleaning": "🏢",
  "floor-care": "🧼",
  "waste-disposal": "🚚",
  "hoarding-cleanup": "🧹",
  "deep-cleaning": "🛡️",
  "estate-clearing": "🤝",
  "home-organizing": "📦",
};

/** Reusable service discovery grid driven by the central service catalog. */
export function ServiceGrid({ limit }: { limit?: number }) {
  const visibleServices = typeof limit === "number" ? services.slice(0, limit) : services;
  return (
    <div className="service-grid">
      {visibleServices.map((service) => (
        <Link className="service-card" href={`/services/${service.slug}`} key={service.slug}>
          <div className="service-card__visual" aria-hidden="true"><span>{serviceIcons[service.slug]}</span><small>{service.symbol}</small></div>
          <h3>{service.name}</h3>
          <p>{service.shortDescription}</p>
          <span className="text-link">자세히 보기 →</span>
        </Link>
      ))}
    </div>
  );
}
