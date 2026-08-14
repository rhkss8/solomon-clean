import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "solomon_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

type AdminSession = { email: string; expiresAt: number };

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function getSecret() { return process.env.ADMIN_SESSION_SECRET ?? ""; }

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && getSecret().length >= 32);
}

export function validateAdminCredentials(email: string, password: string) {
  if (!isAdminConfigured()) return false;
  return safeEqual(email.trim().toLowerCase(), process.env.ADMIN_EMAIL!.trim().toLowerCase()) && safeEqual(password, process.env.ADMIN_PASSWORD!);
}

export function createAdminSessionToken(email: string, now = Date.now()) {
  if (!isAdminConfigured()) throw new Error("관리자 로그인이 설정되지 않았습니다.");
  const payload = Buffer.from(JSON.stringify({ email: email.trim().toLowerCase(), expiresAt: now + ADMIN_SESSION_MAX_AGE * 1000 } satisfies AdminSession)).toString("base64url");
  const signature = createHmac("sha256", getSecret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined, now = Date.now()): AdminSession | null {
  if (!token || !isAdminConfigured()) return null;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;
  const expected = createHmac("sha256", getSecret()).update(payload).digest("base64url");
  if (!safeEqual(signature, expected)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Partial<AdminSession>;
    if (typeof session.email !== "string" || typeof session.expiresAt !== "number" || session.expiresAt <= now) return null;
    if (!safeEqual(session.email, process.env.ADMIN_EMAIL!.trim().toLowerCase())) return null;
    return { email: session.email, expiresAt: session.expiresAt };
  } catch { return null; }
}
