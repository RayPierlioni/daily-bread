import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#d9cfbd] bg-[#fbf7ef] px-2.5 py-1 text-xs font-medium text-[#52605d]",
        className
      )}
      {...props}
    />
  );
}
