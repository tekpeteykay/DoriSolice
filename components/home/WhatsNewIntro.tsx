"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Calculator, ShieldCheck, BookOpenText, CalendarCheck2, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { SiteUpdate } from "@/types";
import { getUpdateImage } from "@/lib/update-images";
import { scrollVariants } from "@/lib/motion-variants";

const CYCLE_MS = 5000;

const ACTION_ICONS = [Calculator, ShieldCheck, BookOpenText, CalendarCheck2];
const ACTION_TONES = ["navy", "gradient", "slate", "white"] as const;

interface ActionCard {
  title: string;
  description: string;
  href: string;
}

interface WhatsNewIntroContent {
  heading: string;
  intro_heading: string;
  intro_body: string;
  prompt_label: string;
  actions: ActionCard[];
}

export function WhatsNewIntro({ updates, content }: { updates: SiteUpdate[]; content: WhatsNewIntroContent }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % updates.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [updates.length]);

  const current = updates[index];
  const currentImage = current.imageUrl ?? getUpdateImage(current.slug);
  const actions = content.actions ?? [];

  return (
    // Gradient fills edge-to-edge here — it's the section's own background,
    // not a rounded frame around the content like the Hero card uses.
    <section id="whats-new" className="bg-brand-gradient">
      <div className="container py-10 md:py-14">
        {/* "See What's New" strip: label beside a featured-update card that
            auto-cycles through every update, flipping down to the next one. */}
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <h2 className="shrink-0 whitespace-pre-line text-3xl font-semibold leading-[1.05] text-white md:w-44 md:text-4xl">{content.heading}</h2>
          <Link
            href={`/blog?post=${current.slug}`}
            className="group flex flex-1 flex-col gap-5 overflow-hidden rounded-[1.5rem] bg-navy-950 p-6 text-white shadow-card-dark transition-colors hover:bg-navy-800 sm:flex-row sm:items-center md:rounded-[2rem] md:p-7"
          >
            {/* Both stacks use a shared CSS grid cell (rather than absolute
                positioning) so the outgoing and incoming item can overlap
                mid-scroll while the container still sizes itself off real,
                in-flow content — no fixed height needed. */}
            <div className="grid h-44 w-full shrink-0 overflow-hidden rounded-2xl sm:h-40 sm:w-40">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.slug + "-img"}
                  variants={scrollVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="relative [grid-area:1/1]"
                >
                  <Image src={currentImage} alt="" fill className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="grid flex-1 overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.slug + "-text"}
                  variants={scrollVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="[grid-area:1/1] self-center"
                >
                  <h3 className="text-lg font-semibold leading-snug md:text-xl">{current.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65 md:text-base">{current.summary}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex shrink-0 flex-row items-center gap-3 self-start sm:flex-col sm:self-center">
              {/* Same gradient + hover treatment as the Hero CTA button — the
                  rule now applied to every gradient button on the site. */}
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient bg-[length:200%_auto] text-white shadow-glow transition-all duration-300 group-hover:bg-[position:100%_0] group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-6 w-6" />
              </span>
              <span className="text-xs font-semibold text-red-400">Read More</span>
            </div>
          </Link>
        </Reveal>

        {/* Intro + quick-start cards, inside their own white card */}
        <Reveal delay={0.1} className="mt-6 rounded-[1.5rem] bg-white p-7 shadow-card md:mt-8 md:rounded-[2rem] md:p-14">
            <h2 className="text-center text-4xl font-semibold leading-tight md:text-5xl">
              <span className="text-gradient">{content.intro_heading}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-navy-600">{content.intro_body}</p>

            <p className="mt-10 text-center text-sm font-semibold uppercase tracking-[0.2em] text-red-600">{content.prompt_label}</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {actions.map((action, i) => {
                const Icon = ACTION_ICONS[i % ACTION_ICONS.length];
                const tone = ACTION_TONES[i % ACTION_TONES.length];
                return (
                  <Reveal key={`${action.title}-${i}`} delay={i * 0.08}>
                    <Link
                      href={action.href}
                      className={cn(
                        "group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-all hover:-translate-y-1.5",
                        tone === "navy" && "bg-navy-900 text-white shadow-card-dark",
                        tone === "gradient" && "bg-brand-gradient text-white shadow-glow",
                        tone === "slate" && "bg-slate-100 text-navy-900 shadow-card",
                        // Same lift + glow hover as the site's gradient buttons — stays white, just lifts.
                        tone === "white" && "border border-navy-100 bg-white text-navy-900 shadow-card hover:shadow-glow"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-2xl",
                          tone === "white" ? "bg-[linear-gradient(to_bottom,#BA0A0C_0%,#9C7FA8_50%,#3E749A_100%)] text-white" : "bg-white/15 text-white",
                          tone === "slate" && "bg-navy-900/10 text-navy-900"
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold">{action.title}</h3>
                      <p className={cn("mt-2 flex-1 text-sm leading-relaxed", tone === "white" || tone === "slate" ? "text-navy-500" : "text-white/75")}>{action.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                        Get started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>
      </div>
    </section>
  );
}
