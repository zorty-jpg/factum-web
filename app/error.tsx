"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-32">
      <div className="max-w-[640px] flex flex-col gap-8">
        <p
          className="text-[11px] uppercase tracking-[0.18em]"
          style={{ color: "var(--red)" }}
        >
          Something broke
        </p>
        <h1 className="text-[56px] md:text-[88px] leading-[1.02] tracking-[-0.02em]">
          Out of round.
        </h1>
        <p className="text-[18px] md:text-[20px] leading-[1.45] text-white/70 max-w-[480px]">
          The page hit an unexpected error. Try again, or head somewhere else.
        </p>
        <div className="mt-2 flex flex-wrap gap-6 text-[13px] uppercase tracking-[0.14em]">
          <button
            type="button"
            onClick={reset}
            className="link-underline cursor-pointer"
          >
            Reload
          </button>
          <Link href="/" className="link-underline">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
