"use client";

import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import { reviews, reviewSummary, type Review } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import Reveal from "./Reveal";

function Stars({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          className={i < count ? "fill-white" : "fill-white/20"}
          aria-hidden
        />
      ))}
    </div>
  );
}

function MobileReviewPill({
  review,
  expanded,
  onToggle,
}: {
  review: Review;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <m.div
      layout
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md"
    >
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        className="w-full flex items-center justify-between gap-3 p-4 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex shrink-0 items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/15 text-[12px] font-medium tracking-[0.04em]">
            {review.initials}
          </span>
          <div className="min-w-0 flex flex-col gap-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[14px] font-medium text-white truncate">
                {review.name}
              </span>
              <Stars count={review.rating} size={11} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/45 truncate">
              {review.discipline} · {formatDate(review.date, "medium")}
            </span>
          </div>
        </div>
        <m.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-white/50"
        >
          <ChevronDown size={18} strokeWidth={1.75} />
        </m.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1">
              <p className="text-[14px] leading-[1.55] text-white/85">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <m.article
      whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
    >
      {/* Photo header */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={review.image}
          alt={`${review.discipline} training at Factum`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/90">
            {review.discipline}
          </span>
        </div>
        <div className="absolute bottom-3 left-4">
          <Stars count={review.rating} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-5 p-6 flex-1">
        <p className="text-[15px] leading-[1.5] text-white/90">
          &ldquo;{review.text}&rdquo;
        </p>

        <div className="mt-auto border-t border-dashed border-white/10 pt-5 flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/15 text-[11px] font-medium tracking-[0.06em]">
            {review.initials}
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-medium text-white/95 truncate">
              {review.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
              {formatDate(review.date, "medium")}
            </span>
          </div>
        </div>
      </div>
    </m.article>
  );
}

export default function Reviews() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="relative z-10 mt-20 md:mt-56 px-6 md:px-14">
      <Reveal className="grid grid-cols-12 gap-x-4 md:gap-x-10">
        <div className="col-span-12 md:col-span-4">
          <p className="text-[13px] text-white/45">From the gym floor</p>
        </div>
        <div className="col-span-12 md:col-span-8 mt-2 md:mt-0 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="text-[13px] text-white/45 leading-[1.45] max-w-[560px]">
            Members, first week to six years. Real quotes from the gym&rsquo;s
            Google profile.
          </p>
          <a
            href={reviewSummary.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/70 hover:text-white transition-colors shrink-0"
          >
            <Stars count={5} size={12} />
            <span className="font-semibold text-white">
              {reviewSummary.average.toFixed(1)}
            </span>
            <span>· {reviewSummary.count} reviews →</span>
          </a>
        </div>
      </Reveal>

      {/* Mobile — collapsed glass pills, tap to expand */}
      <Reveal delay={0.1} className="mt-8 md:hidden">
        <div className="flex flex-col gap-2">
          {reviews.map((r) => (
            <MobileReviewPill
              key={r.id}
              review={r}
              expanded={openId === r.id}
              onToggle={() => setOpenId(openId === r.id ? null : r.id)}
            />
          ))}
        </div>
      </Reveal>

      {/* Desktop — full card grid */}
      <Reveal delay={0.1} className="hidden md:block md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
