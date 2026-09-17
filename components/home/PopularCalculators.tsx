import { calculatorCatalogue } from "@/data/calculator-catalogue";
import { calculators } from "@/lib/calculators/registry";
import { CalculatorCard } from "@/components/calculators/CalculatorCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientButton } from "@/components/ui/GradientButton";

export function PopularCalculators() {
  const popularIds = calculators.filter((c) => c.popular).map((c) => c.id);
  const entries = calculatorCatalogue.filter((c) => popularIds.includes(c.builtId ?? "____"));

  return (
    <section className="bg-white py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Popular calculators"
            title={<span className="text-gradient text-4xl font-medium md:text-5xl">Need to know how much tax you&rsquo;ll pay?</span>}
            description="Calculate it — with a full breakdown, not just a number."
          />
          <GradientButton href="/calculators" variant="ghost">
            View all calculators
          </GradientButton>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry, i) => (
            <CalculatorCard key={entry.slug} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
