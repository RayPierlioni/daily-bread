import type { Metadata } from "next";
import { MarketingFeaturePage } from "@/components/marketing-feature-page";

export const metadata: Metadata = {
  title: "Personalized Daily Devotional App",
  description:
    "Next Faithful Step is a free Christian devotional app with Scripture-centered readings personalized to your spiritual season and paced by your reading journey.",
  alternates: {
    canonical: "/daily-devotional"
  }
};

export default function DailyDevotionalMarketingPage() {
  return (
    <MarketingFeaturePage
      eyebrow="Daily Devotional"
      title="A daily devotional that meets you where you are."
      description="Next Faithful Step begins with a gentle spiritual assessment, then guides you through Scripture-centered devotionals at a pace that follows your real life. If you miss a week, your next devotional waits for you."
      primaryAction="Begin today's devotional"
      highlights={[
        "Personalized by spiritual season instead of a one-size-fits-all reading.",
        "Designed to bridge gaps in biblical knowledge without shame or pressure.",
        "Includes Scripture, reflection, prayer, an action step, and saved notes."
      ]}
      sections={[
        {
          title: "Scripture first",
          body: "Each devotional centers on a Bible passage, a short reflection, and a practical invitation to respond in prayer."
        },
        {
          title: "Paced with grace",
          body: "Your devotional path does not punish you for missing days. The next reading remains ready when you return."
        },
        {
          title: "Built for growth",
          body: "The app can recommend readings around faith, comfort, anxiety, prayer, Scripture, discipline, doubt, restoration, and belonging."
        }
      ]}
    />
  );
}
