import type { Metadata } from "next";
import { MarketingFeaturePage } from "@/components/marketing-feature-page";

export const metadata: Metadata = {
  title: "Personalized Daily Devotional App",
  description:
    "Next Faithful Step is a free Christian devotional app built around a simple promise: God does not move on without you, and your devotional path should not either.",
  alternates: {
    canonical: "/daily-devotional"
  }
};

export default function DailyDevotionalMarketingPage() {
  return (
    <MarketingFeaturePage
      eyebrow="Daily Devotional"
      title="A daily devotional that does not move on without you."
      description="Next Faithful Step guides you through Scripture-centered devotionals at a pace that follows your real life. Work gets busy. Kids need you. Some weeks get heavy. When you return, grace is still there, so your next devotional waits for you."
      primaryAction="Begin today's devotional"
      highlights={[
        "A Scripture-centered path that keeps your place when life interrupts your rhythm.",
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
          body: "Your devotional path does not punish you for missing days. It echoes a simple truth: God does not move on without you."
        },
        {
          title: "Built for growth",
          body: "The app can recommend readings around faith, comfort, anxiety, prayer, Scripture, discipline, doubt, restoration, and belonging."
        }
      ]}
    />
  );
}
