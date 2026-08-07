import Image from "next/image";
import Link from "next/link";
import { serviceImages } from "@/src/config/service-images";
import { siteConfig } from "@/src/domain/site";

const quickServices = [
  { href: "/services/move-in-cleaning", label: "입주·이사·준공청소", image: serviceImages["move-in-cleaning"] },
  { href: "/services/waste-disposal", label: "폐기물처리", image: serviceImages["waste-disposal"] },
  { href: "/services/hoarding-cleanup", label: "쓰레기집청소", image: serviceImages["hoarding-cleanup"] },
  { href: "/services/deep-cleaning", label: "특수청소", image: serviceImages["deep-cleaning"] },
  { href: "/services/estate-clearing", label: "유품정리", image: serviceImages["estate-clearing"] },
  { href: "/services/home-organizing", label: "정리수납", image: serviceImages["home-organizing"] },
] as const;

type ServiceQuickMenuProps = {
  destination?: "service" | "estimate";
};

function createQuickServiceHref(serviceHref: string, destination: ServiceQuickMenuProps["destination"]) {
  if (destination === "service") return serviceHref;
  const serviceSlug = serviceHref.replace("/services/", "");
  return `/estimate?service=${serviceSlug}`;
}

/** Image-led quick navigation for the homepage. The full service grid remains separate. */
export function ServiceQuickMenu({ destination = "service" }: ServiceQuickMenuProps) {
  return (
    <nav className="service-quick" aria-label="서비스와 빠른 상담">
      <div className="service-quick__track">
        {quickServices.map((service) => (
          <Link className="service-quick__item" href={createQuickServiceHref(service.href, destination)} key={service.label}>
            <span className="service-quick__art">
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
