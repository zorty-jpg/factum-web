"use client";

import { m } from "framer-motion";
import { Star } from "lucide-react";
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

function ReviewCard({ review }: { review: Review }) {
  return (
    <m.article
      whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
    >
      {/* Photo header */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={review.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
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
  return (
    <section className="relative z-10 mt-40 md:mt-56 px-6 md:px-14">
      <Reveal className="grid grid-cols-12 gap-x-10">
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

      <Reveal delay={0.1} className="mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
