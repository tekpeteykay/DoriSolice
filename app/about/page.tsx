import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientButton } from "@/components/ui/GradientButton";
import { siteConfig } from "@/lib/site-config";
import { ShieldCheck, BookOpenText, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="bg-slate-50 pb-24">
      <section className="relative overflow-hidden bg-brand-radial pb-20 pt-40 text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:44px_44px] opacity-30" />
        <div className="container relative max-w-3xl">
          <SectionHeader
            tone="dark"
            eyebrow="About Dori Solic"
            title="Legal, tax and immigration guidance that starts with understanding, not jargon."
            description="Dori Solic was built around a simple idea: most people don't need a wall of legal language, they need to understand where they stand — and to know when it's time to bring in professional help."
          />
        </div>
      </section>

      <div className="container max-w-3xl py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          <Reveal className="rounded-3xl bg-white p-6 shadow-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-900 text-white">
              <BookOpenText className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold text-navy-900">Who we help</h3>
            <p className="mt-2 text-sm text-navy-500">People navigating UK tax, benefits and immigration matters for the first time, and those who want a second, professional opinion.</p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl bg-white p-6 shadow-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gradient text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold text-navy-900">Our approach</h3>
            <p className="mt-2 text-sm text-navy-500">Plain English first. Calculators and guides so you understand your situation before any conversation about services.</p>
          </Reveal>
          <Reveal delay={0.16} className="rounded-3xl bg-white p-6 shadow-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-200 text-navy-700">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold text-navy-900">Professional standards</h3>
            <p className="mt-2 text-sm text-navy-500">{siteConfig.regulatory}</p>
          </Reveal>
        </div>

        <Reveal className="mt-16 rounded-3xl bg-navy-900 p-8 text-white">
          <h3 className="font-semibold">Team</h3>
          <p className="mt-2 text-sm text-white/70">[Add team member profiles, qualifications and photos here.]</p>
        </Reveal>

        <Reveal className="mt-8 rounded-3xl bg-white p-8 shadow-card">
          <h3 className="font-semibold text-navy-900">Why clients choose us</h3>
          <p className="mt-2 text-sm text-navy-500">[Add verified testimonials, case studies, or awards once available — none are shown here to avoid fabricating them.]</p>
        </Reveal>

        <Reveal className="mt-12 text-center">
          <GradientButton href="/appointment">Book an appointment</GradientButton>
        </Reveal>
      </div>
    </div>
  );
}
