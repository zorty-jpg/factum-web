import Reveal from "../components/Reveal";
import { announcements } from "@/lib/content";
import { fullAddress, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Contact — Factum",
};

export default function ContactPage() {
  const event = announcements.find((a) => a.active && a.kind === "event");

  return (
    <main className="relative min-h-screen bg-black text-white">
      <section className="pt-40 px-6 md:px-12">
        <Reveal className="grid grid-cols-12 gap-x-10">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[13px] text-white/45">Contact</p>
          </div>
          <div className="col-span-12 md:col-span-8 mt-2 md:mt-0">
            <p className="text-[13px] text-white/45 leading-[1.45] max-w-[560px]">
              First day is free — just walk in. If you want to ask something
              first, here&rsquo;s how.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-10 text-[56px] md:text-[96px] leading-[1.02] tracking-[-0.02em]">
            Come train.
          </h1>
        </Reveal>
      </section>

      {event && (
        <section className="mt-20 md:mt-28 px-6 md:px-12">
          <Reveal className="grid grid-cols-12 gap-x-10 py-8 border-t border-white/10">
            <div className="col-span-12 md:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--red)" }}>
                Upcoming event
              </p>
              <h2 className="mt-3 text-[32px] md:text-[40px] leading-[1.1] tracking-[-0.01em]">
                {event.title}
              </h2>
              <p className="mt-2 text-[13px] uppercase tracking-[0.14em] text-white/60">
                {event.date ? formatDate(event.date, "long") : ""} · {event.location}
              </p>
            </div>
            <p className="col-span-12 md:col-span-8 mt-4 md:mt-0 text-[18px] leading-[1.45] text-white/80 max-w-[640px]">
              {event.body}
            </p>
          </Reveal>
        </section>
      )}

      <section className="mt-12 md:mt-20 px-6 md:px-12 grid grid-cols-12 gap-x-10 border-t border-white/10 pt-14">
        <Reveal className="col-span-12 md:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">
            Location
          </p>
          <p className="mt-4 text-[22px] md:text-[24px] leading-[1.3]">
            {site.address.line1}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </p>

          <p className="mt-12 text-[11px] uppercase tracking-[0.14em] text-white/50">
            Direct
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-[22px] md:text-[24px]">
            <li>
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.tel}`} className="link-underline">
                {site.phone.display}
              </a>
            </li>
          </ul>

          <p className="mt-12 text-[11px] uppercase tracking-[0.14em] text-white/50">
            Follow
          </p>
          <ul className="mt-4 flex flex-wrap items-center gap-6 text-[13px] uppercase tracking-[0.14em]">
            {site.socials.map((s) =>
              s.url ? (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline"
                  >
                    {s.name}
                  </a>
                </li>
              ) : (
                <li key={s.name} className="text-white/30">
                  {s.name}
                </li>
              ),
            )}
          </ul>
        </Reveal>

        <Reveal
          as="div"
          delay={0.1}
          className="col-span-12 md:col-span-7 mt-12 md:mt-0"
        >
          <form className="flex flex-col gap-8 max-w-[560px]">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">
              Or send a note
            </p>

            <label className="flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                Name
              </span>
              <input
                type="text"
                className="bg-transparent border-b border-white/30 py-2 text-[18px] md:text-[20px] outline-none focus:border-red transition-colors"
                placeholder="Your name"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                Email
              </span>
              <input
                type="email"
                className="bg-transparent border-b border-white/30 py-2 text-[18px] md:text-[20px] outline-none focus:border-red transition-colors"
                placeholder="you@email.com"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                Message
              </span>
              <textarea
                rows={4}
                className="bg-transparent border-b border-white/30 py-2 text-[18px] md:text-[20px] outline-none focus:border-red transition-colors resize-none"
                placeholder="What do you want to train?"
              />
            </label>

            <button
              type="button"
              className="self-start mt-4 text-[11px] uppercase tracking-[0.14em] link-underline"
            >
              Send message →
            </button>
          </form>
        </Reveal>
      </section>

      <section className="mt-20 md:mt-28 px-6 md:px-12">
        <Reveal>
          <div
            aria-hidden
            className="w-full aspect-[16/5] bg-white/5 border border-white/10 flex items-center justify-center"
          >
            <span className="text-[11px] uppercase tracking-[0.14em] text-white/30">
              Map placeholder — {fullAddress}
            </span>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
