import assert from "node:assert/strict";
import test from "node:test";
import { businessProfile } from "../src/config/operations/business.ts";
import { contactConfig } from "../src/config/operations/contact.ts";
import { policyOperationsConfig } from "../src/config/operations/policies.ts";
import { pricePolicy } from "../src/config/operations/pricing.ts";

test("uses the confirmed Kakao consultation destination", () => {
  assert.equal(contactConfig.kakaoConsultationUrl, "https://open.kakao.com/o/gRiUs6Lf");
});

test("keeps unconfirmed operating values explicit and non-public", () => {
  assert.ok(Object.values(pricePolicy.serviceRates).every((rate) => rate.amount === null));
  assert.ok(businessProfile.evidence.every((evidence) => evidence.status === "pending" && !evidence.value));
  assert.equal(policyOperationsConfig.privacy.retentionPeriod, "");
  assert.equal(policyOperationsConfig.reservation.depositAmount, null);
});
