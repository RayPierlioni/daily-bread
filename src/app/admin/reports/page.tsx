import { ReportStatus } from "@prisma/client";
import { AdminTable } from "@/components/admin-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateReportStatus } from "@/lib/actions";
import { requireAdmin } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminReportsPage() {
  await requireAdmin();
  const reports = await prisma.report.findMany({
    include: { reporter: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#345d6f]">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24302f]">Moderation reports</h1>
      </div>
      <AdminTable
        headers={["Created", "Content", "Reason", "Status", "Action"]}
        rows={reports.map((report) => [
          formatDate(report.createdAt),
          `${report.contentType}: ${report.contentId.slice(0, 8)}`,
          report.reason,
          <Badge key={`${report.id}-status`}>{report.status}</Badge>,
          <form key={report.id} action={updateReportStatus.bind(null, report.id, ReportStatus.REVIEWED)}>
            <Button type="submit" variant="secondary" size="sm">
              Mark reviewed
            </Button>
          </form>
        ])}
      />
    </div>
  );
}
