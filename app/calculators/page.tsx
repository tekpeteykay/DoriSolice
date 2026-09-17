"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { calculatorCatalogue, calculatorCategories } from "@/data/calculator-catalogue";
import { CalculatorCard } from "@/components/calculators/CalculatorCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Suspense } from "react";

function CalculatorsHubInner() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(params.get("category") ?? "all");

  const filtered = useMemo(() => {
    return calculatorCatalogue.filter((c) => {
      const matchesCategory = activeCategory === "all" || c.category === activeCategory;
      const matchesQuery = !query || (c.title + c.description).toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="bg-slate-50 pb-24">
      <section className="relative overflow-hidden bg-brand-radial pb-16 pt-40 text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:44px_44px] opacity-30" />
        <div className="container relative">
          <SectionHeader
            tone="dark"
            eyebrow="Calculator platform"
            title="Every UK number, worked out for you."
            description="Tax, salary, benefits and immigration calculators — built on the same rules the professionals use, explained in plain English."
          />
        </div>
      </section>

      <div className="container">
        <div className="-mt-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-navy-100 bg-white px-5 py-3.5 shadow-card">
            <Search className="h-5 w-5 text-navy-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search calculators (e.g. VAT, spouse visa, Universal Credit)"
              className="w-full bg-transparent text-base outline-none placeholder:text-navy-400"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              activeCategory === "all" ? "bg-navy-900 text-white" : "bg-white text-navy-600 shadow-card hover:bg-navy-50"
            )}
          >
            All calculators
          </button>
          {calculatorCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                activeCategory === cat.id ? "bg-navy-900 text-white" : "bg-white text-navy-600 shadow-card hover:bg-navy-50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry, i) => (
            <CalculatorCard key={entry.slug} entry={entry} index={i} />
          ))}
        </div>

        {filtered.length === 0 && <p className="mt-16 text-center text-navy-400">No calculators match your search yet.</p>}
      </div>
    </div>
  );
}

export default function CalculatorsHubPage() {
  return (
    <Suspense>
      <CalculatorsHubInner />
    </Suspense>
  );
}
