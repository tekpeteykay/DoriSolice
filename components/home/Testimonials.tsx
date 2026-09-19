"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { type Testimonial } from "@/data/testimonials";

// Pixels per second for the continuous auto-scroll, and how far one arrow
// click nudges the row (roughly one card + its gap).
const AUTO_SCROLL_SPEED = 40;
const NUDGE_DISTANCE = 356;
const RESUME_DELAY_MS = 2500;

interface TestimonialsContent {
  heading_prefix: string;
  heading_highlight: string;
  bottom_heading: string;
  bottom_description: string;
}

export function Testimonials({ testimonials, content }: { testimonials: Testimonial[]; content: TestimonialsContent }) {
  // Cards are duplicated once so the track is exactly 200% wide — the
  // scroll position is looped (mod half the track width) so it always
  // lands somewhere inside a full, seamless set of cards.
  const loop = [...testimonials, ...testimonials];
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  // Drives the auto-scroll every frame via requestAnimationFrame (rather
  // than a CSS keyframe animation) so it can't be silently frozen by a
  // "prefers-reduced-motion" media query, and so the same position can be
  // nudged by the arrow buttons below.
  useEffect(() => {
    let rafId: number;

    function tick(timestamp: number) {
      const track = trackRef.current;
      if (track) {
        if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
        const deltaSeconds = (timestamp - lastTimestampRef.current) / 1000;
        lastTimestampRef.current = timestamp;

        if (!pausedRef.current) {
          positionRef.current += AUTO_SCROLL_SPEED * deltaSeconds;
        }

        const half = track.scrollWidth / 2;
        if (half > 0) {
          let pos = positionRef.current % half;
          if (pos < 0) pos += half;
          track.scrollLeft = pos;
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  function pauseThenResume() {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  }

  function nudge(direction: 1 | -1) {
    positionRef.current += direction * NUDGE_DISTANCE;
    pauseThenResume();
  }

  return (
    <section className="relative overflow-hidden pb-[120px] pt-[48px] md:pt-[100px]">
      <div className="absolute inset-0 -z-10">
        <Image src="/hero-slides/slide-1-passport.jpg" alt="" fill className="scale-105 object-cover blur-sm" sizes="100vw" />
        <div className="absolute inset-0 bg-navy-900/80" />
      </div>

      <div className="container">
        <Reveal className="flex items-baseline justify-center gap-3 text-center">
          {/* An opening quote mark, filled with the brand gradient — no
              stroke/outline, unlike the old lucide icon which was drawn as
              an outline. Bigger than the heading, but aligned to its
              baseline so it reads as part of the same line, not a separate
              element floating above it. */}
          <span
            aria-hidden
            className="relative top-[0.32em] bg-brand-gradient bg-clip-text font-serif text-9xl leading-none text-transparent md:text-[10rem]"
          >
            &ldquo;
          </span>
          <h2 className="text-4xl font-medium tracking-tight text-white md:text-6xl">
            {content.heading_prefix}{" "}
            <span className="bg-[linear-gradient(to_right,#EEFFFF_0%,#5EABDD_100%)] bg-clip-text text-transparent">
              {content.heading_highlight}
            </span>
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="relative mt-14">
        <div
          ref={trackRef}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          className="flex gap-6 overflow-x-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
        >
          {loop.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </div>

        <button
          type="button"
          aria-label="Show previous testimonials"
          onClick={() => nudge(-1)}
          className="absolute left-1 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-card backdrop-blur transition hover:bg-white sm:flex md:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Show next testimonials"
          onClick={() => nudge(1)}
          className="absolute right-1 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-card backdrop-blur transition hover:bg-white sm:flex md:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </Reveal>

      <div className="container relative mt-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="whitespace-pre-line text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">{content.bottom_heading}</h3>
        <p className="max-w-md text-xs leading-relaxed text-white/70 md:text-sm">{content.bottom_description}</p>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col justify-center rounded-[1.75rem] bg-[#DCEAFB] p-5 shadow-card sm:p-6 md:w-[340px] md:p-8 lg:p-10 xl:p-[50px]">
      <div className="flex gap-1">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-navy-700">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-6 border-t border-navy-900/10 pt-4">
        <p className="font-semibold text-navy-900">{t.name}</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">{t.service}</p>
      </div>
    </div>
  );
}
