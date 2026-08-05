import Link from "next/link";
import { services, siteConfig } from "@/src/domain/site";

/** Image-led quick navigation for the homepage. The full service grid remains separate. */
export function ServiceQuickMenu() {
  return (
    <nav className="service-quick" aria-label="서비스와 빠른 상담">
      <div className="service-quick__track">
        {services.map((service, index) => (
          <Link className="service-quick__item" href={`/services/${service.slug}`} key={service.slug}>
            <span className={`service-quick__art service-quick__art--${index + 1}`} aria-hidden="true" />
            <strong>{service.name}</strong>
          </Link>
        ))}
        <a className="service-quick__item service-quick__item--action" href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank">
          <span className="service-quick__action service-quick__action--kakao" aria-hidden="true"><b>TALK</b><i>•••</i></span>
          <strong>카카오 상담</strong>
        </a>
        <Link className="service-quick__item service-quick__item--action" href="/estimate">
          <span className="service-quick__action service-quick__action--estimate" aria-hidden="true"><b>₩</b><i>견적</i></span>
          <strong>빠른 견적</strong>
        </Link>
      </div>
    </nav>
  );
}
