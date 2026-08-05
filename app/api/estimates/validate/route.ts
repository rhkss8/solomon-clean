import { validateEstimateDraft } from "@/src/domain/estimate";
const MAX_REQUEST_BYTES = 32_000;
/** Validates estimate JSON without persisting personal information. */
export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_REQUEST_BYTES) return Response.json({ message: "요청 내용이 너무 큽니다." }, { status: 413 });
  try { const payload: unknown = await request.json(); if (!payload || typeof payload !== "object" || Array.isArray(payload)) return Response.json({ message: "올바른 요청 형식이 아닙니다." }, { status: 400 }); const result = validateEstimateDraft(payload as Record<string, unknown>); return result.success ? Response.json(result) : Response.json(result, { status: 422 }); }
  catch { return Response.json({ message: "요청 내용을 확인할 수 없습니다." }, { status: 400 }); }
}
