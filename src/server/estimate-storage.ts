import type { EstimateDraft } from "@/src/domain/estimate";
export type StoredEstimate = { id: string; reference: string; createdAt: string };
export interface EstimateStorage { save(draft: EstimateDraft, photoKeys: readonly string[], identity?: StoredEstimate): Promise<StoredEstimate>; }
export interface PostgresClient { unsafe(query: string, values: unknown[]): PromiseLike<unknown>; }
function createReference(now: Date): string { return `SC-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`; }
export function createEstimateIdentity(now = new Date()): StoredEstimate { return { id: crypto.randomUUID(), reference: createReference(now), createdAt: now.toISOString() }; }
/** Persists normalized estimates in the Vercel-connected Postgres database. */
export class PostgresEstimateStorage implements EstimateStorage { private readonly database: PostgresClient; constructor(database: PostgresClient) { this.database = database; } async save(draft: EstimateDraft, photoKeys: readonly string[], identity = createEstimateIdentity()): Promise<StoredEstimate> { await this.database.unsafe("INSERT INTO estimates (id, reference, service, customer_name, phone, area, description, preferred_date, photo_keys, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, 'received', $10::timestamptz)", [identity.id, identity.reference, draft.service, draft.name, draft.phone, draft.area, draft.description, draft.preferredDate || null, JSON.stringify(photoKeys), identity.createdAt]); return identity; } }
export class DisabledEstimateStorage implements EstimateStorage { async save(_draft: EstimateDraft, _photoKeys: readonly string[]): Promise<StoredEstimate> { throw new Error("견적 저장소가 아직 연결되지 않았습니다."); } }
