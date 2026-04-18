import Reveal from "../components/Reveal";
import { pricing } from "@/lib/content";

export const metadata = {
  title: "Pricing — Factum",
};

export default function PricingPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <section className="pt-40 px-6 md:px-12">
        <Reveal className="grid grid-cols-12 gap-x-10">
          <div className="col-span-12 md:col-span-4">
            <p className="text-[13px] text-white/45 leading-[1.45]">Pricing</p>
          </div>
          <div className="col-span-12 md:col-span-8 mt-2 md:mt-0">
            <p className="text-[13px] text-white/45 leading-[1.45] max-w-[560px]">
              One membership, every discipline. No contracts, no fine print.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-10 text-[56px] md:text-[96px] leading-[1.02] tracking-[-0.02em]">
            One price.
            <br />
            Everything in.
          </h1>
        </Reveal>
      </section>

      <section className="mt-20 md:mt-32 px-6 md:px-12">
        {pricing.map((tier, i) => (
          <Reveal
            key={tier.name}
            delay={i * 0.05}
            className="grid grid-cols-12 gap-x-10 py-10 md:py-14 border-t border-white/10"
          >
            <div className="col-span-12 md:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                {tier.name}
              </p>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-[64px] md:text-[88px] leading-none tracking-[-0.02em]">
                  {tier.price}
                </span>
                <span className="text-[12px] md:text-[13px] text-white/60 uppercase tracking-[0.14em]">
                  {tier.period}
                </span>
              </div>
            </div>

            <ul className="col-span-12 md:col-span-5 mt-8 md:mt-0 flex flex-col gap-3">
              {tier.perks.map((p) => (
                <li
                  key={p}
                  className="text-[16px] md:text-[18px] leading-[1.4] text-white/90 pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-red"
                >
                  {p}
                </li>
              ))}
            </ul>

            <div className="col-span-12 md:col-span-3 mt-8 md:mt-0 flex flex-col md:items-end gap-4">
              <a
                href="/contact"
                className="text-[11px] uppercase tracking-[0.14em] link-underline"
              >
                Claim free day →
              </a>
              <a
                href="/schedule"
                className="text-[11px] uppercase tracking-[0.14em] link-underline"
              >
                See schedule →
              </a>
            </div>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
