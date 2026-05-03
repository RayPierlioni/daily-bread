import type { MetadataRoute } from "next";
import { publicPages, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    ...publicPages.map((page) => ({
      url: `${siteConfig.url}${page.path}`,
      lastModified: now,
      changeFrequency: page.path.startsWith("/learn") ? ("weekly" as const) : ("monthly" as const),
      priority: 0.8
    }))
  ];
}
