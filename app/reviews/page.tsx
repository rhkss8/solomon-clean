import { observedBlogPosts, siteConfig } from "@/src/domain/site";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata = createPageMetadata({ title: "솔로몬 블로그 작업후기", description: "솔로몬 종합청소업체의 실제 작업 기록을 네이버 블로그에서 확인하세요.", path: "/reviews" });

export default function ReviewsPage() {
  return <main><section className="page-hero"><div className="container"><span className="eyebrow">BLOG REVIEWS</span><h1>말보다 작업 기록으로<br />확인하세요.</h1><p>RSS 자동 연동 전 확인된 대표 게시물입니다. 완성 단계에서 최신 글이 자동으로 표시됩니다.</p></div></section><section className="section"><div className="container post-grid">{observedBlogPosts.map(post=><a className="post-card" href={post.href} key={post.href} rel="noreferrer" target="_blank"><div className="post-card__placeholder"><span>{post.category}</span></div><div><small>{post.date}</small><h2>{post.title}</h2><span className="text-link">네이버 블로그에서 보기 →</span></div></a>)}</div><div className="container centered-action"><a className="button button--secondary" href={siteConfig.blogUrl} rel="noreferrer" target="_blank">블로그 전체보기</a></div></section></main>;
}
