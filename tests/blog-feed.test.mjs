import assert from "node:assert/strict";
import test from "node:test";
import { getBlogPosts } from "../src/server/blog-feed.ts";

const item = (id, title) => `<item><title>${title}</title><guid>https://blog.naver.com/solomon_clean/${id}</guid><pubDate>Wed, 15 Nov 2023 20:25:20 +0900</pubDate><category>작업후기</category><description><![CDATA[<img src="https://blogthumb.pstatic.net/${id}.jpg?type=s3" />]]></description></item>`;
const rss = `<rss><channel>${item("1", "첫 글")}${item("2", "둘째 글")}</channel></rss>`;

test("requests Naver RSS with an ASCII-only user agent and returns every item by default", async (context) => {
  const originalFetch = globalThis.fetch;
  context.after(() => { globalThis.fetch = originalFetch; });
  let requestInit;
  globalThis.fetch = async (_url, init) => { requestInit = init; return new Response(rss); };

  const result = await getBlogPosts();

  assert.equal(result.source, "rss");
  assert.equal(result.posts.length, 2);
  assert.ok(result.posts.every((post) => post.imageUrl));
  assert.ok(result.posts.every((post) => post.imageUrl.startsWith("/api/blog-image?url=")));
  assert.match(requestInit.headers["User-Agent"], /^[\x00-\x7F]+$/);
});

test("applies a limit only when the caller explicitly requests one", async (context) => {
  const originalFetch = globalThis.fetch;
  context.after(() => { globalThis.fetch = originalFetch; });
  globalThis.fetch = async () => new Response(rss);
  assert.equal((await getBlogPosts(1)).posts.length, 1);
});

test("uses a full image-backed snapshot when the live feed fails", async (context) => {
  const originalFetch = globalThis.fetch;
  const originalConsoleError = console.error;
  context.after(() => { globalThis.fetch = originalFetch; console.error = originalConsoleError; });
  globalThis.fetch = async () => { throw new Error("network unavailable"); };
  console.error = () => {};

  const result = await getBlogPosts();

  assert.equal(result.source, "fallback");
  assert.equal(result.posts.length, 26);
  assert.ok(result.posts.every((post) => post.imageUrl));
  assert.ok(result.posts.every((post) => post.imageUrl.startsWith("/blog-images/")));
});
