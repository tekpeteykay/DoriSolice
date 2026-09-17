import { services } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientButton } from "@/components/ui/GradientButton";

export function FeaturedServices() {
  const featured = services.slice(0, 3);
  return (
    <section className="bg-white py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Featured services"
            title={<span className="text-gradient text-4xl font-medium md:text-5xl">Need someone to look at your situation?</span>}
            description="Talk to us — once you know roughly what you need, we can take it from there."
          />
          <GradientButton href="/services" variant="ghost">
            View all services
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
