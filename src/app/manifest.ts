import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: siteConfig.name,
    short_name: "Faithful Step",
    description: siteConfig.description,
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    background_color: "#fbf7ef",
    theme_color: "#345d6f",
    categories: ["lifestyle", "books", "education"],
    icons: [
      {
        src: "/brand/next-faithful-step.svg",
        sizes: "any",
        type: "image/svg+xml"
      },
      {
        src: "/brand/nfs-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/brand/nfs-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
