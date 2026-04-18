"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const line = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function HeroStagger({
  lines,
  className,
}: {
  lines: ReactNode[];
  className?: string;
}) {
  return (
    <m.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {lines.map((text, i) => (
        <m.span key={i} className="block whitespace-nowrap" variants={line}>
          {text}
        </m.span>
      ))}
    </m.h1>
  );
}
