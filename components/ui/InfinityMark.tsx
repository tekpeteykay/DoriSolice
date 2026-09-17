"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// The source PNG is a plain silhouette (alpha-only) — it's used purely as a
// CSS mask, so this mark always renders in the same three brand colors no
// matter where it appears, regardless of what the source pixels look like.
const MASK_STYLE = {
  WebkitMaskImage: "url(/watermarks/infinity.png)",
  maskImage: "url(/watermarks/infinity.png)",
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center center",
  maskPosition: "center center",
} as const;

interface InfinityMarkProps {
  className?: string;
  /** Adds the slow light-sweep glow used on the Hero card. */
  glow?: boolean;
  /** "diagonal" (default, used on the Hero card) or "vertical" — the same
   * top-to-bottom direction as the FAQ section background, used on the
   * About Us card. */
  direction?: "diagonal" | "vertical";
}

export function InfinityMark({ className, glow = false, direction = "diagonal" }: InfinityMarkProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none relative", className)}>
      <div
        className={cn("absolute inset-0", direction === "vertical" ? "bg-[linear-gradient(to_bottom,#BA0A0C_0%,#9C7FA8_50%,#3E749A_100%)]" : "bg-brand-gradient")}
        style={MASK_STYLE}
      />
      {glow && (
        <motion.div
          className="absolute inset-0"
          style={{
            ...MASK_STYLE,
            backgroundImage: "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.9) 50%, transparent 65%)",
            backgroundSize: "300% 300%",
            mixBlendMode: "screen",
          }}
          animate={{ backgroundPosition: ["-40% -40%", "140% 140%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}
