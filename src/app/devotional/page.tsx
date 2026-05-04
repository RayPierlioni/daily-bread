import { redirect } from "next/navigation";
import { DevotionalCard } from "@/components/devotional-card";
import { EmptyState } from "@/components/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { requireUser } from "@/lib/current-user";
import { formatTrackStepTitle, getCurrentDevotionalForUser, getRecommendedDevotionals, getUpcomingDevotionalsFromProgress, jsonArray } from "@/lib/devotionals";
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
  const recommendations = trackRecommendations.length ? trackRecommendations : await getRecommendedDevotionals(user.spiritualFocusProfile, devotional.id);
  const todaysDate = formatDate(new Date());
  const currentStep = Math.min(current.sequence, Math.max(current.total, 1));
  const displayTitle = formatTrackStepTitle(devotional.title, currentStep);
  const recommendationStartStep = trackRecommendations.length ? currentStep + 1 : null;

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

      <DevotionalCard
        devotional={devotional}
        state={current.state}
        displayDate={todaysDate}
        displayTitle={displayTitle}
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
