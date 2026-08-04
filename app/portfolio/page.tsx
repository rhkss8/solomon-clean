import Link from "next/link";
import { createPageMetadata } from "@/src/lib/metadata";
import { getBlogPosts } from "@/src/server/blog-feed";

export const metadata = createPageMetadata({
  title: "청소 작업사례",
  description: "솔로몬의 입주·상업공간·폐기물 작업 기록을 확인하세요.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const { posts } = await getBlogPosts();

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">PORTFOLIO</span>
          <h1>현장의 변화는<br />사진으로 증명합니다.</h1>
          <p>솔로몬 블로그에 기록된 실제 작업 현장입니다.</p>
        </div>
      </section>
      <section className="section">
        <div className="container post-grid">
          {posts.map((post) => (
            <a className="post-card" href={post.href} key={post.href} rel="noreferrer" target="_blank">
              <div className="before-after"><span>BEFORE</span><span>AFTER</span></div>
              <div><small>{post.category} · {post.displayDate}</small><h2>{post.title}</h2><span className="text-link">작업 기록 보기 →</span></div>
            </a>
          ))}
        </div>
        <div className="container centered-action"><Link className="button button--primary" href="/estimate">비슷한 현장 견적받기</Link></div>
      </section>
    </main>
  );
}
