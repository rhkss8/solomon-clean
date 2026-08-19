import { getServiceBySlug } from "./site.ts";
import { isValidKoreanPhoneNumber, normalizeKoreanPhoneDigits } from "./phone.ts";

export type EstimateDraft = { service: string; name: string; phone: string; area: string; description: string; preferredDate: string; privacy: boolean };
export type EstimateField = keyof EstimateDraft;
export type EstimateValidationResult = { success: true; data: EstimateDraft } | { success: false; fieldErrors: Partial<Record<EstimateField, string>> };
function readText(value: unknown): string { return typeof value === "string" ? value.trim() : ""; }

/** Validates and normalizes untrusted estimate input at the server boundary. */
export function validateEstimateDraft(input: Record<string, unknown>, today = new Date().toISOString().slice(0, 10)): EstimateValidationResult {
  const draft: EstimateDraft = { service: readText(input.service), name: readText(input.name), phone: normalizeKoreanPhoneDigits(readText(input.phone)), area: readText(input.area), description: readText(input.description), preferredDate: readText(input.preferredDate), privacy: input.privacy === true };
  const fieldErrors: Partial<Record<EstimateField, string>> = {};
  if (!getServiceBySlug(draft.service)) fieldErrors.service = "필요한 서비스를 선택해주세요.";
  if (draft.name.length < 2 || draft.name.length > 40) fieldErrors.name = "성함은 2자 이상 40자 이하로 입력해주세요.";
  if (!isValidKoreanPhoneNumber(draft.phone)) fieldErrors.phone = "연락 가능한 휴대전화 또는 일반전화 번호를 입력해주세요.";
  if (draft.area.length < 2 || draft.area.length > 100) fieldErrors.area = "서비스 지역을 2자 이상 입력해주세요.";
  if (draft.description.length < 10 || draft.description.length > 2000) fieldErrors.description = "현장 설명은 10자 이상 2,000자 이하로 입력해주세요.";
  if (draft.preferredDate && (!/^\d{4}-\d{2}-\d{2}$/.test(draft.preferredDate) || draft.preferredDate < today)) fieldErrors.preferredDate = "오늘 이후의 희망일을 선택해주세요.";
  if (!draft.privacy) fieldErrors.privacy = "개인정보 수집과 상담 연락에 동의해주세요.";
  return Object.keys(fieldErrors).length ? { success: false, fieldErrors } : { success: true, data: draft };
}
