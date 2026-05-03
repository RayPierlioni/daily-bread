import type { MetadataRoute } from "next";
import { publicMarketingPages, siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", ...publicMarketingPages.map((page) => page.path)],
        disallow: [
          "/admin",
          "/api",
          "/ask",
          "/blog",
          "/community",
          "/dashboard",
          "/devotional",
          "/groups",
          "/onboarding",
          "/prayers",
          "/profile",
          "/search",
          "/settings",
          "/signin"
        ]
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url
  };
}
