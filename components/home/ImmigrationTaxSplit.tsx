import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { Reveal } from "@/components/ui/Reveal";

interface ImmigrationTaxSplitContent {
  immigration_eyebrow: string;
  immigration_heading: string;
  immigration_description: string;
  immigration_button_label: string;
  immigration_link_label: string;
  tax_eyebrow: string;
  tax_heading: string;
  tax_description: string;
  tax_button_label: string;
  tax_link_label: string;
}

export function ImmigrationTaxSplit({ content }: { content: ImmigrationTaxSplitContent }) {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-4xl bg-navy-900 p-10 text-white md:p-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-400">{content.immigration_eyebrow}</p>
          <h3 className="mt-3 max-w-xs text-3xl font-bold">{content.immigration_heading}</h3>
          <p className="mt-4 max-w-sm text-white/70">{content.immigration_description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GradientButton href="/calculators/immigration/spouse-visa">{content.immigration_button_label}</GradientButton>
            <Link href="/immigration" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white">
              {content.immigration_link_label} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-4xl border border-navy-100 bg-white p-10 shadow-card md:p-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-600">{content.tax_eyebrow}</p>
          <h3 className="mt-3 max-w-xs text-3xl font-bold text-navy-900">{content.tax_heading}</h3>
          <p className="mt-4 max-w-sm text-navy-600">{content.tax_description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GradientButton href="/calculators/benefits/universal-credit" variant="dark">
              {content.tax_button_label}
            </GradientButton>
            <Link href="/tax-and-benefits" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-red-600">
              {content.tax_link_label} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
