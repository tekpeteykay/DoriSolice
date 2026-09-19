"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { type VideoTestimonial } from "@/data/video-testimonials";

const AUTO_SCROLL_SPEED = 32;
const NUDGE_DISTANCE = 324;
const RESUME_DELAY_MS = 2500;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function VideoTestimonials({ testimonials: videoTestimonials }: { testimonials: VideoTestimonial[] }) {
  // Cards are duplicated once so the track is exactly 200% wide — the
  // scroll position is looped (mod half the track width) so it always
  // lands somewhere inside a full, seamless set of cards. Same approach as
  // the text-testimonial carousel above this section.
  const loop = [...videoTestimonials, ...videoTestimonials];
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const [active, setActive] = useState<VideoTestimonial | null>(null);

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

  // Pause the auto-scroll and lock page scroll while the video lightbox is open.
  useEffect(() => {
    pausedRef.current = !!active;
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  function pauseThenResume() {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (!active) pausedRef.current = false;
    }, RESUME_DELAY_MS);
  }

  function nudge(direction: 1 | -1) {
    positionRef.current += direction * NUDGE_DISTANCE;
    pauseThenResume();
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 md:py-28">
      <div className="container">
        <Reveal className="max-w-2xl">
          {/* Sora Regular */}
          <h2 className="text-4xl font-normal leading-tight md:text-5xl">
            <span className="text-gradient">
              Don&rsquo;t take our word for it!
              <br />
              Hear it from others
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
            pausedRef.current = !!active;
          }}
          className="flex gap-6 overflow-x-hidden px-5 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] sm:px-8"
        >
          {loop.map((t, i) => (
            <VideoCard key={`${t.name}-${i}`} testimonial={t} onPlay={() => setActive(t)} />
          ))}
        </div>

        <button
          type="button"
          aria-label="Show previous videos"
          onClick={() => nudge(-1)}
          className="absolute left-1 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-card transition hover:bg-navy-50 sm:flex md:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Show next videos"
          onClick={() => nudge(1)}
          className="absolute right-1 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-card transition hover:bg-navy-50 sm:flex md:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </Reveal>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/75 p-4 backdrop-blur-xl"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close video"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8 sm:top-8"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-[9/16] h-[78vh] max-h-[760px] w-auto max-w-[92vw] overflow-hidden rounded-xl bg-black shadow-card-dark"
          >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              key={active.video}
              src={active.video}
              poster={active.poster}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function VideoCard({ testimonial: t, onPlay }: { testimonial: VideoTestimonial; onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group relative aspect-[9/16] w-[245px] shrink-0 overflow-hidden rounded-xl text-left shadow-card sm:w-[275px] md:w-[300px]"
    >
      {/* Resting state: video poster with a centered play button */}
      <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
        <Image src={t.poster} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-navy-950/30" />
        <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/85 text-white backdrop-blur-sm">
          <Play className="h-6 w-6 translate-x-0.5 fill-white" />
        </span>
      </div>

      {/* Hover state: white card with the client's details and a Play CTA.
          The group sits vertically centered in the card, but every element
          within it is left-aligned rather than centered. */}
      <div className="absolute inset-0 flex flex-col items-start justify-center gap-4 bg-white px-[35px] py-6 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-white">
          {initials(t.name)}
        </span>
        <div>
          <p className="text-sm font-semibold text-navy-900">{t.name}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">{t.service}</p>
        </div>
        <p className="line-clamp-5 text-sm leading-relaxed text-navy-600">&ldquo;{t.quote}&rdquo;</p>
        {/* Same moving-gradient hover treatment as every other gradient
            button on the site — it shifts position as the card is hovered. */}
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-gradient bg-[length:200%_auto] px-4 py-2 text-xs font-semibold text-white shadow-glow transition-all duration-300 group-hover:bg-[position:100%_0] group-hover:-translate-y-0.5">
          <Play className="h-3.5 w-3.5 fill-white" /> Play
        </span>
      </div>
    </button>
  );
}
