import type { Metadata } from "next";
import { DonationSection } from "@/components/donation-section";
import { MarketingHeader } from "@/components/marketing-header";

export const metadata: Metadata = {
  title: "Support Next Faithful Step",
  description: "Help keep Next Faithful Step free for people who need Scripture, prayer, honest faith questions, and a private devotional path.",
  alternates: {
    canonical: "/support"
  }
};

export default function SupportPage() {
  return (
    <main>
      <MarketingHeader />
      <DonationSection className="min-h-[calc(100vh-4rem)] py-20 sm:py-24" compact />
    </main>
  );
}
