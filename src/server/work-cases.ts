import { getDatabaseClient, isDatabaseConfigured } from "@/db";

export type WorkCase = { id: string; title: string; category: string; description: string; before_image_url: string; after_image_url: string; published: boolean; display_order: number; created_at: string; updated_at: string };

export async function listPublishedWorkCases(limit?: number) { if (!isDatabaseConfigured()) return [] as WorkCase[]; const rows = await getDatabaseClient().unsafe(`SELECT * FROM work_cases WHERE published = true ORDER BY display_order ASC, created_at DESC${limit ? " LIMIT $1" : ""}`, limit ? [limit] : []); return rows as unknown as WorkCase[]; }
export async function listAdminWorkCases() { const rows = await getDatabaseClient().unsafe("SELECT * FROM work_cases ORDER BY display_order ASC, created_at DESC", []); return rows as unknown as WorkCase[]; }
export async function getAdminWorkCase(id: string) { const rows = await getDatabaseClient().unsafe("SELECT * FROM work_cases WHERE id = $1 LIMIT 1", [id]); return (rows[0] as unknown as WorkCase | undefined) ?? null; }
