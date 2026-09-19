import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientButton } from "@/components/ui/GradientButton";
import { getServices } from "@/lib/cms/queries";
import { getPageContent } from "@/lib/cms/page-content";

const groups: { id: "immigration" | "tax" | "benefits" | "general"; label: string }[] = [
  { id: "immigration", label: "Immigration" },
  { id: "tax", label: "Tax" },
  { id: "benefits", label: "Benefits" },
];

export const metadata = { title: "Services" };
export const revalidate = 60;

export default async function ServicesPage() {
  const [services, content] = await Promise.all([getServices(), getPageContent("services")]);
  const hero = content.hero as any;

  return (
    <div className="bg-slate-50 pb-24">
      <section className="relative overflow-hidden bg-brand-radial pb-16 pt-40 text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:44px_44px] opacity-30" />
        <div className="container relative">
          <SectionHeader tone="dark" eyebrow={hero.eyebrow} title={hero.heading} description={hero.description} />
        </div>
      </section>

      <div className="container">
        {groups.map((group, gi) => {
          const items = services.filter((s) => s.category === group.id);
          if (items.length === 0) return null;
          return (
            <div key={group.id} className={gi === 0 ? "-mt-4" : "mt-14"}>
              <h2 className="mb-6 text-xl font-bold text-navy-900">{group.label}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s, i) => (
                  <ServiceCard key={s.slug} service={s} index={i} />
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-16 rounded-3xl bg-navy-900 p-10 text-center text-white">
          <p className="text-lg font-semibold">{hero.cta_heading}</p>
          <div className="mt-5">
            <GradientButton href="/what-do-i-need">{hero.cta_button_label}</GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}
