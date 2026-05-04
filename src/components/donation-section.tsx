import { Gift } from "lucide-react";
import { Card } from "@/components/ui/card";
import { donationOptions, donationUrl } from "@/lib/support";
import { cn } from "@/lib/utils";

export function DonationSection({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <section className={cn("px-4 py-14 sm:px-6 lg:px-8", className)}>
      <div className={cn("mx-auto max-w-4xl text-center", compact && "max-w-3xl")}>
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfe9dd] text-[#345d6f]">
          <Gift className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">Support</p>
        <h2 className="mt-3 text-3xl font-semibold text-[#24302f] sm:text-4xl">Keep Daily Bread Hub Free</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#52605d]">
          This app costs real money to run {"\u2014"} hosting, database, and AI infrastructure. It will always be free to use. If it has helped you, consider a one-time gift to keep it going for others.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {donationOptions.map((option) => (
            <Card key={option} className="bg-white/74 transition hover:-translate-y-0.5 hover:border-[#cdbf9f] hover:bg-white">
              <a href={donationUrl} target="_blank" rel="noreferrer" className="flex min-h-28 items-center justify-center px-4 py-5 text-base font-semibold text-[#24302f]">
                {option}
              </a>
            </Card>
          ))}
        </div>

        <a href={donationUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-semibold text-[#345d6f] hover:underline">
          Give another amount
        </a>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#68706e]">Daily Bread Hub is a mission-first project. No ads. No paywalls. No pressure.</p>
      </div>
    </section>
  );
}
