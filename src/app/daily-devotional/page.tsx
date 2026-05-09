import type { Metadata } from "next";
import { MarketingFeaturePage } from "@/components/marketing-feature-page";

export const metadata: Metadata = {
  title: "Devotional App That Picks Up Where You Left Off",
  description:
    "A free Christian devotional app that picks up where you left off, so missed days do not skip you ahead or make you feel behind.",
  alternates: {
    canonical: "/daily-devotional"
  }
};

export default function DailyDevotionalMarketingPage() {
  return (
    <MarketingFeaturePage
      eyebrow="Daily Devotional"
      title="A devotional app that picks up where you left off."
      description="Next Faithful Step guides you through Scripture-centered devotionals at a pace that follows your real life. Work gets busy. Kids need you. Some weeks get heavy. God does not move on without you, and your devotional path should not either."
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
          body: "This is a devotional app that picks up where you left off. Missed days do not erase your place, skip you ahead, or turn a spiritual rhythm into a guilt list."
        },
        {
          title: "A gentle way back",
          body: "When you return, grace is still there. The next reading remains ready so you can continue with Scripture, prayer, and one faithful step."
        }
      ]}
    />
  );
}
