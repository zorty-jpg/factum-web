import Reveal from "../components/Reveal";
import DisciplineIcon from "../components/DisciplineIcon";
import RevealImages from "../components/RevealImages";
import VideoLightbox from "../components/VideoLightbox";
import {
  disciplines,
  scheduleForDiscipline,
  type ScheduleEntry,
} from "@/lib/content";
import { site } from "@/lib/site";
import { formatTime } from "@/lib/utils";

export const metadata = {
  title: "Classes — Factum",
};

// Real Factum MMA channel video IDs (from their YouTube RSS feed)
// Channel: https://www.youtube.com/channel/UCLjVbvdqxoN6Xfeg3z4bRRQ
const featuredVideos = [
  {
    videoId: "3EzI6ejXX94",
    poster: "/images/gym/gym-1.jpeg",
    label: "Factum MMA — Inside the gym",
  },
  {
    videoId: "jI56QgDS4hI",
    poster: "/images/gym/jiu-jitsu-1.jpg",
    label: "Rear Naked Choke escape",
  },
  {
    videoId: "_vDI9s0s2RU",
    poster: "/images/gym/mma-4.jpg",
    label: "Sprawl → Corner the arm",
  },
  {
    videoId: "3wdqLnf2yWU",
    poster: "/images/gym/mma-1.jpg",
    label: "Whizzer front quarter",
  },
];

const DAY_LABEL: Record<string, string> = {
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
  Sat: "Sat",
};

function groupSchedule(entries: ScheduleEntry[]) {
  const byDay = new Map<string, ScheduleEntry[]>();
  for (const e of entries) {
    const list = byDay.get(e.day) ?? [];
    list.push(e);
    byDay.set(e.day, list);
  }
  const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return order
    .filter((d) => byDay.has(d))
    .map((day) => ({ day, entries: byDay.get(day) ?? [] }));
}

export default function ClassesPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <section className="pt-40 px-6 md:px-12">
        <Reveal className="grid grid-cols-12 gap-x-10">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[13px] text-white/45 leading-[1.45] max-w-[260px]">
              Our classes
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 mt-2 md:mt-0">
            <p className="text-[13px] text-white/45 leading-[1.45] max-w-[560px]">
              Six disciplines under one roof. Walk in, train with coaches who
              compete, leave sharper than you arrived.
            </p>
          </div>
        </Reveal>

        <Reveal
          className="grid grid-cols-12 gap-x-10 mt-16 md:mt-24"
          delay={0.1}
        >
          <div className="col-span-12 md:col-span-4">
            <h1 className="text-[44px] md:text-[56px] leading-[1.05] tracking-[-0.02em]">
              Train every
              <br />
              discipline.
            </h1>
          </div>

          <ul className="col-span-12 md:col-span-8 flex flex-col mt-8 md:mt-0 border-t border-white/10">
            {disciplines.map((d) => (
              <li key={d.slug} className="border-b border-white/10">
                <a
                  href={`#${d.slug}`}
                  className="group flex items-center gap-5 py-3 md:py-4 transition-colors hover:text-white/70"
                >
                  <DisciplineIcon
                    name={d.icon}
                    size={20}
                    className="text-white/50 group-hover:text-white transition-colors"
                  />
                  <span className="text-[24px] md:text-[32px] leading-[1.15] tracking-[-0.01em]">
                    {d.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Featured videos — real Factum YouTube embeds via seamless lightbox */}
      <section className="mt-32 md:mt-40 px-6 md:px-12">
        <Reveal className="grid grid-cols-12 gap-x-10 mb-10 md:mb-14">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[13px] text-white/45">Watch a class</p>
          </div>
          <div className="col-span-12 md:col-span-8 mt-2 md:mt-0">
            <p className="text-[13px] text-white/45 leading-[1.45] max-w-[560px]">
              Clips from the gym — sessions, techniques, coaches. Straight from
              Factum&rsquo;s YouTube.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {featuredVideos.map((v) => (
              <VideoLightbox
                key={v.videoId}
                videoId={v.videoId}
                poster={v.poster}
                label={v.label}
                aspectRatio="4/3"
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Discipline detail rows — reveal hover + schedule preview */}
      <section className="mt-32 md:mt-40 px-6 md:px-12">
        <div className="flex flex-col">
          {disciplines.map((d, i) => {
            const schedule = groupSchedule(scheduleForDiscipline(d.slug));
            return (
              <Reveal
                key={d.slug}
                as="article"
                delay={i * 0.05}
                className="group relative grid grid-cols-12 gap-x-6 md:gap-x-10 py-12 md:py-16 border-t border-white/10"
              >
                <div
                  id={d.slug}
                  className="col-span-12 md:col-span-1 text-[13px] text-white/45 tracking-[0.08em] scroll-mt-40"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="col-span-12 md:col-span-6 mt-4 md:mt-0">
                  <div className="flex items-center gap-3">
                    <DisciplineIcon
                      name={d.icon}
                      size={26}
                      className="text-white/70 transition-colors group-hover:text-white"
                    />
                    <h2 className="text-[36px] md:text-[56px] leading-[1.02] tracking-[-0.02em] transition-colors group-hover:text-white/70">
                      {d.name}
                    </h2>
                  </div>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-white/50">
                    {d.tags.join(" · ")}
                  </p>
                  {d.slug === "functional-fitness" && (
                    <a
                      href={site.apps.sugarwod}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-4 text-[10px] uppercase tracking-[0.14em] text-white/60 border border-white/15 rounded-full px-2.5 py-1 hover:text-white transition-colors"
                    >
                      Tracked in SugarWod ↗
                    </a>
                  )}
                  <p className="mt-6 md:mt-8 text-[16px] md:text-[18px] leading-[1.5] text-white/85 max-w-[520px]">
                    {d.blurb}
                  </p>

                  {schedule.length > 0 && (
                    <div className="mt-8 md:mt-10 border-t border-white/10 pt-6">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-white/45 mb-4">
                        This week
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {schedule.map((row) => (
                          <li
                            key={row.day}
                            className="grid grid-cols-[64px_1fr] gap-4 text-[13px] md:text-[14px]"
                          >
                            <span className="text-white/50 uppercase tracking-[0.1em]">
                              {DAY_LABEL[row.day]}
                            </span>
                            <span className="text-white/85 font-medium tracking-tight">
                              {row.entries
                                .map((e) =>
                                  e.endTime
                                    ? `${formatTime(e.time)} – ${formatTime(e.endTime)}`
                                    : formatTime(e.time),
                                )
                                .join("  ·  ")}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={`/schedule?filter=${d.slug}`}
                        className="inline-block mt-6 text-[11px] uppercase tracking-[0.14em] link-underline"
                      >
                        View full schedule →
                      </a>
                    </div>
                  )}
                </div>

                {/* Reveal-on-hover imagery — stacked rotate/scale */}
                <div className="hidden md:block col-span-5 relative min-h-[340px]">
                  <RevealImages
                    images={[
                      { src: d.images[0], alt: `${d.name} training at Factum` },
                      { src: d.images[1], alt: `${d.name} at Factum` },
                    ]}
                  />
                </div>

                {/* Mobile: static hero image */}
                <div className="col-span-12 md:hidden mt-8">
                  <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                    <img
                      src={d.images[0]}
                      alt={`${d.name} at Factum`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
