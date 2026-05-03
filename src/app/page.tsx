import { ArrowRight, BookOpen, HeartHandshake, Lock, MessageCircleQuestion, Users } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Daily devotionals personalized to your spiritual season.",
    body: "Begin with Scripture, reflection, prayer, and a gentle next step shaped by where you are right now.",
    icon: BookOpen
  },
  {
    title: "A safe place to ask honest questions.",
    body: "Explore God, Jesus, the Bible, faith, doubt, history, theology, and archaeology without shame.",
    icon: MessageCircleQuestion
  },
  {
    title: "A private prayer journal.",
    body: "Write prayers, record audio where supported, search your history, and mark answered prayers.",
    icon: Lock
  },
  {
    title: "Christian groups for prayer and encouragement.",
    body: "Join calm spaces for prayer requests, group devotionals, testimony, and thoughtful community.",
    icon: Users
  }
];

export default function LandingPage() {
  return (
    <main>
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/15 bg-[#1d2928]/72 px-4 py-3 text-white backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <LinkButton href="/" variant="ghost" className="font-sanctuary h-auto px-0 text-xl italic text-white hover:bg-transparent">
            Daily Bread Hub
          </LinkButton>
          <div className="flex items-center gap-2">
            <LinkButton href="/signin" variant="secondary" size="sm" className="border-white/30 bg-white/14 text-white hover:bg-white/24">
              Sign in
            </LinkButton>
            <LinkButton href="/signin" size="sm" className="bg-white text-[#24302f] hover:bg-[#f7f2e8]">
              Open Demo App
            </LinkButton>
          </div>
        </div>
      </header>
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
              <h2 className="font-semibold leading-6 text-[#24302f]">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#68706e]">{feature.body}</p>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
