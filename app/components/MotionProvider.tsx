"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion strict features={domAnimation}>
      <MotionConfig reducedMotion="never">{children}</MotionConfig>
    </LazyMotion>
  );
}
