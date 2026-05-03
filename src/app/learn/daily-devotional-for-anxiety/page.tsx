import type { Metadata } from "next";
import { ResourceArticlePage } from "@/components/resource-article-page";

export const metadata: Metadata = {
  title: "Daily Devotional for Anxiety",
  description:
    "A Scripture-centered devotional guide for anxiety, fear, and overwhelm with gentle prayer prompts and biblical encouragement.",
  alternates: {
    canonical: "/learn/daily-devotional-for-anxiety"
  }
};

export default function DailyDevotionalForAnxietyPage() {
  return (
    <ResourceArticlePage
      eyebrow="Devotional"
      title="A daily devotional rhythm for anxiety"
      description="Anxiety can make faith feel fragile. A daily devotional rhythm can help you return to Scripture, prayer, and God's presence without pretending fear is simple."
      scriptureReference="1 Peter 5:7"
      scriptureText="Casting all your anxieties on him, because he cares for you."
      sections={[
        {
          heading: "Scripture does not shame anxious people",
          body: [
            "The Bible invites anxious people to bring their cares to God. That invitation is not a command to hide fear or act spiritually impressive.",
            "A Christian devotional for anxiety should be gentle, honest, and rooted in the care of God, not in guilt."
          ]
        },
        {
          heading: "Use a small daily rhythm",
          body: [
            "When anxiety is high, long routines can feel impossible. Start smaller: read one verse, breathe slowly, write one honest prayer, and take one faithful next step.",
            "Daily Bread Hub can help you keep that rhythm with Scripture, reflection, prayer prompts, and private notes."
          ]
        },
        {
          heading: "Faith and help can belong together",
          body: [
            "Prayer is not a replacement for wise support. Many Christians benefit from pastors, trusted friends, counselors, doctors, and practical care while they also pray.",
            "If anxiety becomes overwhelming or connected to immediate danger, reach out to emergency services, a crisis line, or a trusted person right away."
          ]
        }
      ]}
      nextSteps={[
        "Read one short passage before checking your phone.",
        "Write one sentence that names what you are carrying.",
        "Pray: Lord, help me receive Your care today.",
        "Talk with a trusted person if anxiety feels too heavy to carry alone."
      ]}
    />
  );
}
