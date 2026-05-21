import Image from "next/image";
import Link from "next/link";
import HeroStagger from "./components/HeroStagger";
import Reveal from "./components/Reveal";
import TextMarquee from "./components/TextMarquee";
import Reviews from "./components/Reviews";
import ReviewPill from "./components/ReviewPill";
import DisciplineList from "./components/DisciplineList";
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

      {/* Top-of-hero event ticker — centered */}
      {event && (
        <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 z-20">
          <Reveal duration={0.5} y={-8}>
            <Link
              href={event.cta?.href ?? "#"}
              className="group inline-flex items-center gap-3 border border-white/15 bg-black/40 md:bg-white/[0.03] backdrop-blur-md rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/80 hover:text-white transition-colors"
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
        </div>
      )}

      {/* Hero headline */}
      <section className="relative z-10 pt-24 md:pt-40 px-6 md:px-10">
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

        {/* Caption — sits below marquee, right aligned */}
        <Reveal
          className="hidden md:block absolute right-10 top-[540px] lg:top-[700px] z-20"
          delay={1}
        >
          <div className="text-[11px] tracking-[0.14em] uppercase leading-[1.6] text-white/85 text-right">
            <div>Factum Fitness MMA Training Gym</div>
            <div>Boxing · Muay Thai · MMA</div>
            <div className="mt-3">UT / US / EN</div>
          </div>
        </Reveal>
      </section>

      {/* First class free — primary CTA */}
      <section className="relative z-10 mt-16 md:mt-56 px-6 md:px-14">
        <Reveal className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-16">
          <h2 className="text-[36px] md:text-[72px] leading-[0.95] tracking-[-0.02em] max-w-[680px]">
            Your first class is on us.
          </h2>
          <div className="flex flex-col items-stretch md:items-end gap-4 md:gap-5 w-full md:w-auto">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-between md:justify-start gap-4 rounded-full py-2 md:py-2.5 pl-6 md:pl-10 pr-2 md:pr-2.5 text-white text-[16px] md:text-[22px] uppercase tracking-[0.1em] font-semibold transition-transform hover:scale-[1.02] shadow-[0_10px_40px_-12px_rgba(191,4,4,0.8)]"
              style={{ backgroundColor: "var(--red)" }}
            >
              <span>Claim your free class</span>
              <span
                className="flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-white text-[18px] md:text-[22px] transition-transform group-hover:translate-x-1"
                style={{ color: "var(--red)" }}
              >
                →
              </span>
            </Link>
            <p className="text-[12px] md:text-[13px] text-white/70 md:text-white/55 max-w-[340px] md:text-right leading-[1.5]">
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
                <Image
                  src={img.src}
                  alt={`${img.label} at Factum`}
                  fill
                  sizes="(max-width: 768px) 33vw, 33vw"
                  className="object-cover opacity-90"
                />
                <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-4 left-4 text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-white/95">
                  {img.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Discipline list — icons + names + see-all CTA + hover preview */}
        <Reveal className="mt-16 md:mt-24" delay={0.2}>
          <DisciplineList disciplines={disciplines} />
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
