import type { Metadata } from "next";
import { ArrowRight, BookOpenCheck, ShieldCheck } from "lucide-react";
import { DevotionalStatus } from "@prisma/client";
import { DevotionalReadAloud } from "@/components/devotional-read-aloud";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingHeader } from "@/components/marketing-header";
import { PageViewTracker } from "@/components/page-view-tracker";
import { ScriptureBlock } from "@/components/scripture-block";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { buildFoundationDevotionals } from "../../../prisma/foundation-track";

export const metadata: Metadata = {
  title: "Preview the First Faithful Step",
  description: "Read a sample first devotional from Next Faithful Step before signing in.",
  alternates: {
    canonical: "/devotional-preview"
  }
};

export const dynamic = "force-dynamic";

type PreviewDevotional = {
  title: string;
  scriptureReference: string;
  scriptureText: string;
  body: string;
  reflectionQuestion: string;
  prayerPrompt: string;
  actionStep: string;
};

async function getPreviewDevotional(): Promise<PreviewDevotional> {
  try {
    const foundationTrack = await prisma.devotionalTrack.findUnique({
      where: { slug: "daily-bread-foundations" },
      include: {
        items: {
          where: {
            sequence: 1,
            devotional: { status: DevotionalStatus.PUBLISHED }
          },
          include: { devotional: true },
          take: 1
        },
      }
    });

    const devotional =
      foundationTrack?.items[0]?.devotional ??
      (await prisma.devotional.findFirst({
        where: { status: DevotionalStatus.PUBLISHED },
        orderBy: { date: "asc" }
      }));

    if (devotional) return devotional;
  } catch {
    // Local/devotional preview should still work even if the local database has not been configured yet.
  }

  return buildFoundationDevotionals()[0];
}

export default async function DevotionalPreviewPage() {
  const devotional = await getPreviewDevotional();

  return (
    <main>
      <PageViewTracker eventName="landing_page_viewed" properties={{ source: "devotional_preview" }} />
      <MarketingHeader />
      <section className="border-b border-[#e4dccd] bg-[#fbf7ef] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">Sample first step</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[#24302f] sm:text-5xl">
            Feel the path before you sign in.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#52605d]">
            This is a public preview of the first Foundations devotional. When you begin your own path, your progress is saved privately and missing days never skips you ahead.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="/signin" size="lg">
              Start your free path
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href="/privacy" size="lg" variant="secondary">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Read privacy promise
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <Card className="overflow-hidden">
            <div className="space-y-6 p-5 sm:p-7">
              <div>
                <p className="text-sm font-medium text-[#345d6f]">Faithful Foundations, Step 001</p>
                <h2 className="mt-2 text-3xl font-semibold leading-tight text-[#24302f]">{devotional.title.replace(/^Day\s+\d{3}:\s*/i, "")}</h2>
                <p className="mt-2 text-sm font-medium text-[#68706e]">{devotional.scriptureReference}</p>
              </div>
              <DevotionalReadAloud
                title={devotional.title}
                scriptureReference={devotional.scriptureReference}
                scriptureText={devotional.scriptureText}
                body={devotional.body}
                reflectionQuestion={devotional.reflectionQuestion}
                prayerPrompt={devotional.prayerPrompt}
                actionStep={devotional.actionStep}
              />
              <ScriptureBlock reference={devotional.scriptureReference} text={devotional.scriptureText} />
              <div className="prose-soft text-base leading-8 text-[#31413f]">
                {devotional.body.split("\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-lg bg-[#fbf7ef] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#b38b4d]">Reflect</p>
                  <p className="mt-2 text-sm leading-6">{devotional.reflectionQuestion}</p>
                </div>
                <div className="rounded-lg bg-[#f7fbf8] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#345d6f]">Pray</p>
                  <p className="mt-2 text-sm leading-6">{devotional.prayerPrompt}</p>
                </div>
                <div className="rounded-lg bg-white p-4 ring-1 ring-[#e4dccd]">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#52605d]">Practice</p>
                  <p className="mt-2 text-sm leading-6">{devotional.actionStep}</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#dfe9dd] text-[#345d6f]">
                <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#24302f]">Your saved path starts after sign-in.</h2>
              <p className="mt-3 text-sm leading-7 text-[#52605d]">
                Sign in only when you are ready to save progress, notes, prayers, and questions privately.
              </p>
              <LinkButton href="/signin" className="mt-5 w-full">
                Begin for free
              </LinkButton>
            </Card>
            <Card className="bg-[#fff7e8] p-5">
              <p className="text-sm leading-7 text-[#5a3e18]">
                No ads. No paywalls. No pressure. The path waits for your next faithful step.
              </p>
            </Card>
          </div>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
