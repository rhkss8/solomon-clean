import type { Metadata } from "next";
import { siteConfig } from "@/src/domain/site";

/**
 * Produces consistent canonical and social metadata for every public template.
 */
export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [{ url: siteConfig.shareImage, width: 1200, height: 630, alt: `${siteConfig.name} 전문 청소팀` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.shareImage],
    },
  };
}
