"use client";

import { useEffect } from "react";

type ReminderSettings = {
  dailyDevotional?: boolean;
  reminderTime?: string;
  browserReminders?: boolean;
};

function parseReminderSettings(value: unknown): ReminderSettings {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as ReminderSettings;
}

function nextReminderDelay(reminderTime: string) {
  const [hours = "7", minutes = "0"] = reminderTime.split(":");
  const now = new Date();
  const reminder = new Date();
  reminder.setHours(Number(hours), Number(minutes), 0, 0);

  if (reminder <= now) {
    reminder.setDate(reminder.getDate() + 1);
  }

  return reminder.getTime() - now.getTime();
}

function formatReminderTime(reminderTime: string) {
  const [hours = "7", minutes = "0"] = reminderTime.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(date);
}

export function ReminderScheduler({ notificationSettings }: { notificationSettings?: unknown }) {
  useEffect(() => {
    const settings = parseReminderSettings(notificationSettings);
    const reminderTime = typeof settings.reminderTime === "string" ? settings.reminderTime : "07:00";

    if (!settings.dailyDevotional || !settings.browserReminders || typeof window === "undefined" || !("Notification" in window) || Notification.permission !== "granted") {
      return;
    }

    let cancelled = false;
    let timeoutId: number | undefined;

    const schedule = () => {
      timeoutId = window.setTimeout(() => {
        if (cancelled) return;

        new Notification("Daily Bread Hub", {
          body: `Open the app at ${formatReminderTime(reminderTime)} for today's devotional.`,
          tag: "daily-bread-devotional-reminder"
        });

        schedule();
      }, nextReminderDelay(reminderTime));
    };

    schedule();

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [notificationSettings]);

  return null;
}
