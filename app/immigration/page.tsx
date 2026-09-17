import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientButton } from "@/components/ui/GradientButton";
import { guides } from "@/data/guides";
import { services } from "@/data/services";
import { calculatorCatalogue } from "@/data/calculator-catalogue";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = { title: "Immigration" };

const routes = [
  { title: "Spouse & Partner Visa", guide: "uk-spouse-visa-explained", calculator: "immigration/spouse-visa", service: "spouse-partner-visa" },
  { title: "Skilled Worker Visa", guide: "uk-skilled-worker-visa-explained", calculator: "immigration/skilled-worker", service: "skilled-worker-visa" },
  { title: "Student Visa", guide: "uk-visa-financial-requirements", calculator: "immigration/student-visa-funds", service: "student-visa" },
  { title: "Indefinite Leave to Remain", guide: "what-is-ilr", calculator: "immigration/ilr", service: "ilr-settlement" },
  { title: "British Citizenship", guide: "ilr-vs-citizenship", service: "british-citizenship" },
];

export default function ImmigrationHubPage() {
  return (
    <div className="bg-slate-50 pb-24">
      <section className="relative overflow-hidden bg-brand-radial pb-20 pt-40 text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:44px_44px] opacity-30" />
        <div className="container relative">
          <SectionHeader
            tone="dark"
            eyebrow="Immigration"
            title="Understand the UK immigration route that applies to you."
            description="Family visas, work visas, study, settlement and citizenship — explained in plain English, with calculators to check the numbers."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <GradientButton href="/what-do-i-need">I&rsquo;m not sure what I need</GradientButton>
            <GradientButton href="/appointment" variant="outline">
              Book an appointment
            </GradientButton>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {routes.map((route, i) => {
            const guide = guides.find((g) => g.slug === route.guide);
            const calculator = route.calculator ? calculatorCatalogue.find((c) => c.slug === route.calculator) : undefined;
            const service = services.find((s) => s.slug === route.service);
            return (
              <Reveal key={route.title} delay={Math.min(i, 6) * 0.06} className="rounded-3xl bg-white p-6 shadow-card">
                <h3 className="text-lg font-semibold text-navy-900">{route.title}</h3>
                <div className="mt-4 flex flex-col gap-2">
                  {guide && (
                    <Link href={`/guides/${guide.category}/${guide.slug}`} className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-navy-600 hover:bg-navy-50">
                      Read the guide <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  {calculator && (
                    <Link href={`/calculators/${calculator.slug}`} className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                      Use the calculator <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                  {service && (
                    <Link href={`/services/${service.category}/${service.slug}`} className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-navy-600 hover:bg-navy-50">
                      See how we help <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
