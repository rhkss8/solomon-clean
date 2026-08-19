import Link from "next/link";
import { BlogPostGrid } from "@/src/components/BlogPostGrid";
import { WorkCaseGrid } from "@/src/components/WorkCaseGrid";
import { siteConfig } from "@/src/domain/site";
import { createPageMetadata } from "@/src/lib/metadata";
import { getBlogPosts } from "@/src/server/blog-feed";
import { listPublishedWorkCases } from "@/src/server/work-cases";

export const metadata = createPageMetadata({
  title: "청소 작업사례",
  description: "솔로몬종합청소의 입주·상업공간·폐기물 작업 기록을 확인하세요.",
  path: "/portfolio",
});
export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const [{ posts, source }, workCases] = await Promise.all([getBlogPosts(), listPublishedWorkCases()]);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">PORTFOLIO</span>
          <h1>현장의 변화는<br />사진으로 증명합니다.</h1>
          <p>관리자가 확인해 공개한 작업 전·후 기록과 네이버 블로그 현장 기록입니다.</p>
          {source === "fallback" && <p className="feed-notice">현재 최신 글을 불러오지 못해 확인된 대표 작업을 표시합니다.</p>}
        </div>
      </section>
      <section className="section portfolio-cases"><div className="container"><div className="section-heading"><div><h2>작업 전·후 비교</h2><p>같은 현장의 변화를 나란히 확인하세요.</p></div></div><WorkCaseGrid cases={workCases} /></div></section>
      <section className="section">
        <div className="container"><div className="section-heading"><div><h2>네이버 블로그 작업 기록</h2></div></div><BlogPostGrid headingLevel={2} posts={posts} /></div>
        <div className="container centered-action button-row button-row--center"><Link className="button button--primary" href="/estimate">비슷한 현장 견적받기</Link><a className="button button--secondary" href={siteConfig.blogUrl} rel="noreferrer" target="_blank">네이버 블로그 전체보기</a></div>
      </section>
    </main>
  );
}
