import { GuidedJourney } from "@/components/journey/GuidedJourney";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = { title: "What do I need?" };

export default function WhatDoINeedPage() {
  return (
    <div className="bg-slate-50 pb-24">
      <section className="relative overflow-hidden bg-brand-radial pb-16 pt-40 text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:44px_44px] opacity-30" />
        <div className="container relative max-w-2xl">
          <SectionHeader
            tone="dark"
            eyebrow="Not sure where to start?"
            title="Let's work out what you need."
            description="Answer a couple of quick questions and we'll point you to the right guide, calculator or service."
          />
        </div>
      </section>
      <div className="container max-w-2xl">
        <Reveal className="-mt-8 rounded-3xl bg-white p-6 shadow-card md:p-8">
          <GuidedJourney />
        </Reveal>
      </div>
    </div>
  );
}
