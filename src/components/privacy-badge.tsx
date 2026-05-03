import { Lock, Users, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { humanizeEnum } from "@/lib/utils";

const icons = {
  PRIVATE: Lock,
  GROUP: Users,
  ANONYMOUS: EyeOff
};

export function PrivacyBadge({ level }: { level: "PRIVATE" | "GROUP" | "ANONYMOUS" | string }) {
  const Icon = icons[level as keyof typeof icons] ?? Lock;
  return (
    <Badge className="gap-1.5">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {humanizeEnum(level)}
    </Badge>
  );
}
