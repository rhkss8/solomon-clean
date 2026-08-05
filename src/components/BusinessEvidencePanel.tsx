import Link from "next/link";
import { businessProfile, getVerifiedBusinessEvidence } from "@/src/domain/business-profile";
import { siteConfig } from "@/src/domain/site";

/** Separates verified company facts from evidence awaiting representative review. */
export function BusinessEvidencePanel() {
  const verifiedEvidence = getVerifiedBusinessEvidence(businessProfile.evidence);

  return (
    <section className="evidence-panel" aria-labelledby="evidence-title">
      <div>
        <span className="eyebrow">COMPANY FACTS</span>
        <h2 id="evidence-title">확인된 정보만 공개합니다.</h2>
        <p>
          대표 {businessProfile.representative} · 전국 상담 · 팩스 {businessProfile.fax}
        </p>
      </div>
      <div>
        {verifiedEvidence.length > 0 ? (
          <ul className="check-list">
            {verifiedEvidence.map((item) => (
              <li key={item.label}>{item.label}: {item.value}</li>
            ))}
          </ul>
        ) : (
          <p className="evidence-pending">
            사업자등록번호, 허가·신고, 보험, 정량 실적은 증빙 확인 후 공개합니다.
            현재 확인 가능한 작업 기록은 공식 블로그에서 볼 수 있습니다.
          </p>
        )}
        <Link className="text-link" href={siteConfig.blogUrl} rel="noreferrer" target="_blank">
          공식 블로그 작업 기록 보기 →
        </Link>
      </div>
    </section>
  );
}
