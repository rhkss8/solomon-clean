import Link from "next/link";
import { formatPhoneNumber, siteConfig } from "@/src/domain/site";

export function ServiceEstimateCta({ serviceName, serviceSlug, variant = "inline" }: { serviceName: string; serviceSlug: string; variant?: "inline" | "final" }) {
  const estimateHref = `/estimate?service=${serviceSlug}`;
  if (variant === "final") return (
    <section className="service-final-cta">
      <div className="container service-final-cta__inner">
        <div><span className="eyebrow">FREE ESTIMATE</span><h2>{serviceName},<br />사진 몇 장이면 상담을 시작할 수 있습니다.</h2><p>정확한 금액은 현장 조건을 확인한 뒤 안내합니다. 견적 요청만으로 예약이나 계약이 확정되지 않습니다.</p></div>
        <div className="service-final-cta__actions"><Link className="button button--white button--large" href={estimateHref}>무료견적 요청하기</Link><a className="button service-final-cta__outline" href={`tel:${siteConfig.phone}`}>전화 {formatPhoneNumber(siteConfig.phone)}</a><a href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank">카카오톡으로 먼저 문의 →</a></div>
      </div>
    </section>
  );
  return (
    <aside className="service-inline-cta">
      <div><span className="eyebrow">QUICK ESTIMATE</span><h2>내 현장도 가능한지 궁금하신가요?</h2><p>사진과 지역, 원하는 작업만 보내주시면 {serviceName}에 필요한 범위를 먼저 확인해드립니다.</p></div>
      <div className="service-inline-cta__side"><ul aria-label="견적 상담 특징"><li>사진으로 간편 접수</li><li>서비스 자동 선택</li><li>예약 확정 전 무료 상담</li></ul><Link className="button button--primary button--large" href={estimateHref}>현장 사진으로 견적받기</Link></div>
    </aside>
  );
}
