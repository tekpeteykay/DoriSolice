import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { guides, getGuideBySlug } from "@/data/guides";
import { calculatorCatalogue } from "@/data/calculator-catalogue";
import { services } from "@/data/services";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SourceReferences } from "@/components/ui/SourceReferences";
import { GradientButton } from "@/components/ui/GradientButton";
import { formatDate } from "@/lib/utils";
import { AlertTriangle, Info } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return guides.map((g) => ({ category: g.category, slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.seoDescription,
    alternates: { canonical: `/guides/${guide.category}/${guide.slug}` },
  };
}

export default function GuidePage({ params }: { params: { category: string; slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const relatedCalculators = calculatorCatalogue.filter((c) => guide.relatedCalculators?.includes(c.builtId ?? "____"));
  const relatedServices = services.filter((s) => guide.relatedServices?.includes(s.slug));

  return (
    <article className="bg-slate-50 pb-24 pt-40">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.seoDescription,
          dateModified: guide.lastReviewed,
          url: `${siteConfig.url}/guides/${guide.category}/${guide.slug}`,
          publisher: { "@type": "Organization", name: siteConfig.name },
        }}
      />
      <div className="container max-w-3xl">
        <Breadcrumbs items={[{ label: "UK Guides", href: "/guides" }, { label: guide.title }]} />

        <Reveal className="mt-6 rounded-4xl bg-white p-7 shadow-card md:p-10">
          <div className="mb-10">
            <Badge tone="red" className="mb-4">
              {guide.category.replace("-", " ")}
            </Badge>
            <h1 className="text-3xl font-bold text-navy-900 md:text-4xl">{guide.title}</h1>
            <p className="mt-3 text-lg text-navy-500">{guide.summary}</p>
            <p className="mt-4 text-sm text-navy-400">
              {guide.readTimeMinutes} min read · Last reviewed {formatDate(guide.lastReviewed)}
              {guide.reviewer ? ` by ${guide.reviewer}` : ""}
            </p>
            {guide.needsReview && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-800">
                <AlertTriangle className="h-3.5 w-3.5" /> Sample content — needs professional review before publication
              </div>
            )}
          </div>

          <div className="prose-content space-y-5">
            {guide.body.map((section, i) => {
              if (section.type === "heading") return <h2 key={i} className="mt-8 text-2xl font-bold text-navy-900">{section.text}</h2>;
              if (section.type === "paragraph") return <p key={i} className="leading-relaxed text-navy-700">{section.text}</p>;
              if (section.type === "list")
                return (
                  <ul key={i} className="list-inside list-disc space-y-2 text-navy-700">
                    {section.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              if (section.type === "callout")
                return (
                  <div key={i} className={`flex gap-3 rounded-2xl p-5 text-sm ${section.tone === "warning" ? "bg-amber-50 text-amber-900" : "bg-navy-50 text-navy-700"}`}>
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{section.text}</p>
                  </div>
                );
              return null;
            })}
          </div>
        </Reveal>

        {relatedCalculators.length > 0 && (
          <Reveal className="mt-12 rounded-3xl bg-brand-radial p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Put this into practice</p>
            <h3 className="mt-2 text-2xl font-bold">Calculate your own figures</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {relatedCalculators.map((c) => (
                <GradientButton key={c.slug} href={`/calculators/${c.slug}`} variant="outline">
                  {c.title}
                </GradientButton>
              ))}
            </div>
          </Reveal>
        )}

        <div className="mt-10">
          <Disclaimer variant="guide" />
        </div>
        <div className="mt-6">
          <SourceReferences sources={guide.sources} />
        </div>

        <Reveal className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl bg-navy-900 p-8 text-white sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold">Need help with your specific situation?</p>
            <p className="text-sm text-white/70">Book a consultation and we&rsquo;ll look at your circumstances directly.</p>
          </div>
          <GradientButton href="/appointment">Book an appointment</GradientButton>
        </Reveal>

        {relatedServices.length > 0 && (
          <div className="mt-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-400">Related services</p>
            <div className="flex flex-wrap gap-2">
              {relatedServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.category}/${s.slug}`} className="rounded-full border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 hover:border-navy-400">
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
