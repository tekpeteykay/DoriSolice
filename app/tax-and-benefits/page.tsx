import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientButton } from "@/components/ui/GradientButton";
import { calculatorCatalogue } from "@/data/calculator-catalogue";
import { CalculatorCard } from "@/components/calculators/CalculatorCard";
import { GuideCard } from "@/components/guides/GuideCard";
import { getGuides } from "@/lib/cms/queries";

export const metadata: Metadata = { title: "Tax & Benefits" };
export const revalidate = 60;

export default async function TaxAndBenefitsPage() {
  const guides = await getGuides();
  const taxCalcs = calculatorCatalogue.filter((c) => c.category === "tax" || c.category === "salary").slice(0, 6);
  const benefitGuides = guides.filter((g) => g.category === "benefits" || g.category === "tax").slice(0, 3);

  return (
    <div className="bg-slate-50 pb-24">
      <section className="relative overflow-hidden bg-brand-radial pb-20 pt-40 text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:44px_44px] opacity-30" />
        <div className="container relative">
          <SectionHeader
            tone="dark"
            eyebrow="Tax & Benefits"
            title="Understand your tax, and what you may be entitled to."
            description="From take-home pay to Universal Credit, get a clear estimate before you make a decision."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <GradientButton href="/calculators?category=tax">Tax calculators</GradientButton>
            <GradientButton href="/calculators?category=benefits" variant="outline">
              Benefit calculators
            </GradientButton>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="mt-14">
          <h2 className="mb-6 text-xl font-bold text-navy-900">Popular tax &amp; salary calculators</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {taxCalcs.map((c, i) => (
              <CalculatorCard key={c.slug} entry={c} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-navy-900">Guides</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefitGuides.map((g, i) => (
              <GuideCard key={g.slug} guide={g} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/guides" className="text-sm font-semibold text-red-600 hover:underline">
            Browse all guides →
          </Link>
        </div>
      </div>
    </div>
  );
}
