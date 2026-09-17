import Link from "next/link";
import { ServiceItem } from "@/types";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceCard({ service, index = 0 }: { service: ServiceItem; index?: number }) {
  return (
    <Reveal delay={Math.min(index, 6) * 0.05}>
      {/* Same lift + glow hover as the site's gradient buttons (e.g. the
          Hero CTA) — the card stays white, it just lifts on hover instead
          of inverting to a colored background. */}
      <Link
        href={`/services/${service.category}/${service.slug}`}
        className="group relative flex h-full flex-col justify-center overflow-hidden rounded-3xl border border-navy-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-6 md:p-8 lg:p-10 xl:p-[50px]"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-red-600">{service.category}</p>
        <h3 className="mt-2 text-lg font-semibold text-navy-900">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500">{service.shortDescription}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600">
          Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}
