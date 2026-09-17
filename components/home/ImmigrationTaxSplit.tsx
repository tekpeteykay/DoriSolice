import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { Reveal } from "@/components/ui/Reveal";

export function ImmigrationTaxSplit() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-4xl bg-navy-900 p-10 text-white md:p-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-400">Immigration</p>
          <h3 className="mt-3 max-w-xs text-3xl font-bold">Trying to bring your partner to the UK?</h3>
          <p className="mt-4 max-w-sm text-white/70">Understand the financial requirement, check your figures, and see the evidence you may need.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GradientButton href="/calculators/immigration/spouse-visa">Calculate the requirement</GradientButton>
            <Link href="/immigration" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white">
              Explore immigration <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-4xl border border-navy-100 bg-white p-10 shadow-card md:p-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-600">Tax &amp; Benefits</p>
          <h3 className="mt-3 max-w-xs text-3xl font-bold text-navy-900">Not sure what you qualify for?</h3>
          <p className="mt-4 max-w-sm text-navy-600">Work it out with our Universal Credit estimator, or see your estimated take-home pay in seconds.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GradientButton href="/calculators/benefits/universal-credit" variant="dark">
              Check Universal Credit
            </GradientButton>
            <Link href="/tax-and-benefits" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-red-600">
              Explore tax &amp; benefits <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
