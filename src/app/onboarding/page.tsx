import Link from "next/link";
import { BookOpen, Lock, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, LinkButton } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form-fields";
import { completeOnboarding, startFoundationsPath } from "@/lib/actions";
import { requireUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { focusCategories } from "@/lib/validations";

export default async function OnboardingPage({
  searchParams
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const latestAssessment = await prisma.spiritualAssessment.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }
  });
  const answers = latestAssessment?.answers && typeof latestAssessment.answers === "object" && !Array.isArray(latestAssessment.answers) ? latestAssessment.answers : {};
  const growthAreas = Array.isArray(answers.growthAreas) ? answers.growthAreas.map(String) : [];
  const struggles = Array.isArray(answers.struggles) ? answers.struggles.map(String) : [];
  const isRetake = user.onboardingCompleted;
  const showAssessment = isRetake || params.mode === "assessment";

  if (!showAssessment) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6">
          <p className="text-sm font-medium text-[#345d6f]">Welcome to Next Faithful Step</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Choose how you want to begin.</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#68706e]">
            You can start without answering personal questions. Faithful Foundations is available to everyone, and the private assessment is only here if you want a more personalized path.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="border-[#d9cfbd] bg-white/88">
            <CardHeader>
              <span className="mb-3 inline-flex w-fit rounded-full bg-[#f2eadb] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#9b773f]">Recommended for most people</span>
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-[#dfe9dd] text-[#345d6f]">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <CardTitle className="text-2xl">Start with Foundations</CardTitle>
              <p className="text-sm leading-6 text-[#68706e]">
                Begin with a gentle Scripture-centered path for building a steady rhythm with God. No assessment is needed, and you can personalize later if you choose.
              </p>
            </CardHeader>
            <CardContent>
              <form action={startFoundationsPath}>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Start the Foundations path
                </Button>
              </form>
              <p className="mt-4 text-xs leading-5 text-[#68706e]">
                No assessment required. Best for anyone who wants to get into the app first and build trust before sharing more.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#fffdf8]">
            <CardHeader>
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fbf0d8] text-[#9b773f]">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <CardTitle className="text-2xl">Personalize my path</CardTitle>
              <p className="text-sm leading-6 text-[#68706e]">
                Take a short, gentle check-in to help match your devotional path to your current spiritual season.
              </p>
            </CardHeader>
            <CardContent>
              <LinkButton href="/onboarding?mode=assessment" size="lg" variant="secondary" className="w-full sm:w-auto">
                Take the optional assessment
              </LinkButton>
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#f7fbf8] p-3 text-xs leading-5 text-[#52605d]">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#345d6f]" aria-hidden="true" />
                <span>Your answers are private. They are used only to guide your devotional path, not shown publicly.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{isRetake ? "Retake your spiritual assessment" : "A gentle spiritual check-in"}</CardTitle>
          <p className="text-sm leading-6 text-[#68706e]">
            This is private. It connects your answers to the devotional course track you see, so Next Faithful Step can meet your current faith season without judging where you are.
          </p>
          {isRetake ? (
            <p className="text-sm leading-6 text-[#68706e]">
              Updating your path starts the selected devotional track at step 1, so your new path is clear and never begins halfway through.
            </p>
          ) : null}
        </CardHeader>
        <CardContent>
          <form action={completeOnboarding} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="faithStage">Where are you in your faith journey?</Label>
                <Select id="faithStage" name="faithStage" defaultValue={String(answers.faithStage ?? "spiritually curious")} required>
                  <option>spiritually curious</option>
                  <option>new believer</option>
                  <option>returning to faith</option>
                  <option>growing but inconsistent</option>
                  <option>steady and wanting depth</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="biblicalKnowledge">Biblical knowledge</Label>
                <Select id="biblicalKnowledge" name="biblicalKnowledge" defaultValue={String(answers.biblicalKnowledge ?? "new to the Bible")} required>
                  <option>new to the Bible</option>
                  <option>know a few stories and verses</option>
                  <option>comfortable reading Scripture</option>
                  <option>ready for deeper theology and context</option>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="season">Current spiritual season</Label>
                <Select id="season" name="season" defaultValue={String(answers.season ?? "steady and grateful")} required>
                  <option>steady and grateful</option>
                  <option>weary and needing comfort</option>
                  <option>curious and exploring</option>
                  <option>wrestling with doubt</option>
                  <option>rebuilding habits</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emotionalState">Emotional state</Label>
                <Input id="emotionalState" name="emotionalState" placeholder="hopeful, anxious, numb, grateful..." defaultValue={String(answers.emotionalState ?? "")} required />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="prayerLife">Prayer life</Label>
                <Select id="prayerLife" name="prayerLife" defaultValue={String(answers.prayerLife ?? "new and uncertain")} required>
                  <option>new and uncertain</option>
                  <option>occasional but meaningful</option>
                  <option>consistent and growing</option>
                  <option>dry or difficult lately</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bibleReading">Bible reading habits</Label>
                <Select id="bibleReading" name="bibleReading" defaultValue={String(answers.bibleReading ?? "starting fresh")} required>
                  <option>starting fresh</option>
                  <option>a few times a month</option>
                  <option>a few times a week</option>
                  <option>daily or near daily</option>
                </Select>
              </div>
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-[#31413f]">Areas where you want growth</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {focusCategories.map((category) => (
                  <label key={category} className="flex items-center gap-2 rounded-lg border border-[#e4dccd] bg-white/70 p-3 text-sm">
                    <input type="checkbox" name="growthAreas" value={category} defaultChecked={growthAreas.includes(category)} className="h-4 w-4 accent-[#345d6f]" />
                    {category}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-[#31413f]">Current struggles, if any</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {["anxiety", "loneliness", "discipline", "forgiveness", "grief", "doubt"].map((item) => (
                  <label key={item} className="flex items-center gap-2 rounded-lg border border-[#e4dccd] bg-white/70 p-3 text-sm">
                    <input type="checkbox" name="struggles" value={item} defaultChecked={struggles.includes(item)} className="h-4 w-4 accent-[#345d6f]" />
                    {item}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-2">
              <Label htmlFor="doubts">Doubts or questions you want space to explore</Label>
              <Textarea id="doubts" name="doubts" placeholder="Optional. You can be honest here." defaultValue={String(answers.doubts ?? "")} />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex items-center gap-3 rounded-lg border border-[#e4dccd] bg-[#fbf7ef] p-4 text-sm">
                <input type="checkbox" name="wantsPersonalization" defaultChecked={answers.wantsPersonalization !== false} className="h-4 w-4 accent-[#345d6f]" />
                I want personalized devotionals.
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-[#e4dccd] bg-[#fbf7ef] p-4 text-sm">
                <input type="checkbox" name="wantsCommunity" defaultChecked={answers.wantsCommunity !== false} className="h-4 w-4 accent-[#345d6f]" />
                I want community features.
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg">
                {isRetake ? "Update my path" : "Save and continue"}
              </Button>
              {isRetake ? (
                <Link href="/dashboard" className="text-sm font-medium text-[#345d6f] hover:underline">
                  Keep current path
                </Link>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
