import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { getUpdates } from "@/lib/cms/queries";

export const metadata: Metadata = { title: "Updates" };
export const revalidate = 60;

export default async function UpdatesPage() {
  const updates = await getUpdates();
  return (
    <div className="bg-slate-50 pb-24">
      <section className="relative overflow-hidden bg-brand-radial pb-16 pt-40 text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:44px_44px] opacity-30" />
        <div className="container relative max-w-3xl">
          <SectionHeader tone="dark" eyebrow="Updates" title="UK rule changes worth knowing about." description="Tax year changes, immigration rule changes, benefit changes and important deadlines." />
        </div>
      </section>

      <div className="container max-w-3xl">
        <div className="-mt-8 space-y-6">
          {updates.map((u, i) => (
            <Reveal key={u.slug} delay={Math.min(i, 6) * 0.06} className="rounded-3xl bg-white p-6 shadow-card">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="red">{u.category.replace("-", " ")}</Badge>
                <span className="text-xs text-navy-400">Applies from {formatDate(u.appliesFrom)}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-navy-900">{u.title}</h2>
              <p className="mt-2 text-navy-600">{u.summary}</p>
              <p className="mt-3 text-sm leading-relaxed text-navy-500">{u.body}</p>
              <p className="mt-4 text-xs text-navy-400">
                Published {formatDate(u.published)} · Last reviewed {formatDate(u.lastReviewed)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
