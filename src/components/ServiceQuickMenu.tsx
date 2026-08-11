import Image from "next/image";
import Link from "next/link";
import { primaryServiceCategories } from "@/src/config/primary-service-categories";
import { siteConfig } from "@/src/domain/site";

type ServiceQuickMenuProps = {
  destination?: "service" | "estimate";
};

function createQuickServiceHref(serviceSlug: string, destination: ServiceQuickMenuProps["destination"]) {
  if (destination === "service") return `/services/${serviceSlug}`;
  return `/estimate?service=${serviceSlug}`;
}

/** Image-led quick navigation for the homepage. The full service grid remains separate. */
export function ServiceQuickMenu({ destination = "service" }: ServiceQuickMenuProps) {
  return (
    <nav className="service-quick" aria-label="서비스와 빠른 상담">
      <div className="service-quick__track">
        {primaryServiceCategories.map((service) => (
          <Link className="service-quick__item" href={createQuickServiceHref(service.slug, destination)} key={service.slug}>
            <span className={`service-quick__art ${"imageClassName" in service ? service.imageClassName : ""}`}>
              <Image alt="" fill priority sizes="(max-width: 600px) 22vw, 150px" src={service.image} unoptimized />
            </span>
            <strong>{service.label}</strong>
          </Link>
        ))}
        <a className="service-quick__item service-quick__item--action" href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank">
          <span className="service-quick__art"><Image alt="" fill priority sizes="(max-width: 600px) 22vw, 150px" src="/services/quick-menu-v4/kakao-talk.jpg" unoptimized /></span>
          <strong>카카오 상담</strong>
        </a>
        <Link className="service-quick__item service-quick__item--action" href="/estimate">
          <span className="service-quick__art"><Image alt="" fill priority sizes="(max-width: 600px) 22vw, 150px" unoptimized src="/services/quick-menu-v4/quick-estimate.jpg" /></span>
          <strong>{destination === "estimate" ? "전체 견적" : "얼마예요?"}</strong>
        </Link>
      </div>
    </nav>
  );
}
