"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TextMarqueeProps = {
  items: ReactNode[];
  /** Optional href per item — when present, the currently-visible item becomes a link. */
  hrefs?: string[];
  /** Seconds each item is held still between transitions. */
  hold?: number;
  /** Seconds for the roll in/out transition. */
  transition?: number;
  /** Wrapper className — font-size, weight, tracking, etc. */
  className?: string;
  /** Accent color applied via inline style (works with CSS vars). */
  accent?: string;
};

export default function TextMarquee({
  items,
  hrefs,
  hold = 1.2,
  transition = 0.45,
  className,
  accent,
}: TextMarqueeProps) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || paused) return;
    // Longest channel is y at 1.3 * transition, so a full cycle waits that long.
    const total = (hold + transition * 1.3) * 1000;
    const id = setInterval(() => {
      setI((p) => (p + 1) % items.length);
    }, total);
    return () => clearInterval(id);
  }, [items.length, hold, transition, paused]);

  const currentHref = hrefs?.[i];
  const interactive = Boolean(hrefs?.length);

  return (
    <span
      className={cn(
        "relative inline-block whitespace-nowrap align-baseline",
        interactive && "cursor-pointer",
        className,
      )}
      onMouseEnter={() => interactive && setPaused(true)}
      onMouseLeave={() => interactive && setPaused(false)}
    >
      {/* Invisible sizer */}
      <span
        aria-hidden
        className="grid grid-cols-1 grid-rows-1 invisible pointer-events-none"
      >
        {items.map((it, idx) => (
          <span
            key={idx}
            className="col-start-1 row-start-1 whitespace-nowrap"
          >
            {it}
          </span>
        ))}
      </span>

      {/* Animated overlay */}
      <span className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <m.span
            key={i}
            initial={{ y: "105%", opacity: 0, filter: "blur(12px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-105%", opacity: 0, filter: "blur(12px)" }}
            transition={{
              y: { duration: transition * 1.3, ease: "linear" },
              opacity: { duration: transition * 0.8, ease: [0.33, 1, 0.68, 1] },
              filter: { duration: transition * 1.1, ease: [0.33, 1, 0.68, 1] },
            }}
            className="block whitespace-nowrap will-change-[transform,filter,opacity]"
            style={accent ? { color: accent } : undefined}
          >
            {currentHref ? (
              <Link href={currentHref} className="block">
                {items[i]}
              </Link>
            ) : (
              items[i]
            )}
          </m.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
