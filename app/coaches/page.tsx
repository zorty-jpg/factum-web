import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import { coaches } from "@/lib/content";

export const metadata: Metadata = {
  title: "Coaches",
  description:
    "The coaching staff behind Factum — combat athletes and trainers leading classes in Sandy, Utah.",
  alternates: { canonical: "/coaches" },
};

export default function CoachesPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <section className="pt-40 px-6 md:px-12">
        <Reveal className="grid grid-cols-12 gap-x-4 md:gap-x-10">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[13px] text-white/45">Coaches</p>
          </div>
          <div className="col-span-12 md:col-span-8 mt-2 md:mt-0">
            <p className="text-[13px] text-white/45 leading-[1.45] max-w-[560px]">
              Every coach at Factum has competed. Every coach teaches what they
              live. Bios below are placeholder — real ones coming as we finalize
              with the team.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-10 text-[52px] md:text-[80px] leading-[1.02] tracking-[-0.02em] max-w-[1040px]">
            Coaches who
            <br />
            compete, teach
            <br />
            what they live.
          </h1>
        </Reveal>
      </section>

      <section className="mt-20 md:mt-32 px-6 md:px-12">
        {coaches.map((c, i) => (
          <Reveal
            key={c.slug}
            as="article"
            delay={i * 0.05}
            className="grid grid-cols-12 gap-x-4 md:gap-x-10 py-10 md:py-14 border-t border-white/10"
          >
            <div className="col-span-12 md:col-span-1 text-[13px] text-white/45 tracking-[0.08em]">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="col-span-12 md:col-span-3 mt-4 md:mt-0">
              <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.01em]">
                {c.name}
              </h2>
              <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-white/50">
                {c.role}
              </p>
            </div>
            <p className="col-span-12 md:col-span-5 mt-4 md:mt-0 text-[16px] md:text-[18px] leading-[1.45] text-white/80 max-w-[520px]">
              {c.bio}
            </p>
            <div className="col-span-12 md:col-span-3 mt-6 md:mt-0">
              <div
                aria-hidden
                className="w-full aspect-[4/5] bg-white/5 border border-white/10 flex items-center justify-center"
              >
                <span className="text-[11px] uppercase tracking-[0.14em] text-white/30">
                  Portrait placeholder
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
