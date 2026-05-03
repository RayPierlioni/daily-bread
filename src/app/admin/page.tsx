import { FileText, Library, ShieldAlert, Users } from "lucide-react";
import { AdminTable } from "@/components/admin-table";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { requireAdmin } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  await requireAdmin();

  const [devotionals, reports, users, sources] = await Promise.all([
    prisma.devotional.count(),
    prisma.report.count({ where: { status: "OPEN" } }),
    prisma.user.count(),
    prisma.sourceLibraryItem.count()
  ]);

  const cards = [
    { label: "Devotionals", value: devotionals, icon: FileText, href: "/admin/devotionals" },
    { label: "Open reports", value: reports, icon: ShieldAlert, href: "/admin/reports" },
    { label: "Users", value: users, icon: Users, href: "/admin" },
    { label: "Source items", value: sources, icon: Library, href: "/admin/source-library" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Manage content with care.</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="p-5">
              <Icon className="h-5 w-5 text-[#345d6f]" aria-hidden="true" />
              <p className="mt-4 text-3xl font-semibold text-[#24302f]">{item.value}</p>
              <p className="text-sm text-[#68706e]">{item.label}</p>
              <LinkButton href={item.href} variant="ghost" size="sm" className="mt-3">
                Open
              </LinkButton>
            </Card>
          );
        })}
      </section>

      <AdminTable
        headers={["Area", "Status"]}
        rows={[
          ["Manage users", "Placeholder for account review and role changes"],
          ["Review AI-generated devotional drafts", "Placeholder for future generation workflow"],
          ["Advanced analytics", "Placeholder for engagement and safety insights"]
        ]}
      />
    </div>
  );
}
