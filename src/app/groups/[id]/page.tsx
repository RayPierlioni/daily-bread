import { notFound, redirect } from "next/navigation";
import { BookOpenCheck, Users } from "lucide-react";
import { CommunityPostCard } from "@/components/community-post-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Select, Textarea } from "@/components/ui/form-fields";
import { createCommunityPost, joinGroup } from "@/lib/actions";
import { requireUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { humanizeEnum } from "@/lib/utils";

export default async function GroupDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  if (!user.onboardingCompleted) redirect("/onboarding");
  const { id } = await params;

  const group = await prisma.prayerGroup.findUnique({
    where: { id },
    include: {
      members: { include: { user: { select: { name: true } } } },
      posts: {
        where: { visibility: { in: ["PUBLIC", "GROUP"] } },
        include: {
          user: { select: { name: true, image: true, isSponsor: true } },
          comments: { include: { user: { select: { name: true, isSponsor: true } } }, orderBy: { createdAt: "asc" } }
        },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!group) notFound();

  const isMember = group.members.some((member) => member.userId === user.id);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e4dccd] bg-white/78 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge>{humanizeEnum(group.privacy)}</Badge>
            <h1 className="mt-3 text-3xl font-semibold text-[#24302f]">{group.name}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#68706e]">{group.description}</p>
          </div>
          <form action={joinGroup.bind(null, group.id)}>
            <Button type="submit" variant={isMember ? "secondary" : "primary"}>
              <Users className="h-4 w-4" aria-hidden="true" />
              {isMember ? "Joined" : "Join group"}
            </Button>
          </form>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[24rem_minmax(0,1fr)]">
        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Group devotional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-[#f7fbf8] p-4 text-sm leading-6 text-[#52605d]">
                <BookOpenCheck className="mb-2 h-5 w-5 text-[#345d6f]" aria-hidden="true" />
                Group devotional plans are structured for the next iteration. For now, share reflections in this group feed.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Share in group</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={createCommunityPost} className="space-y-4">
                <input type="hidden" name="visibility" value="GROUP" />
                <input type="hidden" name="groupId" value={group.id} />
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select id="type" name="type" defaultValue="PRAYER_REQUEST">
                    <option value="PRAYER_REQUEST">Prayer Request</option>
                    <option value="PRAISE_REPORT">Praise Report</option>
                    <option value="REFLECTION">Reflection</option>
                    <option value="DEVOTIONAL_DISCUSSION">Devotional Discussion</option>
                    <option value="GROUP_ANNOUNCEMENT">Group Announcement</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body">Body</Label>
                  <Textarea id="body" name="body" required />
                </div>
                <Button type="submit">Share with group</Button>
              </form>
            </CardContent>
          </Card>
        </aside>

        <section className="space-y-4">
          {group.posts.map((post) => (
            <CommunityPostCard key={post.id} post={post} />
          ))}
        </section>
      </div>
    </div>
  );
}
