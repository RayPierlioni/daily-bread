import type { Metadata } from "next";
import { ResourceArticlePage } from "@/components/resource-article-page";

export const metadata: Metadata = {
  title: "Christian App for Faith Questions",
  description:
    "A safe Christian space to ask honest questions about God, Jesus, the Bible, doubt, theology, history, and archaeology.",
  alternates: {
    canonical: "/learn/christian-app-for-faith-questions"
  }
};

export default function ChristianAppForFaithQuestionsPage() {
  return (
    <ResourceArticlePage
      eyebrow="Faith Questions"
      title="A Christian app for honest faith questions"
      description="People should be able to ask difficult questions about God, Jesus, Scripture, doubt, history, and suffering without being shamed for wondering."
      scriptureReference="Mark 9:24"
      scriptureText="I believe; help my unbelief!"
      sections={[
        {
          heading: "Doubt is not the enemy of seeking",
          body: [
            "Many people carry questions they are afraid to ask out loud. Next Faithful Step was built with the conviction that honest questions can become part of a faithful search.",
            "The goal is not to flatten mystery or pretend every issue is easy. The goal is to answer with Scripture, care, humility, and intellectual honesty."
          ]
        },
        {
          heading: "Faith questions need careful answers",
          body: [
            "Questions about the Bible, archaeology, church history, theology, and apologetics should not be answered with exaggerated claims. Christians can be confident without being careless.",
            "Next Faithful Step separates Scripture, theology, church history, archaeology, apologetics, and pastoral encouragement so users know what kind of answer they are reading."
          ]
        },
        {
          heading: "A calm place to return later",
          body: [
            "Some answers need time. The app lets users save helpful faith answers so they can return to them, pray through them, and keep learning.",
            "Faith grows through Scripture, prayer, community, and patience. A good tool should support that growth without replacing the church."
          ]
        }
      ]}
      nextSteps={[
        "Write the question honestly, without cleaning it up first.",
        "Notice whether the answer is giving Scripture, theology, history, archaeology, apologetics, or pastoral encouragement.",
        "Save answers you want to revisit.",
        "Bring serious questions to a trusted pastor, mentor, or mature believer."
      ]}
    />
  );
}
