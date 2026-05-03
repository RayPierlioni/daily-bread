import type { Metadata } from "next";
import { MarketingFeaturePage } from "@/components/marketing-feature-page";

export const metadata: Metadata = {
  title: "Private Christian Prayer Journal",
  description:
    "A free private prayer journal for writing prayers, searching past prayers, adding notes, and marking answered prayers.",
  alternates: {
    canonical: "/prayer-journal"
  }
};

export default function PrayerJournalMarketingPage() {
  return (
    <MarketingFeaturePage
      eyebrow="Prayer Journal"
      title="A private place to write prayers and remember God's faithfulness."
      description="Daily Bread Hub gives you a private prayer journal for honest prayers, follow-up notes, answered prayer tracking, and searchable reflection over time."
      highlights={[
        "Private by default, so your prayers are not placed in a public feed.",
        "Search by title, prayer text, transcript, tags, status, or follow-up notes.",
        "Mark prayers as answered and keep a record of what God has carried you through."
      ]}
      sections={[
        {
          title: "Write freely",
          body: "Type prayers, add tags, record your mood, and keep follow-up notes without needing polished words."
        },
        {
          title: "Track answers",
          body: "Move prayers from ongoing or waiting to answered, and keep a timeline of praise reports."
        },
        {
          title: "Share intentionally",
          body: "Prayer requests stay private unless you choose to share them with a group."
        }
      ]}
    />
  );
}
