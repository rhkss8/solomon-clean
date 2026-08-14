import { getDatabaseClient } from "@/db";
import { validateEstimateDraft } from "@/src/domain/estimate";
import { createEstimateIdentity, PostgresEstimateStorage } from "@/src/server/estimate-storage";
import { DisabledEstimateNotifier, ResendEstimateNotifier } from "@/src/server/estimate-notifier";
import { validateUploadedPhotos } from "@/src/server/photo-storage";

type EstimateRequest = Record<string, unknown> & { photos?: unknown };

/** Validates and persists a Vercel estimate submission after direct Blob uploads complete. */
export async function POST(request: Request) {
  try {
    const input = await request.json() as EstimateRequest;
    const validation = validateEstimateDraft(input);
    if (!validation.success) return Response.json(validation, { status: 422 });
    const photoValidation = validateUploadedPhotos(input.photos ?? []);
    if (!photoValidation.success) return Response.json({ message: photoValidation.message }, { status: 422 });

    const identity = createEstimateIdentity();
    const client = getDatabaseClient();
    const stored = await new PostgresEstimateStorage({ unsafe: (query, values) => client.unsafe(query, values as never[]) }).save(validation.data, photoValidation.photos.map((photo) => photo.pathname), identity);
    const notifier = process.env.RESEND_API_KEY && process.env.ESTIMATE_FROM_EMAIL && process.env.ESTIMATE_NOTIFICATION_EMAIL
      ? new ResendEstimateNotifier({ apiKey: process.env.RESEND_API_KEY, from: process.env.ESTIMATE_FROM_EMAIL, to: process.env.ESTIMATE_NOTIFICATION_EMAIL })
      : new DisabledEstimateNotifier();
    let notification: { delivered: boolean; reason?: string; providerId?: string } = { delivered: false, reason: "notification_failed" };
    try { notification = await notifier.notify({ estimate: stored, draft: validation.data, photoCount: photoValidation.photos.length }); }
    catch (error) { console.error("estimate notification failed", { reference: stored.reference, error }); }
    return Response.json({ success: true, reference: stored.reference, notification: notification.delivered ? "sent" : "pending" }, { status: 201 });
  } catch (error) {
    console.error("estimate submission failed", error);
    return Response.json({ message: "견적 요청을 저장하지 못했습니다." }, { status: 500 });
  }
}
