import { NextResponse } from "next/server";
import { answerFaithQuestion } from "@/lib/ai";
import { recordAnalyticsEvent } from "@/lib/analytics";
import { requireUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { faithQuestionSchema } from "@/lib/validations";
import { containsSafetyConcern, safetyMessage } from "@/lib/utils";

function lengthBucket(value: string) {
  const length = value.trim().length;
  if (length > 500) return "long";
  if (length > 120) return "medium";
  return "short";
}

function answerSource(sources: string[]) {
  const joined = sources.join(" ").toLowerCase();
  if (joined.includes("curated")) return "curated";
  if (joined.includes("openai")) return "openai";
  if (joined.includes("fallback")) return "mock_fallback";
  if (joined.includes("mock")) return "mock";
  return "unknown";
}

export async function POST(request: Request) {
  const user = await requireUser();
  const body = await request.json();
  const parsed = faithQuestionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid question." }, { status: 400 });
  }

  const safetyFlagged = containsSafetyConcern(parsed.data.question);
  await recordAnalyticsEvent({
    eventName: "faith_question_submitted",
    userId: user.id,
    route: "/ask",
    properties: {
      questionLengthBucket: lengthBucket(parsed.data.question),
      safetyFlagged
    }
  });

  const ai = await answerFaithQuestion(parsed.data.question);
  const answer = safetyFlagged ? `${safetyMessage}\n\n${ai.answer}` : ai.answer;

  const saved = await prisma.faithQuestion.create({
    data: {
      userId: user.id,
      question: parsed.data.question,
      aiAnswer: answer,
      sources: ai.sources,
      tags: ai.tags,
      saved: true
    }
  });

  await recordAnalyticsEvent({
    eventName: "faith_answer_served",
    userId: user.id,
    route: "/ask",
    properties: {
      answerSource: answerSource(ai.sources),
      tagCount: ai.tags.length,
      safetyFlagged
    }
  });

  return NextResponse.json({
    id: saved.id,
    answer,
    sources: ai.sources,
    tags: ai.tags
  });
}
