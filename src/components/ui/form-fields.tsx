import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium text-[#31413f]", className)} {...props} />;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-lg border border-[#d9cfbd] bg-white/85 px-3 text-sm text-[#24302f] outline-none transition placeholder:text-[#848b86] focus:border-[#345d6f] focus:ring-2 focus:ring-[#345d6f]/15",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-lg border border-[#d9cfbd] bg-white/85 px-3 py-3 text-sm text-[#24302f] outline-none transition placeholder:text-[#848b86] focus:border-[#345d6f] focus:ring-2 focus:ring-[#345d6f]/15",
        className
      )}
      {...props}
    />
  );
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-lg border border-[#d9cfbd] bg-white/85 px-3 text-sm text-[#24302f] outline-none transition focus:border-[#345d6f] focus:ring-2 focus:ring-[#345d6f]/15",
        className
      )}
      {...props}
    />
  );
}
