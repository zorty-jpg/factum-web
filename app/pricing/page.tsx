import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import PricingHero from "../components/PricingHero";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One membership covers every class at Factum. First class free — walk in, train, decide.",
  alternates: { canonical: "/pricing" },
};

const perks = [
  "Unlimited Boxing, Kickboxing, Muay Thai, Jiu Jitsu, MMA and Functional Fitness",
  "Two-hour Jiu Jitsu sessions Tuesday + Thursday evenings",
  "Saturday Muay Thai sparring (10am and 11am)",
  "Daily 5:15am conditioning — programming tracked in SugarWod",
  "Open gym access during staffed hours",
  "Wraps and gloves for your first session, on us",
  "Month-to-month — cancel any time, no contract, no setup fee",
];

const steps: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Walk in",
    body: "Any day Mon–Sat. No appointment, no application — just show up ten minutes before the class you want.",
  },
  {
    n: "02",
    title: "First class on us",
    body: "Wraps, gloves, coaching — all included. We'll get you sized and show you the warm-up. You pick a discipline.",
  },
  {
    n: "03",
    title: "Decide",
    body: "Join month-to-month or take a minute to think. No pitch, no pressure. Come back for the next one whenever.",
  },
];

export default function PricingPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <PricingHero />

      {/* Free-first-class callout */}
      <section className="mt-20 md:mt-28 px-6 md:px-12">
        <Reveal>
          <div
            className="rounded-3xl p-8 md:p-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
            style={{ background: "var(--red)" }}
          >
            <div className="max-w-[680px]">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/80">
                Start here
              </p>
              <h2 className="mt-4 text-[36px] md:text-[60px] leading-[1.02] tracking-[-0.02em] text-white">
                Your first class — free.
              </h2>
              <p className="mt-5 text-[14px] md:text-[16px] leading-[1.6] text-white/90 max-w-[520px]">
                Wraps, gloves, and a coach included. No signup, no commitment,
                no pressure. The only ask: arrive ten minutes early so we can
                size you.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-white text-black text-[14px] md:text-[16px] uppercase tracking-[0.14em] font-semibold px-7 md:px-9 py-4 md:py-5 transition-transform hover:scale-[1.02] whitespace-nowrap self-start md:self-auto"
            >
              Claim your free class
              <ArrowUpRight
                size={18}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* What's included — perks only, price already anchored in hero */}
      <section id="included" className="mt-24 md:mt-32 px-6 md:px-12 scroll-mt-32">
        <Reveal className="grid grid-cols-12 gap-x-4 md:gap-x-10">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[13px] text-white/45">What&rsquo;s included</p>
          </div>
          <div className="col-span-12 md:col-span-8 mt-2 md:mt-0">
            <p className="text-[13px] text-white/45 leading-[1.45] max-w-[560px]">
              Every membership is the same — here&rsquo;s what shows up on the floor.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-10 md:mt-14 text-[40px] md:text-[60px] leading-[1.02] tracking-[-0.02em] max-w-[900px]">
            All six disciplines. All the hours.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 md:gap-y-6">
            {perks.map((p) => (
              <li
                key={p}
                className="text-[16px] md:text-[18px] leading-[1.45] text-white/90 pl-5 relative before:content-['—'] before:absolute before:left-0 before:top-0 before:text-[var(--red)] before:font-bold"
              >
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* How it works */}
      <section className="mt-32 md:mt-40 px-6 md:px-12">
        <Reveal className="grid grid-cols-12 gap-x-4 md:gap-x-10">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[13px] text-white/45">How to start</p>
          </div>
          <div className="col-span-12 md:col-span-8 mt-2 md:mt-0">
            <p className="text-[13px] text-white/45 leading-[1.45] max-w-[560px]">
              Three steps. No form fills, no onboarding spam.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-10 md:mt-14 text-[40px] md:text-[60px] leading-[1.02] tracking-[-0.02em] max-w-[900px]">
            Walk in. Train. Decide.
          </h2>
        </Reveal>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.08}
              className="bg-black p-8 md:p-10 flex flex-col gap-5 min-h-[280px]"
            >
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/40 tabular-nums">
                {s.n}
              </span>
              <h3 className="text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.01em]">
                {s.title}
              </h3>
              <p className="text-[14px] md:text-[15px] leading-[1.55] text-white/70 max-w-[360px]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-32 md:mt-40 px-6 md:px-12 pb-24 md:pb-32">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <h2 className="text-[36px] md:text-[60px] leading-[1.02] tracking-[-0.02em] max-w-[720px]">
            Still thinking? The first one&rsquo;s free.
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 rounded-full py-5 md:py-6 pl-8 md:pl-10 pr-6 md:pr-8 text-white text-[16px] md:text-[20px] uppercase tracking-[0.14em] font-semibold transition-transform hover:scale-[1.02] self-start"
            style={{ backgroundColor: "var(--red)" }}
          >
            Claim your free class
            <span className="inline-block text-[18px] md:text-[22px] transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
