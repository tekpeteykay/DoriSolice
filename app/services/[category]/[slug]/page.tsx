import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { calculatorCatalogue } from "@/data/calculator-catalogue";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { GradientButton } from "@/components/ui/GradientButton";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { getServiceBySlug, getGuides } from "@/lib/cms/queries";

// No generateStaticParams here on purpose — services are CMS content now,
// so a slug added after the last deploy still needs to resolve. Rendered
// on demand and cached per `revalidate` instead of at build time.
export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};
  return { title: service.title, description: service.shortDescription, alternates: { canonical: `/services/${service.category}/${service.slug}` } };
}

export default async function ServiceDetailPage({ params }: { params: { category: string; slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const guides = await getGuides();
  const relatedCalculators = calculatorCatalogue.filter((c) => service.relatedCalculators?.includes(c.builtId ?? "____"));
  const relatedGuides = guides.filter((g) => service.relatedGuides?.includes(g.slug));
  const faqItems = service.typicalQuestions.map((q, i) => ({ id: `${service.slug}-${i}`, category: "general" as const, question: q.question, answer: q.answer }));

  return (
    <div className="bg-slate-50 pb-24">
      <section className="relative overflow-hidden bg-brand-radial pb-20 pt-40 text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:44px_44px] opacity-30" />
        <div className="container relative max-w-3xl">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: service.title }]} />
          <Badge tone="outline" className="mt-6 border-white/30 text-white">
            {service.category}
          </Badge>
          <h1 className="mt-4 text-3xl font-bold md:text-5xl">{service.title}</h1>
          <p className="mt-4 text-lg text-white/80">{service.problemStatement}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GradientButton href="/appointment">Book an appointment</GradientButton>
            {relatedCalculators[0] && (
              <GradientButton href={`/calculators/${relatedCalculators[0].slug}`} variant="outline">
                Try the calculator
              </GradientButton>
            )}
          </div>
        </div>
      </section>

      <div className="container max-w-3xl">
        <Reveal className="-mt-8 grid gap-5 rounded-4xl bg-white p-7 shadow-card md:grid-cols-2 md:p-10">
          <div>
            <h2 className="text-xl font-bold text-navy-900">Who this is for</h2>
            <ul className="mt-4 space-y-3">
              {service.whoItsFor.map((item, i) => (
                <li key={i} className="flex gap-2 text-navy-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy-900">What we help with</h2>
            <ul className="mt-4 space-y-3">
              {service.whatWeHelpWith.map((item, i) => (
                <li key={i} className="flex gap-2 text-navy-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-8 rounded-4xl bg-navy-900 p-7 text-white md:p-10">
          <h2 className="text-xl font-bold">Our process</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <div key={i} className="rounded-2xl bg-white/10 p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(to_bottom,#BA0A0C_0%,#9C7FA8_50%,#3E749A_100%)] text-sm font-bold text-white">{i + 1}</div>
                <p className="font-semibold">{step.step}</p>
                <p className="mt-1 text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8 rounded-4xl bg-white p-7 shadow-card md:p-10">
          <h2 className="text-xl font-bold text-navy-900">Documents &amp; information you may need</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-navy-600">
            {service.documentsNeeded.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </Reveal>

        {faqItems.length > 0 && (
          <div className="mt-8 rounded-4xl bg-white p-7 shadow-card md:p-10">
            <h2 className="mb-6 text-xl font-bold text-navy-900">Common questions</h2>
            <FAQAccordion items={faqItems} />
          </div>
        )}

        {relatedGuides.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold text-navy-900">Related guides</h2>
            <div className="flex flex-wrap gap-2">
              {relatedGuides.map((g) => (
                <Link key={g.slug} href={`/guides/${g.category}/${g.slug}`} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-700 shadow-card hover:text-red-600">
                  {g.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl bg-navy-900 p-8 text-white sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold">Ready to talk to us?</p>
            <p className="text-sm text-white/70">Book a consultation and we&rsquo;ll take it from here.</p>
          </div>
          <GradientButton href="/appointment">Book an appointment</GradientButton>
        </Reveal>
      </div>
    </div>
  );
}
