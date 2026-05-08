"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const dismissedKey = "next-faithful-step-ask-faith-disclaimer-dismissed";

export function AskFaithDisclaimer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        setVisible(sessionStorage.getItem(dismissedKey) !== "true");
      } catch {
        setVisible(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function dismiss() {
    try {
      sessionStorage.setItem(dismissedKey, "true");
    } catch {
      // The card still closes for this page view if sessionStorage is unavailable.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="flex gap-3 rounded-xl border border-[#d7e0d3] bg-[#f5faf2] p-4 text-sm leading-6 text-[#52605d]">
      <p className="flex-1">
        Ask in Faith can help you think through Scripture, theology, history, and doubt with care. It is not your pastor, therapist, or spiritual authority, and it should not replace wise people who know you. Bring honest questions here, then weigh the answer prayerfully with Scripture and trusted Christian counsel.
      </p>
      <button type="button" onClick={dismiss} aria-label="Dismiss Ask in Faith note" className="h-8 rounded-full p-1.5 text-[#52605d] transition hover:bg-white">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
