import { EstimateForm } from "@/src/components/EstimateForm";
import { createPageMetadata } from "@/src/lib/metadata";
import { Suspense } from "react";

export const metadata = createPageMetadata({
  title: "청소·폐기물 무료견적 요청",
  description: "현장 정보와 사진을 보내 솔로몬 종합청소업체의 무료견적 상담을 요청하세요.",
  path: "/estimate",
});

export default function EstimatePage() {
  return <Suspense fallback={null}><EstimateForm /></Suspense>;
}
