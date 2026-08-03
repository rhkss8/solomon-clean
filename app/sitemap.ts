import type { MetadataRoute } from "next";
import { services, siteConfig } from "@/src/domain/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/services", "/prices", "/portfolio", "/reviews", "/estimate", "/company", "/privacy", "/terms", "/refund-policy"];
  return [...staticPaths, ...services.map(service=>`/services/${service.slug}`)].map(path=>({ url: new URL(path, siteConfig.url).toString(), lastModified: new Date(), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : 0.7 }));
}
