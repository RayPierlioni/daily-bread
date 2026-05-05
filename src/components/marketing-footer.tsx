import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/support", label: "Support" },
  { href: "/churches", label: "Churches" },
  { href: "/learn", label: "Learn" }
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-[#e4dccd] bg-[#fffdf8]/86 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <BrandMark iconSize={34} />
          <p className="max-w-xl text-xs leading-5 text-[#68706e]">
            A free Christian devotional companion for Scripture, prayer, honest questions, and private reflection. It supports spiritual growth and does not replace a church, pastor, counselor, doctor, or emergency care.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-[#52605d]" aria-label="Footer">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#24302f] hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
