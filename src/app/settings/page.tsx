import { redirect } from "next/navigation";
import { BookOpenCheck, Download, Trash2 } from "lucide-react";
import { GracieSettingsPanel } from "@/components/gracie/GracieSettingsPanel";
import { NotificationSettingsForm } from "@/components/notification-settings-form";
import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/form-fields";
import { updateProfile, updateSettings } from "@/lib/actions";
import { requireUser } from "@/lib/current-user";
import { getCurrentDevotionalForUser } from "@/lib/devotionals";

type Settings = Record<string, boolean>;

export default async function SettingsPage() {
  const user = await requireUser();
  if (!user.onboardingCompleted) redirect("/onboarding");
  const privacy = (user.privacySettings ?? {}) as Settings;
  const current = await getCurrentDevotionalForUser(user);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Profile, privacy, and preferences.</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={user.name ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" defaultValue={user.bio ?? ""} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="church">Church</Label>
                  <Input id="church" name="church" defaultValue={user.church ?? ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="denomination">Denomination</Label>
                  <Input id="denomination" name="denomination" defaultValue={user.denomination ?? ""} />
                </div>
              </div>
              <Button type="submit">Save profile</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateSettings} className="space-y-4">
              {[
                ["showBio", "Show bio on profile", privacy.showBio],
                ["showChurch", "Show church on profile", privacy.showChurch],
                ["showDenomination", "Show denomination on profile", privacy.showDenomination],
                ["shareAnsweredPrayerCount", "Show answered prayer count", privacy.shareAnsweredPrayerCount],
                ["personalization", "Personalization on", Boolean(user.spiritualFocusProfile)]
              ].map(([name, label, checked]) => (
                <label key={String(name)} className="flex items-center gap-3 rounded-lg border border-[#e4dccd] bg-white/70 p-3 text-sm">
                  <input name={String(name)} type="checkbox" defaultChecked={Boolean(checked)} className="h-4 w-4 accent-[#345d6f]" />
                  {label}
                </label>
              ))}
              <Button type="submit">Save settings</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily reminders</CardTitle>
            <p className="text-sm leading-6 text-[#68706e]">Choose when Next Faithful Step should remind you to open the app for your devotional.</p>
          </CardHeader>
          <CardContent>
            <NotificationSettingsForm notificationSettings={user.notificationSettings} />
          </CardContent>
        </Card>

        <GracieSettingsPanel />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5 text-[#345d6f]" aria-hidden="true" />
              Assessment and course path
            </CardTitle>
            <p className="text-sm leading-6 text-[#68706e]">Your assessment answers choose the devotional course track that appears on your dashboard.</p>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-[#e4dccd] bg-white/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b38b4d]">Current path</p>
              <p className="mt-2 text-lg font-semibold text-[#24302f]">{current.track?.title ?? "Faithful Foundations"}</p>
              <p className="mt-2 text-sm leading-6 text-[#68706e]">
                Focus: {user.spiritualFocusProfile ?? "Strengthening Faith"}. Step {Math.min(current.sequence, Math.max(current.total, 1))} of {current.total || 1}.
              </p>
            </div>
            <LinkButton href="/onboarding" className="mt-4">
              Retake assessment
            </LinkButton>
          </CardContent>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="font-semibold text-[#24302f]">Account tools</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant="secondary">
            <Download className="h-4 w-4" aria-hidden="true" />
            Export prayer journal soon
          </Button>
          <Button type="button" variant="danger">
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete account placeholder
          </Button>
        </div>
      </Card>
    </div>
  );
}
