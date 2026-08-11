import { customerReviewFallback } from "../content/customer-review-fallback.ts";
import type { CustomerReviewQuery, CustomerReviewResult } from "../domain/customer-review.ts";

/**
 * Public review read boundary.
 * Replace only this implementation with the future API client; page and cards consume the stable result contract.
 */
export async function getCustomerReviews(query: CustomerReviewQuery = {}): Promise<CustomerReviewResult> {
  const filtered = query.serviceSlug
    ? customerReviewFallback.filter((review) => review.serviceSlug === query.serviceSlug)
    : [...customerReviewFallback];
  const reviews = typeof query.limit === "number" ? filtered.slice(0, query.limit) : filtered;

  return { reviews, total: filtered.length, source: "placeholder" };
}
