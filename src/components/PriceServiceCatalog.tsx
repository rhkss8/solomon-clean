import Image from "next/image";
import Link from "next/link";
import { pricesPageContent } from "@/src/config/content/prices-page";

export function PriceServiceCatalog() {
  return (
    <div className="price-service-catalog">
      {pricesPageContent.services.map((service) => (
        <article key={service.slug}>
          <div className="price-service-catalog__media">
            <Image alt={`${service.label} 서비스 이미지`} fill priority={service.priority} sizes="(max-width: 720px) 45vw, 330px" src={service.image} />
          </div>
          <div className="price-service-catalog__body">
            <div><h2>{service.label}</h2><p>{service.description}</p></div>
            <strong>{service.price}</strong>
            <Link href={service.priceHref}>비용 확인 <span aria-hidden="true">›</span></Link>
          </div>
        </article>
      ))}
    </div>
  );
}
