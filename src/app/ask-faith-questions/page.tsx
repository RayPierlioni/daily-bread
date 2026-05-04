import type { Metadata } from "next";
import { MarketingFeaturePage } from "@/components/marketing-feature-page";

export const metadata: Metadata = {
  title: "Ask Honest Christian Faith Questions",
  description:
    "Ask difficult questions about God, Jesus, the Bible, doubt, theology, church history, archaeology, and apologetics in a non-judgmental Christian space.",
  alternates: {
    canonical: "/ask-faith-questions"
  }
};

export default function AskFaithQuestionsMarketingPage() {
  return (
    <MarketingFeaturePage
      eyebrow="Ask in Faith"
      title="A safe place to ask difficult faith questions."
      description="Next Faithful Step is built for people who love God, people who are spiritually curious, and people who have real questions. Doubt is handled gently, Scripture is treated seriously, and historical claims are presented with care."
      primaryAction="Ask a faith question"
      highlights={[
        "Answers are designed to be Bible-centered, grace-filled, and honest about uncertainty.",
        "Questions can cover faith, doubt, theology, church history, archaeology, suffering, and prayer.",
        "The app avoids shaming people for asking hard questions."
      ]}
      sections={[
        {
          title: "Honest questions",
          body: "Ask about God's existence, Jesus, suffering, prayer, biblical reliability, doubt, and the questions people are often afraid to say out loud."
        },
        {
          title: "Careful answers",
          body: "Responses distinguish Scripture, theology, history, archaeology, apologetics, and pastoral encouragement."
        },
        {
          title: "Saved for later",
          body: "Helpful answers can be saved so you can return to them when you are ready to keep reflecting."
        }
      ]}
    />
  );
}
