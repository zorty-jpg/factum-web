import Reveal from "../components/Reveal";
import { weeklySchedule } from "@/lib/content";
import ScheduleGrid from "./ScheduleGrid";

export const metadata = {
  title: "Schedule — Factum",
};

export default function SchedulePage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <section className="pt-40 px-6 md:px-12">
        <Reveal className="grid grid-cols-12 gap-x-10">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[13px] text-white/45 leading-[1.45]">
              Weekly schedule
              <span className="block text-white/30 text-[11px] uppercase tracking-[0.14em] mt-1">
                Mountain Time · Sandy, UT
              </span>
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 mt-2 md:mt-0">
            <p className="text-[13px] text-white/45 leading-[1.45] max-w-[560px]">
              All classes, all disciplines. Drop in any time — first day free.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-10 text-[52px] md:text-[80px] leading-[1.02] tracking-[-0.02em] max-w-[960px]">
            Six mornings,
            <br />
            six evenings,
            <br />
            every week.
          </h1>
        </Reveal>
      </section>

      <section className="mt-20 md:mt-32 px-6 md:px-12">
        <ScheduleGrid entries={weeklySchedule} />

        <Reveal delay={0.2}>
          <p className="mt-20 text-[13px] text-white/45 max-w-[640px] leading-[1.5]">
            All times Mountain Time. Arrive 10 minutes early for your first
            session — we&rsquo;ll get you sized for wraps and show you around.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
