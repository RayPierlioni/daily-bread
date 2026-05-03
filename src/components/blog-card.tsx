import type { Blog, User } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { jsonArray } from "@/lib/devotionals";
import { formatDate } from "@/lib/utils";

export function BlogCard({ blog }: { blog: Blog & { author: Pick<User, "name"> } }) {
  return (
    <Card className="p-5">
      <p className="text-xs text-[#68706e]">
        {formatDate(blog.createdAt)} by {blog.author.name ?? "Daily Bread Hub"}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-[#24302f]">{blog.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#52605d]">{blog.body}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {jsonArray(blog.tags).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <LinkButton href={`/blog/${blog.id}`} variant="secondary" size="sm" className="mt-4">
        Read
      </LinkButton>
    </Card>
  );
}
