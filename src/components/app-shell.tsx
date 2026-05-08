"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BookOpen,
  Church,
  Gift,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  MessageCircleQuestion,
  MoreHorizontal,
  PenLine,
  Search,
  Settings,
  Shield,
  Sparkles,
  UserCircle,
  Users
} from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { GracieBuddy } from "@/components/gracie/GracieBuddy";
import { InstallAppButton } from "@/components/install-app-button";
import { ReminderScheduler } from "@/components/reminder-scheduler";
import { Button, LinkButton } from "@/components/ui/button";
import { publicPages } from "@/lib/site";
import { cn } from "@/lib/utils";

type ShellUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: "USER" | "ADMIN";
  notificationSettings?: unknown;
} | null;

const primaryNavItems = [
  { href: "/dashboard", label: "Today", shortLabel: "Today", icon: LayoutDashboard },
  { href: "/devotional", label: "My Path", shortLabel: "Path", icon: BookOpen },
  { href: "/prayers", label: "Prayers", shortLabel: "Pray", icon: PenLine },
  { href: "/ask", label: "Ask in Faith", shortLabel: "Ask", icon: MessageCircleQuestion },
  { href: "/support", label: "Support", shortLabel: "Give", icon: Gift }
];

const secondaryNavItems = [
  { href: "/bible", label: "Bible", icon: BookOpen },
  { href: "/community", label: "Prayer & Encouragement", icon: Users },
  { href: "/groups", label: "Prayer Groups", icon: Church },
  { href: "/blog", label: "Reflections", icon: LibraryBig },
  { href: "/search", label: "Search", icon: Search },
  { href: "/profile", label: "Profile", icon: UserCircle },
  { href: "/settings", label: "Settings", icon: Settings }
];

const adminNavItem = { href: "/admin", label: "Admin", icon: Shield };
const mobileMorePaths = ["/more", "/bible", "/community", "/groups", "/blog", "/search", "/profile", "/settings", "/support", "/admin"];

function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
}

export function AppShell({ user, children }: { user: ShellUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const publicPaths = publicPages.map((page) => page.path);
  const alwaysStandalonePaths = ["/", "/signin", "/onboarding"];
  const isPublic = alwaysStandalonePaths.includes(pathname) || (!user && publicPaths.includes(pathname));
  const adminNav = user?.role === "ADMIN" ? [adminNavItem] : [];
  const mobileNav = [
    ...primaryNavItems.slice(0, 4),
    { href: "/more", label: "More", shortLabel: "More", icon: MoreHorizontal }
  ];

  if (isPublic) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <ReminderScheduler notificationSettings={user?.notificationSettings} />
      <GracieBuddy />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-[#e4dccd] bg-[#fffdf8]/94 px-4 py-6 shadow-[12px_0_40px_rgba(36,48,47,0.04)] backdrop-blur lg:flex">
        <Link href="/dashboard" className="flex items-center gap-3 px-2">
          <BrandMark iconSize={46} subtitle />
        </Link>

        <nav className="peaceful-scrollbar mt-8 flex-1 space-y-7 overflow-y-auto pr-1">
          <div className="space-y-2">
            <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9aa19d]">Start here</p>
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm font-medium text-[#52605d] transition hover:border-[#d9cfbd] hover:bg-white/80 hover:text-[#24302f]",
                    active && "border-[#d9cfbd] bg-white text-[#24302f] shadow-sm"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="space-y-2">
            <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9aa19d]">More</p>
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm font-medium text-[#52605d] transition hover:border-[#d9cfbd] hover:bg-white/80 hover:text-[#24302f]",
                    active && "border-[#d9cfbd] bg-white text-[#24302f] shadow-sm"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {adminNav.length ? (
            <div className="space-y-2">
              <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9aa19d]">Admin</p>
              {adminNav.map((item) => {
                const Icon = item.icon;
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm font-medium text-[#52605d] transition hover:border-[#d9cfbd] hover:bg-white/80 hover:text-[#24302f]",
                      active && "border-[#d9cfbd] bg-white text-[#24302f] shadow-sm"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </nav>

        <div className="mt-5 rounded-xl border border-[#e4dccd] bg-white/82 p-3 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#b38b4d]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Faithful Journeyer
          </div>
          <p className="truncate text-sm font-medium text-[#24302f]">{user?.name || "Signed in"}</p>
          <p className="truncate text-xs text-[#68706e]">{user?.email}</p>
          <Button variant="ghost" size="sm" className="mt-3 w-full justify-start" onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </Button>
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-[#e4dccd] bg-[#fbf7ef]/88 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <BrandMark iconSize={34} />
          </Link>
          <div className="flex items-center gap-2">
            {user ? <InstallAppButton compact /> : null}
            {user ? (
              <Button variant="ghost" size="sm" aria-label="Sign out" onClick={() => signOut({ callbackUrl: "/" })}>
                <LogOut className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : (
              <LinkButton href="/signin" variant="secondary" size="sm">
                Sign in
              </LinkButton>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mb-6 hidden items-center justify-end gap-3 lg:flex">
          <InstallAppButton />
          <Link href="/search" className="flex h-10 w-64 items-center gap-2 rounded-full border border-[#e4dccd] bg-white/75 px-4 text-sm text-[#8a918d] shadow-sm">
            <Search className="h-4 w-4" aria-hidden="true" />
            Search
          </Link>
        </div>
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-[#e4dccd] bg-[#fffdf8]/95 px-2 py-2 backdrop-blur lg:hidden">
        {mobileNav.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/more" ? mobileMorePaths.some((path) => isActivePath(pathname, path)) : isActivePath(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-[11px] text-[#68706e]", active && "bg-[#dfe9dd] text-[#24302f]")}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="max-w-full truncate">{item.shortLabel}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
