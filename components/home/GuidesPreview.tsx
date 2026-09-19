import type { Guide } from "@/types";
import { GuideCard } from "@/components/guides/GuideCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientButton } from "@/components/ui/GradientButton";

export function GuidesPreview({ guides }: { guides: Guide[] }) {
  const featured = guides.slice(0, 3);
  return (
    <section className="bg-white py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="UK guides"
            title={<span className="text-gradient text-4xl font-medium md:text-5xl">Understand the rules first.</span>}
            description="Plain-English explainers, reviewed and dated, on the topics people ask us about most."
          />
          <GradientButton href="/guides" variant="ghost">
            Browse all guides
          </GradientButton>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((g, i) => (
            <GuideCard key={g.slug} guide={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
