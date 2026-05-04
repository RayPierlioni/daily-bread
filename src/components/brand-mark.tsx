import { Footprints } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  iconSize = 40,
  showText = true,
  subtitle = false,
  tone = "dark"
}: {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  subtitle?: boolean;
  tone?: "dark" | "light";
}) {
  const textClass = tone === "light" ? "text-white" : "text-[#24302f]";
  const subtitleClass = tone === "light" ? "text-white/68" : "text-[#8a918d]";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center rounded-full shadow-sm",
          tone === "light" ? "bg-white/95 text-[#345d6f] ring-1 ring-white/35" : "bg-[#fffdf8] text-[#345d6f] ring-1 ring-[#e4dccd]"
        )}
        style={{ width: iconSize, height: iconSize }}
        aria-hidden="true"
      >
        <Footprints style={{ width: iconSize * 0.55, height: iconSize * 0.55 }} strokeWidth={1.9} />
      </span>
      {showText ? (
        <span className="leading-none">
          <span className={cn("font-sanctuary block text-xl italic", textClass)}>Next Faithful Step</span>
          {subtitle ? <span className={cn("mt-1 block text-[11px] uppercase tracking-[0.2em]", subtitleClass)}>A private faith path</span> : null}
        </span>
      ) : null}
    </span>
  );
}
