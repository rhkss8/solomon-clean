import assert from "node:assert/strict";
import test from "node:test";
import { validateEstimateDraft } from "../src/domain/estimate.ts";
const validDraft = { service: "move-in-cleaning", name: "홍길동", phone: "010-1234-5678", area: "서울 마포구", description: "32평 아파트 입주청소가 필요합니다.", preferredDate: "2026-08-20", privacy: true };
test("normalizes and accepts a valid estimate draft", () => { const result = validateEstimateDraft(validDraft, "2026-08-05"); assert.equal(result.success, true); if (result.success) assert.equal(result.data.phone, "01012345678"); });
test("returns field-level errors for untrusted input", () => { const result = validateEstimateDraft({ ...validDraft, service: "unknown", phone: "12", description: "짧음", privacy: false }, "2026-08-05"); assert.equal(result.success, false); if (!result.success) { assert.ok(result.fieldErrors.service); assert.ok(result.fieldErrors.phone); assert.ok(result.fieldErrors.description); assert.ok(result.fieldErrors.privacy); } });
test("rejects a preferred date in the past", () => { assert.equal(validateEstimateDraft({ ...validDraft, preferredDate: "2026-08-04" }, "2026-08-05").success, false); });
