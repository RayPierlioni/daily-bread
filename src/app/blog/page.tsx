import { redirect } from "next/navigation";
import { PenSquare } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Select, Textarea } from "@/components/ui/form-fields";
import { createBlogPost } from "@/lib/actions";
import { requireUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export default async function BlogPage() {
  const user = await requireUser();
  if (!user.onboardingCompleted) redirect("/onboarding");

  const blogs = await prisma.blog.findMany({
    where: { status: "PUBLISHED" },
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Blog</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Long-form reflections for thoughtful faith.</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_25rem]">
        <section className="grid gap-4 md:grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </section>
        <aside>
          <Card>
            <CardHeader>
              <CardTitle>Write a post</CardTitle>
              <p className="text-sm leading-6 text-[#68706e]">Save a draft or publish a reflection.</p>
            </CardHeader>
            <CardContent>
              <form action={createBlogPost} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body">Body</Label>
                  <Textarea id="body" name="body" className="min-h-44" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" name="tags" placeholder="discipleship, prayer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select id="status" name="status" defaultValue="DRAFT">
                    <option value="DRAFT">Save draft</option>
                    <option value="PUBLISHED">Publish</option>
                  </Select>
                </div>
                <Button type="submit">
                  <PenSquare className="h-4 w-4" aria-hidden="true" />
                  Save post
                </Button>
              </form>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
