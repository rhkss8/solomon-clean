import assert from "node:assert/strict";
import test from "node:test";
import { decodeXmlText, normalizeNaverImageUrl, parseNaverBlogRss } from "../src/domain/blog.ts";

const rssFixture = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><item>
  <category><![CDATA[사무실.상가청소]]></category>
  <title><![CDATA[중랑구 &amp; AI교실 준공청소]]></title>
  <link><![CDATA[https://blog.naver.com/solomon_clean/223265815477?fromRss=true]]></link>
  <guid>https://blog.naver.com/solomon_clean/223265815477</guid>
  <pubDate>Wed, 15 Nov 2023 20:25:20 +0900</pubDate>
  <description><![CDATA[작업 기록 <img src="http://blogthumb.pstatic.net/folder/cover.jpg?type=s3" />]]></description>
</item></channel></rss>`;

test("decodes CDATA and XML entities", () => {
  assert.equal(decodeXmlText("<![CDATA[솔로몬 &amp; 청소]]>"), "솔로몬 & 청소");
});

test("parses the supported Naver RSS fields", () => {
  assert.deepEqual(parseNaverBlogRss(rssFixture), [{
    title: "중랑구 & AI교실 준공청소",
    category: "사무실.상가청소",
    href: "https://blog.naver.com/solomon_clean/223265815477",
    publishedAt: "Wed, 15 Nov 2023 20:25:20 +0900",
    displayDate: "2023.11.15",
    imageUrl: "https://blogthumb.pstatic.net/folder/cover.jpg",
  }]);
});

test("normalizes only approved Naver image hosts", () => {
  assert.equal(
    normalizeNaverImageUrl("http://blogthumb.pstatic.net/folder/cover.jpg?type=s3#image"),
    "https://blogthumb.pstatic.net/folder/cover.jpg",
  );
  assert.equal(normalizeNaverImageUrl("https://example.com/cover.jpg"), null);
  assert.equal(normalizeNaverImageUrl("javascript:alert(1)"), null);
});

test("rejects links outside the configured Naver blog", () => {
  assert.deepEqual(parseNaverBlogRss(rssFixture.replaceAll("solomon_clean", "another_blog")), []);
});
