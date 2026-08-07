import Link from "next/link";
import { BlogPostGrid } from "@/src/components/BlogPostGrid";
import { siteConfig } from "@/src/domain/site";
import { createPageMetadata } from "@/src/lib/metadata";
import { getBlogPosts } from "@/src/server/blog-feed";

export const metadata = createPageMetadata({
  title: "청소 작업사례",
  description: "솔로몬종합청소의 입주·상업공간·폐기물 작업 기록을 확인하세요.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const { posts, source } = await getBlogPosts();

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">PORTFOLIO</span>
          <h1>현장의 변화는<br />사진으로 증명합니다.</h1>
          <p>솔로몬종합청소 블로그에 기록된 실제 작업 현장입니다.</p>
          {source === "fallback" && <p className="feed-notice">현재 최신 글을 불러오지 못해 확인된 대표 작업을 표시합니다.</p>}
        </div>
      </section>
      <section className="section">
        <div className="container"><BlogPostGrid headingLevel={2} posts={posts} /></div>
        <div className="container centered-action button-row button-row--center"><Link className="button button--primary" href="/estimate">비슷한 현장 견적받기</Link><a className="button button--secondary" href={siteConfig.blogUrl} rel="noreferrer" target="_blank">네이버 블로그 전체보기</a></div>
      </section>
    </main>
  );
}
