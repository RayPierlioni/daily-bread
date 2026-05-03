import type { Metadata } from "next";
import { MarketingFeaturePage } from "@/components/marketing-feature-page";

export const metadata: Metadata = {
  title: "Christian Prayer Groups and Faith Community",
  description:
    "Create or join Christian prayer groups for encouragement, shared devotionals, prayer requests, praise reports, testimonies, and thoughtful community.",
  alternates: {
    canonical: "/christian-prayer-groups"
  }
};

export default function ChristianPrayerGroupsMarketingPage() {
  return (
    <MarketingFeaturePage
      eyebrow="Prayer Groups"
      title="Prayer-centered community without the noise."
      description="Daily Bread Hub includes Christian prayer groups for people who want encouragement, shared devotionals, praise reports, testimonies, and intentional community."
      primaryAction="Explore groups"
      highlights={[
        "Groups are centered on prayer, Scripture, encouragement, and reflection.",
        "Users can create groups, join groups, and share prayer requests intentionally.",
        "The experience is designed to feel calmer than a noisy social feed."
      ]}
      sections={[
        {
          title: "Pray together",
          body: "Share requests with a group when you choose, and invite others to pray with care."
        },
        {
          title: "Grow together",
          body: "Use groups for devotional discussion, praise reports, testimonies, reflections, and encouragement."
        },
        {
          title: "Stay intentional",
          body: "Daily Bread Hub is designed around spiritual care, not endless scrolling."
        }
      ]}
    />
  );
}
