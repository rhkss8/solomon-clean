import Image from "next/image";
import type { BlogPost } from "@/src/domain/blog";

function BlogPostCover({ post }: { post: BlogPost }) {
  return (
    <div className="post-card__media">
      {post.imageUrl && (
        <Image
          alt={`${post.title} 작업사진`}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={post.imageUrl}
          unoptimized
        />
      )}
      <span>{post.category}</span>
    </div>
  );
}

/** Renders the shared external-link card treatment for Naver work records. */
export function BlogPostGrid({ posts, headingLevel = 3 }: { posts: BlogPost[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <a className="post-card" href={post.href} key={post.href} rel="noreferrer" target="_blank">
          <BlogPostCover post={post} />
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
