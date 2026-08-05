import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

test("keeps brand and contact settings centralized", async () => {
  const siteDomain = await readFile(projectFile("src/domain/site.ts"), "utf8");

  assert.match(siteDomain, /name:\s*"솔로몬 종합청소업체"/);
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

test("loads Naver work stories through a cached server boundary", async () => {
  const [feed, portfolioPage] = await Promise.all([
    readFile(projectFile("src/server/blog-feed.ts"), "utf8"),
    readFile(projectFile("app/portfolio/page.tsx"), "utf8"),
  ]);

  assert.match(feed, /next:\s*\{\s*revalidate:/);
  assert.match(feed, /source:\s*"fallback"/);
  assert.match(portfolioPage, /getBlogPosts/);
});
