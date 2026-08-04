import { BlogPostGrid } from "@/src/components/BlogPostGrid";
import { siteConfig } from "@/src/domain/site";
import { createPageMetadata } from "@/src/lib/metadata";
import { getBlogPosts } from "@/src/server/blog-feed";

export const metadata = createPageMetadata({
  title: "솔로몬 블로그 작업후기",
  description: "솔로몬 종합청소업체의 실제 작업 기록을 네이버 블로그에서 확인하세요.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const { posts, source } = await getBlogPosts();

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">BLOG REVIEWS</span>
          <h1>말보다 작업 기록으로<br />확인하세요.</h1>
          <p>네이버 블로그에 기록된 솔로몬의 실제 청소 현장을 확인할 수 있습니다.</p>
          {source === "fallback" && <p className="feed-notice">현재 최신 글을 불러오지 못해 확인된 대표 작업을 표시합니다.</p>}
        </div>
      </section>
      <section className="section">
        <div className="container"><BlogPostGrid headingLevel={2} posts={posts} /></div>
        <div className="container centered-action">
          <a className="button button--secondary" href={siteConfig.blogUrl} rel="noreferrer" target="_blank">블로그 전체보기</a>
        </div>
      </section>
    </main>
  );
}
