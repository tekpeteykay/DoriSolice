import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "@/lib/calculators/registry";
import { CalculatorRunner } from "@/components/calculators/CalculatorRunner";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import type { Metadata } from "next";

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug.split("/") }));
}

export function generateMetadata({ params }: { params: { slug: string[] } }): Metadata {
  const calculator = getCalculatorBySlug(params.slug.join("/"));
  if (!calculator) return {};
  return {
    title: calculator.title,
    description: calculator.description,
    alternates: { canonical: `/calculators/${calculator.slug}` },
  };
}

export default function CalculatorDetailPage({ params }: { params: { slug: string[] } }) {
  const calculator = getCalculatorBySlug(params.slug.join("/"));
  if (!calculator) notFound();

  return (
    <div className="bg-slate-50 pb-24 pt-40">
      <div className="container max-w-3xl">
        <Breadcrumbs items={[{ label: "Calculators", href: "/calculators" }, { label: calculator.title }]} />

        <div className="mt-6 mb-10">
          <Badge tone="red" className="mb-4">
            {calculator.category.replace("-", " ")}
          </Badge>
          <h1 className="text-3xl font-bold text-navy-900 md:text-4xl">{calculator.title}</h1>
          <p className="mt-3 text-lg text-navy-500">{calculator.description}</p>
        </div>

        <Reveal className="rounded-3xl bg-white p-6 shadow-card md:p-10">
          <CalculatorRunner slug={calculator.slug} />
        </Reveal>

        {calculator.assumptions.length > 0 && (
          <Reveal delay={0.1} className="mt-10 rounded-2xl bg-white p-6 shadow-card">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-500">Assumptions used in this calculator</p>
            <ul className="list-inside list-disc space-y-1.5 text-sm text-navy-600">
              {calculator.assumptions.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </div>
  );
}
