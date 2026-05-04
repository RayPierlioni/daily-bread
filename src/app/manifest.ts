import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Faithful Step",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7ef",
    theme_color: "#345d6f",
    icons: [
      {
        src: "/brand/next-faithful-step.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
