import { Plus } from "lucide-react";
import { AdminTable } from "@/components/admin-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Select, Textarea } from "@/components/ui/form-fields";
import { createSourceLibraryItem } from "@/lib/actions";
import { requireAdmin } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export default async function AdminSourceLibraryPage() {
  await requireAdmin();
  const items = await prisma.sourceLibraryItem.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Source library</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_26rem]">
        <AdminTable headers={["Title", "Category", "Summary"]} rows={items.map((item) => [item.title, <Badge key={item.id}>{item.category}</Badge>, item.summary])} />
        <Card>
          <CardHeader>
            <CardTitle>Add source item</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createSourceLibraryItem} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select id="category" name="category">
                  <option value="SCRIPTURE">Scripture</option>
                  <option value="THEOLOGY">Theology</option>
                  <option value="CHURCH_HISTORY">Church History</option>
                  <option value="ARCHAEOLOGY">Archaeology</option>
                  <option value="APOLOGETICS">Apologetics</option>
                  <option value="PASTORAL">Pastoral</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea id="summary" name="summary" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" name="content" className="min-h-36" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scriptureReferences">Scripture references</Label>
                <Input id="scriptureReferences" name="scriptureReferences" placeholder="John 1, Psalm 13" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="externalReference">External reference</Label>
                <Input id="externalReference" name="externalReference" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" name="tags" />
              </div>
              <Button type="submit">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add item
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
