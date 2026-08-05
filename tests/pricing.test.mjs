import assert from "node:assert/strict";
import test from "node:test";
import { calculatePriceGuide } from "../src/domain/pricing.ts";

test("returns a basic consultation for a straightforward site", () => {
  const result = calculatePriceGuide({ serviceSlug: "move-in-cleaning", scale: "small", condition: "light", access: "easy", hasExtraWork: false });
  assert.equal(result.level, "basic");
});

test("escalates complex sites to an on-site review", () => {
  const result = calculatePriceGuide({ serviceSlug: "waste-disposal", scale: "large", condition: "heavy", access: "limited", hasExtraWork: true });
  assert.equal(result.level, "site-visit");
  assert.ok(result.reasons.length >= 4);
});

test("rejects unsupported service slugs", () => {
  assert.throws(() => calculatePriceGuide({ serviceSlug: "unknown", scale: "small", condition: "light", access: "easy", hasExtraWork: false }));
});
