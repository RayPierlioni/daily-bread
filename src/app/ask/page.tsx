import { redirect } from "next/navigation";
import { AskFaithDisclaimer } from "@/components/ask-faith-disclaimer";
import { FaithQuestionChat } from "@/components/faith-question-chat";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export default async function AskPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const user = await requireUser();
  if (!user.onboardingCompleted) redirect("/onboarding");
  const params = await searchParams;

  const previous = await prisma.faithQuestion.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 8
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Ask in Faith</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">A safe place for difficult questions.</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#68706e]">
          Answers should be Scripture-centered, historically careful, honest about uncertainty, and gentle toward doubt.
        </p>
      </div>
      <Card className="border-[#d9cfbd] bg-[#fffdf8] p-4 text-sm leading-6 text-[#52605d]">
        Faith questions are private by default. If something you write suggests self-harm, abuse, or immediate danger, Next Faithful Step will encourage urgent real-world support.
      </Card>
      <AskFaithDisclaimer />
      <FaithQuestionChat
        initialQuestion={params.q ?? ""}
        previous={previous.map((item) => ({
          question: item.question,
          answer: item.aiAnswer,
          sources: Array.isArray(item.sources) ? item.sources.map(String) : []
        }))}
      />
    </div>
  );
}
