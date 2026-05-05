import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { DonationSection } from "@/components/donation-section";
import { MarketingHeader } from "@/components/marketing-header";
import { authOptions } from "@/lib/auth";
import { recordAnalyticsEvent } from "@/lib/analytics";
import { getSupportImpactStats } from "@/lib/support-impact";

export const metadata: Metadata = {
  title: "Support Next Faithful Step",
  description: "Help keep Next Faithful Step free for people who need Scripture, prayer, honest faith questions, and a private devotional path.",
  alternates: {
    canonical: "/support"
  }
};

export const dynamic = "force-dynamic";

export default async function SupportPage() {
  const [session, impactStats] = await Promise.all([getServerSession(authOptions), getSupportImpactStats()]);

  await recordAnalyticsEvent({
    eventName: "support_page_viewed",
    userId: session?.user?.id,
    route: "/support",
    properties: { signedIn: Boolean(session?.user?.id) }
  });

  return (
    <main>
      {!session ? <MarketingHeader /> : null}
      <DonationSection className={session ? "py-10 sm:py-12" : "min-h-[calc(100vh-4rem)] py-20 sm:py-24"} compact impactStats={impactStats} />
    </main>
  );
}
