import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import { weeklySchedule } from "@/lib/content";
import ScheduleGrid from "./ScheduleGrid";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Weekly class schedule at Factum — boxing, kickboxing, Muay Thai, Jiu Jitsu, MMA, and fitness sessions in Sandy, Utah.",
  alternates: { canonical: "/schedule" },
};

export default function SchedulePage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <section className="pt-40 px-6 md:px-12">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
            Weekly schedule · Mountain Time · Sandy, UT
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 text-[44px] md:text-[64px] leading-[1.02] tracking-[-0.02em] max-w-[900px]">
            Train every day. Your first class is on us.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 text-[13px] text-white/45 leading-[1.5] max-w-[560px]">
            All classes, all disciplines — drop in whenever. Arrive 10 minutes
            early for your first session and we&rsquo;ll size you for wraps.
          </p>
        </Reveal>
      </section>

      <section className="mt-16 md:mt-24 px-6 md:px-12 pb-16">
        <ScheduleGrid entries={weeklySchedule} />
      </section>
    </main>
  );
}
