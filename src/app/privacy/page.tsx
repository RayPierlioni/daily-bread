import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, EyeOff, HeartHandshake, Lock, ShieldCheck } from "lucide-react";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingHeader } from "@/components/marketing-header";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Plain-language privacy information for Next Faithful Step, including what stays private and what users choose to share.",
  alternates: {
    canonical: "/privacy"
  }
};

const privateItems = [
  "Your private prayers and prayer journal entries",
  "Your faith questions and saved Ask in Faith answers",
  "Your assessment answers, if you choose to take the assessment",
  "Your devotional notes and personal progress",
  "Your reminder settings and personalization preferences"
];

const sharedItems = [
  "Community posts, blog posts, comments, or group posts you intentionally publish",
  "Profile details you choose to show in Settings",
  "A supporter badge if support has been verified and you choose to post publicly"
];

const services = [
  "Google sign-in is used so your account can be saved securely.",
  "Vercel hosts the app.",
  "Supabase/Postgres stores app data such as your account, progress, prayers, questions, and posts.",
  "Buy Me a Coffee is used for optional mission support and opens outside this app.",
  "Ask in Faith may use a curated local answer library, a mock fallback, or OpenAI if an API key is configured."
];

export default function PrivacyPage() {
  return (
    <main>
      <MarketingHeader />
      <section className="border-b border-[#e4dccd] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">Privacy</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#24302f] sm:text-5xl">Your spiritual life should feel safe here.</h1>
          <p className="mt-5 text-lg leading-8 text-[#52605d]">
            Next Faithful Step is built around a simple privacy promise: your prayers, assessment answers, faith questions, and devotional notes are private by default. You share only what you choose.
          </p>
          <p className="mt-4 text-sm leading-6 text-[#68706e]">Last updated May 5, 2026.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <Card className="p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#dfe9dd] text-[#345d6f]">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold text-[#24302f]">Private by default</h2>
          <p className="mt-3 text-sm leading-7 text-[#52605d]">The app is designed so sensitive spiritual content stays in your account unless you intentionally publish or share something.</p>
        </Card>
        <Card className="p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#fbf0d8] text-[#9b773f]">
            <EyeOff className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold text-[#24302f]">Analytics stay limited</h2>
          <p className="mt-3 text-sm leading-7 text-[#52605d]">We count actions like devotional completions and support clicks, but analytics do not store prayer text, journal text, assessment answers, or faith-question text.</p>
        </Card>
        <Card className="p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#dfe9dd] text-[#345d6f]">
            <HeartHandshake className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold text-[#24302f]">Support, not replacement</h2>
          <p className="mt-3 text-sm leading-7 text-[#52605d]">The app can encourage reflection, but it does not replace pastors, counselors, churches, doctors, emergency care, or trusted people.</p>
        </Card>
      </section>

      <section className="border-y border-[#e4dccd] bg-[#f0eadf]/70 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#345d6f]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              What stays private
            </div>
            <ul className="space-y-3 text-sm leading-7 text-[#52605d]">
              {privateItems.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#9b773f]">
              <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
              What can become public
            </div>
            <ul className="space-y-3 text-sm leading-7 text-[#52605d]">
              {sharedItems.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-[#24302f]">Services involved</h2>
        <p className="mt-3 text-sm leading-7 text-[#52605d]">
          Next Faithful Step uses a few services to run the app. These services help with sign-in, hosting, data storage, optional support, and Ask in Faith answers.
        </p>
        <ul className="mt-5 space-y-3 text-sm leading-7 text-[#52605d]">
          {services.map((service) => (
            <li key={service}>- {service}</li>
          ))}
        </ul>

        <Card className="mt-8 border-[#d9cfbd] bg-[#fffdf8] p-5">
          <h2 className="text-xl font-semibold text-[#24302f]">Your choices</h2>
          <p className="mt-3 text-sm leading-7 text-[#52605d]">
            You can start with Faithful Foundations without taking the assessment. You can change profile visibility in Settings. Export and delete-account tools are planned but not active yet; until those are built, contact the app owner if you need help with account data.
          </p>
          <p className="mt-4 text-sm text-[#68706e]">
            Questions? Return to{" "}
            <Link href="/" className="font-medium text-[#345d6f] hover:underline">
              Next Faithful Step
            </Link>
            .
          </p>
        </Card>
      </section>
      <MarketingFooter />
    </main>
  );
}
