import { Gift, HeartHandshake, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { monthlySupportGoal, monthlySupportOptions, oneTimeSupportOptions, sponsorSupportOptions, supportUrl } from "@/lib/support";
import { cn } from "@/lib/utils";

export function DonationSection({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <section className={cn("px-4 py-14 sm:px-6 lg:px-8", className)}>
      <div className={cn("mx-auto max-w-5xl text-center", compact && "max-w-4xl")}>
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfe9dd] text-[#345d6f]">
          <Gift className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">Support</p>
        <h2 className="mt-3 text-3xl font-semibold text-[#24302f] sm:text-4xl">Keep Next Faithful Step free for people who need it most.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#52605d]">
          Some people can afford to give. Some cannot. Next Faithful Step is free for everyone because spiritual encouragement should not depend on someone&apos;s bank account.
          Your support helps cover hosting, database, AI infrastructure, writing, editing, and future devotional tracks.
        </p>

        <Card className="mx-auto mt-8 max-w-2xl bg-[#fffdf8] p-5 text-left">
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

        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#b38b4d]">One-time support</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {oneTimeSupportOptions.map((option) => (
              <Card key={option.amount} className="bg-white/74 transition hover:-translate-y-0.5 hover:border-[#cdbf9f] hover:bg-white">
                <a href={supportUrl} target="_blank" rel="noreferrer" className="flex min-h-28 flex-col items-center justify-center px-4 py-5 text-[#24302f]">
                  <span className="text-2xl font-semibold">{option.amount}</span>
                  <span className="mt-2 text-sm font-medium text-[#52605d]">{option.label}</span>
                </a>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#b38b4d]">Monthly supporters</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {monthlySupportOptions.map((option) => (
              <Card key={option.amount} className="bg-white/74 transition hover:-translate-y-0.5 hover:border-[#cdbf9f] hover:bg-white">
                <a href={supportUrl} target="_blank" rel="noreferrer" className="flex min-h-28 flex-col items-center justify-center px-4 py-5 text-[#24302f]">
                  <span className="text-2xl font-semibold">{option.amount}</span>
                  <span className="mt-2 text-sm font-medium text-[#52605d]">{option.label}</span>
                </a>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#b38b4d]">Mission sponsorship</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {sponsorSupportOptions.map((option) => (
              <Card key={option.amount} className="bg-white/74 transition hover:-translate-y-0.5 hover:border-[#cdbf9f] hover:bg-white">
                <a href={supportUrl} target="_blank" rel="noreferrer" className="flex min-h-28 flex-col items-center justify-center px-4 py-5 text-[#24302f]">
                  <span className="text-2xl font-semibold">{option.amount}</span>
                  <span className="mt-2 text-sm font-medium text-[#52605d]">{option.label}</span>
                </a>
              </Card>
            ))}
          </div>
        </div>

        <a href={supportUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex text-sm font-semibold text-[#345d6f] hover:underline">
          Give another amount
        </a>

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
                Supporter updates will focus on the people served, new devotional tracks, and what support makes possible.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
