"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Reveal from "../components/Reveal";
import DisciplineIcon from "../components/DisciplineIcon";
import { cn, formatTime } from "@/lib/utils";
import type { Discipline, ScheduleEntry } from "@/lib/content";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
type Day = (typeof DAYS)[number];

const DAY_FULL: Record<Day, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
};

const DAY_INDEX: Record<Day, number> = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
};

const DEFAULT_CLASS_DURATION_MIN = 60;

type ClassStatus = "past" | "now" | "next" | "future" | "none";

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

const TYPE_ICON: Record<ScheduleEntry["type"], Discipline["icon"]> = {
  Boxing: "Target",
  Kickboxing: "Zap",
  "Muay Thai": "Flame",
  "Jiu Jitsu": "Shield",
  MMA: "Swords",
  Functional: "Dumbbell",
  Olympic: "Dumbbell",
};

const TYPE_LABEL: Record<ScheduleEntry["type"], string> = {
  Boxing: "Boxing",
  Kickboxing: "Kickboxing",
  "Muay Thai": "Muay Thai",
  "Jiu Jitsu": "Jiu Jitsu",
  MMA: "MMA",
  Functional: "Fitness",
  Olympic: "Fitness",
};

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

function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function todayAsDay(): Day {
  const map: Record<number, Day | null> = {
    0: null,
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };
  return map[new Date().getDay()] ?? "Mon";
}

function dateForDayInCurrentWeek(day: Day, now: Date): Date {
  const dow = now.getDay();
  const diffToMon = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMon);
  monday.setHours(0, 0, 0, 0);
  const idx = DAYS.indexOf(day);
  const result = new Date(monday);
  result.setDate(monday.getDate() + idx);
  return result;
}

function sundayDate(now: Date): Date {
  const dow = now.getDay();
  const diffToMon = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMon);
  monday.setHours(0, 0, 0, 0);
  const sun = new Date(monday);
  sun.setDate(monday.getDate() + 6);
  return sun;
}

function nextClassForDay(
  day: Day,
  today: Day,
  now: Date,
  classes: ScheduleEntry[],
): ScheduleEntry | undefined {
  if (classes.length === 0) return undefined;
  if (day !== today) return classes[0];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const upcoming = classes.find((c) => timeToMinutes(c.time) >= nowMinutes);
  return upcoming ?? classes[classes.length - 1];
}

function computeStatuses(
  day: Day,
  today: Day,
  now: Date,
  classes: ScheduleEntry[],
): ClassStatus[] {
  const todayIdx = DAY_INDEX[today];
  const dayIdx = DAY_INDEX[day];
  if (dayIdx < todayIdx) return classes.map(() => "past");
  if (dayIdx > todayIdx) return classes.map(() => "none");

  const nowMin = now.getHours() * 60 + now.getMinutes();
  let nextAssigned = false;
  return classes.map((e) => {
    const start = timeToMinutes(e.time);
    const end = e.endTime
      ? timeToMinutes(e.endTime)
      : start + DEFAULT_CLASS_DURATION_MIN;
    if (end <= nowMin) return "past";
    if (start <= nowMin) return "now";
    if (!nextAssigned) {
      nextAssigned = true;
      return "next";
    }
    return "future";
  });
}

