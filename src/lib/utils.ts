import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return format(new Date(date), "MMM d, yyyy");
}

export function toTagArray(value: FormDataEntryValue | string | string[] | null | undefined) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => item.trim()).filter(Boolean);
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function todayAtMidnight() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function humanizeEnum(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function containsSafetyConcern(text: string) {
  const normalized = text.toLowerCase();
  const terms = [
    "kill myself",
    "end my life",
    "suicide",
    "self harm",
    "self-harm",
    "hurt myself",
    "abuse",
    "unsafe at home",
    "immediate danger"
  ];
  return terms.some((term) => normalized.includes(term));
}

export const safetyMessage =
  "You deserve immediate care and support. If you may be in danger or might hurt yourself, please contact emergency services now, call or text 988 in the U.S., or reach out to a trusted person, pastor, counselor, or local crisis line. Next Faithful Step can encourage and help you reflect, but it is not a replacement for urgent professional care.";
