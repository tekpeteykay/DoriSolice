"use client";

import { useState } from "react";
import { CalculatorResult, CalculatorDefinition } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SourceReferences } from "@/components/ui/SourceReferences";
import { RuleVersionBadge } from "@/components/ui/RuleVersionBadge";
import { ChevronDown, RotateCcw, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const eligibilityMeta = {
  eligible: { label: "Estimated: may be eligible", icon: CheckCircle2, tone: "text-green-700 bg-green-50" },
  "not-eligible": { label: "Estimated: may not be eligible yet", icon: AlertCircle, tone: "text-red-700 bg-red-50" },
  review: { label: "Professional review recommended", icon: HelpCircle, tone: "text-amber-700 bg-amber-50" },
  unknown: { label: "Estimated result", icon: HelpCircle, tone: "text-navy-700 bg-navy-50" },
};

export function CalculatorResultView({ result, calculator, onRestart }: { result: CalculatorResult; calculator: CalculatorDefinition; onRestart: () => void }) {
  const [showWorkings, setShowWorkings] = useState(false);
  const meta = result.eligibility ? eligibilityMeta[result.eligibility] : null;
  const Icon = meta?.icon;

  return (
    <div className="animate-fade-up space-y-6">
      {meta && (
        <div className={cn("inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold", meta.tone)}>
          {Icon && <Icon className="h-4 w-4" />}
          {meta.label}
        </div>
      )}

      <GlassCard className="bg-navy-900 text-white" tone="dark">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/60">{result.headline.label}</p>
        <p className="mt-2 text-4xl font-bold md:text-5xl">{result.headline.value}</p>
      </GlassCard>

      <div className="overflow-hidden rounded-3xl border border-navy-100">
        {result.lines.map((line, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between gap-4 border-b border-navy-100 px-6 py-4 last:border-b-0",
              line.emphasis && "bg-navy-50"
            )}
          >
            <span className={cn("text-sm", line.emphasis ? "font-semibold text-navy-900" : "text-navy-600")}>{line.label}</span>
            <span
              className={cn(
                "font-semibold",
                line.emphasis ? "text-lg text-navy-900" : "text-navy-800",
                line.tone === "negative" && "text-red-600",
                line.tone === "positive" && "text-green-600"
              )}
            >
              {line.value}
            </span>
          </div>
        ))}
      </div>

      {result.notes && result.notes.length > 0 && (
        <div>
          <button onClick={() => setShowWorkings((v) => !v)} className="flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-red-600">
            How we calculated this
            <ChevronDown className={cn("h-4 w-4 transition-transform", showWorkings && "rotate-180")} />
          </button>
          {showWorkings && (
            <ul className="mt-3 space-y-2 rounded-2xl bg-navy-50 p-5 text-sm text-navy-600">
              {result.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <RuleVersionBadge rulesVersion={calculator.rulesVersion} lastUpdated={calculator.lastUpdated} />
      <Disclaimer variant="calculator" />
      <SourceReferences sources={calculator.sources} />

      <div className="rounded-3xl bg-brand-radial p-8 text-center text-white">
        <p className="text-lg font-semibold">Want us to review your specific circumstances?</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <GradientButton href="/appointment">Book an appointment</GradientButton>
          <GradientButton href="#" variant="outline" icon={false} onClick={(e: any) => { e.preventDefault(); onRestart(); }}>
            <span className="inline-flex items-center gap-2">
              <RotateCcw className="h-4 w-4" /> Start again
            </span>
          </GradientButton>
        </div>
      </div>

      {(calculator.relatedGuides?.length || calculator.relatedServices?.length) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {calculator.relatedGuides?.slice(0, 1).map((slug) => (
            <Link key={slug} href="/guides" className="rounded-2xl border border-navy-100 p-5 hover:border-navy-300">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600">Related guide</p>
              <p className="mt-1 font-semibold text-navy-900">Read more about this topic →</p>
            </Link>
          ))}
          {calculator.relatedServices?.slice(0, 1).map((slug) => (
            <Link key={slug} href="/services" className="rounded-2xl border border-navy-100 p-5 hover:border-navy-300">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600">Related service</p>
              <p className="mt-1 font-semibold text-navy-900">See how we can help →</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
