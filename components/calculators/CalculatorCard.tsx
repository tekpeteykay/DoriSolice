import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { CatalogueEntry } from "@/data/calculator-catalogue";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function CalculatorCard({ entry, index = 0 }: { entry: CatalogueEntry; index?: number }) {
  const isBuilt = Boolean(entry.builtId);
  if (!isBuilt) {
    return (
      <Reveal delay={Math.min(index, 6) * 0.05} className={cn("group rounded-3xl border border-navy-100 bg-navy-50/40 p-6 opacity-70")}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-navy-900">{entry.title}</h3>
          <Lock className="mt-1 h-4 w-4 shrink-0 text-navy-300" />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-navy-500">{entry.description}</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-navy-300">Coming soon</p>
      </Reveal>
    );
  }

  return (
    <Reveal delay={Math.min(index, 6) * 0.05}>
      {/* Same lift + glow hover as the site's gradient buttons (e.g. the
          Hero CTA) — the card stays white, it just lifts on hover instead
          of inverting to a colored background. */}
      <Link
        href={`/calculators/${entry.slug}`}
        className="group relative flex h-full flex-col justify-center overflow-hidden rounded-3xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-6 md:p-8 lg:p-10 xl:p-[50px]"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-navy-900">{entry.title}</h3>
          <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-red-500 transition-transform group-hover:translate-x-1" />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-navy-500">{entry.description}</p>
      </Link>
    </Reveal>
  );
}
