import { redirect } from "next/navigation";
import { ArrowRight, BookOpen, CalendarCheck, Heart, MessageCircleQuestion, PenLine, Share2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, LinkButton } from "@/components/ui/button";
import { Textarea } from "@/components/ui/form-fields";
import { Badge } from "@/components/ui/badge";
import { PrivacyBadge } from "@/components/privacy-badge";
import { createQuickPrayer, toggleDevotionalComplete, toggleDevotionalSaved } from "@/lib/actions";
import { requireUser } from "@/lib/current-user";
import { getCurrentDevotionalForUser, jsonArray } from "@/lib/devotionals";
import { prisma } from "@/lib/prisma";
import { formatDate, humanizeEnum } from "@/lib/utils";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default async function DashboardPage() {
  const user = await requireUser();
  if (!user.onboardingCompleted) redirect("/onboarding");

  const current = await getCurrentDevotionalForUser(user);
  const devotional = current.devotional;
  const state = current.state;
  const [prayers, posts, completedCount] = await Promise.all([
    prisma.prayer.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 4
    }),
    prisma.post.findMany({
      where: { visibility: "PUBLIC" },
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 3
    }),
    prisma.userDevotional.count({ where: { userId: user.id, completed: true } })
  ]);

  const trackPercent = current.total ? Math.round((Math.min(current.sequence, current.total) / current.total) * 100) : 0;
  const firstName = user.name?.split(" ")[0] ?? "friend";

  return (
    <div className="space-y-7">
      <section className="soft-panel overflow-hidden rounded-2xl border border-[#e4dccd]">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <div className="space-y-7 p-5 sm:p-7 lg:p-9">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b38b4d]">Welcome Home</p>
              <h1 className="font-sanctuary mt-3 text-4xl leading-tight text-[#152322] sm:text-5xl">
                {greeting()}, {firstName}.
              </h1>
              <p className="font-sanctuary mt-4 max-w-2xl text-base italic leading-8 text-[#53605b]">
                Your devotional path is personal and sequential. If you miss two weeks, you will return to the next reading in your track, not a skipped calendar day.
              </p>
            </div>

            {devotional ? (
              <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(17rem,0.85fr)]">
                <Card className="relative overflow-hidden rounded-2xl border-[#e7decd] bg-white/92 p-6 shadow-[0_18px_40px_rgba(36,48,47,0.07)]">
                  <div className="flex items-center justify-between gap-3">
                    <Badge className="bg-[#dfe9dd] text-[#52633f]">Verse of the Day</Badge>
                    <div className="flex items-center gap-2 text-[#52605d]">
                      <form action={toggleDevotionalSaved.bind(null, devotional.id)}>
                        <button className="rounded-full p-2 transition hover:bg-[#f3eee4]" type="submit" aria-label="Save devotional">
                          <Heart className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </form>
                      <button className="rounded-full p-2 transition hover:bg-[#f3eee4]" type="button" aria-label="Share devotional placeholder">
                        <Share2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-12 border-l-4 border-[#d8b56f] pl-6">
                    <blockquote className="font-sanctuary text-2xl leading-10 text-[#1d2c2b]">&quot;{devotional.scriptureText}&quot;</blockquote>
                    <p className="mt-5 text-sm font-medium text-[#31413f]">- {devotional.scriptureReference}</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <LinkButton href="/devotional" variant="primary">
                      Read full chapter
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </LinkButton>
                    <form action={toggleDevotionalComplete.bind(null, devotional.id)}>
                      <Button type="submit" variant={state?.completed ? "gold" : "secondary"}>
                        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                        {state?.completed ? "Completed" : "Mark complete"}
                      </Button>
                    </form>
                  </div>
                </Card>

                <Card className="rounded-2xl border-[#e7decd] bg-[#f4f5e9] p-6 text-center shadow-[0_18px_40px_rgba(36,48,47,0.06)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#52633f]">Your Devotional Path</p>
                  <div className="mx-auto mt-8 flex h-32 w-32 items-center justify-center rounded-full p-2" style={{ background: `conic-gradient(#52633f ${trackPercent}%, #e2e5d3 0)` }}>
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#f4f5e9]">
                      <span className="font-sanctuary text-4xl text-[#1d2c2b]">{trackPercent}%</span>
                      <span className="mt-1 text-[11px] text-[#68706e]">Track Progress</span>
                    </div>
                  </div>
                  <p className="mx-auto mt-7 max-w-44 text-sm leading-6 text-[#52605d]">
                    You are on step {Math.min(current.sequence, Math.max(current.total, 1))} of {current.total || 1} in {current.track?.title ?? "your foundations track"}.
                  </p>
                  <div className="mt-7 border-t border-[#e0dec9] pt-4 text-xs text-[#68706e]">{completedCount} completed readings total</div>
                </Card>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(19rem,0.52fr)]">
        <Card className="overflow-hidden rounded-2xl border-[#e4dccd] bg-white/86">
          <div className="grid min-h-64 md:grid-cols-[16rem_minmax(0,1fr)]">
            <div
              className="min-h-52 bg-[#d8c08e]"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(36,48,47,0.05), rgba(36,48,47,0.18)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80')",
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}
            />
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[#9a7c49]">
                <span>10 min read</span>
                {devotional ? <span>{formatDate(devotional.date)}</span> : null}
              </div>
              <h2 className="font-sanctuary mt-4 text-2xl text-[#1d2c2b]">{devotional?.title ?? "Today's devotional"}</h2>
              <p className="mt-4 line-clamp-4 text-sm leading-7 text-[#52605d]">{devotional?.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {devotional
                  ? jsonArray(devotional.spiritualFocusCategories)
                      .slice(0, 3)
                      .map((category) => <Badge key={category}>{category}</Badge>)
                  : null}
              </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border-[#ead6ad] bg-[#fff7e8] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8c6a33] text-white">
              <PenLine className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8c6a33]">Morning Prayer</p>
          </div>
          <p className="font-sanctuary mt-6 text-xl italic leading-9 text-[#5a3e18]">&quot;{devotional?.prayerPrompt ?? "Lord, meet me with mercy today."}&quot;</p>
          <form action={createQuickPrayer} className="mt-5 space-y-3">
            <Textarea name="text" placeholder="Write a short prayer..." required className="min-h-24 bg-white/72" />
            <Button type="submit" variant="gold" className="w-full">
              Save private prayer
            </Button>
          </form>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircleQuestion className="h-5 w-5 text-[#345d6f]" aria-hidden="true" />
              Ask in Faith
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action="/ask" className="space-y-3">
              <Textarea name="q" placeholder="What question are you carrying?" />
              <Button type="submit" variant="secondary" className="w-full">
                Ask gently
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent prayers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {prayers.length ? (
              prayers.map((prayer) => (
                <div key={prayer.id} className="rounded-lg border border-[#eee5d8] bg-white/70 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-[#24302f]">{prayer.title}</p>
                    <PrivacyBadge level={prayer.privacyLevel} />
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#68706e]">{prayer.text}</p>
                  <Badge className="mt-3">{humanizeEnum(prayer.status)}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm leading-6 text-[#68706e]">Your private prayer journal is ready when you are.</p>
            )}
            <LinkButton href="/prayers" variant="ghost" size="sm">
              Open prayer journal
            </LinkButton>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#345d6f]" aria-hidden="true" />
              Community prayer preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="rounded-lg border border-[#eee5d8] bg-white/70 p-3">
                <div className="flex items-center gap-2">
                  <Badge>{humanizeEnum(post.type)}</Badge>
                  <Sparkles className="h-3.5 w-3.5 text-[#b38b4d]" aria-hidden="true" />
                </div>
                <p className="mt-2 text-sm font-medium text-[#24302f]">{post.title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#68706e]">{post.body}</p>
              </div>
            ))}
            <LinkButton href="/community" variant="ghost" size="sm">
              Visit community
            </LinkButton>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
