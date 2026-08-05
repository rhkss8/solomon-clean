import type { PolicyDocument } from "@/src/domain/legal";

/** Renders a versioned policy and makes an unapproved draft impossible to mistake for final copy. */
export function PolicyDocumentView({ document }: { document: PolicyDocument }) {
  return <main><section className="page-hero"><div className="container narrow"><span className="eyebrow">POLICY</span><h1>{document.title}</h1><p>시행일: {document.effectiveDate}</p></div></section><section className="section"><article className="container narrow policy-document">{document.status === "draft" && <p className="policy-draft" role="status">운영 검토용 초안입니다. 실제 보유기간·위탁사·예약금·취소 기준 승인 후 시행됩니다.</p>}{document.sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</article></section></main>;
}
