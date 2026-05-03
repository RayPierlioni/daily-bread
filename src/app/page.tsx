import { ArrowRight, BookOpen, HeartHandshake, Lock, MessageCircleQuestion, Users } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { MarketingHeader } from "@/components/marketing-header";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

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
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">Start every morning with Scripture, prayer, and a community of believers.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">
              A devotional and spiritual hub for Christians who want daily encouragement, honest answers, private prayer tracking, and faith-centered community.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/signin" size="lg" className="bg-white text-[#24302f] hover:bg-[#f7f2e8]">
                Open Demo App
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
              <LinkButton href="/signin" size="lg" variant="secondary" className="border-white/35 bg-white/12 text-white hover:bg-white/20">
                Sign in to Continue
              </LinkButton>
            </div>
          </div>
          <div className="hidden rounded-xl border border-white/22 bg-white/13 p-5 text-sm leading-6 text-white/88 backdrop-blur md:block">
            &quot;You are not wrong for asking this.&quot; Daily Bread Hub is built for reverent devotion and honest seeking.
          </div>
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
    </main>
  );
}
