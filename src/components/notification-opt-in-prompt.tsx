"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { BellRing, Clock, X } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";
import { enableDailyBrowserReminder } from "@/lib/actions";

type NotificationSettings = {
  dailyDevotional?: boolean;
  browserReminders?: boolean;
  reminderTime?: string;
};

const dismissalKey = "daily-bread-reminder-prompt-dismissed-at";
const dismissalWindowMs = 7 * 24 * 60 * 60 * 1000;

function parseSettings(value: unknown): NotificationSettings {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as NotificationSettings;
}

function wasDismissedRecently() {
  if (typeof window === "undefined") return true;
  const dismissedAt = Number(window.localStorage.getItem(dismissalKey) ?? "0");
  return Boolean(dismissedAt && Date.now() - dismissedAt < dismissalWindowMs);
}

export function NotificationOptInPrompt({ notificationSettings }: { notificationSettings?: unknown }) {
  const pathname = usePathname();
  const settings = useMemo(() => parseSettings(notificationSettings), [notificationSettings]);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const shouldStayHidden =
        pathname === "/settings" ||
        !("Notification" in window) ||
        Notification.permission === "denied" ||
        (settings.browserReminders && Notification.permission === "granted") ||
        wasDismissedRecently();

      setVisible(!shouldStayHidden);
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [pathname, settings.browserReminders]);

  const dismiss = () => {
    window.localStorage.setItem(dismissalKey, String(Date.now()));
    setVisible(false);
  };

  const enableReminders = async () => {
    if (!("Notification" in window)) {
      setMessage("This browser does not support reminders yet.");
      return;
    }

    setMessage("");
    const permission = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();

    if (permission !== "granted") {
      setMessage("Notifications were not enabled. You can still turn them on later in Settings.");
      return;
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const reminderTime = "07:00";

    startTransition(async () => {
      await enableDailyBrowserReminder(reminderTime, timezone);
      window.localStorage.removeItem(dismissalKey);
      setMessage("Daily reminder enabled for 7:00 AM. You can change the time in Settings.");
      window.setTimeout(() => setVisible(false), 2000);
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1d2928]/32 px-4 pb-4 backdrop-blur-sm sm:items-center sm:pb-0" role="dialog" aria-modal="true" aria-labelledby="notification-prompt-title">
      <div className="w-full max-w-md rounded-2xl border border-[#e4dccd] bg-[#fffdf8] p-5 shadow-[0_24px_70px_rgba(36,48,47,0.22)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dfe9dd] text-[#345d6f]">
            <BellRing className="h-5 w-5" aria-hidden="true" />
          </div>
          <button type="button" onClick={dismiss} className="rounded-full p-2 text-[#68706e] transition hover:bg-[#f3eee4]" aria-label="Dismiss reminder prompt">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <h2 id="notification-prompt-title" className="mt-4 text-xl font-semibold text-[#24302f]">
          Want a daily devotional reminder?
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#52605d]">
          Daily Bread Hub can remind you to open the app at 7:00 AM for your devotional. You can change the time later in Settings.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#fbf7ef] p-3 text-sm text-[#52605d]">
          <Clock className="h-4 w-4 text-[#b38b4d]" aria-hidden="true" />
          Open the app at 7:00 AM for today&apos;s devotional.
        </div>

        {message ? <p className="mt-3 text-sm font-medium text-[#52633f]" role="status">{message}</p> : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <Button type="button" onClick={enableReminders} disabled={isPending}>
            {isPending ? "Turning on..." : "Enable reminders"}
          </Button>
          <Button type="button" variant="secondary" onClick={dismiss}>
            Not now
          </Button>
          <LinkButton href="/settings" variant="ghost" onClick={dismiss}>
            Choose a time
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
