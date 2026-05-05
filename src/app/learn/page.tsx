import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingHeader } from "@/components/marketing-header";
import { Card } from "@/components/ui/card";
import { publicResourcePages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Christian Devotional and Prayer Resources",
  description:
    "Helpful Christian resources for prayer, daily devotionals, faith questions, doubt, anxiety, Scripture, and spiritual growth.",
  alternates: {
    canonical: "/learn"
  }
};

export default function LearnPage() {
  const articles = publicResourcePages.filter((page) => page.path !== "/learn");

  return (
    <main>
      <MarketingHeader />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38b4d]">Learn</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[#24302f] sm:text-5xl">Christian devotional and prayer resources.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#52605d]">
          Gentle guides for prayer, Scripture, faith questions, anxiety, doubt, and building a daily rhythm with God.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <Card key={article.path} className="p-6">
              <h2 className="text-xl font-semibold leading-7 text-[#24302f]">
                <Link href={article.path} className="hover:text-[#345d6f]">
                  {article.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#52605d]">{article.description}</p>
              <Link href={article.path} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#345d6f] hover:underline">
                Read the guide
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
