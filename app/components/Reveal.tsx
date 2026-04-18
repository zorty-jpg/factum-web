"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "header" | "p";
};

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  once = true,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = m[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
