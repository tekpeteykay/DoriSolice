import { GuidedJourney } from "@/components/journey/GuidedJourney";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { getPageContent } from "@/lib/cms/page-content";

export const metadata = { title: "What do I need?" };
export const revalidate = 60;

export default async function WhatDoINeedPage() {
  const content = await getPageContent("what-do-i-need");
  const hero = content.hero as any;
  return (
    <div className="bg-slate-50 pb-24">
      <section className="relative overflow-hidden bg-brand-radial pb-16 pt-40 text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:44px_44px] opacity-30" />
        <div className="container relative max-w-2xl">
          <SectionHeader tone="dark" eyebrow={hero.eyebrow} title={hero.heading} description={hero.description} />
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
