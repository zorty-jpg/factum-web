"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import DisciplineIcon from "./DisciplineIcon";
import RevealImages from "./RevealImages";
import {
  scheduleForDiscipline,
  type Discipline,
  type ScheduleEntry,
} from "@/lib/content";
import { site } from "@/lib/site";
import { formatTime } from "@/lib/utils";

const DAY_LABEL: Record<string, string> = {
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
  Sat: "Sat",
};

function groupSchedule(entries: ScheduleEntry[]) {
  const byDay = new Map<string, ScheduleEntry[]>();
  for (const e of entries) {
    const list = byDay.get(e.day) ?? [];
    list.push(e);
    byDay.set(e.day, list);
  }
  const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return order
    .filter((d) => byDay.has(d))
    .map((day) => ({ day, entries: byDay.get(day) ?? [] }));
}

export default function DisciplineDetailsList({
  disciplines,
}: {
  disciplines: Discipline[];
}) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {disciplines.map((d, i) => {
        const schedule = groupSchedule(scheduleForDiscipline(d.slug));
        const isFirst = i === 0;
        const isActive =
          hoveredSlug === d.slug || (isFirst && !hasInteracted);

        return (
          <Reveal
            key={d.slug}
            as="article"
            delay={i * 0.05}
            className="group relative grid grid-cols-12 gap-x-6 md:gap-x-10 py-14 md:py-20 border-t border-white/10 first:border-t-0"
            onMouseEnter={() => {
              if (!hasInteracted) setHasInteracted(true);
              setHoveredSlug(d.slug);
            }}
            onMouseLeave={() => setHoveredSlug(null)}
          >
            <div
              id={d.slug}
              className="col-span-12 md:col-span-1 text-[13px] text-white/45 tracking-[0.08em] scroll-mt-40"
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            <div className="col-span-12 md:col-span-5 mt-4 md:mt-0">
              <div className="flex items-center gap-3">
                <DisciplineIcon
                  name={d.icon}
                  size={26}
                  className="text-white/70 transition-colors group-hover:text-white"
                />
                <h2 className="text-[36px] md:text-[56px] leading-[1.02] tracking-[-0.02em] transition-colors group-hover:text-white/70">
                  {d.name}
                </h2>
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-white/50">
                {d.tags.join(" · ")}
              </p>
              {d.slug === "functional-fitness" && (
                <a
                  href={site.apps.sugarwod}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-[10px] uppercase tracking-[0.14em] text-white/60 border border-white/15 rounded-full px-2.5 py-1 hover:text-white transition-colors"
                >
                  Tracked in SugarWod ↗
                </a>
              )}
              <p className="mt-6 md:mt-8 text-[16px] md:text-[18px] leading-[1.5] text-white/85 max-w-[520px]">
                {d.blurb}
              </p>

              {schedule.length > 0 && (
                <div className="mt-8 md:mt-10 border-t border-white/10 pt-6">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/45 mb-4">
                    This week
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {schedule.map((row) => (
                      <li
                        key={row.day}
                        className="grid grid-cols-[64px_1fr] gap-4 text-[13px] md:text-[14px]"
                      >
                        <span className="text-white/50 uppercase tracking-[0.1em]">
                          {DAY_LABEL[row.day]}
                        </span>
                        <span className="text-white/85 font-medium tracking-tight">
                          {row.entries
                            .map((e) =>
                              e.endTime
                                ? `${formatTime(e.time)} – ${formatTime(e.endTime)}`
                                : formatTime(e.time),
                            )
                            .join("  ·  ")}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/schedule?filter=${d.slug}`}
                    className="inline-block mt-6 text-[11px] uppercase tracking-[0.14em] link-underline"
                  >
                    View full schedule →
                  </a>
                </div>
              )}
            </div>

            <div className="hidden md:block col-span-6 relative min-h-[560px] lg:min-h-[640px]">
              <RevealImages
                active={isActive}
                images={[
                  { src: d.images[0], alt: `${d.name} training at Factum` },
                  { src: d.images[1], alt: `${d.name} at Factum` },
                ]}
              />
            </div>

            <div className="col-span-12 md:hidden mt-8">
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <Image
                  src={d.images[0]}
                  alt={`${d.name} at Factum`}
                  fill
                  sizes="(max-width: 768px) 100vw, 0px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
