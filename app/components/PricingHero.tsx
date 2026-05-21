"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Reveal from "./Reveal";
import { pricing } from "@/lib/content";

const MONTHLY_WHOLE = Math.floor(pricing.monthly);
const MONTHLY_CENTS = (pricing.monthly % 1).toFixed(2).slice(1);

function AnimatedFigure({
  value,
  prefix = "",
}: {
  value: string | number;
  prefix?: string;
}) {
  return (
    <span className="relative inline-flex items-baseline">
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={`${value}`}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          className="tabular-nums"
        >
          {prefix}
          {value}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

export default function PricingHero() {
  const [perWeek, setPerWeek] = useState(3);
  const classesPerMonth = Math.round(perWeek * pricing.weeksPerMonth);
  const dropInTotal = pricing.dropInRate * classesPerMonth;
  const savings = Math.round(dropInTotal - pricing.monthly);

  return (
    <section className="pt-40 px-6 md:px-12">
      {/* Headline + price — claims full viewport on load to keep savings calc below the fold */}
      <div className="grid grid-cols-12 gap-x-10 md:min-h-[calc(100svh-220px)] md:items-center">
        <div className="col-span-12 md:col-span-6">
          <Reveal>
            <p className="text-[13px] text-white/45">Membership</p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 md:mt-8 text-[44px] md:text-[72px] leading-[1.02] tracking-[-0.02em] max-w-[620px]">
              One price.
              <br />
              Unlimited training.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 md:mt-10 text-[15px] md:text-[17px] leading-[1.55] text-white/75 max-w-[520px]">
              Unlimited boxing, kickboxing, Muay Thai, Jiu Jitsu, MMA, and
              functional fitness. Walk in any day, cancel anytime. Drop-ins
              don&rsquo;t exist here — everyone pays the same flat rate.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-6 mt-12 md:mt-0 md:flex md:flex-col md:items-end md:justify-center md:pr-4 lg:pr-16 xl:pr-24">
          <Reveal delay={0.12}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 md:text-right">
              The rate
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-4 md:mt-5 flex items-start gap-x-3 md:gap-x-4 md:justify-end">
              <span className="mt-2 md:mt-5 text-[28px] md:text-[44px] leading-none tracking-[-0.02em] font-light text-white/55">
                $
              </span>
              <div className="font-sans font-bold uppercase text-white leading-[0.82] tracking-[-0.04em] text-[96px] sm:text-[140px] md:text-[180px]">
                {MONTHLY_WHOLE}
                <span className="text-[40px] md:text-[72px] align-top tracking-[-0.02em] text-white/55 ml-1.5">
                  {MONTHLY_CENTS}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-6 flex flex-wrap items-center gap-3 md:justify-end">
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                Per month · all in
              </span>
              <span
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border backdrop-blur-sm"
                style={{
                  color: "var(--red)",
                  borderColor: "rgba(191, 4, 4, 0.4)",
                  background: "rgba(191, 4, 4, 0.06)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--red)" }}
                />
                No tiers · no contracts
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Gridline */}
      <div className="mt-16 md:mt-24 border-t border-white/10" />

      {/* Savings — 4/8 split, glassy red-tinted card */}
      <div className="mt-10 md:mt-14 grid grid-cols-12 gap-x-10">
        <div className="col-span-12 md:col-span-4">
          <Reveal>
            <p className="text-[13px] text-white/45">Savings</p>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-8 mt-6 md:mt-0">
          <Reveal delay={0.08}>
            <div
              className="rounded-2xl border backdrop-blur-sm p-6 md:p-8"
              style={{
                borderColor: "rgba(191, 4, 4, 0.18)",
                background: "rgba(191, 4, 4, 0.03)",
              }}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[11px] uppercase tracking-[0.18em]"
                    style={{ color: "var(--red)" }}
                  >
                    Savings calculator
                  </p>
                  <h3 className="mt-3 text-[26px] md:text-[36px] leading-[1.05] tracking-[-0.02em] max-w-[460px]">
                    See what you&rsquo;d save vs. drop-ins.
                  </h3>
                  <p className="mt-3 text-[12px] md:text-[13px] text-white/55 leading-[1.5] max-w-[420px]">
                    The number below is what you <span className="text-white">don&rsquo;t pay</span> — not the price.
                    Drag the slider to see your savings at any frequency.
                  </p>
                </div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 shrink-0 mt-2">
                  Drag to adjust ↔
                </p>
              </div>

              {/* Hero savings figure */}
              <div className="mt-8 md:mt-10">
                <p className="text-[13px] md:text-[14px] uppercase tracking-[0.16em] font-medium" style={{ color: "var(--red)" }}>
                  You save
                </p>
                <div className="mt-2 flex items-baseline gap-x-2 md:gap-x-3 flex-wrap">
                  <span
                    className="text-[24px] md:text-[36px] leading-none font-light"
                    style={{ color: "var(--red)" }}
                  >
                    $
                  </span>
                  <span
                    className="text-[64px] md:text-[96px] leading-[0.9] tracking-[-0.03em] font-bold tabular-nums"
                    style={{ color: "var(--red)" }}
                  >
                    <AnimatedFigure value={savings} />
                  </span>
                  <span className="text-[13px] md:text-[15px] text-white/55 ml-1">
                    every month
                  </span>
                </div>
                <p className="mt-4 text-[13px] md:text-[14px] text-white/60 leading-[1.55] max-w-[480px]">
                  vs. paying ${pricing.dropInRate} per class like most gyms charge — at{" "}
                  <span className="text-white/90 font-medium">
                    <AnimatedFigure value={perWeek} />× a week
                  </span>{" "}
                  (
                  <span className="text-white/90 font-medium">
                    <AnimatedFigure value={classesPerMonth} /> classes / month
                  </span>
                  ).
                </p>
              </div>

              {/* Slider */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-baseline justify-between gap-4 flex-wrap mb-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                    If you trained
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 tabular-nums">
                    <AnimatedFigure value={classesPerMonth} /> classes / month
                  </p>
                </div>

                <div className="mb-7 flex items-baseline gap-x-3">
                  <span
                    className="text-[56px] md:text-[80px] leading-[0.9] tracking-[-0.03em] font-bold text-white tabular-nums"
                  >
                    <AnimatedFigure value={perWeek} />×
                  </span>
                  <span className="text-[14px] md:text-[16px] text-white/55 tracking-[-0.01em]">
                    a week
                  </span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={7}
                  step={1}
                  value={perWeek}
                  onChange={(e) => setPerWeek(Number(e.target.value))}
                  aria-label="Training frequency per week"
                  className="w-full h-2 appearance-none bg-white/10 rounded-full outline-none cursor-pointer accent-[var(--red)]
                             [&::-webkit-slider-thumb]:appearance-none
                             [&::-webkit-slider-thumb]:w-6
                             [&::-webkit-slider-thumb]:h-6
                             [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-white
                             [&::-webkit-slider-thumb]:border-[2px]
                             [&::-webkit-slider-thumb]:border-black
                             [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_var(--red),0_0_18px_rgba(191,4,4,0.55)]
                             [&::-webkit-slider-thumb]:cursor-grab
                             [&::-webkit-slider-thumb]:active:cursor-grabbing
                             [&::-webkit-slider-thumb]:transition-transform
                             [&::-webkit-slider-thumb]:active:scale-110
                             [&::-moz-range-thumb]:appearance-none
                             [&::-moz-range-thumb]:w-6
                             [&::-moz-range-thumb]:h-6
                             [&::-moz-range-thumb]:rounded-full
                             [&::-moz-range-thumb]:bg-white
                             [&::-moz-range-thumb]:border-[2px]
                             [&::-moz-range-thumb]:border-black
                             [&::-moz-range-thumb]:shadow-[0_0_0_2px_var(--red),0_0_18px_rgba(191,4,4,0.55)]
                             [&::-moz-range-thumb]:cursor-grab"
                />
                <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.14em] text-white/30 tabular-nums px-[2px]">
                  <span>1×</span>
                  <span>2×</span>
                  <span>3×</span>
                  <span>4×</span>
                  <span>5×</span>
                  <span>6×</span>
                  <span>7×</span>
                </div>
              </div>

              {/* The math */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-5">
                  The math
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">
                      At ${pricing.dropInRate} drop-in rates
                    </p>
                    <p className="mt-2 text-[26px] md:text-[32px] tracking-[-0.01em] font-bold text-white/55 leading-none line-through decoration-white/25">
                      $<AnimatedFigure value={dropInTotal} /> / mo
                    </p>
                    <p className="mt-2 text-[11px] text-white/35">
                      <AnimatedFigure value={classesPerMonth} /> classes × ${pricing.dropInRate}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">
                      You actually pay
                    </p>
                    <p className="mt-2 text-[26px] md:text-[32px] tracking-[-0.01em] font-bold text-white leading-none">
                      ${pricing.monthly} / mo
                    </p>
                    <p className="mt-2 text-[11px] text-white/35">
                      Flat rate, unlimited
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 pt-6 border-t border-white/10 text-[10px] md:text-[11px] text-white/30 leading-[1.5]">
                Based on a typical ${pricing.dropInRate} drop-in rate at independent martial
                arts gyms in the Salt Lake Valley. Factum doesn&rsquo;t sell
                drop-ins or class packs — this is just for the math.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  );
}
