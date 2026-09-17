"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { search } from "@/lib/search";
import { SearchBar } from "@/components/search/SearchBar";
import { GradientButton } from "@/components/ui/GradientButton";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

function SearchResultsInner() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const results = useMemo(() => search(q, 20), [q]);

  return (
    <div className="bg-slate-50 pb-24 pt-40">
      <div className="container max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">Search Dori Solic</p>
        <h1 className="mt-2 text-3xl font-bold text-navy-900 md:text-4xl">Results for &ldquo;{q}&rdquo;</h1>

        <div className="mt-8">
          <SearchBar variant="compact" />
        </div>

        <div className="mt-10 space-y-4">
          {results.map((r, i) => (
            <Reveal key={r.url} delay={Math.min(i, 6) * 0.05} y={16}>
              <Link href={r.url} className="group flex items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-red-600">{r.type.replace("-", " ")}</span>
                  <p className="mt-1 font-semibold text-navy-900">{r.title}</p>
                  <p className="text-sm text-navy-500">{r.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-navy-300 transition-transform group-hover:translate-x-1 group-hover:text-red-500" />
              </Link>
            </Reveal>
          ))}
        </div>

        {results.length === 0 && (
          <div className="mt-16 rounded-3xl bg-white p-10 text-center shadow-card">
            <p className="text-navy-500">We couldn&rsquo;t find a match for that. Try a calculator, a guide topic, or book an appointment and we&rsquo;ll help directly.</p>
            <div className="mt-6">
              <GradientButton href="/appointment">Book an appointment</GradientButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResultsInner />
    </Suspense>
  );
}
