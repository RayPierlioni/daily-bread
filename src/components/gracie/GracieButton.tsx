"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function GracieButton({ onClick, open }: { onClick: () => void; open: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <button
      type="button"
      aria-label="Open Gracie helper"
      aria-expanded={open}
      onClick={onClick}
      className={cn(
        "group flex h-16 w-16 items-center justify-center rounded-full border border-[#d9cfbd] bg-[#fffdf8] p-1 shadow-[0_14px_35px_rgba(36,48,47,0.16)] transition hover:-translate-y-0.5 hover:border-[#b38b4d] focus:outline-none focus:ring-2 focus:ring-[#345d6f] focus:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        open && "border-[#b38b4d] ring-2 ring-[#f0dfbd]"
      )}
    >
      {imageFailed ? (
        <span className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#dfe9dd] text-[#345d6f]">
          <Heart className="h-6 w-6" aria-hidden="true" />
          <span className="mt-0.5 text-[10px] font-semibold">Gracie</span>
        </span>
      ) : (
        <span className="relative h-full w-full overflow-hidden rounded-full bg-[#f7fbf8]">
          <Image
            src="/mascots/gracie.png"
            alt=""
            fill
            sizes="64px"
            className="object-cover object-center"
            onError={() => setImageFailed(true)}
            priority={false}
          />
        </span>
      )}
    </button>
  );
}
