import assert from "node:assert/strict";
import test from "node:test";
import { getCustomerReviews } from "../src/server/customer-review-feed.ts";

test("serves clearly labeled placeholder reviews through the API-ready boundary", async () => {
  const result = await getCustomerReviews();

  assert.equal(result.source, "placeholder");
  assert.ok(result.total >= 6);
  assert.ok(result.reviews.every((review) => review.source === "placeholder"));
  assert.ok(result.reviews.every((review) => review.id && review.serviceSlug && review.publishedAt));
});

test("supports the same category and limit query contract needed by a future API", async () => {
  const filtered = await getCustomerReviews({ serviceSlug: "waste-disposal" });
  const limited = await getCustomerReviews({ limit: 3 });

  assert.ok(filtered.reviews.length > 0);
  assert.ok(filtered.reviews.every((review) => review.serviceSlug === "waste-disposal"));
  assert.equal(limited.reviews.length, 3);
  assert.ok(limited.total > limited.reviews.length);
});
