"use client";

import { useMemo, useState } from "react";
import { faqs } from "@/data/faqs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/GradientButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ } from "@/types";

const categories: { id: FAQ["category"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "general", label: "General" },
  { id: "immigration", label: "Immigration" },
  { id: "tax", label: "Tax" },
  { id: "benefits", label: "Benefits" },
  { id: "employment", label: "Employment" },
];

export default function FAQPage() {
  const [category, setCategory] = useState<FAQ["category"] | "all">("all");
  const filtered = useMemo(() => faqs.filter((f) => category === "all" || f.category === category), [category]);

  return (
    <div className="bg-slate-50 pb-24">
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
      <section className="relative overflow-hidden bg-brand-radial pb-16 pt-32 text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:44px_44px] opacity-30" />
        <div className="container relative max-w-3xl">
          <SectionHeader tone="dark" eyebrow="FAQs" title="Frequently asked questions" description="Quick answers — with a link through to a calculator or guide where one exists." />
        </div>
      </section>

      <div className="container max-w-3xl">
        <div className="-mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={cn("rounded-full px-4 py-2 text-sm font-semibold transition-colors", category === c.id ? "bg-navy-900 text-white" : "bg-white text-navy-600 shadow-card hover:bg-navy-50")}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <FAQAccordion items={filtered} />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl bg-navy-900 p-8 text-white sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold">Didn&rsquo;t find your question?</p>
            <p className="text-sm text-white/70">Book a consultation and ask us directly.</p>
          </div>
          <GradientButton href="/appointment">Book an appointment</GradientButton>
        </div>
      </div>
    </div>
  );
}