function FilterChips({ active }: { active: FilterSlug }) {
  return (
    <ul className="flex gap-2 overflow-x-auto md:flex-wrap md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
      {FILTERS.map((f) => {
        const isActive = f.slug === active;
        return (
          <li key={f.slug} className="shrink-0">
            <Link
              href={hrefFor(f.slug)}
              scroll={false}
              className={cn(
                "inline-block border rounded-full px-4 py-2.5 md:py-1.5 text-[11px] uppercase tracking-[0.14em] transition-all duration-300 whitespace-nowrap",
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

function DayButton({
  day,
  date,
  count,
  nextClass,
  isActive,
  isToday,
  onSelect,
}: {
  day: Day;
  date: Date;
  count: number;
  nextClass: ScheduleEntry | undefined;
  isActive: boolean;
  isToday: boolean;
  onSelect: () => void;
}) {
  const disabled = count === 0;
  const month = date
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const dayNum = String(date.getDate()).padStart(2, "0");
  const nextLabel = isToday ? "Next" : "First";

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={isActive}
      className={cn(
        "relative flex flex-col items-center gap-1 px-2 py-5 md:py-7 transition-colors duration-300",
        isActive
          ? "bg-white text-black"
          : disabled
            ? "bg-black text-white/20 cursor-not-allowed"
            : "bg-black text-white/75 hover:bg-white/[0.04] hover:text-white",
      )}
    >
      {isToday && !isActive && (
        <span
          className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--red)" }}
          aria-label="Today"
        />
      )}

      <span
        className={cn(
          "text-[9px] md:text-[10px] uppercase tracking-[0.18em]",
          isActive ? "text-black/55" : "text-white/45",
        )}
      >
        {month}
      </span>
      <span className="text-[36px] md:text-[54px] font-semibold leading-none tabular-nums">
        {dayNum}
      </span>
      <span
        className={cn(
          "mt-0.5 text-[10px] md:text-[11px] uppercase tracking-[0.18em]",
          isActive ? "text-black/70" : "text-white/70",
        )}
      >
        {day}
      </span>

      <span
        className={cn(
          "mt-3 md:mt-4 w-full border-t pt-2.5 md:pt-3 flex flex-col items-center gap-0.5",
          isActive ? "border-black/10" : "border-white/10",
        )}
      >
        {nextClass ? (
          <>
            <span
              className={cn(
                "text-[9px] md:text-[10px] uppercase tracking-[0.14em]",
                isActive ? "text-black/45" : "text-white/40",
              )}
            >
              {nextLabel}
            </span>
            <span className="text-[11px] md:text-[13px] font-semibold tabular-nums leading-none">
              {formatTime(nextClass.time)}
            </span>
            <span
              className={cn(
                "text-[10px] md:text-[11px] leading-[1.2] line-clamp-2 px-1",
                isActive ? "text-black/60" : "text-white/55",
              )}
            >
              {nextClass.title}
            </span>
          </>
        ) : (
          <span
            className={cn(
              "text-[10px] uppercase tracking-[0.14em]",
              isActive ? "text-black/40" : "text-white/25",
            )}
          >
            No classes
          </span>
        )}
      </span>
    </button>
  );
}

function ClosedDay({ date, isToday }: { date: Date; isToday: boolean }) {
  const month = date
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const dayNum = String(date.getDate()).padStart(2, "0");
  return (
    <div
      aria-label="Sunday — gym closed"
      className="relative flex flex-col items-center gap-1 px-2 py-5 md:py-7 bg-black/60 text-white/25 select-none"
    >
      {isToday && (
        <span
          className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--red)" }}
          aria-label="Today"
        />
      )}
      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-white/25">
        {month}
      </span>
      <span className="text-[36px] md:text-[54px] font-semibold leading-none tabular-nums text-white/20">
        {dayNum}
      </span>
      <span className="mt-0.5 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/30">
        Sun
      </span>
      <span className="mt-3 md:mt-4 w-full border-t border-white/[0.06] pt-2.5 md:pt-3 flex flex-col items-center gap-0.5">
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white/35">
          Closed
        </span>
        <span className="text-[10px] md:text-[11px] text-white/25 leading-[1.2]">
          Rest day
        </span>
      </span>
    </div>
  );
}

function StatusPill({ status }: { status: "now" | "next" }) {
  const isNow = status === "now";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 whitespace-nowrap",
        isNow ? "text-white" : "bg-transparent",
      )}
      style={
        isNow
          ? { background: "var(--red)" }
          : {
              color: "var(--red)",
              border: "1px solid var(--red)",
            }
      }
    >
      {isNow && (
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      )}
      {isNow ? "Happening now" : "Next class"}
    </span>
  );
}

function ClassRow({
  entry,
  status,
}: {
  entry: ScheduleEntry;
  status: ClassStatus;
}) {
  const timeText = entry.endTime
    ? `${formatTime(entry.time)} – ${formatTime(entry.endTime)}`
    : formatTime(entry.time);
  const isPast = status === "past";
  const showPill = status === "now" || status === "next";
  const concurrentClasses = entry.title.split(/\s+[+·]\s+/);
  const isMultiClass = concurrentClasses.length > 1;

  return (
    <li
      className={cn(
        "grid grid-cols-[auto_1fr] md:grid-cols-[200px_auto_1fr_auto] items-center gap-4 md:gap-10 transition-colors",
        "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-5 mb-2",
        "md:rounded-none md:border-0 md:border-b md:border-white/10 md:bg-transparent md:backdrop-blur-none md:px-0 md:py-8 md:mb-0 md:first:border-t",
        isPast && "opacity-40",
        status === "now" && "bg-white/[0.08] md:bg-white/[0.02]",
      )}
    >
      <span
        className={cn(
          "hidden md:block text-[22px] md:text-[24px] font-semibold tracking-[-0.01em] tabular-nums",
          isPast ? "text-white/50" : "text-white",
        )}
      >
        {timeText}
      </span>
      <span
        className={cn(
          "flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border shrink-0",
          isPast
            ? "bg-white/[0.02] border-white/10"
            : "bg-white/[0.05] border-white/15",
        )}
      >
        <DisciplineIcon
          name={TYPE_ICON[entry.type]}
          size={22}
          strokeWidth={1.75}
          className={isPast ? "text-white/50" : "text-white"}
        />
      </span>
      <span className="flex flex-col gap-1 min-w-0">
        <span
          className={cn(
            "md:hidden text-[15px] font-semibold tracking-[-0.01em] tabular-nums",
            isPast ? "text-white/50" : "text-white",
          )}
        >
          {timeText}
        </span>
        <span className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "text-[10px] md:text-[11px] uppercase tracking-[0.14em]",
              isPast ? "text-white/35" : "text-white/50",
            )}
          >
            {TYPE_LABEL[entry.type]}
          </span>
          {isMultiClass && (
            <span
              className={cn(
                "text-[9px] md:text-[10px] uppercase tracking-[0.14em] rounded-full border px-2 py-0.5",
                isPast && "opacity-60",
              )}
              style={{
                color: "var(--red)",
                borderColor: "rgba(191, 4, 4, 0.35)",
                background: "rgba(191, 4, 4, 0.06)",
              }}
            >
              {concurrentClasses.length} classes · same time
            </span>
          )}
          {showPill && (
            <span className="md:hidden">
              <StatusPill status={status as "now" | "next"} />
            </span>
          )}
        </span>
        {isMultiClass ? (
          <span className="flex flex-col gap-0.5 mt-0.5">
            {concurrentClasses.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className={cn(
                  "text-[18px] md:text-[22px] leading-[1.2] truncate md:whitespace-normal flex items-baseline gap-2",
                  isPast ? "text-white/50" : "text-white",
                )}
              >
                <span
                  className="text-[10px] md:text-[11px] tracking-[0.14em] tabular-nums shrink-0 mt-1"
                  style={{ color: "var(--red)" }}
                >
                  0{i + 1}
                </span>
                {name}
              </span>
            ))}
          </span>
        ) : (
          <span
            className={cn(
              "text-[18px] md:text-[22px] leading-[1.2] truncate md:whitespace-normal",
              isPast ? "text-white/50" : "text-white",
            )}
          >
            {entry.title}
          </span>
        )}
      </span>
      <span className="hidden md:inline-flex">
        {showPill && <StatusPill status={status as "now" | "next"} />}
      </span>
    </li>
  );
}

