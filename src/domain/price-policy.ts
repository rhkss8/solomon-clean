export type PricePublicationStatus = "consultation-only" | "published";
export type VatPolicyStatus = "confirmation-required" | "included" | "excluded";

export type PricePolicy = {
  publicationStatus: PricePublicationStatus;
  vatStatus: VatPolicyStatus;
  quoteFactors: readonly string[];
};

/**
 * Owns the public pricing contract independently from price-page presentation.
 * Change this object only after Solomon confirms its operating price sheet.
 */
export const pricePolicy: PricePolicy = {
  publicationStatus: "consultation-only",
  vatStatus: "confirmation-required",
  quoteFactors: ["작업 범위", "공간 규모", "오염도", "작업 동선", "추가 작업"],
};

/** Returns customer-facing copy for the configured VAT policy. */
export function getVatPolicyLabel(status: VatPolicyStatus) {
  if (status === "included") return "안내 금액은 부가세 포함 기준입니다.";
  if (status === "excluded") return "안내 금액은 부가세 별도 기준입니다.";
  return "부가세 포함 여부는 상담 후 발행되는 견적서에 명확히 표시합니다.";
}
