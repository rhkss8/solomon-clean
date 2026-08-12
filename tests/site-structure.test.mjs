import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

test("keeps brand and contact settings centralized", async () => {
  const siteDomain = await readFile(projectFile("src/domain/site.ts"), "utf8");

  assert.match(siteDomain, /name:\s*"솔로몬종합청소"/);
  assert.match(siteDomain, /markSrc:\s*"\/brand\/solomon-mark\.png"/);
  assert.match(siteDomain, /serviceArea:\s*"전국"/);
  assert.match(siteDomain, /solomon_clean/);
  assert.match(siteDomain, /export const services/);
});

test("publishes essential company-site SEO endpoints", async () => {
  const [layout, homepage, sitemap, robots, structuredData] = await Promise.all([
    readFile(projectFile("app/layout.tsx"), "utf8"),
    readFile(projectFile("app/page.tsx"), "utf8"),
    readFile(projectFile("app/sitemap.ts"), "utf8"),
    readFile(projectFile("app/robots.ts"), "utf8"),
    readFile(projectFile("src/components/StructuredData.tsx"), "utf8"),
  ]);

  assert.match(layout, /metadata/);
  assert.match(sitemap, /services/);
  assert.match(robots, /sitemap/);
  assert.match(homepage, /LocalBusiness/);
  assert.match(structuredData, /application\/ld\+json/);
});

