"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Reveal from "../components/Reveal";
import { cn, formatTime } from "@/lib/utils";
import type { ScheduleEntry } from "@/lib/content";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

type FilterSlug =
  | "all"
  | "martial-arts"
  | "boxing"
  | "kickboxing"
  | "muay-thai"
  | "jiu-jitsu"
  | "mma"
  | "fitness";

const FILTERS: { slug: FilterSlug; label: string }[] = [
  { slug: "all", label: "All" },
  { slug: "martial-arts", label: "Martial arts" },
  { slug: "boxing", label: "Boxing" },
  { slug: "kickboxing", label: "Kickboxing" },
  { slug: "muay-thai", label: "Muay Thai" },
  { slug: "jiu-jitsu", label: "Jiu Jitsu" },
  { slug: "mma", label: "MMA" },
  { slug: "fitness", label: "Fitness" },
];

const MARTIAL = new Set<ScheduleEntry["type"]>([
  "Boxing",
  "Kickboxing",
  "Muay Thai",
  "Jiu Jitsu",
  "MMA",
]);

function matches(entry: ScheduleEntry, filter: FilterSlug) {
  const hay = `${entry.type} ${entry.title}`;
  switch (filter) {
    case "all":
      return true;
    case "martial-arts":
      return (
        MARTIAL.has(entry.type) ||
        /boxing|kickboxing|muay thai|jiu ?jitsu|bjj|mma/i.test(hay)
      );
    case "boxing":
      // Match boxing but not kickboxing
      return /(?<!kick)boxing/i.test(hay);
    case "kickboxing":
      return /kickboxing/i.test(hay);
    case "muay-thai":
      return /muay thai/i.test(hay);
    case "jiu-jitsu":
      return /jiu ?jitsu|bjj/i.test(hay);
    case "mma":
      return /\bmma\b/i.test(hay);
    case "fitness":
      return (
        entry.type === "Functional" ||
        entry.type === "Olympic" ||
        /functional|fitness|lifting/i.test(entry.title)
      );
    default:
      return true;
  }
}

function hrefFor(slug: FilterSlug) {
  return slug === "all" ? "/schedule" : `/schedule?filter=${slug}`;
}

function FilterChips({ active }: { active: FilterSlug }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const isActive = f.slug === active;
        return (
          <li key={f.slug}>
            <Link
              href={hrefFor(f.slug)}
              scroll={false}
              className={cn(
                "inline-block border rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-all duration-300",
                isActive
                  ? "bg-white text-black border-white"
                  : "border-white/15 text-white/70 hover:border-white/50 hover:text-white",
              )}
            >
              {f.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function EmptyState({ filter }: { filter: FilterSlug }) {
  const label =
    FILTERS.find((f) => f.slug === filter)?.label.toLowerCase() ?? filter;
  return (
    <div className="py-20 border-t border-white/10">
      <p className="text-[13px] text-white/45 max-w-[480px] leading-[1.5]">
        No {label} classes on this schedule. Try another filter or{" "}
        <Link href="/schedule" className="link-underline">
          see everything
        </Link>
        .
      </p>
    </div>
  );
}

export default function ScheduleGrid({
  entries,
}: {
  entries: ScheduleEntry[];
}) {
  return (
    <Suspense
      fallback={
        <div className="text-[13px] text-white/45">Loading schedule…</div>
      }
    >
      <ScheduleGridInner entries={entries} />
    </Suspense>
  );
}

function ScheduleGridInner({ entries }: { entries: ScheduleEntry[] }) {
  const searchParams = useSearchParams();
  const raw = (searchParams.get("filter") ?? "all") as FilterSlug;
  const active: FilterSlug = FILTERS.some((f) => f.slug === raw)
    ? raw
    : "all";

  const filtered = entries.filter((e) => matches(e, active));
  const totalForDay = (day: string) =>
    filtered.filter((e) => e.day === day).length;
  const hasAny = filtered.length > 0;

  return (
    <>
      <Reveal className="mb-12">
        <p className="text-[11px] uppercase tracking-[0.14em] text-white/40 mb-4">
          Filter
        </p>
        <FilterChips active={active} />
      </Reveal>

      {!hasAny ? (
        <EmptyState filter={active} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-0">
          {days.map((day, i) => {
            const dayEntries = filtered.filter((e) => e.day === day);
            return (
              <Reveal key={`${active}-${day}`} delay={i * 0.04}>
                <div className="pb-4 border-b border-white/20 text-[11px] uppercase tracking-[0.14em] text-white/60 flex items-baseline justify-between">
                  <span>{day}</span>
                  {totalForDay(day) > 0 && (
                    <span className="text-white/30">
                      {totalForDay(day)}
                    </span>
                  )}
                </div>
                <ul className="mt-4 flex flex-col gap-4 md:gap-6">
                  {dayEntries.length === 0 && (
                    <li className="text-[13px] text-white/30">—</li>
                  )}
                  {dayEntries.map((e, idx) => (
                    <li
                      key={`${day}-${idx}-${e.time}`}
                      className="flex flex-col gap-1 border-l border-white/15 pl-3"
                    >
                      <span className="text-[11px] md:text-[12px] uppercase tracking-[0.14em] text-white/50">
                        {e.endTime
                          ? `${formatTime(e.time)} – ${formatTime(e.endTime)}`
                          : formatTime(e.time)}
                      </span>
                      <span className="text-[14px] md:text-[16px] leading-[1.2]">
                        {e.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      )}
    </>
  );
}
