import assert from "node:assert/strict";
import test from "node:test";
import { getVatPolicyLabel, pricePolicy } from "../src/config/operations/pricing.ts";

test("keeps unconfirmed operating rates out of the public pricing contract", () => {
  assert.equal(pricePolicy.publicationStatus, "consultation-only");
  assert.equal(pricePolicy.vatStatus, "confirmation-required");
  assert.match(getVatPolicyLabel(pricePolicy.vatStatus), /견적서/);
});

test("describes confirmed VAT policies explicitly", () => {
  assert.match(getVatPolicyLabel("included"), /포함/);
  assert.match(getVatPolicyLabel("excluded"), /별도/);
});
