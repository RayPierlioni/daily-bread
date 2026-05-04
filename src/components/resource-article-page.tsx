import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake } from "lucide-react";
import { MarketingHeader } from "@/components/marketing-header";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ResourceArticlePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  scriptureReference: string;
  scriptureText: string;
  sections: {
    heading: string;
    body: string[];
  }[];
  nextSteps: string[];
};

export function ResourceArticlePage({ eyebrow, title, description, scriptureReference, scriptureText, sections, nextSteps }: ResourceArticlePageProps) {
  return (
    <main>
      <MarketingHeader />
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#24302f] sm:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-[#52605d]">{description}</p>

        <Card className="mt-8 border-l-4 border-l-[#b38b4d] p-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#345d6f]">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Scripture to carry with you
          </div>
          <blockquote className="font-sanctuary text-2xl italic leading-9 text-[#24302f]">&quot;{scriptureText}&quot;</blockquote>
          <p className="mt-3 text-sm font-medium text-[#68706e]">{scriptureReference}</p>
        </Card>

        <div className="prose-soft mt-10 space-y-9">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold text-[#24302f]">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-8 text-[#52605d]">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <Card className="mt-10 bg-[#fffdf8] p-6">
          <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#24302f]">
            <HeartHandshake className="h-5 w-5 text-[#345d6f]" aria-hidden="true" />
            Gentle next steps
          </div>
          <ul className="space-y-3 text-sm leading-7 text-[#52605d]">
            {nextSteps.map((step) => (
              <li key={step}>- {step}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href="/signin">
              Begin with Next Faithful Step
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="/learn" variant="secondary">
              More resources
            </LinkButton>
          </div>
        </Card>

        <p className="mt-8 text-sm leading-6 text-[#68706e]">
          Next Faithful Step is a free Christian devotional and prayer app. It is meant to support spiritual growth, not replace a church, pastor, counselor, doctor, or emergency care.
        </p>
        <p className="mt-3 text-sm text-[#68706e]">
          <Link href="/" className="font-medium text-[#345d6f] hover:underline">
            Return to Next Faithful Step
          </Link>
        </p>
      </article>
    </main>
  );
}
