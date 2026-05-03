import type { Comment, Post, User } from "@prisma/client";
import { Flag, HeartHandshake, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/form-fields";
import { createComment, createReport } from "@/lib/actions";
import { jsonArray } from "@/lib/devotionals";
import { formatDate, humanizeEnum } from "@/lib/utils";

type PostWithRelations = Post & {
  user: Pick<User, "name" | "image">;
  comments: Array<Comment & { user: Pick<User, "name"> }>;
};

export function CommunityPostCard({ post }: { post: PostWithRelations }) {
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{humanizeEnum(post.type)}</Badge>
            <span className="text-xs text-[#68706e]">{formatDate(post.createdAt)}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-[#24302f]">{post.title}</h3>
          <p className="mt-1 text-xs text-[#68706e]">by {post.user.name ?? "A community member"}</p>
        </div>
        <form action={createReport.bind(null, "POST", post.id)} className="flex items-center gap-2">
          <input type="hidden" name="reason" value="Community report" />
          <Button type="submit" variant="ghost" size="sm">
            <Flag className="h-4 w-4" aria-hidden="true" />
            Report
          </Button>
        </form>
      </div>
      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#31413f]">{post.body}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {jsonArray(post.tags).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2 border-t border-[#eee5d8] pt-4">
        <Button type="button" variant="secondary" size="sm">
          <HeartHandshake className="h-4 w-4" aria-hidden="true" />
          Amen
        </Button>
        <Button type="button" variant="ghost" size="sm">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {post.comments.length} comments
        </Button>
      </div>
      <div className="mt-4 space-y-3">
        {post.comments.slice(0, 3).map((comment) => (
          <div key={comment.id} className="rounded-lg bg-[#fbf7ef] p-3 text-sm leading-6">
            <span className="font-medium text-[#24302f]">{comment.user.name ?? "Community member"}: </span>
            <span className="text-[#52605d]">{comment.body}</span>
          </div>
        ))}
        <form action={createComment.bind(null, post.id)} className="flex gap-2">
          <Input name="body" placeholder="Add a gentle comment" aria-label="Comment" />
          <Button type="submit" variant="secondary">
            Reply
          </Button>
        </form>
      </div>
    </Card>
  );
}
