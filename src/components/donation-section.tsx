import { BookOpen, Gift, HeartHandshake, MessageCircleQuestion, PenLine, Target, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TrackedExternalLink } from "@/components/tracked-external-link";
import type { SupportImpactStats } from "@/lib/support-impact";
import { monthlySupportGoal, monthlySupportOptions, oneTimeSupportOptions, sponsorSupportOptions, supportUrl } from "@/lib/support";
import { cn } from "@/lib/utils";

const impactItems = [
  { key: "usersStarted", label: "people started", icon: Users },
  { key: "devotionalCompletions", label: "devotionals completed", icon: BookOpen },
  { key: "prayersCreated", label: "private prayers written", icon: PenLine },
  { key: "faithQuestionsAsked", label: "faith questions asked", icon: MessageCircleQuestion }
] as const;

export function DonationSection({ className, compact = false, impactStats }: { className?: string; compact?: boolean; impactStats?: SupportImpactStats | null }) {
  return (
    <section className={cn("px-4 py-14 sm:px-6 lg:px-8", className)}>
      <div className={cn("mx-auto max-w-5xl text-center", compact && "max-w-4xl")}>
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfe9dd] text-[#345d6f]">
          <Gift className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">Support</p>
        <h2 className="mt-3 text-3xl font-semibold text-[#24302f] sm:text-4xl">Help keep this path open for people who feel spiritually behind.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#52605d]">
          Next Faithful Step is free because spiritual encouragement should not depend on someone&apos;s bank account. Some people can give. Some cannot. Supporters help keep Scripture, prayer, honest questions, and a gentle place to begin again available to anyone who needs it.
        </p>

        <Card className="mx-auto mt-8 max-w-2xl bg-[#fffdf8] p-5 text-left">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#dfe9dd] text-[#345d6f]">
              <HeartHandshake className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#24302f]">A note from the founder</p>
              <p className="mt-2 text-sm leading-6 text-[#68706e]">
                I built Next Faithful Step because I know how easy it is to feel behind spiritually. Most devotional tools move on without you. This one waits, so anyone can return with grace instead of guilt.
              </p>
              <p className="mt-2 text-sm leading-6 text-[#68706e]">
                If this app helped you return to God after a long time away, that is exactly what it was built for. You do not owe anything. But if you want to help someone else find their way back, a small gift goes a long way.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mx-auto mt-5 max-w-2xl bg-[#fffdf8] p-5 text-left">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#dfe9dd] text-[#345d6f]">
              <Target className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#24302f]">Monthly operating goal: {monthlySupportGoal}</p>
              <p className="mt-2 text-sm leading-6 text-[#68706e]">Covers hosting, database, AI infrastructure, security, writing, editing, and support while the app remains free.</p>
            </div>
          </div>
        </Card>

        {impactStats ? (
          <Card className="mx-auto mt-5 max-w-3xl bg-[#f7fbf8] p-5 text-left">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-sm font-semibold text-[#24302f]">Early impact so far</p>
                <p className="mt-2 text-sm leading-6 text-[#68706e]">
                  We are still at the beginning. These are aggregate app counts only, with no private prayer text or faith-question text shown here.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {impactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.key} className="rounded-xl border border-[#e4dccd] bg-white/76 p-4">
                      <Icon className="h-5 w-5 text-[#345d6f]" aria-hidden="true" />
                      <p className="mt-3 text-2xl font-semibold text-[#24302f]">{impactStats[item.key]}</p>
                      <p className="mt-1 text-xs font-medium leading-5 text-[#68706e]">{item.label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="rounded-xl border border-[#e4dccd] bg-white/76 p-4">
                <p className="text-sm font-semibold text-[#24302f]">{impactStats.sponsors} supporters marked in the app</p>
                <p className="mt-1 text-xs leading-5 text-[#68706e]">
                  Supporter badges are currently verified manually so public recognition stays intentional and accurate.
                </p>
              </div>
            </div>
          </Card>
        ) : null}

        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#b38b4d]">One-time support</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {oneTimeSupportOptions.map((option) => (
              <Card key={option.amount} className="bg-white/74 transition hover:-translate-y-0.5 hover:border-[#cdbf9f] hover:bg-white">
                <TrackedExternalLink
                  href={supportUrl}
                  target="_blank"
                  rel="noreferrer"
                  analytics={{ amount: option.amount, supportType: "one_time", source: "donation_section" }}
                  className="flex min-h-28 flex-col items-center justify-center px-4 py-5 text-[#24302f]"
                >
                  <span className="text-2xl font-semibold">{option.amount}</span>
                  <span className="mt-2 text-sm font-medium text-[#52605d]">{option.label}</span>
                </TrackedExternalLink>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#b38b4d]">Monthly supporters</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {monthlySupportOptions.map((option) => (
              <Card key={option.amount} className="bg-white/74 transition hover:-translate-y-0.5 hover:border-[#cdbf9f] hover:bg-white">
                <TrackedExternalLink
                  href={supportUrl}
                  target="_blank"
                  rel="noreferrer"
                  analytics={{ amount: option.amount, supportType: "monthly", source: "donation_section" }}
                  className="flex min-h-28 flex-col items-center justify-center px-4 py-5 text-[#24302f]"
                >
                  <span className="text-2xl font-semibold">{option.amount}</span>
                  <span className="mt-2 text-sm font-medium text-[#52605d]">{option.label}</span>
                </TrackedExternalLink>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#b38b4d]">Mission sponsorship</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {sponsorSupportOptions.map((option) => (
              <Card key={option.amount} className="bg-white/74 transition hover:-translate-y-0.5 hover:border-[#cdbf9f] hover:bg-white">
                <TrackedExternalLink
                  href={supportUrl}
                  target="_blank"
                  rel="noreferrer"
                  analytics={{ amount: option.amount, supportType: "sponsor", source: "donation_section" }}
                  className="flex min-h-28 flex-col items-center justify-center px-4 py-5 text-[#24302f]"
                >
                  <span className="text-2xl font-semibold">{option.amount}</span>
                  <span className="mt-2 text-sm font-medium text-[#52605d]">{option.label}</span>
                </TrackedExternalLink>
              </Card>
            ))}
          </div>
        </div>

        <TrackedExternalLink
          href={supportUrl}
          target="_blank"
          rel="noreferrer"
          analytics={{ amount: "custom", supportType: "custom", source: "give_another_amount" }}
          className="mt-6 inline-flex text-sm font-semibold text-[#345d6f] hover:underline"
        >
          Give another amount
        </TrackedExternalLink>

        <Card className="mx-auto mt-8 max-w-2xl bg-[#f7fbf8] p-5 text-left">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#dfe9dd] text-[#345d6f]">
              <HeartHandshake className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#24302f]">Mission-first, access-first.</p>
              <p className="mt-2 text-sm leading-6 text-[#68706e]">
                Next Faithful Step is a mission-first project. No ads. No paywalls. No pressure. Contributions support the cost of building and operating the app and are not tax-deductible unless otherwise stated.
              </p>
              <p className="mt-2 text-sm leading-6 text-[#68706e]">
                Your support helps cover hosting, database, AI infrastructure, security, writing, editing, support, and future devotional tracks.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
