import Link from "next/link";
import HeroStagger from "./components/HeroStagger";
import Reveal from "./components/Reveal";
import TextMarquee from "./components/TextMarquee";
import Reviews from "./components/Reviews";
import ReviewPill from "./components/ReviewPill";
import DisciplineIcon from "./components/DisciplineIcon";
import { ArrowUpRight } from "lucide-react";
import { announcements, disciplines } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export default function Home() {
  const event = announcements.find((a) => a.active && a.kind === "event");

  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Hero background video */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[95vh] z-0 overflow-hidden">
        <video
          src="/factum-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-[0.55]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 40%, rgba(0,0,0,0.55) 65%, transparent 95%)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 40%, rgba(0,0,0,0.55) 65%, transparent 95%)",
          }}
        />
      </div>

      {/* Top-of-hero social-proof row — event ticker + review pill, stacked center */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        {event && (
          <Reveal duration={0.5} y={-8}>
            <Link
              href={event.cta?.href ?? "#"}
              className="group inline-flex items-center gap-3 border border-white/15 bg-white/[0.03] backdrop-blur-sm rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors"
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--red)" }}
              />
              {event.title} · {event.date ? formatDate(event.date, "medium") : ""}
              <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </Link>
          </Reveal>
        )}
        <Reveal duration={0.5} y={-8} delay={0.15}>
          <ReviewPill />
        </Reveal>
      </div>

      {/* Hero headline */}
      <section className="relative z-10 pt-32 md:pt-40 px-6 md:px-10">
        <HeroStagger
          className="font-sans font-bold uppercase text-white leading-[0.9] tracking-[-0.05em] text-[52px] sm:text-[120px] md:text-[180px]"
          lines={["Factum //", "Your gym for"]}
        />

        <Reveal
          delay={0.7}
          className="mt-1 md:mt-2 font-sans font-bold uppercase text-white leading-[0.9] tracking-[-0.05em] text-[52px] sm:text-[120px] md:text-[180px]"
        >
          <TextMarquee
            items={[
              "Boxing",
              "Kickboxing",
              "Muay Thai",
              "Jiu Jitsu",
              "MMA",
              "Fitness",
            ]}
            hrefs={[
              "/schedule?filter=boxing",
              "/schedule?filter=kickboxing",
              "/schedule?filter=muay-thai",
              "/schedule?filter=jiu-jitsu",
              "/schedule?filter=mma",
              "/schedule?filter=fitness",
            ]}
            hold={1.6}
            transition={0.7}
            accent="var(--red)"
          />
        </Reveal>

        {/* Metadata caption — desktop only */}
        <Reveal
          className="hidden md:block absolute right-14 top-[320px] text-[11px] tracking-[0.14em] uppercase leading-[1.6] text-white/85 z-20 text-right"
          delay={0.9}
        >
          <div>Factum Fitness MMA Training Gym</div>
          <div>Boxing · Muay Thai · MMA</div>
          <div className="mt-6">UT / US / EN</div>
        </Reveal>
      </section>

      {/* First class free — primary CTA */}
      <section className="relative z-10 mt-40 md:mt-56 px-6 md:px-14">
        <Reveal className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 md:gap-16">
          <h2 className="text-[44px] md:text-[72px] leading-[0.95] tracking-[-0.02em] max-w-[680px]">
            Your first class is on us.
          </h2>
          <div className="flex flex-col items-start gap-5 md:items-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full py-5 md:py-6 pl-8 md:pl-10 pr-6 md:pr-8 text-white text-[18px] md:text-[22px] uppercase tracking-[0.12em] font-semibold transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: "var(--red)" }}
            >
              Claim your free class
              <span className="inline-block text-[20px] md:text-[24px] transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <p className="text-[13px] text-white/55 max-w-[340px] md:text-right leading-[1.5]">
              Walk in any day. Wraps, gloves, and coaching included — no signup, no pressure.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Member reviews */}
      <Reviews />

      {/* Classes overview — intro + imagery strip + list */}
      <section className="relative z-10 mt-40 md:mt-56 px-6 md:px-14">
        <Reveal className="grid grid-cols-12 gap-x-10">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[13px] text-white/45">Our classes</p>
          </div>
          <div className="col-span-12 md:col-span-8 mt-2 md:mt-0">
            <p className="text-[13px] text-white/45 leading-[1.45] max-w-[560px]">
              Six disciplines, one roof. Walk in, train with coaches who
              compete, leave sharper than you arrived.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-16 md:mt-20 text-[44px] md:text-[72px] leading-[0.98] tracking-[-0.02em] max-w-[900px]">
            Train every discipline.
          </h2>
        </Reveal>

        {/* Imagery strip — visual break between heading and list */}
        <Reveal delay={0.15} className="mt-12 md:mt-16">
          <ul className="grid grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { src: "/images/gym/boxing-3.jpg", label: "Boxing" },
              { src: "/images/gym/muay-thai-1.jpg", label: "Muay Thai" },
              { src: "/images/gym/jiu-jitsu-2.jpg", label: "Jiu Jitsu" },
            ].map((img) => (
              <li
                key={img.src}
                className="relative bg-black aspect-[4/5] md:aspect-[3/4] overflow-hidden"
              >
                <img
                  src={img.src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
                <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-4 left-4 text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-white/95">
                  {img.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Discipline list — icons + names + see-all CTA */}
        <Reveal className="grid grid-cols-12 gap-x-10 mt-16 md:mt-24" delay={0.2}>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">
              Six disciplines
            </p>
            <Link
              href="/classes"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white hover:text-white/70 transition-colors self-start"
            >
              See all classes
              <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
            </Link>
          </div>

          <ul className="col-span-12 md:col-span-8 flex flex-col mt-8 md:mt-0 border-t border-white/10">
            {disciplines.map((d) => (
              <li
                key={d.slug}
                className="border-b border-white/10"
              >
                <Link
                  href={`/classes#${d.slug}`}
                  className="group flex items-center justify-between gap-6 py-5 md:py-7 transition-colors hover:text-white/70"
                >
                  <span className="flex items-center gap-5 md:gap-7">
                    <DisciplineIcon
                      name={d.icon}
                      size={22}
                      className="text-white/55 group-hover:text-white transition-colors"
                    />
                    <span className="text-[32px] md:text-[48px] leading-[1.1] tracking-[-0.01em]">
                      {d.name}
                    </span>
                  </span>
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-white/35 group-hover:text-white/70 transition-colors whitespace-nowrap">
                    {d.tags[0]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Statement + review pill */}
      <section className="relative z-10 mt-40 md:mt-48 px-6 md:px-14 pt-14 border-t border-white/10">
        <Reveal className="grid grid-cols-12 gap-x-10">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[13px] text-white/45">The gym</p>
          </div>
          <div className="col-span-12 md:col-span-8 mt-2 md:mt-0 flex flex-col gap-10 md:gap-12">
            <p className="text-[13px] text-white/45 leading-[1.45] max-w-[560px]">
              Built in Sandy, Utah. Open seven days.
            </p>
            <ReviewPill />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-14 md:mt-16 text-[44px] md:text-[72px] leading-[1.02] tracking-[-0.02em] max-w-[1200px]">
            A boxing, kickboxing and mixed martial arts gym focused on
            technique, conditioning, and community.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
