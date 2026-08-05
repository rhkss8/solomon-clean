import { createBlogImageProxyPath, parseNaverBlogRss, type BlogPost } from "../domain/blog.ts";
import { blogPostFallback } from "../content/blog-post-fallback.ts";
import { siteConfig } from "../domain/site.ts";

const BLOG_FEED_REVALIDATE_SECONDS = 60 * 60;
const BLOG_FEED_USER_AGENT = "Solomon-Clean-Website-RSS-Reader/1.0";

export type BlogFeedResult = {
  posts: BlogPost[];
  source: "rss" | "fallback";
};

/**
 * Reads the Naver RSS feed on the server and lets Next.js revalidate the
 * upstream response hourly. Known posts keep the site useful during an outage.
 */
export async function getBlogPosts(limit?: number): Promise<BlogFeedResult> {
  try {
    const response = await fetch(siteConfig.rssUrl, {
      headers: { "User-Agent": BLOG_FEED_USER_AGENT },
      next: { revalidate: BLOG_FEED_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) {
      throw new Error(`Naver RSS responded with ${response.status}`);
    }

    const parsedPosts = parseNaverBlogRss(await response.text()).map((post) => ({
      ...post,
      imageUrl: post.imageUrl ? createBlogImageProxyPath(post.imageUrl) : null,
    }));
    const posts = typeof limit === "number" ? parsedPosts.slice(0, limit) : parsedPosts;
    if (posts.length === 0) throw new Error("Naver RSS contained no valid posts");

    return { posts, source: "rss" };
  } catch (error) {
    console.error("Failed to load Naver blog RSS", error);
    const fallbackPosts = typeof limit === "number" ? blogPostFallback.slice(0, limit) : blogPostFallback;
    return { posts: [...fallbackPosts], source: "fallback" };
  }
}
