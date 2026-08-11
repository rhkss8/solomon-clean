import type { MetadataRoute } from "next";
import { services, siteConfig } from "@/src/domain/site";
import { serviceRegions } from "@/src/domain/regions";
import { wastePriceCategories } from "@/src/domain/waste-pricing";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/services", "/prices", "/prices-waste", "/prices-clean", "/prices-deep_clean", "/livingclean-price", "/reviews", "/portfolio", "/regions", "/estimate", "/company", "/privacy", "/terms", "/refund-policy"];
  const dynamicPaths = [...services.map((service) => `/services/${service.slug}`), ...serviceRegions.map((region) => `/regions/${region.slug}`), ...wastePriceCategories.map((category) => `/prices-waste/${category.slug}`)];
  return [...staticPaths, ...dynamicPaths].map(path=>({ url: new URL(path, siteConfig.url).toString(), lastModified: new Date(), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : 0.7 }));
}
