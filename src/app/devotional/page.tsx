import { redirect } from "next/navigation";
import { BookOpenCheck, CheckCircle2, PenLine } from "lucide-react";
import { DevotionalCard } from "@/components/devotional-card";
import { EmptyState } from "@/components/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireUser } from "@/lib/current-user";
import { formatTrackStepTitle, getCurrentDevotionalForUser, getRecommendedDevotionals, getUpcomingDevotionalsFromProgress, jsonArray } from "@/lib/devotionals";
import { recordAnalyticsEvent } from "@/lib/analytics";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function DevotionalPage() {
  const user = await requireUser();
  if (!user.onboardingCompleted) redirect("/onboarding");

  const current = await getCurrentDevotionalForUser(user);
  const devotional = current.devotional;

  if (!devotional) {
    return <EmptyState title="No devotional yet" description="Seed the database or create a devotional from the admin dashboard." />;
  }

  const trackRecommendations = getUpcomingDevotionalsFromProgress(current.progress, current.sequence, devotional.id);
  const [recommendations, feedback, completedCount] = await Promise.all([
    trackRecommendations.length ? Promise.resolve(trackRecommendations) : getRecommendedDevotionals(user.spiritualFocusProfile, devotional.id),
    prisma.devotionalFeedback.findUnique({
      where: { userId_devotionalId: { userId: user.id, devotionalId: devotional.id } }
    }),
    prisma.userDevotional.count({ where: { userId: user.id, completed: true } })
  ]);
  const todaysDate = formatDate(new Date());
  const currentStep = Math.min(current.sequence, Math.max(current.total, 1));
  const displayTitle = formatTrackStepTitle(devotional.title, currentStep);
  const recommendationStartStep = trackRecommendations.length ? currentStep + 1 : null;

  await recordAnalyticsEvent({
    eventName: "devotional_viewed",
    userId: user.id,
    route: "/devotional",
    properties: {
      devotionalId: devotional.id,
      trackSlug: current.track?.slug ?? "daily",
      sequence: current.sequence,
      total: current.total
    }
  });
  if (current.sequence === 1) {
    await recordAnalyticsEvent({
      eventName: "day_one_devotional_viewed",
      userId: user.id,
      route: "/devotional",
      properties: {
        devotionalId: devotional.id,
        trackSlug: current.track?.slug ?? "daily"
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#345d6f]">Your Next Devotional</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Continue your personal path without skipping ahead.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#68706e]">
            {current.track
              ? `${current.track.title}: step ${currentStep} of ${current.total}.`
              : "A fallback daily devotional is showing until a track is assigned."}
          </p>
        </div>
        <LinkButton href="/devotional/archive" variant="secondary">
          Browse archive
        </LinkButton>
      </div>

      {!current.state?.completed ? (
        <Card className="border-[#d9cfbd] bg-[#fffdf8] p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex gap-3">
              <BookOpenCheck className="mt-1 h-5 w-5 shrink-0 text-[#345d6f]" aria-hidden="true" />
              <div>
                <p className="font-semibold text-[#24302f]">Read slowly</p>
                <p className="mt-1 text-sm leading-6 text-[#68706e]">One sentence may be enough to carry with you today.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <PenLine className="mt-1 h-5 w-5 shrink-0 text-[#345d6f]" aria-hidden="true" />
              <div>
                <p className="font-semibold text-[#24302f]">Write a note or prayer</p>
                <p className="mt-1 text-sm leading-6 text-[#68706e]">Turn one thought into one honest response to God.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#345d6f]" aria-hidden="true" />
              <div>
                <p className="font-semibold text-[#24302f]">Mark complete when ready</p>
                <p className="mt-1 text-sm leading-6 text-[#68706e]">
                  {completedCount === 0 ? "This finishes your first step. No rush." : "This moves you to the next step in your path."}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      <DevotionalCard
        devotional={devotional}
        state={current.state}
        displayDate={todaysDate}
        displayTitle={displayTitle}
        feedback={feedback}
        personalizedNote={`This is step ${currentStep} in your ${current.track?.title ?? user.spiritualFocusProfile ?? "Strengthening Faith"} path. Retaking the assessment starts the assigned path at step 1. Missing days will not skip this sequence.`}
      />

      <Card>
        <CardHeader>
          <CardTitle>Coming next on your path</CardTitle>
          <p className="text-sm text-[#68706e]">These are upcoming readings in your ordered track, not a one-size-fits-all calendar feed.</p>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {recommendations.map((item, index) => (
            <div key={item.id} className="rounded-lg border border-[#eee5d8] bg-white/70 p-4">
              <p className="text-xs text-[#68706e]">Upcoming on your path</p>
              <h3 className="mt-2 font-semibold text-[#24302f]">{formatTrackStepTitle(item.title, recommendationStartStep ? recommendationStartStep + index : null)}</h3>
              <p className="mt-2 text-sm leading-6 text-[#52605d]">{item.reflectionQuestion}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {jsonArray(item.spiritualFocusCategories).slice(0, 2).map((category) => (
                  <Badge key={category}>{category}</Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
