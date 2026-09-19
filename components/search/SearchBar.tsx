"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { search } from "@/lib/search";
import { cn } from "@/lib/utils";

const EXAMPLES = ["Spouse visa income requirement", "How much tax will I pay?", "Universal Credit", "Tax refund", "Skilled Worker visa"];

export function SearchBar({ variant = "hero", placeholder = "What do you need help with?" }: { variant?: "hero" | "compact" | "nav"; placeholder?: string }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim().length > 1 ? search(query, 6) : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function goToSearch(q: string) {
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setFocused(false);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={cn(
          "flex items-center gap-3 rounded-full border transition-colors",
          variant === "hero" && "rounded-2xl border-white/15 bg-white/10 px-5 py-4 backdrop-blur-xl focus-within:border-white/40",
          variant === "compact" && "rounded-2xl border-navy-200 bg-white px-5 py-4 focus-within:border-navy-400",
          variant === "nav" && "border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-xl focus-within:border-white/40"
        )}
      >
        <Search className={cn("h-4 w-4 shrink-0", variant === "compact" ? "text-navy-400" : "text-white/70")} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => e.key === "Enter" && goToSearch(query)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-transparent outline-none",
            variant === "nav" ? "text-sm" : "text-base",
            variant === "compact" ? "text-navy-900 placeholder:text-navy-400" : "text-white placeholder:text-white/50"
          )}
        />
        {query && (
          <button aria-label="Clear search" onClick={() => setQuery("")}>
            <X className={cn("h-4 w-4", variant === "compact" ? "text-navy-400" : "text-white/60")} />
          </button>
        )}
      </div>

      {focused && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-xl">
          {results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.map((r) => (
                <li key={r.url}>
                  <button
                    onClick={() => router.push(r.url)}
                    className="flex w-full flex-col items-start gap-0.5 px-5 py-3 text-left hover:bg-navy-50"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-red-600">{r.type.replace("-", " ")}</span>
                    <span className="font-medium text-navy-900">{r.title}</span>
                    <span className="line-clamp-1 text-sm text-navy-500">{r.description}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : query.trim().length > 1 ? (
            <div className="px-5 py-4 text-sm text-navy-500">
              No matches yet —{" "}
              <button onClick={() => goToSearch(query)} className="font-semibold text-red-600 hover:underline">
                search all of Dori Solic
              </button>
            </div>
          ) : (
            <div className="px-5 py-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-navy-400">Try searching for</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => {
                      setQuery(ex);
                      goToSearch(ex);
                    }}
                    className="rounded-full bg-navy-50 px-3 py-1.5 text-sm text-navy-700 hover:bg-navy-100"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
