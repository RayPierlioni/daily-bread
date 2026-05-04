import { notFound, redirect } from "next/navigation";
import { PenSquare } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Select, Textarea } from "@/components/ui/form-fields";
import { updateBlogPost } from "@/lib/actions";
import { requireUser } from "@/lib/current-user";
import { jsonArray } from "@/lib/devotionals";
import { prisma } from "@/lib/prisma";

export default async function EditBlogPostPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  if (!user.onboardingCompleted) redirect("/onboarding");
  const { id } = await params;

  const blog = await prisma.blog.findUnique({
    where: { id }
  });

  if (!blog || (blog.authorId !== user.id && user.role !== "ADMIN")) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Blog</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Edit your post</h1>
        <p className="mt-3 text-sm leading-6 text-[#68706e]">Update the title, body, tags, or publication status.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{blog.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateBlogPost.bind(null, blog.id)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={blog.title} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="body">Body</Label>
              <Textarea id="body" name="body" className="min-h-72" defaultValue={blog.body} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" name="tags" defaultValue={jsonArray(blog.tags).join(", ")} placeholder="discipleship, prayer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select id="status" name="status" defaultValue={blog.status}>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </Select>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="submit">
                <PenSquare className="h-4 w-4" aria-hidden="true" />
                Save changes
              </Button>
              <LinkButton href={`/blog/${blog.id}`} variant="secondary">
                Cancel
              </LinkButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
