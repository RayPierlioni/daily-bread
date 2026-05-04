import { notFound, redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/form-fields";
import { SponsorBadge } from "@/components/sponsor-badge";
import { createBlogComment } from "@/lib/actions";
import { requireUser } from "@/lib/current-user";
import { jsonArray } from "@/lib/devotionals";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  if (!user.onboardingCompleted) redirect("/onboarding");
  const { id } = await params;

  const blog = await prisma.blog.findUnique({
    where: { id },
    include: {
      author: { select: { name: true, isSponsor: true } },
      comments: {
        orderBy: { createdAt: "asc" },
        include: { user: { select: { name: true, isSponsor: true } } }
      }
    }
  });

  if (!blog || (blog.status !== "PUBLISHED" && blog.authorId !== user.id)) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#68706e]">
          <span>{formatDate(blog.createdAt)} by {blog.author.name ?? "Next Faithful Step"}</span>
          <SponsorBadge isSponsor={blog.author.isSponsor} />
        </div>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-[#24302f]">{blog.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {jsonArray(blog.tags).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
      <Card className="p-6">
        <div className="prose-soft whitespace-pre-line text-base leading-8 text-[#31413f]">{blog.body}</div>
      </Card>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[#24302f]">Comments</h2>
        {blog.comments.map((comment) => (
          <Card key={comment.id} className="p-4 text-sm leading-6">
            <span className="inline-flex flex-wrap items-center gap-2">
              <span className="font-medium text-[#24302f]">{comment.user.name ?? "Reader"}</span>
              <SponsorBadge isSponsor={comment.user.isSponsor} />
              <span className="font-medium text-[#24302f]">:</span>
            </span>{" "}
            <span className="text-[#52605d]">{comment.body}</span>
          </Card>
        ))}
        <form action={createBlogComment.bind(null, blog.id)} className="flex gap-2">
          <Input name="body" placeholder="Add a thoughtful comment" aria-label="Blog comment" />
          <Button type="submit" variant="secondary">
            Comment
          </Button>
        </form>
      </section>
    </article>
  );
}
