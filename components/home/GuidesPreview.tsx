import type { Guide } from "@/types";
import { GuideCard } from "@/components/guides/GuideCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientButton } from "@/components/ui/GradientButton";

interface GuidesPreviewContent {
  eyebrow: string;
  heading: string;
  description: string;
  button_label: string;
}

export function GuidesPreview({ guides, content }: { guides: Guide[]; content: GuidesPreviewContent }) {
  const featured = guides.slice(0, 3);
  return (
    <section className="bg-white py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader eyebrow={content.eyebrow} title={<span className="text-gradient text-4xl font-medium md:text-5xl">{content.heading}</span>} description={content.description} />
          <GradientButton href="/guides" variant="ghost">
            {content.button_label}
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
