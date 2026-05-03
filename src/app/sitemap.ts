import type { MetadataRoute } from "next";
import { publicMarketingPages, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    ...publicMarketingPages.map((page) => ({
      url: `${siteConfig.url}${page.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
