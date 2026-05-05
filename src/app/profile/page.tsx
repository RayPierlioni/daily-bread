import { redirect } from "next/navigation";
import { Bookmark, MessageSquareText, ShieldCheck } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

type PrivacySettings = {
  showBio?: boolean;
  showChurch?: boolean;
  showDenomination?: boolean;
  shareAnsweredPrayerCount?: boolean;
};

export default async function ProfilePage() {
  const user = await requireUser();
  if (!user.onboardingCompleted) redirect("/onboarding");
  const privacy = user.privacySettings as PrivacySettings;

  const [savedDevotionals, posts, blogs, answeredCount] = await Promise.all([
    prisma.userDevotional.findMany({
      where: { userId: user.id, saved: true },
      include: { devotional: true },
      orderBy: { updatedAt: "desc" }
    }),
    prisma.post.findMany({
      where: { userId: user.id, visibility: "PUBLIC" },
      orderBy: { createdAt: "desc" },
      take: 6
    }),
    prisma.blog.findMany({
      where: { authorId: user.id, status: "PUBLISHED" },
      include: { author: { select: { name: true, isSponsor: true } } },
      orderBy: { createdAt: "desc" },
      take: 4
    }),
    prisma.prayer.count({ where: { userId: user.id, status: "ANSWERED" } })
  ]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e4dccd] bg-white/78 p-6">
        <div className="flex flex-wrap items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="h-20 w-20 rounded-full object-cover" />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#dfe9dd] text-2xl font-semibold text-[#345d6f]">{user.name?.[0] ?? "D"}</div>
          )}
          <div>
            <h1 className="text-3xl font-semibold text-[#24302f]">{user.name ?? "Next Faithful Step user"}</h1>
            <p className="mt-1 text-sm text-[#68706e]">{user.email}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {user.spiritualFocusProfile ? <Badge>{user.spiritualFocusProfile}</Badge> : null}
              {privacy.shareAnsweredPrayerCount ? <Badge>{answeredCount} answered prayers</Badge> : null}
            </div>
          </div>
        </div>
        {privacy.showBio && user.bio ? <p className="mt-5 max-w-3xl text-sm leading-6 text-[#52605d]">{user.bio}</p> : null}
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-[#68706e]">
          {privacy.showChurch && user.church ? <span>{user.church}</span> : null}
          {privacy.showDenomination && user.denomination ? <span>{user.denomination}</span> : null}
        </div>
      </section>

      <Card className="border-[#d9cfbd] bg-[#fffdf8] p-5">
        <div className="flex items-start gap-3 text-sm leading-6 text-[#52605d]">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#345d6f]" aria-hidden="true" />
          <p>
            This profile is privacy-aware. Private prayers, faith questions, assessment answers, and devotional notes never appear here. Only profile fields you enable, saved devotionals, and public posts you choose to publish are shown.
          </p>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-[#345d6f]" aria-hidden="true" />
              Saved devotionals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedDevotionals.length ? (
              savedDevotionals.map((item) => (
                <div key={item.id} className="rounded-lg border border-[#eee5d8] bg-white/70 p-3">
                  <p className="text-xs text-[#68706e]">{formatDate(item.devotional.date)}</p>
                  <p className="mt-1 font-medium text-[#24302f]">{item.devotional.title}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#68706e]">Saved devotionals will appear here.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquareText className="h-5 w-5 text-[#345d6f]" aria-hidden="true" />
              Public posts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {posts.length ? posts.map((post) => <p key={post.id} className="rounded-lg border border-[#eee5d8] bg-white/70 p-3 text-sm text-[#31413f]">{post.title}</p>) : <p className="text-sm text-[#68706e]">Public posts you choose to share will appear here.</p>}
          </CardContent>
        </Card>
      </div>

      {blogs.length ? (
        <section className="grid gap-4 md:grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </section>
      ) : null}
    </div>
  );
}
