import type { Devotional, UserDevotional } from "@prisma/client";
import { CheckCircle2, Heart, MessageSquare, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScriptureBlock } from "@/components/scripture-block";
import { saveDevotionalNote, toggleDevotionalComplete, toggleDevotionalSaved } from "@/lib/actions";
import { jsonArray } from "@/lib/devotionals";
import { formatDate } from "@/lib/utils";

export function DevotionalCard({
  devotional,
  state,
  personalizedNote,
  displayDate
}: {
  devotional: Devotional;
  state?: UserDevotional | null;
  personalizedNote?: string;
  displayDate?: string;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-[#eee5d8] bg-[#fffdf8]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-[#68706e]">{displayDate ?? formatDate(devotional.date)}</p>
            <CardTitle className="mt-1 text-2xl">{devotional.title}</CardTitle>
          </div>
          <div className="flex flex-wrap gap-2">
            {jsonArray(devotional.tags).slice(0, 3).map((tag) => (
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
            <Button variant={state?.completed ? "gold" : "primary"} type="submit">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              {state?.completed ? "Completed" : "Mark complete"}
            </Button>
          </form>
          <form action={toggleDevotionalSaved.bind(null, devotional.id)}>
            <Button variant="secondary" type="submit">
              <Heart className="h-4 w-4" aria-hidden="true" />
              {state?.saved ? "Saved" : "Save"}
            </Button>
          </form>
          <Button variant="ghost" type="button">
            <Share2 className="h-4 w-4" aria-hidden="true" />
            Share to group soon
          </Button>
          <Button variant="ghost" type="button">
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Discuss soon
          </Button>
        </div>

        <form action={saveDevotionalNote.bind(null, devotional.id)} className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium text-[#31413f]">
            Personal note
          </label>
          <textarea
            id="notes"
            name="notes"
            defaultValue={state?.notes ?? ""}
            placeholder="What stood out from today's Scripture?"
            className="min-h-24 w-full rounded-lg border border-[#d9cfbd] bg-white/85 px-3 py-3 text-sm outline-none focus:border-[#345d6f] focus:ring-2 focus:ring-[#345d6f]/15"
          />
          <Button variant="secondary" type="submit">
            Save note
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
