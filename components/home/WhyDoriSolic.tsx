import { SectionHeader } from "@/components/ui/SectionHeader";
import { ShieldCheck, Sparkles, Users, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

const ICONS = [Sparkles, Scale, Users, ShieldCheck];
const TONES = ["gradient", "navy", "slate", "gradient"] as const;

interface PointData {
  title: string;
  description: string;
}

interface WhyDoriSolicContent {
  eyebrow: string;
  heading: string;
  description: string;
  points: PointData[];
}

export function WhyDoriSolic({ content }: { content: WhyDoriSolicContent }) {
  const points = content.points ?? [];

  return (
    <section className="bg-slate-50 py-24">
      <div className="container">
        <SectionHeader align="center" eyebrow={content.eyebrow} title={<span className="text-gradient text-4xl font-medium md:text-5xl">{content.heading}</span>} description={content.description} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, i) => {
            const Icon = ICONS[i % ICONS.length];
            const tone = TONES[i % TONES.length];
            return (
              <Reveal key={`${point.title}-${i}`} delay={i * 0.08} className="rounded-3xl bg-white p-7 text-center shadow-card">
                <div
                  className={cn(
                    "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl",
                    tone === "navy" && "bg-navy-900 text-white",
                    tone === "gradient" && "bg-[linear-gradient(to_bottom,#BA0A0C_0%,#9C7FA8_50%,#3E749A_100%)] text-white",
                    tone === "slate" && "bg-slate-200 text-navy-700"
                  )}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-semibold text-navy-900">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{point.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
