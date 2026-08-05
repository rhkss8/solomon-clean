export type BlogPost = {
  title: string;
  category: string;
  href: string;
  publishedAt: string;
  displayDate: string;
  imageUrl: string | null;
};

const NAVER_IMAGE_HOSTS = new Set([
  "blogthumb.pstatic.net",
  "blogpfthumb.phinf.naver.net",
]);

/** Decodes the XML entities used by Naver RSS text fields. */
export function decodeXmlText(value: string): string {
  return value
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function readTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeXmlText(match[1]) : "";
}

function formatPublishedDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/\. /g, ".")
    .replace(/\.$/, "");
}

/** Allows only Naver-hosted blog images and resolves them to an HTTPS original URL. */
export function normalizeNaverImageUrl(value: string): string | null {
  try {
    const url = new URL(decodeXmlText(value));
    if (!NAVER_IMAGE_HOSTS.has(url.hostname)) return null;
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;

    url.protocol = "https:";
    url.port = "";
    const thumbnailType = url.searchParams.get("type");
    url.search = "";
    if (url.hostname === "blogthumb.pstatic.net") {
      url.searchParams.set("type", thumbnailType?.match(/^s\d$/) ? thumbnailType : "s3");
    }
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

/** Converts an approved Naver image into a same-origin proxy path for browser safety. */
export function createBlogImageProxyPath(value: string): string | null {
  const normalizedUrl = normalizeNaverImageUrl(value);
  return normalizedUrl ? `/api/blog-image?url=${encodeURIComponent(normalizedUrl)}` : null;
}

function readRepresentativeImage(description: string): string | null {
  const imageSource = description.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  return imageSource ? normalizeNaverImageUrl(imageSource) : null;
}

/** Converts Naver's RSS 2.0 payload into the public blog card model. */
export function parseNaverBlogRss(xml: string): BlogPost[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

  return items.flatMap((item) => {
    const title = readTag(item, "title");
    const href = readTag(item, "guid") || readTag(item, "link");
    const publishedAt = readTag(item, "pubDate");
    const description = readTag(item, "description");

    if (!title || !href.startsWith("https://blog.naver.com/solomon_clean/")) {
      return [];
    }

    return [{
      title,
      category: readTag(item, "category") || "작업후기",
      href,
      publishedAt,
      displayDate: formatPublishedDate(publishedAt),
      imageUrl: readRepresentativeImage(description),
    }];
  });
}
