import type { PrayerGroup } from "@prisma/client";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { humanizeEnum } from "@/lib/utils";

export function GroupCard({ group, memberCount }: { group: PrayerGroup; memberCount: number }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-[#24302f]">{group.name}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#68706e]">{group.description}</p>
        </div>
        <Badge>{humanizeEnum(group.privacy)}</Badge>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-sm text-[#68706e]">
          <Users className="h-4 w-4" aria-hidden="true" />
          {memberCount} members
        </span>
        <LinkButton href={`/groups/${group.id}`} variant="secondary" size="sm">
          Open group
        </LinkButton>
      </div>
    </Card>
  );
}
