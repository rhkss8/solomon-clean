import type { BlogPost } from "@/src/domain/blog";

/** Renders the shared external-link card treatment for Naver work records. */
export function BlogPostGrid({ posts, headingLevel = 3 }: { posts: BlogPost[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <a className="post-card" href={post.href} key={post.href} rel="noreferrer" target="_blank">
          <div className="post-card__placeholder"><span>{post.category}</span></div>
          <div>
            <small>{post.displayDate}</small>
            <Heading>{post.title}</Heading>
            <span className="text-link">네이버 블로그에서 보기 →</span>
          </div>
        </a>
      ))}
    </div>
  );
}
