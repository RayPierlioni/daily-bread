import { ArrowRight, BookOpenCheck, HelpCircle, PenLine, ShieldCheck } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function FirstStepGuide({
  completedDevotionals,
  prayersCreated,
  faithQuestionsAsked,
  currentStep,
  trackTitle
}: {
  completedDevotionals: number;
  prayersCreated: number;
  faithQuestionsAsked: number;
  currentStep: number;
  trackTitle: string;
}) {
  if (completedDevotionals > 0) return null;

  const steps = [
    {
      title: `Begin step ${currentStep}`,
      body: `Start with your next reading in ${trackTitle}. Missing days will not skip your place.`,
      href: "/devotional",
      cta: "Begin devotional",
      icon: BookOpenCheck,
      done: completedDevotionals > 0
    },
    {
      title: "Write one honest sentence",
      body: prayersCreated > 0 ? "Your prayer journal has begun." : "Your first prayer does not need to sound impressive. One real sentence is enough.",
      href: "/prayers",
      cta: prayersCreated > 0 ? "Open prayers" : "Write a prayer",
      icon: PenLine,
      done: prayersCreated > 0
    },
    {
      title: "Ask what you are carrying",
      body: faithQuestionsAsked > 0 ? "Your saved faith questions are private." : "Questions about Scripture, doubt, prayer, or suffering are welcome here.",
      href: "/ask",
      cta: faithQuestionsAsked > 0 ? "Open Ask in Faith" : "Ask a question",
      icon: HelpCircle,
      done: faithQuestionsAsked > 0
    }
  ];

  return (
    <Card className="border-[#d9cfbd] bg-[#fffdf8] p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#345d6f]">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Start here
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-[#24302f]">Your first faithful step is simple.</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#68706e]">
            Begin with today&apos;s devotional. Prayer and questions are optional, private, and here when you are ready.
          </p>
        </div>
        <LinkButton href="/devotional" className="shrink-0">
          Start now
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </LinkButton>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="rounded-xl border border-[#eee5d8] bg-white/76 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#dfe9dd] text-[#345d6f]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b38b4d]">Step {index + 1}</span>
              </div>
              <h3 className="mt-4 font-semibold text-[#24302f]">{step.title}</h3>
              <p className="mt-2 min-h-16 text-sm leading-6 text-[#52605d]">{step.body}</p>
              <LinkButton href={step.href} variant={step.done ? "ghost" : index === 0 ? "primary" : "secondary"} size="sm" className="mt-4">
                {step.cta}
              </LinkButton>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
