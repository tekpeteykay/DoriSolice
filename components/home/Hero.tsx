"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { GradientButton } from "@/components/ui/GradientButton";
import { InfinityMark } from "@/components/ui/InfinityMark";
import type { HeroSlide } from "@/data/hero-slides";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;

// Bottom-up fade of the brand gradient over the slide image — same three
// colors as the CTA button and the frame behind the two cards, just used
// as a vertical wash instead of a horizontal fill.
const IMAGE_OVERLAY =
  "linear-gradient(0deg, rgba(186,10,12,0.82) 0%, rgba(156,127,168,0.55) 32%, rgba(62,116,154,0.22) 62%, rgba(62,116,154,0) 85%)";

export function Hero({ slides: heroSlides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [heroSlides.length]);

  const slide = heroSlides[index];

  return (
    <section className="relative bg-navy-900 pb-14 pt-28 md:pb-20 md:pt-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-gradient p-2.5 shadow-glow md:rounded-[2.5rem] md:p-3.5">
          <div className="grid gap-2.5 md:grid-cols-[36fr_64fr] md:gap-3.5">
            {/* Left card: credit-card portrait proportions, content settled toward the bottom */}
            <div className="relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-[#00385A] p-8 pb-12 text-white md:min-h-[600px] md:rounded-[2rem] md:p-10 md:pb-14">
              {/* Infinity mark oversized and tilted so it fills the card and
                  bleeds off its edges — the card's own overflow-hidden acts
                  as the clipping mask. Taken out of the flex flow (absolute)
                  so it no longer pushes the bottom-anchored text down. */}
              <InfinityMark
                glow
                className="absolute -left-28 -top-12 h-[230px] w-[530px] rotate-[-18deg] md:-left-28 md:-top-12 md:h-[280px] md:w-[640px] md:rotate-[-20deg]"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h1 className="text-[clamp(1.625rem,3.4vw,2.5rem)] font-medium leading-[1.15] tracking-normal">{slide.title}</h1>
                  <p className="mt-3 text-sm text-white/70 md:text-base">{slide.subtitle}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <GradientButton href={slide.ctaHref} size="md">
                  {slide.ctaLabel}
                </GradientButton>

                <div className="flex items-center gap-2">
                  {heroSlides.map((s, i) => (
                    <button
                      key={s.title}
                      aria-label={`Show slide ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        i === index ? "w-6 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right card: every slide image stays mounted and is crossfaded
                purely via opacity — nothing mounts or unmounts mid-transition,
                which is what caused the post-transition glitch. */}
            <div className="relative min-h-[280px] overflow-hidden rounded-[1.5rem] md:min-h-0 md:rounded-[2rem]">
              {heroSlides.map((s, i) => (
                <motion.div
                  key={s.image}
                  animate={{ opacity: i === index ? 1 : 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0"
                  style={{ zIndex: i === index ? 1 : 0 }}
                >
                  <Image src={s.image} alt={s.title} fill priority className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                </motion.div>
              ))}
              <div className="pointer-events-none absolute inset-0 z-[2]" style={{ background: IMAGE_OVERLAY }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
