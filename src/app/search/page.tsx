import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/search-input";
import { requireUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { jsonArray } from "@/lib/devotionals";
import { formatDate } from "@/lib/utils";

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const user = await requireUser();
  if (!user.onboardingCompleted) redirect("/onboarding");
  const { q = "" } = await searchParams;
  const term = q.trim().toLowerCase();

  const [devotionals, prayers, questions, blogs, posts, groups] = await Promise.all([
    prisma.devotional.findMany({ where: { status: "PUBLISHED" }, take: 50, orderBy: { date: "desc" } }),
    prisma.prayer.findMany({ where: { userId: user.id }, take: 50, orderBy: { createdAt: "desc" } }),
    prisma.faithQuestion.findMany({ where: { userId: user.id }, take: 50, orderBy: { createdAt: "desc" } }),
    prisma.blog.findMany({ where: { OR: [{ status: "PUBLISHED" }, { authorId: user.id }] }, take: 50, orderBy: { createdAt: "desc" } }),
    prisma.post.findMany({ where: { visibility: "PUBLIC" }, take: 50, orderBy: { createdAt: "desc" } }),
    prisma.prayerGroup.findMany({ take: 50, orderBy: { createdAt: "desc" } })
  ]);

  const matches = term
    ? [
        ...devotionals
          .filter((item) => [item.title, item.body, item.scriptureReference, item.scriptureText, ...jsonArray(item.tags)].join(" ").toLowerCase().includes(term))
          .map((item) => ({ type: "Devotional", title: item.title, body: item.scriptureReference, date: item.date })),
        ...prayers
          .filter((item) => [item.title, item.text, item.transcript, item.followUpNotes, item.status, ...jsonArray(item.tags)].filter(Boolean).join(" ").toLowerCase().includes(term))
          .map((item) => ({ type: "Private prayer", title: item.title, body: item.text, date: item.createdAt })),
        ...questions
          .filter((item) => [item.question, item.aiAnswer, ...jsonArray(item.tags)].join(" ").toLowerCase().includes(term))
          .map((item) => ({ type: "Faith question", title: item.question, body: item.aiAnswer, date: item.createdAt })),
        ...blogs
          .filter((item) => [item.title, item.body, ...jsonArray(item.tags)].join(" ").toLowerCase().includes(term))
          .map((item) => ({ type: "Blog", title: item.title, body: item.body, date: item.createdAt })),
        ...posts
          .filter((item) => [item.title, item.body, item.type, ...jsonArray(item.tags)].join(" ").toLowerCase().includes(term))
          .map((item) => ({ type: "Community post", title: item.title, body: item.body, date: item.createdAt })),
        ...groups
          .filter((item) => [item.name, item.description, item.privacy].join(" ").toLowerCase().includes(term))
          .map((item) => ({ type: "Prayer group", title: item.name, body: item.description, date: item.createdAt }))
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Global Search</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Search across your faith hub.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#68706e]">Private prayers and questions only search your own account.</p>
      </div>
      <Card className="p-4">
        <form>
          <SearchInput placeholder="Search devotionals, prayers, questions, posts, blogs, or groups" />
        </form>
      </Card>
      <section className="space-y-3">
        {matches.map((item, index) => (
          <Card key={`${item.type}-${index}`} className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{item.type}</Badge>
              <span className="text-xs text-[#68706e]">{formatDate(item.date)}</span>
            </div>
            <h2 className="mt-2 font-semibold text-[#24302f]">{item.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#52605d]">{item.body}</p>
          </Card>
        ))}
        {term && !matches.length ? <p className="text-sm text-[#68706e]">No results found.</p> : null}
      </section>
    </div>
  );
}
