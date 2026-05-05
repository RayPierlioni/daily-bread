import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/empty-state";
import { PrayerCard } from "@/components/prayer-card";
import { PrayerForm } from "@/components/prayer-form";
import { SearchInput } from "@/components/search-input";
import { requireUser } from "@/lib/current-user";
import { jsonArray } from "@/lib/devotionals";
import { prisma } from "@/lib/prisma";
import { humanizeEnum } from "@/lib/utils";

const statuses = ["ONGOING", "WAITING", "ANSWERED", "PRAISE_REPORT"];

export default async function PrayersPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; status?: string; tag?: string }>;
}) {
  const user = await requireUser();
  if (!user.onboardingCompleted) redirect("/onboarding");
  const params = await searchParams;
  const q = params.q?.toLowerCase().trim();
  const status = params.status;
  const tag = params.tag;

  const prayers = await prisma.prayer.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }
  });

  const allTags = [...new Set(prayers.flatMap((prayer) => jsonArray(prayer.tags)))];
  const filtered = prayers.filter((prayer) => {
    const haystack = [prayer.title, prayer.text, prayer.transcript, prayer.followUpNotes, prayer.status, ...jsonArray(prayer.tags)].filter(Boolean).join(" ").toLowerCase();
    return (!q || haystack.includes(q)) && (!status || prayer.status === status) && (!tag || jsonArray(prayer.tags).includes(tag));
  });
  const answered = filtered.filter((prayer) => prayer.status === "ANSWERED");
  const active = filtered.filter((prayer) => prayer.status !== "ANSWERED");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Prayer Journal</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">A private place to pray honestly and remember faithfully.</h1>
      </div>

      <Card className="border-[#d9cfbd] bg-[#fffdf8] p-4">
        <div className="flex items-start gap-3 text-sm leading-6 text-[#52605d]">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#345d6f]" aria-hidden="true" />
          <p>
            Prayers are private by default. They are not shown in community, groups, your profile, or analytics. Sharing to a group requires an intentional privacy change.
          </p>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_25rem]">
        <section className="space-y-4">
          <Card className="p-4">
            <form className="space-y-3">
              <SearchInput placeholder="Search title, text, transcript, tags, notes, or status" />
              <div className="flex flex-wrap gap-2">
                <a href="/prayers">
                  <Badge>All</Badge>
                </a>
                {statuses.map((item) => (
                  <a key={item} href={`/prayers?status=${item}`}>
                    <Badge className={status === item ? "border-[#345d6f] bg-[#e9f0ea] text-[#345d6f]" : ""}>{humanizeEnum(item)}</Badge>
                  </a>
                ))}
                {allTags.map((item) => (
                  <a key={item} href={`/prayers?tag=${encodeURIComponent(item)}`}>
                    <Badge className={tag === item ? "border-[#345d6f] bg-[#e9f0ea] text-[#345d6f]" : ""}>{item}</Badge>
                  </a>
                ))}
              </div>
            </form>
          </Card>

          {active.length ? (
            active.map((prayer) => <PrayerCard key={prayer.id} prayer={prayer} />)
          ) : prayers.length ? (
            <EmptyState title="No active prayers found" description="Try a different filter or write a new prayer." />
          ) : (
            <EmptyState title="Start with one honest sentence" description="Try: God, today I feel... Your first prayer can be simple, private, and unfinished." />
          )}

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#24302f]">Answered prayers</h2>
            {answered.length ? answered.map((prayer) => <PrayerCard key={prayer.id} prayer={prayer} />) : <p className="text-sm text-[#68706e]">Answered prayers will gather here as you mark them.</p>}
          </section>
        </section>

        <aside>
          <Card>
            <CardHeader>
              <CardTitle>New prayer</CardTitle>
              <p className="text-sm leading-6 text-[#68706e]">Your prayer does not need to be polished. Start with what is true, and keep it private unless you choose otherwise.</p>
            </CardHeader>
            <CardContent>
              <PrayerForm />
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
