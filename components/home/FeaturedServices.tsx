import type { ServiceItem } from "@/types";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientButton } from "@/components/ui/GradientButton";

interface FeaturedServicesContent {
  eyebrow: string;
  heading: string;
  description: string;
  button_label: string;
}

export function FeaturedServices({ services, content }: { services: ServiceItem[]; content: FeaturedServicesContent }) {
  const featured = services.slice(0, 3);
  return (
    <section className="bg-white py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader eyebrow={content.eyebrow} title={<span className="text-gradient text-4xl font-medium md:text-5xl">{content.heading}</span>} description={content.description} />
          <GradientButton href="/services" variant="ghost">
            {content.button_label}
          </GradientButton>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
