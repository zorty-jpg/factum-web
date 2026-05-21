import type { Metadata } from "next";
import Reveal from "../components/Reveal";
import DisciplineDetailsList from "../components/DisciplineDetailsList";
import VideoAutoplayTile from "../components/VideoAutoplayTile";
import { disciplines } from "@/lib/content";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Boxing, Kickboxing, Muay Thai, Jiu Jitsu, MMA, and Functional Fitness — six disciplines, one membership at Factum in Sandy, Utah.",
  alternates: { canonical: "/classes" },
};

const featuredVideos = [
  {
    videoId: "3EzI6ejXX94",
    label: "Factum MMA — Inside the gym",
  },
  {
    videoId: "jI56QgDS4hI",
    label: "Rear Naked Choke escape",
  },
  {
    videoId: "_vDI9s0s2RU",
    label: "Sprawl → Corner the arm",
  },
  {
    videoId: "3wdqLnf2yWU",
    label: "Whizzer front quarter",
  },
];

export default function ClassesPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="pt-40 px-6 md:px-12">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
            Our classes · Sandy, UT
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 text-[44px] md:text-[72px] leading-[1.02] tracking-[-0.02em] max-w-[1100px]">
            Six disciplines, one gym floor.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-[14px] md:text-[15px] text-white/55 leading-[1.6] max-w-[620px]">
            Stand-up, grappling, clinch, cage — plus conditioning that fuels all
            of it. Beginners and competitors train the same sessions. Walk in
            any day; first class is on us.
          </p>
        </Reveal>
      </section>

      {/* Discipline detail rows */}
      <section className="mt-24 md:mt-32 px-6 md:px-12">
        <DisciplineDetailsList disciplines={disciplines} />
      </section>

      {/* Videos — inline autoplaying grid at the bottom */}
      <section className="mt-24 md:mt-32 px-6 md:px-12 pb-20">
        <Reveal className="grid grid-cols-12 gap-x-10 mb-10 md:mb-14">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[13px] text-white/45">Watch a class</p>
          </div>
          <div className="col-span-12 md:col-span-8 mt-2 md:mt-0">
            <p className="text-[13px] text-white/45 leading-[1.45] max-w-[560px]">
              Clips from the gym — sessions, techniques, coaches. Straight from
              Factum&rsquo;s YouTube. Click any tile for sound.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {featuredVideos.map((v) => (
              <VideoAutoplayTile
                key={v.videoId}
                videoId={v.videoId}
                label={v.label}
                aspectRatio="4/3"
              />
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
