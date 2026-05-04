import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/daily-devotional", label: "Devotionals" },
  { href: "/prayer-journal", label: "Prayer Journal" },
  { href: "/ask-faith-questions", label: "Faith Questions" },
  { href: "/christian-prayer-groups", label: "Groups" },
  { href: "/learn", label: "Learn" },
  { href: "/support", label: "Support" }
];

export function MarketingHeader({ variant = "light" }: { variant?: "light" | "hero" }) {
  const isHero = variant === "hero";

  return (
    <header
      className={cn(
        "left-0 right-0 top-0 z-30 border-b px-4 py-3 backdrop-blur",
        isHero ? "fixed border-white/15 bg-[#1d2928]/72 text-white" : "sticky border-[#e4dccd] bg-[#fffdf8]/92 text-[#24302f]"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <BrandMark tone={isHero ? "light" : "dark"} iconSize={38} />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={cn("transition", isHero ? "text-white/82 hover:text-white" : "text-[#52605d] hover:text-[#24302f]")}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton href="/signin" variant={isHero ? "secondary" : "ghost"} size="sm" className={isHero ? "border-white/30 bg-white/14 text-white hover:bg-white/24" : ""}>
            Sign in
          </LinkButton>
          <LinkButton href="/signin" size="sm" className={isHero ? "bg-white text-[#24302f] hover:bg-[#f7f2e8]" : ""}>
            Begin
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
