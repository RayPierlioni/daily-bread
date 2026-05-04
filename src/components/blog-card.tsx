import type { Blog, User } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SponsorBadge } from "@/components/sponsor-badge";
import { jsonArray } from "@/lib/devotionals";
import { formatDate } from "@/lib/utils";

export function BlogCard({
  blog,
  currentUserId,
  currentUserRole
}: {
  blog: Blog & { author: Pick<User, "name" | "isSponsor"> };
  currentUserId?: string;
  currentUserRole?: "USER" | "ADMIN";
}) {
  const canEdit = currentUserRole === "ADMIN" || currentUserId === blog.authorId;

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs text-[#68706e]">
        <span>{formatDate(blog.createdAt)} by {blog.author.name ?? "Next Faithful Step"}</span>
        <SponsorBadge isSponsor={blog.author.isSponsor} />
        {blog.status === "DRAFT" ? <Badge className="border-[#b38b4d]/35 bg-[#fbf7ef] text-[#7a5a20]">Draft</Badge> : null}
      </div>
      <h3 className="mt-2 text-lg font-semibold text-[#24302f]">{blog.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#52605d]">{blog.body}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {jsonArray(blog.tags).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <LinkButton href={`/blog/${blog.id}`} variant="secondary" size="sm">
          Read
        </LinkButton>
        {canEdit ? (
          <LinkButton href={`/blog/${blog.id}/edit`} variant="ghost" size="sm">
            Edit
          </LinkButton>
        ) : null}
      </div>
    </Card>
  );
}
