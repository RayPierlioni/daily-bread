import { ArrowRight, BookOpen, BookmarkCheck, ClipboardList, HeartHandshake, Lock, MessageCircleQuestion, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { DonationSection } from "@/components/donation-section";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingHeader } from "@/components/marketing-header";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { publicResourcePages, siteConfig } from "@/lib/site";

const features = [
  {
    title: "Daily devotionals personalized to your spiritual season.",
    body: "Begin with Scripture, reflection, prayer, and a gentle next step shaped by where you are right now.",
    href: "/daily-devotional",
    icon: BookOpen
  },
  {
    title: "A safe place to ask honest questions.",
    body: "Explore God, Jesus, the Bible, faith, doubt, history, theology, and archaeology without shame.",
    href: "/ask-faith-questions",
    icon: MessageCircleQuestion
  },
  {
    title: "A private prayer journal.",
    body: "Write prayers, record audio where supported, search your history, and mark answered prayers.",
    href: "/prayer-journal",
    icon: Lock
  },
  {
    title: "Christian groups for prayer and encouragement.",
    body: "Join calm spaces for prayer requests, group devotionals, testimony, and thoughtful community.",
    href: "/christian-prayer-groups",
    icon: Users
  }
];

const howItWorks = [
  {
    title: "Start simply",
    body: "Begin with Faithful Foundations, no assessment required. You can step into Scripture and prayer before sharing anything personal.",
    icon: BookOpen
  },
  {
    title: "Personalize if you want",
    body: "Take a private spiritual check-in whenever you want a devotional path shaped to your current faith season.",
    icon: ClipboardList
  },
  {
    title: "Continue at your pace",
    body: "Each morning brings your next faithful step. Miss a week? You return to where you left off, not a random calendar date.",
    icon: BookmarkCheck
  },
  {
    title: "Keep it private",
    body: "Your prayers, journal entries, faith questions, and assessment answers are private by default. You share only what you choose.",
    icon: ShieldCheck
  }
];

const audienceStatements = [
  "New or returning Christians who aren't sure where to start",
  "People wrestling with doubt who want honest answers, not shame",
  "Anyone who needs a gentler morning rhythm with God",
  "Small groups or churches looking for a free devotional companion"
];

export const metadata: Metadata = {
  alternates: {
    canonical: "/"
  }
};

export default function LandingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <MarketingHeader variant="hero" />
      <section
        className="relative flex min-h-[88vh] items-center overflow-hidden bg-[#24302f] px-4 pb-8 pt-24 text-white sm:px-6 lg:px-8"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(25,34,33,0.78), rgba(25,34,33,0.42) 48%, rgba(25,34,33,0.2)), url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1800&q=82')",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(20rem,0.32fr)] lg:items-end">
          <div className="max-w-3xl py-12">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm backdrop-blur">
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              Peaceful, private, Scripture-centered
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">Take the next faithful step, right where you are.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">
              Most devotional apps move on when you fall behind. Next Faithful Step gives you a free, private devotional path that starts where your faith actually is {"\u2014"} and picks up exactly where you left off, no matter how long you&apos;ve been away.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/signin" size="lg" className="bg-white text-[#24302f] hover:bg-[#f7f2e8]">
                Start Your Free Path
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
              <LinkButton href="#how-it-works" size="lg" variant="secondary" className="border-white/35 bg-white/12 text-white hover:bg-white/20">
                See How It Works
              </LinkButton>
            </div>
          </div>
          <div className="hidden rounded-xl border border-white/22 bg-white/13 p-5 text-sm leading-6 text-white/88 backdrop-blur md:block">
            &quot;You are not behind here.&quot; Next Faithful Step is built for reverent devotion, honest seeking, and a pace that keeps meeting you with grace.
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#24302f] sm:text-4xl">Your path. Your pace. Your private space.</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {howItWorks.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.title} className="p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#dfe9dd] text-[#345d6f]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b38b4d]">Step {index + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#24302f]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#52605d]">{step.body}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[#e4dccd] bg-[#f0eadf]/70 px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="mx-auto max-w-4xl text-xl font-semibold leading-8 text-[#24302f]">Your prayers are private. Your questions are safe. Your journey is yours.</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">Who it helps</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#24302f] sm:text-4xl">Built for people who feel behind</h2>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {audienceStatements.map((statement) => (
            <Card key={statement} className="p-5 text-sm font-medium leading-7 text-[#52605d]">
              {statement}
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#dfe9dd] text-[#345d6f]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="font-semibold leading-6 text-[#24302f]">
                <Link href={feature.href} className="hover:text-[#345d6f]">
                  {feature.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#68706e]">{feature.body}</p>
            </Card>
          );
        })}
      </section>

      <section className="border-t border-[#e4dccd] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">Learn</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#24302f]">Helpful guides for prayer, doubt, and daily Scripture.</h2>
            </div>
            <LinkButton href="/learn" variant="secondary">
              View all resources
            </LinkButton>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {publicResourcePages
              .filter((page) => page.path !== "/learn")
              .slice(0, 4)
              .map((page) => (
                <Card key={page.path} className="p-5">
                  <h3 className="text-lg font-semibold text-[#24302f]">
                    <Link href={page.path} className="hover:text-[#345d6f]">
                      {page.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#52605d]">{page.description}</p>
                </Card>
              ))}
          </div>
        </div>
      </section>

      <DonationSection className="border-t border-[#e4dccd] bg-[#fffdf8]/55" />
      <MarketingFooter />
    </main>
  );
}
