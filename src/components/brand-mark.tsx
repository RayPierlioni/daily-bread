import Image from "next/image";
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
      <span className={cn("relative shrink-0 overflow-hidden rounded-full bg-white shadow-sm", tone === "light" ? "ring-1 ring-white/35" : "ring-1 ring-[#e4dccd]")}>
        <Image src="/brand/logo-mark-256.png" alt="" width={iconSize} height={iconSize} className="h-auto w-auto rounded-full" priority={iconSize >= 44} />
      </span>
      {showText ? (
        <span className="leading-none">
          <span className={cn("font-sanctuary block text-xl italic", textClass)}>Daily Bread Hub</span>
          {subtitle ? <span className={cn("mt-1 block text-[11px] uppercase tracking-[0.2em]", subtitleClass)}>A Digital Sanctuary</span> : null}
        </span>
      ) : null}
    </span>
  );
}
