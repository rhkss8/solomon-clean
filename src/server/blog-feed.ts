import { observedBlogPosts, siteConfig } from "@/src/domain/site";
import { parseNaverBlogRss, type BlogPost } from "@/src/domain/blog";

const BLOG_FEED_REVALIDATE_SECONDS = 60 * 60;

export type BlogFeedResult = {
  posts: BlogPost[];
  source: "rss" | "fallback";
};

/**
 * Reads the Naver RSS feed on the server and lets Next/vinext revalidate the
 * upstream response hourly. Known posts keep the site useful during an outage.
 */
export async function getBlogPosts(limit = 12): Promise<BlogFeedResult> {
  try {
    const response = await fetch(siteConfig.rssUrl, {
      headers: { "User-Agent": `${siteConfig.shortName} website RSS reader` },
      next: { revalidate: BLOG_FEED_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) {
      throw new Error(`Naver RSS responded with ${response.status}`);
    }

    const posts = parseNaverBlogRss(await response.text()).slice(0, limit);
    if (posts.length === 0) throw new Error("Naver RSS contained no valid posts");

    return { posts, source: "rss" };
  } catch {
    return { posts: observedBlogPosts.slice(0, limit), source: "fallback" };
  }
}
