import type { Devotional, DevotionalFeedback, UserDevotional } from "@prisma/client";
import { MessageSquare, Share2 } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScriptureBlock } from "@/components/scripture-block";
import { DevotionalNoteForm } from "@/components/devotional-note-form";
import { DevotionalFeedbackPrompt } from "@/components/devotional-feedback-prompt";
import { DevotionalSubmitButton } from "@/components/devotional-action-form";
import { toggleDevotionalComplete, toggleDevotionalSaved } from "@/lib/actions";
import { getDevotionalImage } from "@/lib/devotional-media";
import { publicDevotionalTags } from "@/lib/devotionals";
import { formatDate } from "@/lib/utils";

export function DevotionalCard({
  devotional,
  state,
  personalizedNote,
  displayDate,
  displayTitle,
  feedback
}: {
  devotional: Devotional;
  state?: UserDevotional | null;
  personalizedNote?: string;
  displayDate?: string;
  displayTitle?: string;
  feedback?: DevotionalFeedback | null;
}) {
  const image = getDevotionalImage(devotional);
  const title = displayTitle ?? devotional.title;
  const tags = publicDevotionalTags(devotional.tags).slice(0, 3);

  return (
    <Card className="overflow-hidden">
      <div
        className="relative min-h-[18rem] overflow-hidden bg-[#24302f] sm:min-h-[23rem]"
        role="img"
        aria-label={image.alt}
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(24,35,33,0.72), rgba(24,35,33,0.24) 55%, rgba(24,35,33,0.08)), url('${image.src}')`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/72">{displayDate ?? formatDate(devotional.date)}</p>
          <h2 className="font-sanctuary mt-2 max-w-3xl text-4xl leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-3 text-sm font-medium text-white/82">{devotional.scriptureReference}</p>
        </div>
      </div>
      <CardHeader className="border-b border-[#eee5d8] bg-[#fffdf8]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-[#68706e]">Today&apos;s reading</p>
            <CardTitle className="mt-1 text-2xl">{devotional.scriptureReference}</CardTitle>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
        {personalizedNote ? <p className="rounded-lg bg-[#edf3ed] p-3 text-sm leading-6 text-[#52605d]">{personalizedNote}</p> : null}
      </CardHeader>
      <CardContent className="space-y-5 pt-5">
        <ScriptureBlock reference={devotional.scriptureReference} text={devotional.scriptureText} />
        <div className="prose-soft text-base leading-8 text-[#31413f]">
          {devotional.body.split("\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg bg-[#fbf7ef] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#b38b4d]">Reflect</p>
            <p className="mt-2 text-sm leading-6">{devotional.reflectionQuestion}</p>
          </div>
          <div className="rounded-lg bg-[#f7fbf8] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#345d6f]">Pray</p>
            <p className="mt-2 text-sm leading-6">{devotional.prayerPrompt}</p>
          </div>
          <div className="rounded-lg bg-white p-4 ring-1 ring-[#e4dccd]">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#52605d]">Practice</p>
            <p className="mt-2 text-sm leading-6">{devotional.actionStep}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <form action={toggleDevotionalComplete.bind(null, devotional.id)}>
            <DevotionalSubmitButton
              icon="check"
              label={state?.completed ? "Completed" : "Mark complete"}
              pendingLabel="Marking..."
              variant={state?.completed ? "gold" : "primary"}
              disabled={Boolean(state?.completed)}
            />
          </form>
          <form action={toggleDevotionalSaved.bind(null, devotional.id)}>
            <DevotionalSubmitButton
              icon="heart"
              label={state?.saved ? "Saved" : "Save"}
              pendingLabel="Saving..."
              variant="secondary"
              disabled={Boolean(state?.saved)}
            />
          </form>
          <LinkButton href="/groups" variant="ghost">
            <Share2 className="h-4 w-4" aria-hidden="true" />
            Prayer groups
          </LinkButton>
          <LinkButton href="/community?type=DEVOTIONAL_DISCUSSION" variant="ghost">
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Discuss in community
          </LinkButton>
        </div>

        {state?.completed ? <DevotionalFeedbackPrompt devotionalId={devotional.id} feedback={feedback} /> : null}

        <DevotionalNoteForm devotionalId={devotional.id} initialNotes={state?.notes ?? ""} />
      </CardContent>
    </Card>
  );
}
