"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { donationUrl } from "@/lib/support";

const dismissedKey = "daily-bread-support-nudge-dismissed";

export function SupportNudgeBanner({ completedCount }: { completedCount: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (completedCount < 5) return;
    const timeoutId = window.setTimeout(() => {
      try {
        setVisible(localStorage.getItem(dismissedKey) !== "true");
      } catch {
        setVisible(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [completedCount]);

  function dismiss() {
    try {
      localStorage.setItem(dismissedKey, "true");
    } catch {
      // The banner still closes even if private browsing blocks localStorage.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#dac693] bg-[#fff7e8] p-4 text-sm leading-6 text-[#5a3e18] shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p>
        You&apos;ve completed 5 devotionals {"\ud83c\udf89"} If Daily Bread Hub is helping your walk with God, consider a small gift to keep it free for others.
      </p>
      <div className="flex items-center gap-2">
        <a href={donationUrl} target="_blank" rel="noreferrer" className="whitespace-nowrap rounded-lg bg-[#8c6a33] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#77592b]">
          Support the App
        </a>
        <button type="button" onClick={dismiss} aria-label="Dismiss support reminder" className="rounded-full p-2 text-[#8c6a33] transition hover:bg-[#f1e3c8]">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
