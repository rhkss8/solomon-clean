import { getDatabaseClient } from "@/db";
import { normalizeEstimatePhotoKeys } from "@/src/domain/admin-estimate";

export const estimateStatuses = ["received", "reviewing", "contacted", "quoted", "scheduled", "completed", "cancelled"] as const;
export type EstimateStatus = typeof estimateStatuses[number];
export const estimateStatusLabels: Record<EstimateStatus, string> = { received: "신규", reviewing: "확인 중", contacted: "상담 중", quoted: "견적 안내", scheduled: "예약", completed: "완료", cancelled: "취소" };

export type AdminEstimate = {
  id: string; reference: string; service: string; customer_name: string; phone: string; area: string; description: string;
  preferred_date: string | null; photo_keys: string[]; status: EstimateStatus; admin_notes: string; created_at: string; updated_at: string;
};

export function isEstimateStatus(value: string): value is EstimateStatus { return estimateStatuses.includes(value as EstimateStatus); }

export async function listAdminEstimates(status?: string, query?: string) {
  const client = getDatabaseClient();
  const conditions: string[] = [];
  const values: string[] = [];
  if (status && isEstimateStatus(status)) { values.push(status); conditions.push(`status = $${values.length}`); }
  if (query?.trim()) { values.push(`%${query.trim()}%`); conditions.push(`(reference ILIKE $${values.length} OR customer_name ILIKE $${values.length} OR phone ILIKE $${values.length} OR area ILIKE $${values.length})`); }
  const rows = await client.unsafe(`SELECT id, reference, service, customer_name, phone, area, status, created_at, updated_at FROM estimates ${conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""} ORDER BY created_at DESC LIMIT 200`, values);
  return rows as unknown as Pick<AdminEstimate, "id" | "reference" | "service" | "customer_name" | "phone" | "area" | "status" | "created_at" | "updated_at">[];
}

export async function getAdminEstimate(id: string) {
  const rows = await getDatabaseClient().unsafe("SELECT * FROM estimates WHERE id = $1 LIMIT 1", [id]);
  const estimate=(rows[0] as unknown as AdminEstimate | undefined)??null;
  return estimate?{...estimate,photo_keys:normalizeEstimatePhotoKeys(estimate.photo_keys)}:null;
}

export async function updateAdminEstimate(id: string, status: EstimateStatus, notes: string) {
  await getDatabaseClient().unsafe("UPDATE estimates SET status = $2, admin_notes = $3, updated_at = NOW() WHERE id = $1", [id, status, notes.slice(0, 5000)]);
}
