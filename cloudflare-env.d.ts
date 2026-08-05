declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    R2?: R2Bucket;
    RESEND_API_KEY?: string;
    ESTIMATE_FROM_EMAIL?: string;
    ESTIMATE_NOTIFICATION_EMAIL?: string;
  }
}
