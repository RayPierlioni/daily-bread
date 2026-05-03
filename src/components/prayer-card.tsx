import type { Prayer } from "@prisma/client";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PrivacyBadge } from "@/components/privacy-badge";
import { markPrayerAnswered } from "@/lib/actions";
import { jsonArray } from "@/lib/devotionals";
import { formatDate, humanizeEnum } from "@/lib/utils";

export function PrayerCard({ prayer }: { prayer: Prayer }) {
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-[#68706e]">{formatDate(prayer.createdAt)}</p>
          <h3 className="mt-1 font-semibold text-[#24302f]">{prayer.title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>{humanizeEnum(prayer.status)}</Badge>
          <PrivacyBadge level={prayer.privacyLevel} />
        </div>
      </div>
      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#31413f]">{prayer.text}</p>
      {prayer.transcript ? <p className="mt-3 rounded-lg bg-[#fbf7ef] p-3 text-sm leading-6 text-[#52605d]">Transcript: {prayer.transcript}</p> : null}
      {prayer.followUpNotes ? <p className="mt-3 text-sm leading-6 text-[#52605d]">Follow-up: {prayer.followUpNotes}</p> : null}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {jsonArray(prayer.tags).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        {prayer.status !== "ANSWERED" ? (
          <form action={markPrayerAnswered.bind(null, prayer.id)}>
            <Button variant="secondary" size="sm" type="submit">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Mark answered
            </Button>
          </form>
        ) : null}
      </div>
    </Card>
  );
}
