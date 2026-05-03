import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-[#345d6f] text-white shadow-sm hover:bg-[#294b5a]",
  secondary: "border border-[#d9cfbd] bg-white/75 text-[#293634] hover:bg-white",
  ghost: "text-[#345d6f] hover:bg-[#e9f0ea]",
  gold: "bg-[#b38b4d] text-white shadow-sm hover:bg-[#9b773f]",
  danger: "bg-[#9d3b3b] text-white hover:bg-[#873131]"
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base"
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-[#345d6f]/30 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function LinkButton({ className, variant = "primary", size = "md", href, ...props }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-[#345d6f]/30",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
