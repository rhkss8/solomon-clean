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
  evidence: [
    { label: "사업자등록정보", status: "pending" },
    { label: "폐기물 관련 허가·신고", status: "pending" },
    { label: "배상책임보험", status: "pending" },
    { label: "정량 실적", status: "pending" },
  ] satisfies readonly BusinessEvidence[],
} as const;

/** Returns only evidence that is safe to publish as verified. */
export function getVerifiedBusinessEvidence(evidence: readonly BusinessEvidence[]) {
  return evidence.filter((item) => item.status === "verified" && item.value);
}
