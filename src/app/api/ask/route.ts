import { NextResponse } from "next/server";
import { answerFaithQuestion } from "@/lib/ai";
import { requireUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { faithQuestionSchema } from "@/lib/validations";
import { containsSafetyConcern, safetyMessage } from "@/lib/utils";

export async function POST(request: Request) {
  const user = await requireUser();
  const body = await request.json();
  const parsed = faithQuestionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid question." }, { status: 400 });
  }

  const ai = await answerFaithQuestion(parsed.data.question);
  const answer = containsSafetyConcern(parsed.data.question) ? `${safetyMessage}\n\n${ai.answer}` : ai.answer;

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

  return NextResponse.json({
    id: saved.id,
    answer,
    sources: ai.sources,
    tags: ai.tags
  });
}
