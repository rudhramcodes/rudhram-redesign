"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";

export default function LenisProvider({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </ReactLenis>
  );
}
