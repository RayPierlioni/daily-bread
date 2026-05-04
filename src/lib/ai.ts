import { containsSafetyConcern, safetyMessage } from "@/lib/utils";
import { findCuratedFaithAnswer } from "@/lib/faith-answer-whitelist";

const labels = [
  "Scripture",
  "Theology",
  "Church History",
  "Archaeology",
  "Apologetics",
  "Pastoral Encouragement"
];

export function buildFaithPrompt(question: string) {
  return `Answer this faith question for Next Faithful Step: ${question}

Rules:
- Start with: "You are not wrong for asking this."
- Be Bible-centered, grace-filled, non-judgmental, historically aware, and careful.
- Distinguish Scripture, theology, history, archaeology, interpretation, and pastoral encouragement.
- Do not shame doubt or overstate evidence.
- Include these labeled sections: Scripture, Theology, Church History, Archaeology, Apologetics, Pastoral Encouragement.
- Follow this structure: simple answer, what Scripture says, context, common Christian perspectives, life application, short prayer, next steps.`;
}

export function mockFaithAnswer(question: string) {
  if (containsSafetyConcern(question)) {
    return `${safetyMessage}

You are not wrong for asking this.

Pastoral Encouragement
This sounds heavy, and you should not have to carry it by yourself. Please seek immediate human support now.`;
  }

  return `You are not wrong for asking this.

Simple answer
Christians believe God welcomes honest questions because faith is relational trust, not pretending every hard thing is simple. A careful answer should hold together Scripture, reason, history, humility, and pastoral care.

Scripture
The Bible includes faithful people asking difficult questions. Psalm 13 asks, "How long, O LORD?" Mark 9:24 gives us the prayer, "I believe; help my unbelief!" James 1:5 says God gives wisdom generously without reproach.

Theology
Christian theology usually distinguishes between what God has clearly revealed, what believers infer from Scripture, and what remains mysterious. That distinction matters because humility is part of truthfulness.

Church History
Christians across centuries have wrestled with doubt, suffering, evidence, and interpretation. The historic creeds focus on central claims about God, Jesus, the Spirit, salvation, and resurrection while leaving room for discussion on many secondary matters.

Archaeology
Archaeology can illuminate the world of the Bible, including places, inscriptions, customs, and historical settings. It cannot prove every theological claim, and responsible Christians should avoid overstating what material evidence can do.

Apologetics
For the question "${question}", a thoughtful apologetic approach would ask what kind of evidence is relevant, where Christians agree, where scholars debate, and what conclusions are reasonable rather than exaggerated.

Pastoral Encouragement
Your question does not make you a bad Christian or a hopeless seeker. Bring it into prayer, Scripture, wise community, and careful study. God is not threatened by honest seeking.

Short prayer
Lord Jesus, meet me with truth and gentleness. Give me courage to ask honestly, humility to learn patiently, and peace as I take the next faithful step. Amen.

Suggested next steps
1. Write the question in one clear sentence.
2. Read one relevant Scripture passage slowly.
3. Ask a trusted pastor, mentor, or mature believer for perspective.
4. Save this answer and revisit it after prayer and study.`;
}

export async function answerFaithQuestion(question: string) {
  const curated = findCuratedFaithAnswer(question);
  if (curated) {
    return {
      answer: curated.answer,
      sources: curated.sources,
      tags: curated.tags
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      answer: mockFaithAnswer(question),
      sources: ["Mock pastoral answer", "Psalm 13", "Mark 9:24", "James 1:5"],
      tags: labels
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        input: buildFaithPrompt(question)
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed with ${response.status}`);
    }

    const data = (await response.json()) as {
      output_text?: string;
      output?: Array<{ content?: Array<{ text?: string }> }>;
    };

    const outputText =
      data.output_text ??
      data.output?.flatMap((item) => item.content ?? []).map((content) => content.text).filter(Boolean).join("\n") ??
      mockFaithAnswer(question);

    return {
      answer: outputText,
      sources: ["OpenAI Responses API", "Next Faithful Step safety prompt"],
      tags: labels
    };
  } catch {
    return {
      answer: mockFaithAnswer(question),
      sources: ["Mock fallback after OpenAI error"],
      tags: labels
    };
  }
}
