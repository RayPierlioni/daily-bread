import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { GroupCard } from "@/components/group-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Select, Textarea } from "@/components/ui/form-fields";
import { createGroup } from "@/lib/actions";
import { requireUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export default async function GroupsPage() {
  const user = await requireUser();
  if (!user.onboardingCompleted) redirect("/onboarding");

  const groups = await prisma.prayerGroup.findMany({
    include: { _count: { select: { members: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Prayer Groups</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Pray, reflect, and do devotionals together.</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <section className="grid gap-4 md:grid-cols-2">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} memberCount={group._count.members} />
          ))}
        </section>
        <aside>
          <Card>
            <CardHeader>
              <CardTitle>Create a group</CardTitle>
              <p className="text-sm leading-6 text-[#68706e]">Start with a clear purpose and gentle expectations.</p>
            </CardHeader>
            <CardContent>
              <form action={createGroup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="privacy">Privacy</Label>
                  <Select id="privacy" name="privacy" defaultValue="PUBLIC">
                    <option value="PUBLIC">Public</option>
                    <option value="PRIVATE">Private</option>
                    <option value="INVITE_ONLY">Invite only</option>
                  </Select>
                </div>
                <Button type="submit">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Create group
                </Button>
              </form>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
