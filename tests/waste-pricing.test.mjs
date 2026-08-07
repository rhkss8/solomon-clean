import assert from "node:assert/strict";
import test from "node:test";
import { wasteCategoryRates } from "../src/config/operations/pricing.ts";
import { getWastePriceCategory, wastePriceCategories } from "../src/domain/waste-pricing.ts";

test("폐기물 비용안내는 네 카테고리를 고유 경로로 제공한다", () => {
  assert.deepEqual(wastePriceCategories.map(({ slug }) => slug), ["industrial", "home", "living", "moving"]);
  assert.equal(new Set(wastePriceCategories.map(({ slug }) => slug)).size, wastePriceCategories.length);
  assert.equal(getWastePriceCategory("unknown"), undefined);
});

test("미확정 카테고리 단가는 공개 금액으로 표시되지 않는다", () => {
  for (const category of wastePriceCategories) {
    assert.equal(wasteCategoryRates[category.slug].amount, null);
    assert.ok(wasteCategoryRates[category.slug].note.length > 0);
  }
});