function EmptyState({ filter, day }: { filter: FilterSlug; day: Day }) {
  const label =
    FILTERS.find((f) => f.slug === filter)?.label.toLowerCase() ?? filter;
  return (
    <div className="py-20 border-t border-white/10">
      <p className="text-[13px] text-white/45 max-w-[480px] leading-[1.5]">
        No {label} classes on {DAY_FULL[day]}. Try another day or{" "}
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
  const active: FilterSlug = FILTERS.some((f) => f.slug === raw) ? raw : "all";

  const now = useMemo(() => new Date(), []);
  const today = useMemo(() => todayAsDay(), []);
  const [selectedDay, setSelectedDay] = useState<Day>(today);

  const { byDay, dayCounts } = useMemo(() => {
    const byDay = new Map<Day, ScheduleEntry[]>();
    const dayCounts = new Map<Day, number>();
    for (const d of DAYS) {
      byDay.set(d, []);
      dayCounts.set(d, 0);
    }
    for (const e of entries) {
      if (!matches(e, active)) continue;
      const day = e.day as Day;
      const list = byDay.get(day);
      if (!list) continue;
      list.push(e);
      dayCounts.set(day, (dayCounts.get(day) ?? 0) + 1);
    }
    for (const d of DAYS) {
      const list = byDay.get(d)!;
      list.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
    }
    return { byDay, dayCounts };
  }, [entries, active]);

  const effectiveDay: Day =
    (dayCounts.get(selectedDay) ?? 0) > 0
      ? selectedDay
      : (DAYS.find((d) => (dayCounts.get(d) ?? 0) > 0) ?? selectedDay);

  const dayClasses = useMemo(
    () => byDay.get(effectiveDay) ?? [],
    [byDay, effectiveDay],
  );
  const hasAny = dayClasses.length > 0;
  const statuses = useMemo(
    () => computeStatuses(effectiveDay, today, now, dayClasses),
    [effectiveDay, today, now, dayClasses],
  );

  return (
    <>
      <Reveal className="mb-10 md:mb-14">
        <p className="text-[11px] uppercase tracking-[0.14em] text-white/40 mb-4">
          Filter
        </p>
        <FilterChips active={active} />
      </Reveal>

      <Reveal delay={0.05}>
        {/* Mobile — horizontal scroll strip of glass day pills */}
        <div className="md:hidden -mx-6 px-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2 pb-1">
            {DAYS.map((day) => {
              const count = dayCounts.get(day) ?? 0;
              const disabled = count === 0;
              const isActive = day === effectiveDay;
              const isToday = day === today;
              const date = dateForDayInCurrentWeek(day, now);
              const dayNum = String(date.getDate()).padStart(2, "0");
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  disabled={disabled}
                  aria-pressed={isActive}
                  className={cn(
                    "shrink-0 relative flex flex-col items-center gap-1 px-5 py-3.5 rounded-2xl border backdrop-blur-md transition-colors min-w-[68px]",
                    isActive
                      ? "bg-white text-black border-white"
                      : disabled
                        ? "bg-white/[0.02] text-white/20 border-white/5 cursor-not-allowed"
                        : "bg-white/[0.04] text-white/75 border-white/10 active:bg-white/[0.08]",
                  )}
                >
                  {isToday && !isActive && (
                    <span
                      className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--red)" }}
                      aria-label="Today"
                    />
                  )}
                  <span
                    className={cn(
                      "text-[10px] uppercase tracking-[0.18em]",
                      isActive ? "text-black/60" : "text-white/50",
                    )}
                  >
                    {day}
                  </span>
                  <span className="text-[24px] font-semibold leading-none tabular-nums">
                    {dayNum}
                  </span>
                </button>
              );
            })}
            {(() => {
              const date = sundayDate(now);
              const dayNum = String(date.getDate()).padStart(2, "0");
              const isTodaySun = new Date().getDay() === 0;
              return (
                <div className="shrink-0 relative flex flex-col items-center gap-1 px-5 py-3.5 rounded-2xl border border-white/5 bg-white/[0.02] text-white/25 min-w-[68px]">
                  {isTodaySun && (
                    <span
                      className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--red)" }}
                      aria-label="Today"
                    />
                  )}
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                    Sun
                  </span>
                  <span className="text-[24px] font-semibold leading-none tabular-nums">
                    {dayNum}
                  </span>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Desktop — 7-col grid with rich day tiles */}
        <div className="hidden md:grid grid-cols-7 gap-px bg-white/10 border border-white/10">
          {DAYS.map((day) => {
            const classes = byDay.get(day) ?? [];
            return (
              <DayButton
                key={day}
                day={day}
                date={dateForDayInCurrentWeek(day, now)}
                count={dayCounts.get(day) ?? 0}
                nextClass={nextClassForDay(day, today, now, classes)}
                isActive={day === effectiveDay}
                isToday={day === today}
                onSelect={() => setSelectedDay(day)}
              />
            );
          })}
          <ClosedDay date={sundayDate(now)} isToday={new Date().getDay() === 0} />
        </div>
      </Reveal>

      <div className="mt-12 md:mt-16">
        <AnimatePresence mode="wait">
          <m.div
            key={`${active}-${effectiveDay}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-baseline justify-between border-b border-white/20 pb-4 mb-2">
              <p className="text-[18px] md:text-[22px] tracking-[-0.01em] text-white">
                {DAY_FULL[effectiveDay]}
                {effectiveDay === today && (
                  <span
                    className="ml-3 inline-block text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full align-middle"
                    style={{ background: "var(--red)", color: "white" }}
                  >
                    Today
                  </span>
                )}
              </p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/40 tabular-nums">
                {dayClasses.length}{" "}
                {dayClasses.length === 1 ? "class" : "classes"}
              </p>
            </div>

            {hasAny ? (
              <ul className="flex flex-col">
                {dayClasses.map((e, i) => (
                  <ClassRow
                    key={`${e.day}-${e.time}-${e.title}-${i}`}
                    entry={e}
                    status={statuses[i] ?? "future"}
                  />
                ))}
              </ul>
            ) : (
              <EmptyState filter={active} day={effectiveDay} />
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </>
  );
}
