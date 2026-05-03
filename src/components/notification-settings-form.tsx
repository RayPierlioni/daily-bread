"use client";

import { useMemo, useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Bell, BellRing, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/form-fields";
import { updateNotificationSettingsWithFeedback, type NotificationSettingsActionState } from "@/lib/actions";

type NotificationSettings = {
  dailyDevotional?: boolean;
  browserReminders?: boolean;
  reminderTime?: string;
  timezone?: string;
};

const initialState: NotificationSettingsActionState = {
  status: "idle",
  message: ""
};

function parseSettings(value: unknown): NotificationSettings {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as NotificationSettings;
}

function SaveReminderButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
      {pending ? "Saving..." : "Save reminders"}
    </Button>
  );
}

export function NotificationSettingsForm({ notificationSettings }: { notificationSettings?: unknown }) {
  const settings = useMemo(() => parseSettings(notificationSettings), [notificationSettings]);
  const [state, formAction] = useActionState(updateNotificationSettingsWithFeedback, initialState);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(() =>
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "unsupported"
  );
  const [timezone] = useState(() => (typeof window !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone || settings.timezone || "" : settings.timezone ?? ""));

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      setPermission("unsupported");
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
  };

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="timezone" value={timezone} />

      <label className="flex items-start gap-3 rounded-lg border border-[#e4dccd] bg-white/70 p-3 text-sm">
        <input name="dailyDevotional" type="checkbox" defaultChecked={settings.dailyDevotional ?? true} className="mt-1 h-4 w-4 accent-[#345d6f]" />
        <span>
          <span className="block font-medium text-[#24302f]">Daily devotional reminder</span>
          <span className="mt-1 block leading-6 text-[#68706e]">Remind me to open Daily Bread Hub for my next devotional.</span>
        </span>
      </label>

      <div className="space-y-2">
        <Label htmlFor="reminderTime">Reminder time</Label>
        <Input id="reminderTime" name="reminderTime" type="time" defaultValue={settings.reminderTime ?? "07:00"} />
        <p className="text-xs leading-5 text-[#68706e]">Default is 7:00 AM in your browser&apos;s local time.</p>
      </div>

      <label className="flex items-start gap-3 rounded-lg border border-[#e4dccd] bg-white/70 p-3 text-sm">
        <input name="browserReminders" type="checkbox" defaultChecked={settings.browserReminders ?? false} className="mt-1 h-4 w-4 accent-[#345d6f]" />
        <span>
          <span className="block font-medium text-[#24302f]">Use browser notifications</span>
          <span className="mt-1 block leading-6 text-[#68706e]">Show a daily browser reminder when notifications are allowed.</span>
        </span>
      </label>

      <div className="rounded-lg bg-[#fbf7ef] p-3 text-sm leading-6 text-[#52605d]">
        <div className="mb-2 flex items-center gap-2 font-medium text-[#24302f]">
          {permission === "granted" ? <BellRing className="h-4 w-4 text-[#52633f]" aria-hidden="true" /> : <Bell className="h-4 w-4 text-[#345d6f]" aria-hidden="true" />}
          Browser permission: {permission}
        </div>
        <p>
          This first version can show reminders when the browser allows notifications and the app has an active browser session. Full background reminders will require a web push sender.
        </p>
        {permission !== "granted" && permission !== "unsupported" ? (
          <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={requestPermission}>
            Allow browser notifications
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SaveReminderButton />
        {state.status !== "idle" ? (
          <p className={state.status === "success" ? "text-sm font-medium text-[#52633f]" : "text-sm font-medium text-[#9d3b3b]"} role="status">
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
