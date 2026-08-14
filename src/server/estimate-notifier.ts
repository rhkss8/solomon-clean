import type { EstimateDraft } from "@/src/domain/estimate";
import type { StoredEstimate } from "@/src/server/estimate-storage";

export type EstimateNotification = { estimate: StoredEstimate; draft: EstimateDraft; photoCount: number };
export type NotificationResult = { delivered: boolean; providerId?: string; reason?: string };
export interface EstimateNotifier { notify(input: EstimateNotification): Promise<NotificationResult>; }
export type EmailTransport = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
export type ResendNotifierConfig = { apiKey: string; from: string; to: string };

function createNotificationText({ estimate, draft, photoCount }: EstimateNotification): string {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://solomonclean.com").replace(/\/$/, "");
  return [`새 견적 요청이 접수되었습니다.`, `접수번호: ${estimate.reference}`, `서비스: ${draft.service}`, `고객명: ${draft.name}`, `연락처: ${draft.phone}`, `지역: ${draft.area}`, `희망일: ${draft.preferredDate || "미정"}`, `사진: ${photoCount}장`, `현장 설명:`, draft.description, ``, `관리자에서 확인: ${siteUrl}/admin/estimates/${estimate.id}`].join("\n");
}

/** Sends a plain-text transactional notification through Resend's HTTPS API. */
export class ResendEstimateNotifier implements EstimateNotifier {
  private readonly config: ResendNotifierConfig; private readonly transport: EmailTransport;
  constructor(config: ResendNotifierConfig, transport: EmailTransport = fetch) { this.config = config; this.transport = transport; }
  async notify(input: EstimateNotification): Promise<NotificationResult> {
    const response = await this.transport("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${this.config.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": input.estimate.reference, "User-Agent": "solomon-clean/1.0" }, body: JSON.stringify({ from: this.config.from, to: [this.config.to], subject: `[솔로몬 견적] ${input.estimate.reference} · ${input.draft.area}`, text: createNotificationText(input) }) });
    if (!response.ok) return { delivered: false, reason: `email_provider_${response.status}` };
    const result = await response.json() as { id?: string }; return { delivered: true, providerId: result.id };
  }
}

export class DisabledEstimateNotifier implements EstimateNotifier { async notify(_input: EstimateNotification): Promise<NotificationResult> { return { delivered: false, reason: "not_configured" }; } }
