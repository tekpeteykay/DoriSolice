"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { updates } from "@/data/updates";
import { getUpdateImage } from "@/lib/update-images";
import { scrollVariants } from "@/lib/motion-variants";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const CYCLE_MS = 5000;

export function BlogClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requestedSlug = searchParams.get("post");
  const [activeSlug, setActiveSlug] = useState(
    updates.some((u) => u.slug === requestedSlug) ? (requestedSlug as string) : updates[0].slug
  );

  // If the URL's ?post= changes from outside (e.g. the home page's "See
  // What's New" card linking here with a different slug), follow it.
  useEffect(() => {
    if (requestedSlug && updates.some((u) => u.slug === requestedSlug) && requestedSlug !== activeSlug) {
      setActiveSlug(requestedSlug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedSlug]);

  const active = useMemo(() => updates.find((u) => u.slug === activeSlug) ?? updates[0], [activeSlug]);
  const others = useMemo(() => updates.filter((u) => u.slug !== active.slug), [active.slug]);

  // The sidebar's top card auto-cycles through every post that isn't the one
  // currently open — same "slot machine" scroll used on the home page.
  const [featuredIndex, setFeaturedIndex] = useState(0);
  useEffect(() => {
    setFeaturedIndex(0);
  }, [active.slug]);
  useEffect(() => {
    if (others.length < 2) return;
    const id = setInterval(() => setFeaturedIndex((i) => (i + 1) % others.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [others.length, active.slug]);

  const featured = others[featuredIndex % Math.max(others.length, 1)];
  const listed = others.filter((u) => u.slug !== featured?.slug);

  function selectPost(slug: string) {
    if (slug === activeSlug) return;
    setActiveSlug(slug);
    router.replace(`${pathname}?post=${slug}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="bg-navy-950 pb-24 pt-40">
      <div className="container lg:px-[60px] xl:px-[120px]">
        <Reveal>
          <h1 className="text-gradient text-4xl font-semibold leading-tight md:text-6xl">Our Blog</h1>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:gap-20">
          {/* Left: the currently open post, shown in full */}
          <Reveal key={active.slug} delay={0.05}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image src={getUpdateImage(active.slug)} alt="" fill priority className="object-cover" />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge tone="red" className="bg-red-500/15 text-red-300">
                {active.category.replace("-", " ")}
              </Badge>
              <span className="text-xs text-white/40">Applies from {formatDate(active.appliesFrom)}</span>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl">{active.title}</h2>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-white/70 md:text-lg">
              <p>{active.summary}</p>
              <p>{active.body}</p>
            </div>

            <p className="mt-10 border-t border-white/10 pt-6 text-sm text-white/40">
              Published {formatDate(active.published)} · Last reviewed {formatDate(active.lastReviewed)}
            </p>
          </Reveal>

          {/* Right: everything else, with the top card cycling through the
              posts that aren't open right now */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">More from the blog</p>

            {featured && (
              <button
                type="button"
                onClick={() => selectPost(featured.slug)}
                className="group mt-5 flex w-full flex-col overflow-hidden rounded-xl bg-navy-900 text-left text-white shadow-card-dark transition-colors hover:bg-navy-800"
              >
                <div className="grid h-44 w-full overflow-hidden">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={featured.slug + "-img"}
                      variants={scrollVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      className="relative [grid-area:1/1]"
                    >
                      <Image src={getUpdateImage(featured.slug)} alt="" fill className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="grid overflow-hidden p-6">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={featured.slug + "-text"}
                      variants={scrollVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      className="[grid-area:1/1]"
                    >
                      <h3 className="text-lg font-semibold leading-snug">{featured.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{featured.summary}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400">
                          Read More
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                        <span className="text-xs text-white/40">{formatDate(featured.published)}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </button>
            )}

            <div className="mt-4 divide-y divide-white/10 border-t border-white/10">
              {listed.map((u) => (
                <button
                  key={u.slug}
                  type="button"
                  onClick={() => selectPost(u.slug)}
                  className="block w-full py-5 text-left transition-colors hover:opacity-80"
                >
                  <p className="font-semibold leading-snug text-white">{u.title}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-red-400">Read More</span>
                    <span className="text-xs text-white/40">{formatDate(u.published)}</span>
                  </div>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
