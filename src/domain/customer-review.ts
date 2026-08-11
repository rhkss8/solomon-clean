import type { ServiceSlug } from "./site.ts";

export type CustomerReview = {
  id: string;
  serviceSlug: ServiceSlug;
  serviceLabel: string;
  title: string;
  body: string;
  rating: 1 | 2 | 3 | 4 | 5;
  region: string;
  displayName: string;
  publishedAt: string;
  source: "placeholder" | "api";
};

export type CustomerReviewQuery = {
  serviceSlug?: ServiceSlug;
  limit?: number;
};

export type CustomerReviewResult = {
  reviews: CustomerReview[];
  total: number;
  source: "placeholder" | "api";
};