test("includes responsive navigation and estimate routes", async () => {
  const [styles, estimatePage, header] = await Promise.all([
    readFile(projectFile("app/globals.css"), "utf8"),
    readFile(projectFile("app/estimate/page.tsx"), "utf8"),
    readFile(projectFile("src/components/SiteHeader.tsx"), "utf8"),
  ]);

  assert.match(styles, /@media\s*\(max-width:/);
  assert.match(estimatePage, /견적/);
  assert.match(header, /navigation/);
});

test("publishes detailed waste and general-cleaning price routes", async () => {
  const [catalog, wastePage, estimateForm, livingPage, livingCalculator, sitemap] = await Promise.all([
    readFile(projectFile("src/config/content/prices-page.ts"), "utf8"),
    readFile(projectFile("app/prices-waste/page.tsx"), "utf8"),
    readFile(projectFile("src/components/EstimateForm.tsx"), "utf8"),
    readFile(projectFile("app/livingclean-price/page.tsx"), "utf8"),
    readFile(projectFile("src/components/LivingPriceCalculator.tsx"), "utf8"),
    readFile(projectFile("app/sitemap.ts"), "utf8"),
  ]);

  assert.match(catalog, /primaryServiceCategories/);
  assert.match(wastePage, /1톤 차량/);
  assert.match(wastePage, /category=\$\{category\.slug\}/);
  assert.match(estimateForm, /wasteCategoryAnswers/);
  assert.match(livingPage, /평당 30,000~70,000원/);
  assert.match(livingPage, /예상 평균 비용/);
  assert.match(livingPage, /거주·일반청소/);
  assert.match(livingPage, /LivingPriceCalculator/);
  assert.match(livingCalculator, /aria-live="polite"/);
  assert.match(livingCalculator, /difficulty/);
  assert.match(estimateForm, /presetResidentialSize/);
  assert.match(estimateForm, /findNextUnansweredStep/);
  assert.doesNotMatch(livingCalculator, /<fieldset>/);
  assert.match(sitemap, /livingclean-price/);
});

test("publishes an interactive hoarding-cleanup price route", async () => {
  const [page, calculator, categories, estimateForm, sitemap] = await Promise.all([
    readFile(projectFile("app/prices-clean/page.tsx"), "utf8"),
    readFile(projectFile("src/components/HoardingPriceCalculator.tsx"), "utf8"),
    readFile(projectFile("src/config/primary-service-categories.ts"), "utf8"),
    readFile(projectFile("src/components/EstimateForm.tsx"), "utf8"),
    readFile(projectFile("app/sitemap.ts"), "utf8"),
  ]);

  assert.match(page, /83만원/);
  assert.match(page, /HoardingPriceCalculator/);
  assert.match(page, /hoarding-cleanup-hero-v1\.png/);
  assert.match(page, /hoarding-price-hero__scene/);
  assert.match(calculator, /방 하나 가득/);
  assert.match(calculator, /volume\.tons \* 500_000/);
  assert.doesNotMatch(calculator, /type="range"/);
  assert.match(calculator, /최종 비용 1\.5배/);
  assert.match(categories, /priceHref: "\/prices-clean"/);
  assert.match(estimateForm, /presetHoardingLevel/);
  assert.match(sitemap, /prices-clean/);
});

test("publishes an interactive special-cleaning price route", async () => {
  const [page, calculator, categories, estimateForm, sitemap] = await Promise.all([
    readFile(projectFile("app/prices-deep_clean/page.tsx"), "utf8"),
    readFile(projectFile("src/components/DeepCleaningPriceCalculator.tsx"), "utf8"),
    readFile(projectFile("src/config/primary-service-categories.ts"), "utf8"),
    readFile(projectFile("src/components/EstimateForm.tsx"), "utf8"),
    readFile(projectFile("app/sitemap.ts"), "utf8"),
  ]);

  assert.match(page, /special-cleaning-hero-v1\.png/);
  assert.match(page, /DeepCleaningPriceCalculator/);
  assert.match(calculator, /service: "deep-cleaning"/);
  assert.match(categories, /priceHref: "\/prices-deep_clean"/);
  assert.match(estimateForm, /presetDeepContamination/);
  assert.match(sitemap, /prices-deep_clean/);
});

test("publishes an interactive estate-clearing price route", async () => {
  const [page, calculator, categories, estimateForm, sitemap] = await Promise.all([
    readFile(projectFile("app/prices-left/page.tsx"), "utf8"),
    readFile(projectFile("src/components/EstateClearingPriceCalculator.tsx"), "utf8"),
    readFile(projectFile("src/config/primary-service-categories.ts"), "utf8"),
    readFile(projectFile("src/components/EstimateForm.tsx"), "utf8"),
    readFile(projectFile("app/sitemap.ts"), "utf8"),
  ]);
  assert.match(page, /estate-clearing-hero-v1\.png/);
  assert.match(page, /EstateClearingPriceCalculator/);
  assert.match(calculator, /service: "estate-clearing"/);
  assert.match(categories, /priceHref: "\/prices-left"/);
  assert.match(estimateForm, /presetEstateWork/);
  assert.match(sitemap, /prices-left/);
});

test("publishes an interactive home-organizing price route", async () => {
  const [page, calculator, categories, estimateForm, sitemap] = await Promise.all([
    readFile(projectFile("app/prices-tidyup/page.tsx"), "utf8"),
    readFile(projectFile("src/components/HomeOrganizingPriceCalculator.tsx"), "utf8"),
    readFile(projectFile("src/config/primary-service-categories.ts"), "utf8"),
    readFile(projectFile("src/components/EstimateForm.tsx"), "utf8"),
    readFile(projectFile("app/sitemap.ts"), "utf8"),
  ]);
  assert.match(page, /home-organizing-hero-v1\.png/);
  assert.match(page, /HomeOrganizingPriceCalculator/);
  assert.match(calculator, /service:"home-organizing"/);
  assert.match(categories, /priceHref: "\/prices-tidyup"/);
  assert.match(estimateForm, /presetOrganizingZones/);
  assert.match(sitemap, /prices-tidyup/);
});

test("keeps the price directory aligned with the homepage quick menu", async () => {
  const { primaryServiceCategories } = await import("../src/config/primary-service-categories.ts");

  assert.deepEqual(
    primaryServiceCategories.map(({ label }) => label),
    ["입주·이사·준공청소", "폐기물처리", "쓰레기집청소", "특수청소", "유품정리", "정리수납"],
  );
  assert.equal(new Set(primaryServiceCategories.map(({ image }) => image)).size, 6);
  assert.ok(primaryServiceCategories.every(({ image }) => image.startsWith("/services/quick-menu-v4/")));
});

test("loads Naver work stories through a cached server boundary", async () => {
  const [feed, portfolioPage] = await Promise.all([
    readFile(projectFile("src/server/blog-feed.ts"), "utf8"),
    readFile(projectFile("app/portfolio/page.tsx"), "utf8"),
  ]);

  assert.match(feed, /next:\s*\{\s*revalidate:/);
  assert.match(feed, /source:\s*"fallback"/);
  assert.match(portfolioPage, /getBlogPosts/);
});

test("shares the customer review feed between the homepage and review directory", async () => {
  const [homepage, reviewsPage, sitemap] = await Promise.all([
    readFile(projectFile("app/page.tsx"), "utf8"),
    readFile(projectFile("app/reviews/page.tsx"), "utf8"),
    readFile(projectFile("app/sitemap.ts"), "utf8"),
  ]);

  assert.match(homepage, /getCustomerReviews\(\{ limit: 3 \}\)/);
  assert.match(homepage, /CustomerReviewGrid/);
  assert.match(reviewsPage, /getCustomerReviews/);
  assert.match(reviewsPage, /예시 데이터/);
  assert.match(sitemap, /"\/reviews"/);
});
