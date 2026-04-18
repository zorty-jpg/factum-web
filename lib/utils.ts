import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Converts "HH:MM" 24h to "h:mm am/pm". */
export function formatTime(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${mStr.padStart(2, "0")} ${period}`;
}

/** Formats an ISO "YYYY-MM-DD" date into US-locale strings. Parses as local to avoid TZ shift. */
export function formatDate(
  iso: string,
  style: "short" | "medium" | "long" = "medium",
): string {
  const [y, mo, d] = iso.split("-").map(Number);
  const date = new Date(y, mo - 1, d);
  const options: Record<string, Intl.DateTimeFormatOptions> = {
    short: { month: "numeric", day: "numeric", year: "numeric" },
    medium: { month: "short", day: "numeric", year: "numeric" },
    long: { weekday: "long", month: "long", day: "numeric", year: "numeric" },
  };
  return date.toLocaleDateString("en-US", options[style]);
}
