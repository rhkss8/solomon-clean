export type EvidenceStatus = "verified" | "pending";

export type BusinessEvidence = {
  label: string;
  status: EvidenceStatus;
  value?: string;
};

/**
 * Central source for public company facts and evidence status.
 * Pending evidence must not be converted into an advertising claim.
 */
export const businessProfile = {
  representative: "이명규",
  fax: "0504-477-1642",
  // TODO: 증빙 원본과 대조한 뒤 status를 verified로 바꾸고 value를 입력하세요.
  evidence: [
    { label: "사업자등록정보", status: "pending", value: "" },
    { label: "폐기물 관련 허가·신고", status: "pending", value: "" },
    { label: "배상책임보험", status: "pending", value: "" },
    { label: "정량 실적", status: "pending", value: "" },
  ] satisfies readonly BusinessEvidence[],
} as const;

/** Returns only evidence that is safe to publish as verified. */
export function getVerifiedBusinessEvidence(evidence: readonly BusinessEvidence[]) {
  return evidence.filter((item) => item.status === "verified" && item.value);
}
