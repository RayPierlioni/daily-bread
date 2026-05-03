import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MarketingHeader } from "@/components/marketing-header";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type MarketingFeaturePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: string;
  sections: {
    title: string;
    body: string;
  }[];
  highlights: string[];
};

export function MarketingFeaturePage({ eyebrow, title, description, primaryAction = "Begin for free", sections, highlights }: MarketingFeaturePageProps) {
  return (
    <main>
      <MarketingHeader />
      <section className="border-b border-[#e4dccd] bg-[#fffdf8]/74 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(20rem,0.38fr)] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">{eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[#24302f] sm:text-5xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52605d]">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/signin" size="lg">
                {primaryAction}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
              <LinkButton href="/" variant="secondary" size="lg">
                Back to home
              </LinkButton>
            </div>
          </div>
          <Card className="soft-panel p-6">
            <h2 className="text-xl font-semibold text-[#24302f]">What makes it different</h2>
            <ul className="mt-5 space-y-4">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-6 text-[#52605d]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#52633f]" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        {sections.map((section) => (
          <Card key={section.title} className="p-6">
            <h2 className="text-xl font-semibold leading-7 text-[#24302f]">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#52605d]">{section.body}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}
