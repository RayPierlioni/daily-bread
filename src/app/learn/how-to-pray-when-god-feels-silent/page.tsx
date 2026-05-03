import type { Metadata } from "next";
import { ResourceArticlePage } from "@/components/resource-article-page";

export const metadata: Metadata = {
  title: "How to Pray When God Feels Silent",
  description:
    "A gentle Christian guide for praying when God feels distant, including Scripture, honest encouragement, and simple next steps.",
  alternates: {
    canonical: "/learn/how-to-pray-when-god-feels-silent"
  }
};

export default function HowToPrayWhenGodFeelsSilentPage() {
  return (
    <ResourceArticlePage
      eyebrow="Prayer"
      title="How to pray when God feels silent"
      description="There are seasons when prayer feels dry, heavy, or unanswered. That does not mean you have failed, and it does not mean God has abandoned you."
      scriptureReference="Psalm 13:1-2"
      scriptureText="How long, O Lord? Will you forget me forever? How long will you hide your face from me?"
      sections={[
        {
          heading: "You are not wrong for feeling this",
          body: [
            "Many faithful people in Scripture prayed from confusion, grief, waiting, and silence. The Psalms give language to questions people often feel afraid to say out loud.",
            "Christian prayer is not pretending everything feels fine. Prayer is bringing your whole self before God, including your questions, weakness, and exhaustion."
          ]
        },
        {
          heading: "Begin with simple honesty",
          body: [
            "If you do not know what to say, start with one honest sentence: Lord, I am here. I do not feel close to You, but I want to be near You.",
            "Short prayers are still real prayers. Silence before God can also be prayer when words are hard to find."
          ]
        },
        {
          heading: "Hold silence together with Scripture",
          body: [
            "God's silence is not the same as God's absence. Christians may understand painful silence in different ways, but Scripture repeatedly invites people to wait, lament, seek, and keep returning to the Lord.",
            "A steady practice can be simple: read one short passage, write one sentence of prayer, and ask God for grace for the next step."
          ]
        }
      ]}
      nextSteps={[
        "Write a three-sentence prayer: what you feel, what you need, and what you hope God will do.",
        "Read Psalm 13, Psalm 42, or Romans 8:26-27 slowly.",
        "Tell a trusted pastor, friend, counselor, or mentor if the silence feels connected to deep despair or isolation.",
        "Use Daily Bread Hub to save the prayer and return to it later."
      ]}
    />
  );
}
