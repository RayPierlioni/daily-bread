import { redirect } from "next/navigation";
import { CommunityPostCard } from "@/components/community-post-card";
import { EmptyState } from "@/components/empty-state";
import { PostComposer } from "@/components/post-composer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { humanizeEnum } from "@/lib/utils";

const postTypes = ["PRAYER_REQUEST", "PRAISE_REPORT", "REFLECTION", "QUESTION", "TESTIMONY", "BLOG", "DEVOTIONAL_DISCUSSION", "GROUP_ANNOUNCEMENT"];

export default async function CommunityPage({
  searchParams
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const user = await requireUser();
  if (!user.onboardingCompleted) redirect("/onboarding");
  const params = await searchParams;
  const type = params.type;

  const posts = await prisma.post.findMany({
    where: {
      visibility: "PUBLIC",
      type: type && postTypes.includes(type) ? (type as never) : undefined
    },
    include: {
      user: { select: { name: true, image: true, isSponsor: true } },
      comments: {
        orderBy: { createdAt: "asc" },
        include: { user: { select: { name: true, isSponsor: true } } }
      }
    },
    orderBy: { createdAt: "desc" },
    take: 40
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Community</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">A quieter Christian feed for prayer and encouragement.</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#68706e]">Designed for care, testimony, thoughtful questions, and non-performative community.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[24rem_minmax(0,1fr)]">
        <aside className="space-y-4">
          <PostComposer />
          <Card className="p-4">
            <p className="mb-3 text-sm font-semibold text-[#31413f]">Filter by type</p>
            <div className="flex flex-wrap gap-2">
              <a href="/community">
                <Badge className={!type ? "border-[#345d6f] bg-[#e9f0ea] text-[#345d6f]" : ""}>All</Badge>
              </a>
              {postTypes.map((item) => (
                <a href={`/community?type=${item}`} key={item}>
                  <Badge className={type === item ? "border-[#345d6f] bg-[#e9f0ea] text-[#345d6f]" : ""}>{humanizeEnum(item)}</Badge>
                </a>
              ))}
            </div>
          </Card>
        </aside>
        <section className="space-y-4">
          {posts.length ? posts.map((post) => <CommunityPostCard key={post.id} post={post} />) : <EmptyState title="No posts yet" description="Create a gentle first post for the community." />}
        </section>
      </div>
    </div>
  );
}
