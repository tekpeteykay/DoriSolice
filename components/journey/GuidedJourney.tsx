"use client";

import { useState } from "react";
import { journeyNodes, JourneyResult } from "@/data/guided-journey";
import { GradientButton } from "@/components/ui/GradientButton";
import { ArrowLeft, Sparkles } from "lucide-react";

export function GuidedJourney() {
  const [path, setPath] = useState<string[]>(["start"]);
  const [result, setResult] = useState<JourneyResult | null>(null);

  const currentNodeId = path[path.length - 1];
  const currentNode = journeyNodes[currentNodeId];

  function choose(next: string, res?: JourneyResult) {
    if (next === "RESULT" && res) {
      setResult(res);
    } else {
      setPath((p) => [...p, next]);
    }
  }

  function back() {
    if (result) {
      setResult(null);
      return;
    }
    setPath((p) => (p.length > 1 ? p.slice(0, -1) : p));
  }

  function restart() {
    setPath(["start"]);
    setResult(null);
  }

  return (
    <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-card md:p-10">
      {(path.length > 1 || result) && (
        <button onClick={back} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-400 hover:text-navy-700">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      )}

      {!result ? (
        <div className="animate-fade-up">
          <h3 className="text-xl font-bold text-navy-900 md:text-2xl">{currentNode.question}</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {currentNode.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => choose(opt.next, opt.result)}
                className="rounded-2xl border-2 border-navy-100 p-5 text-left font-medium text-navy-700 transition-colors hover:border-red-400 hover:bg-red-50/40"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-fade-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-700">
            <Sparkles className="h-4 w-4" /> Suggested next step
          </div>
          <h3 className="text-2xl font-bold text-navy-900">{result.headline}</h3>
          <p className="mt-3 text-navy-500">{result.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {result.guideHref && (
              <GradientButton href={result.guideHref} variant="ghost">
                Read the guide
              </GradientButton>
            )}
            {result.calculatorHref && <GradientButton href={result.calculatorHref}>Use the calculator</GradientButton>}
            {result.serviceHref && (
              <GradientButton href={result.serviceHref} variant={result.calculatorHref ? "outline" : "solid"}>
                See how we help
              </GradientButton>
            )}
          </div>
          <div className="mt-8 rounded-2xl bg-navy-50 p-5">
            <p className="text-sm text-navy-600">Because outcomes depend on individual circumstances, it&rsquo;s often worth a consultation before you apply or make a decision.</p>
            <GradientButton href="/appointment" size="sm" className="mt-3">
              Book an appointment
            </GradientButton>
          </div>
          <button onClick={restart} className="mt-6 text-sm font-semibold text-navy-400 hover:text-navy-700">
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
