export type BlogPost = {
  title: string;
  category: string;
  href: string;
  publishedAt: string;
  displayDate: string;
};

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

/** Converts Naver's RSS 2.0 payload into the public blog card model. */
export function parseNaverBlogRss(xml: string): BlogPost[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

  return items.flatMap((item) => {
    const title = readTag(item, "title");
    const href = readTag(item, "guid") || readTag(item, "link");
    const publishedAt = readTag(item, "pubDate");

    if (!title || !href.startsWith("https://blog.naver.com/solomon_clean/")) {
      return [];
    }

    return [{
      title,
      category: readTag(item, "category") || "작업후기",
      href,
      publishedAt,
      displayDate: formatPublishedDate(publishedAt),
    }];
  });
}
