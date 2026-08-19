const SEOUL_PREFIX = "02";
const FOUR_DIGIT_PREFIX = "050";
const MAX_KOREAN_PHONE_DIGITS = 12;

/** Keeps a phone number safe for dialing, validation, and canonical storage. */
export function normalizeKoreanPhoneDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, MAX_KOREAN_PHONE_DIGITS);
}

function formatWithPrefix(digits: string, prefixLength: number): string {
  const prefix = digits.slice(0, prefixLength);
  const subscriber = digits.slice(prefixLength);
  if (!subscriber) return prefix;
  if (subscriber.length <= 4) return `${prefix}-${subscriber}`;
  return `${prefix}-${subscriber.slice(0, -4)}-${subscriber.slice(-4)}`;
}

/** Formats Korean mobile, landline, internet, and representative numbers while typing. */
export function formatKoreanPhoneNumber(value: string): string {
  const digits = normalizeKoreanPhoneDigits(value);
  if (!digits) return "";
  if (digits.startsWith("1")) return formatWithPrefix(digits.slice(0, 8), 4);
  if (digits.startsWith(SEOUL_PREFIX)) return formatWithPrefix(digits.slice(0, 10), 2);
  if (digits.startsWith(FOUR_DIGIT_PREFIX)) return formatWithPrefix(digits, 4);
  return formatWithPrefix(digits.slice(0, 11), 3);
}

/** Accepts callable South Korean mobile, landline, internet, special, and representative numbers. */
export function isValidKoreanPhoneNumber(value: string): boolean {
  const digits = normalizeKoreanPhoneDigits(value);
  return [
    /^010\d{8}$/,
    /^01[16789]\d{7,8}$/,
    /^02\d{7,8}$/,
    /^0(?:3[1-3]|4[1-4]|5[1-5]|6[1-4])\d{7,8}$/,
    /^070\d{8}$/,
    /^0(?:60|80)\d{7}$/,
    /^050\d{8,9}$/,
    /^1\d{7}$/,
  ].some((pattern) => pattern.test(digits));
}
