import { PolicyDocumentView } from "@/src/components/PolicyDocumentView";
import { legalDocuments } from "@/src/config/operations/policies";
import { createPageMetadata } from "@/src/lib/metadata";
export const metadata = createPageMetadata({ title: "개인정보처리방침", description: "솔로몬 종합청소업체의 개인정보 처리 기준입니다.", path: "/privacy" });
export default function PrivacyPage() { return <PolicyDocumentView document={legalDocuments.privacy} />; }
