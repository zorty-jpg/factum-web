import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-32">
      <div className="max-w-[640px] flex flex-col gap-8">
        <p
          className="text-[11px] uppercase tracking-[0.18em]"
          style={{ color: "var(--red)" }}
        >
          404
        </p>
        <h1 className="text-[56px] md:text-[88px] leading-[1.02] tracking-[-0.02em]">
          Wrong corner.
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.45] text-white/70 max-w-[480px]">
          That page doesn&rsquo;t exist. Pick a direction below.
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-8 gap-y-3 text-[13px] uppercase tracking-[0.14em]">
          <li><Link href="/" className="link-underline">Home</Link></li>
          <li><Link href="/schedule" className="link-underline">Schedule</Link></li>
          <li><Link href="/classes" className="link-underline">Classes</Link></li>
          <li><Link href="/pricing" className="link-underline">Pricing</Link></li>
          <li><Link href="/contact" className="link-underline">Contact</Link></li>
        </ul>
      </div>
    </main>
  );
}
