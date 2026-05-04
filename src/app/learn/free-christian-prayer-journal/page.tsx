import type { Metadata } from "next";
import { ResourceArticlePage } from "@/components/resource-article-page";

export const metadata: Metadata = {
  title: "Free Christian Prayer Journal",
  description:
    "How a private Christian prayer journal can help you write prayers, remember God's faithfulness, and track answered prayers.",
  alternates: {
    canonical: "/learn/free-christian-prayer-journal"
  }
};

export default function FreeChristianPrayerJournalPage() {
  return (
    <ResourceArticlePage
      eyebrow="Prayer Journal"
      title="A free Christian prayer journal for honest prayers"
      description="A prayer journal is not about writing perfect words. It is a way to slow down, tell the truth before God, and remember His faithfulness over time."
      scriptureReference="Philippians 4:6-7"
      scriptureText="Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God."
      sections={[
        {
          heading: "Why keep a prayer journal?",
          body: [
            "Prayer can feel scattered when life is full. Writing prayers helps you notice what you are carrying, what you keep returning to, and where you need God's help.",
            "A journal also creates a record. Over time, you can look back and see prayers that changed, prayers that were answered, and places where God sustained you while you were waiting."
          ]
        },
        {
          heading: "Private by default matters",
          body: [
            "Some prayers are meant to be shared with trusted people. Many are not. A healthy prayer journal should make privacy the default and sharing an intentional choice.",
            "Next Faithful Step was built this way: your prayer entries are private unless you choose to share a prayer request with a group."
          ]
        },
        {
          heading: "A simple prayer journal rhythm",
          body: [
            "You can write a title, a short prayer, a related verse, a few tags, and a follow-up note. When a prayer is answered, mark it and record what happened.",
            "The goal is not pressure. The goal is attention: learning to notice God in the ordinary story of your life."
          ]
        }
      ]}
      nextSteps={[
        "Write one prayer today using plain language.",
        "Add one tag, such as family, anxiety, work, healing, forgiveness, or purpose.",
        "Return in a week and add a follow-up note.",
        "Mark answered prayers so you can remember and give thanks."
      ]}
    />
  );
}
