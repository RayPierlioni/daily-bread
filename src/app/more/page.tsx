import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Church, Gift, LibraryBig, Search, Settings, Shield, UserCircle, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/current-user";

const moreLinks = [
  {
    href: "/bible",
    title: "Bible",
    body: "Read, search, and listen to the World English Bible inside the app.",
    icon: BookOpen
  },
  {
    href: "/support",
    title: "Support the Mission",
    body: "Help keep Next Faithful Step free for people who need a gentle place to begin again.",
    icon: Gift
  },
  {
    href: "/community",
    title: "Prayer & Encouragement",
    body: "Share prayer requests, praise reports, questions, and reflections when you choose.",
    icon: Users
  },
  {
    href: "/groups",
    title: "Prayer Groups",
    body: "Browse or create smaller spaces for prayer, encouragement, and shared devotionals.",
    icon: Church
  },
  {
    href: "/blog",
    title: "Reflections",
    body: "Read and write longer reflections, testimonies, and faith-centered posts.",
    icon: LibraryBig
  },
  {
    href: "/search",
    title: "Search",
    body: "Find devotionals, prayers, faith questions, posts, groups, and resources.",
    icon: Search
  },
  {
    href: "/profile",
    title: "Profile",
    body: "Review your public profile and privacy-aware saved devotional activity.",
    icon: UserCircle
  },
  {
    href: "/settings",
    title: "Settings",
    body: "Manage privacy, reminders, personalization, and account preferences.",
    icon: Settings
  }
];

export const metadata: Metadata = {
  title: "More",
  alternates: {
    canonical: "/more"
  }
};

export default async function MorePage() {
  const user = await requireUser();
  const links = user.role === "ADMIN" ? [...moreLinks, { href: "/admin", title: "Admin", body: "Manage devotionals, reports, users, and source library content.", icon: Shield }] : moreLinks;

  return (
    <div className="space-y-7">
      <section className="rounded-2xl border border-[#e4dccd] bg-white/82 p-6 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b38b4d]">More</p>
        <h1 className="mt-3 text-3xl font-semibold text-[#24302f]">Everything else, kept quiet and close.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#68706e]">
          Your daily rhythm stays simple. These links are here when you want community, reflections, settings, or ways to support the mission.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.href} className="transition hover:-translate-y-0.5 hover:border-[#cdbf9f] hover:bg-white">
              <Link href={item.href} className="block h-full p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#dfe9dd] text-[#345d6f]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-semibold text-[#24302f]">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#68706e]">{item.body}</p>
              </Link>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
