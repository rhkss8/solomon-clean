import { PolicyDocumentView } from "@/src/components/PolicyDocumentView";
import { legalDocuments } from "@/src/config/operations/policies";
import { createPageMetadata } from "@/src/lib/metadata";
export const metadata = createPageMetadata({ title: "예약·취소·환불 안내", description: "견적 접수와 예약 확정 이후의 취소·환불 기준입니다.", path: "/refund-policy" });
export default function RefundPage() { return <PolicyDocumentView document={legalDocuments.refund} />; }
