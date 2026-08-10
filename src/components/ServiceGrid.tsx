import Image from "next/image";
import Link from "next/link";
import { serviceImages } from "@/src/config/service-images";
import { services } from "@/src/domain/site";

/** Reusable service discovery grid driven by the central service catalog. */
export function ServiceGrid({ limit }: { limit?: number }) {
  const visibleServices = typeof limit === "number" ? services.slice(0, limit) : services;
  return (
    <div className="service-grid">
      {visibleServices.map((service) => (
        <Link className="service-card" href={`/services/${service.slug}`} key={service.slug}>
          <div className="service-card__visual"><Image alt={`${service.name} 서비스 이미지`} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" src={serviceImages[service.slug]} /><small>{service.symbol}</small></div>
          <h3>{service.name}</h3>
          <p>{service.shortDescription}</p>
          <span className="text-link">무료견적 시작 →</span>
        </Link>
      ))}
    </div>
  );
}
