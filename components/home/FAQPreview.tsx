"use client";

import { useState } from "react";
import Image from "next/image";
import { faqs } from "@/data/faqs";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { GradientButton } from "@/components/ui/GradientButton";
import { JsonLd } from "@/components/seo/JsonLd";

// The full list lives here now — this is the only FAQ page the site has.
const items = faqs;

export function FAQPreview() {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    // Same brand gradient as the rest of the site, run top-to-bottom (blue to
    // red) edge-to-edge, matching the reference direction exactly.
    <section id="faq" className="relative overflow-hidden bg-gradient-to-b from-slate-500 via-lilac-500 to-red-600 py-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <div className="container relative max-w-3xl">
        <Reveal>
          <h2 className="text-center text-4xl font-semibold text-white md:text-5xl">Frequently asked questions</h2>
        </Reveal>

        <div className="mt-14">
          {items.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <Reveal key={item.id} id={item.id} delay={Math.min(i, 6) * 0.05} className="border-b border-white/25 py-6 first:pt-0">
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 text-left"
                >
                  <span className="text-lg font-semibold text-white md:text-xl">{item.question}</span>
                  <span
                    className={cn(
                      "relative h-6 w-6 shrink-0 overflow-hidden rounded-full transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110",
                      isOpen && "rotate-180"
                    )}
                  >
                    <Image src="/icons/faq-chevron.png" alt="" fill className="object-contain" />
                  </span>
                </button>
                <div className={cn("grid transition-all duration-300 ease-in-out", isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl leading-relaxed text-white/75">{item.answer}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl bg-navy-900 p-8 text-white sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold">Didn&rsquo;t find your question?</p>
            <p className="text-sm text-white/70">Book a consultation and ask us directly.</p>
          </div>
          <GradientButton href="/appointment">Book an appointment</GradientButton>
        </Reveal>
      </div>
    </section>
  );
}
