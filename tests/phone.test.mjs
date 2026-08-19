import assert from "node:assert/strict";
import test from "node:test";
import { formatKoreanPhoneNumber, isValidKoreanPhoneNumber, normalizeKoreanPhoneDigits } from "../src/domain/phone.ts";

test("keeps only digits and caps Korean contact numbers at twelve digits", () => {
  assert.equal(normalizeKoreanPhoneDigits("010-abcd-1234-56789"), "010123456789");
});

test("formats mobile, Seoul, regional, representative, and 050 numbers", () => {
  assert.equal(formatKoreanPhoneNumber("01033503236"), "010-3350-3236");
  assert.equal(formatKoreanPhoneNumber("0212345678"), "02-1234-5678");
  assert.equal(formatKoreanPhoneNumber("0311234567"), "031-123-4567");
  assert.equal(formatKoreanPhoneNumber("03112345678"), "031-1234-5678");
  assert.equal(formatKoreanPhoneNumber("15881234"), "1588-1234");
  assert.equal(formatKoreanPhoneNumber("050712345678"), "0507-1234-5678");
});

test("validates supported Korean mobile and landline formats", () => {
  for (const phone of ["010-3350-3236", "02-123-4567", "02-1234-5678", "031-123-4567", "031-1234-5678", "070-1234-5678", "080-123-4567", "1588-1234", "0507-1234-5678"]) {
    assert.equal(isValidKoreanPhoneNumber(phone), true, phone);
  }
  for (const phone of ["010-123-4567", "099-1234-5678", "1588-123", "전화번호 없음"]) {
    assert.equal(isValidKoreanPhoneNumber(phone), false, phone);
  }
});
