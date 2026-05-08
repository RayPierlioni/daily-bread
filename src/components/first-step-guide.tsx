import { ArrowRight, BookOpenCheck, ShieldCheck } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function FirstStepGuide({
  completedDevotionals,
  currentStep,
  trackTitle
}: {
  completedDevotionals: number;
  currentStep: number;
  trackTitle: string;
}) {
  if (completedDevotionals > 0) return null;

  return (
    <Card className="border-[#d9cfbd] bg-[#fffdf8] p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#345d6f]">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Start here
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-[#24302f]">Your first faithful step is simple.</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#68706e]">
            Begin with step {currentStep} in {trackTitle}. Missing days will not skip your place, and nothing else needs your attention before this first reading.
          </p>
        </div>
        <LinkButton href="/devotional" className="shrink-0">
          Begin devotional
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </LinkButton>
      </div>
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#eee5d8] bg-white/76 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#dfe9dd] text-[#345d6f]">
          <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-[#24302f]">Read slowly, then mark complete when you are ready.</p>
          <p className="mt-1 text-sm leading-6 text-[#52605d]">Prayer, questions, reminders, and community can wait until after this first step.</p>
        </div>
      </div>
    </Card>
  );
}
