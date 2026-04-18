"use client";

import { AnimatePresence, m } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.24, ease: EASE }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
