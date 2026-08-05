import { PolicyDocumentView } from "@/src/components/PolicyDocumentView";
import { legalDocuments } from "@/src/domain/legal";
import { createPageMetadata } from "@/src/lib/metadata";
export const metadata = createPageMetadata({ title: "이용약관", description: "견적 상담과 서비스 이용 조건을 확인하세요.", path: "/terms" });
export default function TermsPage() { return <PolicyDocumentView document={legalDocuments.terms} />; }
