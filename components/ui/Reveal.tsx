"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// A single, consistent "push up and fade in" reveal used across the whole
// site. Triggers once, the moment an element scrolls into view — never on
// page load for anything below the fold — so navigating to a page still
// "just appears", and scrolling is what brings each element in.
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Reveal({
  children,
  delay = 0,
  y = 26,
  duration = 0.65,
  className,
  id,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  id?: string;
  as?: "div" | "span" | "li";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      id={id}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
