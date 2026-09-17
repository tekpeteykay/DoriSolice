import { SectionHeader } from "@/components/ui/SectionHeader";
import { ShieldCheck, Sparkles, Users, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

const points = [
  { title: "Straight answers", description: "No unnecessary jargon — just a clear explanation of where you stand.", icon: Sparkles, tone: "gradient" },
  { title: "Built on real rules", description: "Every calculator is built on a versioned, sourced set of official rates and thresholds.", icon: Scale, tone: "navy" },
  { title: "Accessible from day one", description: "Whether or not you've dealt with a solicitor before, the site is built to make sense.", icon: Users, tone: "slate" },
  { title: "Professional when it matters", description: "When your situation needs it, book time with our team — with the groundwork already done.", icon: ShieldCheck, tone: "gradient" },
];

export function WhyDoriSolic() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container">
        <SectionHeader
          align="center"
          eyebrow="Why Dori Solic"
          title={
            <span className="text-gradient text-4xl font-medium md:text-5xl">
              Before you speak to a solicitor, understand your situation.
            </span>
          }
          description="When you need professional help, we're there."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.08} className="rounded-3xl bg-white p-7 text-center shadow-card">
              <div
                className={cn(
                  "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl",
                  point.tone === "navy" && "bg-navy-900 text-white",
                  point.tone === "gradient" && "bg-[linear-gradient(to_bottom,#BA0A0C_0%,#9C7FA8_50%,#3E749A_100%)] text-white",
                  point.tone === "slate" && "bg-slate-200 text-navy-700"
                )}
              >
                <point.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-semibold text-navy-900">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">{point.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
