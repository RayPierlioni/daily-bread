import { HeartHandshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SponsorBadge({ isSponsor }: { isSponsor?: boolean | null }) {
  if (!isSponsor) return null;

  return (
    <Badge className="inline-flex items-center gap-1 border-[#b38b4d]/45 bg-[#fff4d7] text-[#7a5a20]" title="Mission sponsor">
      <HeartHandshake className="h-3 w-3" aria-hidden="true" />
      Sponsor
    </Badge>
  );
}
