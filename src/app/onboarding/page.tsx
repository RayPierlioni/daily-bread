import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form-fields";
import { completeOnboarding } from "@/lib/actions";
import { requireUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { focusCategories } from "@/lib/validations";

export default async function OnboardingPage() {
  const user = await requireUser();
  const latestAssessment = await prisma.spiritualAssessment.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }
  });
  const answers = latestAssessment?.answers && typeof latestAssessment.answers === "object" && !Array.isArray(latestAssessment.answers) ? latestAssessment.answers : {};
  const growthAreas = Array.isArray(answers.growthAreas) ? answers.growthAreas.map(String) : [];
  const struggles = Array.isArray(answers.struggles) ? answers.struggles.map(String) : [];
  const isRetake = user.onboardingCompleted;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{isRetake ? "Retake your spiritual assessment" : "A gentle spiritual check-in"}</CardTitle>
          <p className="text-sm leading-6 text-[#68706e]">
            This is private. It connects your answers to the devotional course track you see, so Daily Bread Hub can meet your current faith season without judging where you are.
          </p>
          {isRetake ? (
            <p className="text-sm leading-6 text-[#68706e]">
              If your answers place you on a different track, your new course path will begin at step 1. If the track stays the same, your current progress is preserved.
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
