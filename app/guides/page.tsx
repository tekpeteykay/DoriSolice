"use client";

import { useMemo, useState } from "react";
import { guides } from "@/data/guides";
import { GuideCard } from "@/components/guides/GuideCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ContentCategory } from "@/types";

const categories: { id: ContentCategory | "all"; label: string }[] = [
  { id: "all", label: "All guides" },
  { id: "immigration", label: "Immigration" },
  { id: "tax", label: "Tax" },
  { id: "benefits", label: "Benefits" },
  { id: "employment", label: "Employment" },
  { id: "family", label: "Family" },
  { id: "business", label: "Business" },
  { id: "housing", label: "Housing" },
  { id: "citizenship", label: "Citizenship" },
  { id: "legal-rights", label: "Legal rights" },
  { id: "money", label: "Money & Finance" },
  { id: "life-in-the-uk", label: "Life in the UK" },
];

export default function GuidesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ContentCategory | "all">("all");

  const filtered = useMemo(() => {
    return guides.filter((g) => {
      const matchesCategory = category === "all" || g.category === category;
      const matchesQuery = !query || (g.title + g.summary).toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="bg-slate-50 pb-24">
      <section className="relative overflow-hidden bg-brand-radial pb-16 pt-40 text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:44px_44px] opacity-30" />
        <div className="container relative">
          <SectionHeader
            tone="dark"
            eyebrow="UK information hub"
            title="Understand the rules before you need a solicitor."
            description="Plain-English guides to UK tax, benefits, immigration and employment rights — reviewed and dated so you know what you're reading is current."
          />
        </div>
      </section>

      <div className="container">
        <div className="-mt-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-navy-100 bg-white px-5 py-3.5 shadow-card">
            <Search className="h-5 w-5 text-navy-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search guides" className="w-full bg-transparent text-base outline-none placeholder:text-navy-400" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                category === c.id ? "bg-navy-900 text-white" : "bg-white text-navy-600 shadow-card hover:bg-navy-50"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guide, i) => (
            <GuideCard key={guide.slug} guide={guide} index={i} />
          ))}
        </div>
        {filtered.length === 0 && <p className="mt-16 text-center text-navy-400">No guides match your search yet.</p>}
      </div>
    </div>
  );
}
