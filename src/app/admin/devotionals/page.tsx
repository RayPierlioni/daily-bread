import { Plus } from "lucide-react";
import { AdminTable } from "@/components/admin-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Select, Textarea } from "@/components/ui/form-fields";
import { createDevotional } from "@/lib/actions";
import { requireAdmin } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { focusCategories } from "@/lib/validations";
import { formatDate } from "@/lib/utils";

export default async function AdminDevotionalsPage() {
  await requireAdmin();
  const devotionals = await prisma.devotional.findMany({ orderBy: { date: "desc" }, take: 30 });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Devotional management</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_28rem]">
        <AdminTable
          headers={["Date", "Title", "Scripture", "Status"]}
          rows={devotionals.map((item) => [formatDate(item.date), item.title, item.scriptureReference, <Badge key={item.id}>{item.status}</Badge>])}
        />

        <Card>
          <CardHeader>
            <CardTitle>Create or schedule devotional</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createDevotional} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scriptureReference">Scripture reference</Label>
                <Input id="scriptureReference" name="scriptureReference" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scriptureText">Scripture text</Label>
                <Textarea id="scriptureText" name="scriptureText" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Body</Label>
                <Textarea id="body" name="body" className="min-h-36" required />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="reflectionQuestion">Reflection question</Label>
                  <Input id="reflectionQuestion" name="reflectionQuestion" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prayerPrompt">Prayer prompt</Label>
                  <Input id="prayerPrompt" name="prayerPrompt" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="actionStep">Action step</Label>
                <Input id="actionStep" name="actionStep" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" name="tags" placeholder="morning, mercy" />
              </div>
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium text-[#31413f]">Spiritual focus categories</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {focusCategories.map((category) => (
                    <label key={category} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="spiritualFocusCategories" value={category} className="h-4 w-4 accent-[#345d6f]" />
                      {category}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select id="status" name="status" defaultValue="DRAFT">
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </Select>
              </div>
              <Button type="submit">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Save devotional
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
