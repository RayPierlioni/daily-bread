import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TagFilter({ tags, active, basePath }: { tags: string[]; active?: string; basePath: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href={basePath}>
        <Badge className={cn(!active && "border-[#345d6f] bg-[#e9f0ea] text-[#345d6f]")}>All</Badge>
      </Link>
      {tags.map((tag) => (
        <Link key={tag} href={`${basePath}?topic=${encodeURIComponent(tag)}`}>
          <Badge className={cn(active === tag && "border-[#345d6f] bg-[#e9f0ea] text-[#345d6f]")}>{tag}</Badge>
        </Link>
      ))}
    </div>
  );
}
