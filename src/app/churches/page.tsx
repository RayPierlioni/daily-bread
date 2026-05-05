import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, HeartHandshake, Lock, MessageCircleQuestion, QrCode, ShieldCheck, Users } from "lucide-react";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingHeader } from "@/components/marketing-header";
import { PrintPageButton } from "@/components/print-page-button";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSupportImpactStats } from "@/lib/support-impact";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "For Churches and Small Groups",
  description:
    "A free devotional companion churches can recommend to people who struggle to stay consistent with Scripture, prayer, and private reflection.",
  alternates: {
    canonical: "/churches"
  }
};

export const dynamic = "force-dynamic";

const benefits = [
  {
    title: "A gentle first step",
    body: "People can start with Faithful Foundations without taking an assessment. Personalization is optional, private, and available later.",
    icon: BookOpenCheck
  },
  {
    title: "A path that does not skip ahead",
    body: "If someone misses days, they return to the next reading in their path. The app reinforces grace, not guilt.",
    icon: HeartHandshake
  },
  {
    title: "Private by default",
    body: "Prayer entries, faith questions, notes, and assessment answers are not public. Users choose what they share.",
    icon: Lock
  },
  {
    title: "Honest questions handled carefully",
    body: "Ask in Faith encourages Scripture, humility, pastoral wisdom, and real-world support when needed.",
    icon: MessageCircleQuestion
  }
];

const sharingIdeas = [
  "Share the link in a church newsletter, small group text thread, or Sunday bulletin.",
  "Invite people to try Day 1 together, then continue privately during the week.",
  "Use it as a free companion for new believers, returning Christians, or people rebuilding rhythm.",
  "Encourage people to use the prayer journal privately before sharing requests with a group."
];

const privacyNotes = [
  "Next Faithful Step does not replace pastors, counselors, churches, doctors, emergency care, or Christian community.",
  "The app is designed to support Scripture, prayer, reflection, and wise next steps between real-life support systems.",
  "Private spiritual content is not displayed publicly unless a user intentionally chooses to share something."
];

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg border border-[#e4dccd] bg-white/82 p-4">
      <p className="text-3xl font-semibold text-[#24302f]">{value}</p>
      <p className="mt-1 text-sm leading-6 text-[#68706e]">{label}</p>
    </div>
  );
}

export default async function ChurchesPage() {
  const impactStats = await getSupportImpactStats();
  const stats = impactStats ?? {
    usersStarted: 0,
    devotionalCompletions: 0,
    prayersCreated: 0,
    faithQuestionsAsked: 0
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Next Faithful Step for Churches",
    url: `${siteConfig.url}/churches`,
    description: metadata.description
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <MarketingHeader />

      <section className="border-b border-[#e4dccd] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(20rem,0.38fr)] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">For churches and small groups</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#24302f] sm:text-5xl">
              A free devotional companion for people who struggle to stay consistent.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52605d]">
              Next Faithful Step helps people begin with Scripture, prayer, honest questions, and private reflection. When they miss days, their path waits instead of moving on without them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/signin" size="lg">
                Try the free path
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
              <LinkButton href="#sharing-handout" size="lg" variant="secondary">
                View sharing handout
              </LinkButton>
            </div>
          </div>

          <Card className="bg-[#fffdf8] p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#dfe9dd] text-[#345d6f]">
                <Users className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#24302f]">Pastoral posture</p>
                <p className="text-sm text-[#68706e]">Helpful companion, never a replacement.</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-[#52605d]">
              The app is intentionally quiet and private. It is meant to help people take one faithful step toward God each day while still honoring the role of churches, pastors, counselors, trusted people, and real-world care.
            </p>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">Why it helps</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#24302f]">Built for people who need a gentle way to begin again.</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card key={benefit.title} className="p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#dfe9dd] text-[#345d6f]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-[#24302f]">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#52605d]">{benefit.body}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[#e4dccd] bg-[#f0eadf]/70 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.58fr)_minmax(20rem,0.42fr)]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">How a church can recommend it</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#24302f]">Share it as a free companion, not another church program.</h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[#52605d]">
              {sharingIdeas.map((idea) => (
                <li key={idea} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#b38b4d]" aria-hidden="true" />
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="bg-white/78 p-6">
            <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#24302f]">
              <ShieldCheck className="h-5 w-5 text-[#345d6f]" aria-hidden="true" />
              Privacy and safety language
            </div>
            <ul className="space-y-3 text-sm leading-7 text-[#52605d]">
              {privacyNotes.map((note) => (
                <li key={note}>- {note}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">Early impact</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#24302f]">The mission is just beginning.</h2>
          <p className="mt-4 text-sm leading-7 text-[#52605d]">
            These are simple, privacy-safe counts from the app. They help show whether people are starting paths, completing devotionals, praying, asking questions, and supporting the mission.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value={stats.usersStarted} label="people have signed in" />
          <Stat value={stats.devotionalCompletions} label="devotionals completed" />
          <Stat value={stats.prayersCreated} label="private prayers created" />
          <Stat value={stats.faithQuestionsAsked} label="faith questions asked" />
        </div>
      </section>

      <section id="sharing-handout" className="border-t border-[#e4dccd] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">Printable handout</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#24302f]">Print this card for a bulletin board, small group, or pastor conversation.</h2>
            </div>
            <div className="print:hidden">
              <PrintPageButton />
            </div>
          </div>

          <Card className="mx-auto grid max-w-4xl gap-8 bg-white p-6 print:shadow-none sm:p-8 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">Free devotional companion</p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight text-[#24302f]">Take the next faithful step, right where you are.</h3>
              <p className="mt-4 text-base leading-7 text-[#52605d]">
                A free Christian devotional path with Scripture, prayer, private journaling, and honest faith questions. Miss days without losing your place.
              </p>
              <p className="mt-5 text-lg font-semibold text-[#345d6f]">nextfaithfulstep.com</p>
              <p className="mt-3 text-xs leading-5 text-[#68706e]">
                Next Faithful Step supports spiritual growth and does not replace a church, pastor, counselor, doctor, or emergency care.
              </p>
            </div>
            <div className="rounded-xl border border-[#e4dccd] bg-[#fffdf8] p-4 text-center">
              <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-[#24302f]">
                <QrCode className="h-4 w-4 text-[#345d6f]" aria-hidden="true" />
                Scan to begin
              </div>
              <Image src="/brand/nextfaithfulstep-qr.png" alt="QR code for nextfaithfulstep.com" width={220} height={220} className="mx-auto rounded-lg" />
            </div>
          </Card>

          <p className="mt-8 text-center text-sm text-[#68706e]">
            Want to help keep it free? Visit{" "}
            <Link href="/support" className="font-medium text-[#345d6f] hover:underline">
              the support page
            </Link>
            .
          </p>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
