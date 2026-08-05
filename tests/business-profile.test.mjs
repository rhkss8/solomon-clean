import assert from "node:assert/strict";
import test from "node:test";
import { businessProfile, getVerifiedBusinessEvidence } from "../src/config/operations/business.ts";

test("does not publish pending business evidence as a verified claim", () => {
  assert.deepEqual(getVerifiedBusinessEvidence(businessProfile.evidence), []);
});

test("publishes evidence only when it has both verification and a value", () => {
  const evidence = [
    { label: "보험", status: "verified", value: "가입 확인" },
    { label: "허가", status: "verified" },
  ];
  assert.deepEqual(getVerifiedBusinessEvidence(evidence), [evidence[0]]);
});
