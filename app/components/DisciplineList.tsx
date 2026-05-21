"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import DisciplineIcon from "./DisciplineIcon";
import type { Discipline } from "@/lib/content";

export default function DisciplineList({
  disciplines,
}: {
  disciplines: Discipline[];
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = disciplines.find((d) => d.slug === hovered);

  return (
    <div className="grid grid-cols-12 gap-x-10">
      {/* Left column — labels + hover preview */}
      <div className="col-span-12 md:col-span-4 relative">
        <div className="flex flex-col gap-6">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">
            Six disciplines
          </p>
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white hover:text-white/70 transition-colors self-start"
          >
            See all classes
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
          </Link>
        </div>

        <div className="hidden md:block absolute left-0 right-6 top-24 pointer-events-none">
          <AnimatePresence mode="wait">
            {active && (
              <m.div
                key={active.slug}
                initial={{ opacity: 0, scale: 1.03, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -6 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={active.image}
                  alt={`${active.name} at Factum`}
                  fill
                  sizes="(max-width: 768px) 0px, 33vw"
                  className="object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-4 left-4 text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-white/95">
                  {active.name}
                </span>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right column — list */}
      <ul
        className="col-span-12 md:col-span-8 flex flex-col mt-8 md:mt-0 border-t border-white/10"
        onMouseLeave={() => setHovered(null)}
      >
        {disciplines.map((d) => {
          const isActive = hovered === d.slug;
          const isDimmed = hovered !== null && !isActive;
          return (
            <li
              key={d.slug}
              className="border-b border-white/10"
              onMouseEnter={() => setHovered(d.slug)}
            >
              <Link
                href={`/classes#${d.slug}`}
                className="group flex items-center justify-between gap-6 py-5 md:py-7 transition-opacity duration-300"
                style={{ opacity: isDimmed ? 0.35 : 1 }}
              >
                <span className="flex items-center gap-5 md:gap-7">
                  <DisciplineIcon
                    name={d.icon}
                    size={22}
                    className={
                      isActive
                        ? "text-white transition-colors"
                        : "text-white/55 group-hover:text-white transition-colors"
                    }
                  />
                  <span className="text-[32px] md:text-[48px] leading-[1.1] tracking-[-0.01em]">
                    {d.name}
                  </span>
                </span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-white/35 group-hover:text-white/70 transition-colors whitespace-nowrap">
                  {d.tags[0]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
