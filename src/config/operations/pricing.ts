export type PricePublicationStatus = "consultation-only" | "published";
export type VatPolicyStatus = "confirmation-required" | "included" | "excluded";

export type PricePolicy = {
  publicationStatus: PricePublicationStatus;
  vatStatus: VatPolicyStatus;
  quoteFactors: readonly string[];
  serviceRates: Readonly<Record<string, { amount: number | null; unit: string; note: string }>>;
};

/**
 * Owns the public pricing contract independently from price-page presentation.
 * Change this object only after Solomon confirms its operating price sheet.
 */
export const pricePolicy: PricePolicy = {
  publicationStatus: "consultation-only",
  vatStatus: "confirmation-required",
  quoteFactors: ["작업 범위", "공간 규모", "오염도", "작업 동선", "추가 작업"],
  // TODO: 실제 단가가 확정되면 amount와 unit을 채우고 publicationStatus를 published로 변경하세요.
  serviceRates: {
    "move-in-cleaning": { amount: null, unit: "평", note: "입주·이사청소 기준 단가" },
    "residential-cleaning": { amount: null, unit: "평", note: "거주·대청소 기준 단가" },
    "commercial-cleaning": { amount: null, unit: "평", note: "상가·사무실 기준 단가" },
    "floor-care": { amount: null, unit: "평", note: "바닥청소·왁스 기준 단가" },
    "waste-disposal": { amount: null, unit: "차량", note: "폐기물 종류와 물량별 단가" },
    "hoarding-cleanup": { amount: null, unit: "현장", note: "쓰레기집청소 기준 금액" },
    "deep-cleaning": { amount: null, unit: "현장", note: "특수청소 기준 금액" },
    "estate-clearing": { amount: null, unit: "현장", note: "유품정리 기준 금액" },
    "home-organizing": { amount: null, unit: "시간", note: "정리수납 기준 단가" },
  },
};

/** Returns customer-facing copy for the configured VAT policy. */
export function getVatPolicyLabel(status: VatPolicyStatus) {
  if (status === "included") return "안내 금액은 부가세 포함 기준입니다.";
  if (status === "excluded") return "안내 금액은 부가세 별도 기준입니다.";
  return "부가세 포함 여부는 상담 후 발행되는 견적서에 명확히 표시합니다.";
}
