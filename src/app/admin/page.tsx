import { BarChart3, FileText, Library, ShieldAlert, Users } from "lucide-react";
import { AdminTable } from "@/components/admin-table";
import { SponsorBadge } from "@/components/sponsor-badge";
import { Card } from "@/components/ui/card";
import { Button, LinkButton } from "@/components/ui/button";
import { requireAdmin } from "@/lib/current-user";
import { setUserSponsorStatus } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

function getThirtyDaysAgo() {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return date;
}

export default async function AdminPage() {
  await requireAdmin();

  const analyticsSince = getThirtyDaysAgo();
  const [devotionals, reports, users, sources, analyticsEvents, analyticsCounts, devotionalFeedbackCounts] = await Promise.all([
    prisma.devotional.count(),
    prisma.report.count({ where: { status: "OPEN" } }),
    prisma.user.count(),
    prisma.sourceLibraryItem.count(),
    prisma.analyticsEvent.count({ where: { createdAt: { gte: analyticsSince } } }),
    prisma.analyticsEvent.groupBy({
      by: ["eventName"],
      where: { createdAt: { gte: analyticsSince } },
      _count: { eventName: true },
      orderBy: { _count: { eventName: "desc" } },
      take: 12
    }),
    prisma.devotionalFeedback.groupBy({
      by: ["response"],
      _count: { response: true },
      orderBy: { _count: { response: "desc" } }
    })
  ]);
  const recentUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isSponsor: true,
      sponsorSince: true,
      createdAt: true
    },
    orderBy: { createdAt: "desc" },
    take: 25
  });

  const cards = [
    { label: "Devotionals", value: devotionals, icon: FileText, href: "/admin/devotionals" },
    { label: "Open reports", value: reports, icon: ShieldAlert, href: "/admin/reports" },
    { label: "Users", value: users, icon: Users, href: "/admin" },
    { label: "Source items", value: sources, icon: Library, href: "/admin/source-library" },
    { label: "Tracked events, 30 days", value: analyticsEvents, icon: BarChart3, href: "/admin" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Manage content with care.</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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

      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-semibold text-[#24302f]">Devotional feedback</h2>
          <p className="mt-2 text-sm leading-6 text-[#68706e]">
            This shows whether completed devotionals are connecting with people. It stores only button responses, not private notes or prayers.
          </p>
        </div>
        <AdminTable
          headers={["Response", "Count"]}
          rows={
            devotionalFeedbackCounts.length
              ? devotionalFeedbackCounts.map((feedback) => [feedback.response.replaceAll("_", " ").toLowerCase(), feedback._count.response])
              : [["No feedback yet", "Feedback appears after completed devotionals."]]
          }
        />
      </section>

      <AdminTable
        headers={["Area", "Status"]}
        rows={[
          ["Manage users", "Placeholder for account review and role changes"],
          ["Review AI-generated devotional drafts", "Placeholder for future generation workflow"],
          ["Advanced analytics", "Privacy-safe event counts are now being collected below."]
        ]}
      />

      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-semibold text-[#24302f]">Product funnel, last 30 days</h2>
          <p className="mt-2 text-sm leading-6 text-[#68706e]">
            These counts help you see whether people are signing in, starting a path, reading devotionals, completing devotionals, and considering support. Private prayer text, journal text, and faith-question text are not stored in analytics.
          </p>
        </div>
        <AdminTable
          headers={["Event", "Count"]}
          rows={
            analyticsCounts.length
              ? analyticsCounts.map((event) => [event.eventName.replaceAll("_", " "), event._count.eventName])
              : [["No events yet", "Analytics will appear after people use the app."]]
          }
        />
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-semibold text-[#24302f]">Sponsor recognition</h2>
          <p className="mt-2 text-sm leading-6 text-[#68706e]">
            After someone supports the mission through Buy Me a Coffee, mark their account here so their sponsor badge appears on community and blog activity.
          </p>
        </div>
        <AdminTable
          headers={["User", "Role", "Sponsor", "Action"]}
          rows={recentUsers.map((user) => [
            <div key={`${user.id}-user`}>
              <p className="font-medium text-[#24302f]">{user.name ?? "Unnamed user"}</p>
              <p className="text-xs text-[#68706e]">{user.email ?? "No email"}</p>
            </div>,
            user.role,
            <div key={`${user.id}-sponsor`} className="space-y-1">
              <SponsorBadge isSponsor={user.isSponsor} />
              <p className="text-xs text-[#68706e]">{user.sponsorSince ? `Since ${formatDate(user.sponsorSince)}` : "Not marked"}</p>
            </div>,
            <form key={`${user.id}-action`} action={setUserSponsorStatus.bind(null, user.id, !user.isSponsor)}>
              <Button type="submit" variant={user.isSponsor ? "ghost" : "secondary"} size="sm">
                {user.isSponsor ? "Remove badge" : "Mark sponsor"}
              </Button>
            </form>
          ])}
        />
      </section>
    </div>
  );
}
