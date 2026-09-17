"use client";

import { useMemo, useState } from "react";
import { CalculatorResult } from "@/types";
import { getCalculatorBySlug } from "@/lib/calculators/registry";
import { CalculatorProgress } from "./CalculatorProgress";
import { CalculatorQuestionField } from "./CalculatorQuestionField";
import { CalculatorResultView } from "./CalculatorResultView";
import { GradientButton } from "@/components/ui/GradientButton";
import { ArrowLeft } from "lucide-react";

function buildInitialAnswers(calculator: NonNullable<ReturnType<typeof getCalculatorBySlug>>) {
  const answers: Record<string, any> = {};
  for (const q of calculator.questions) {
    if (q.defaultValue !== undefined) answers[q.id] = q.defaultValue;
  }
  return answers;
}

// Accepts a slug rather than the full CalculatorDefinition object: the
// definition includes a `calculate` function, which cannot be serialized
// across the server/client boundary as a prop. Looking it up here, inside
// the client bundle, avoids that entirely.
export function CalculatorRunner({ slug }: { slug: string }) {
  const calculator = getCalculatorBySlug(slug);
  const [answers, setAnswers] = useState<Record<string, any>>(() => (calculator ? buildInitialAnswers(calculator) : {}));
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const visibleQuestions = useMemo(
    () => calculator?.questions.filter((q) => !q.showIf || q.showIf(answers)) ?? [],
    [calculator, answers]
  );

  const currentQuestion = visibleQuestions[stepIndex];
  const isLastStep = stepIndex === visibleQuestions.length - 1;
  const currentValue = currentQuestion ? answers[currentQuestion.id] : undefined;
  const canProceed = !currentQuestion?.required || (currentValue !== undefined && currentValue !== "");

  function setAnswer(id: string, value: any) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function goNext() {
    if (!calculator) return;
    if (isLastStep) {
      setResult(calculator.calculate(answers));
    } else {
      setStepIndex((i) => Math.min(i + 1, visibleQuestions.length - 1));
    }
  }

  function goBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function restart() {
    if (!calculator) return;
    setAnswers(buildInitialAnswers(calculator));
    setStepIndex(0);
    setResult(null);
  }

  if (!calculator) {
    return null;
  }

  if (result) {
    return <CalculatorResultView result={result} calculator={calculator} onRestart={restart} />;
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div>
      <CalculatorProgress step={stepIndex} total={visibleQuestions.length} />
      <div className="min-h-[260px]">
        <CalculatorQuestionField
          key={currentQuestion.id}
          question={currentQuestion}
          value={currentValue}
          onChange={(v) => setAnswer(currentQuestion.id, v)}
        />
      </div>
      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          onClick={goBack}
          disabled={stepIndex === 0}
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-navy-500 disabled:opacity-0"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <GradientButton onClick={goNext} disabled={!canProceed} className={!canProceed ? "opacity-50" : ""}>
          {isLastStep ? "See my result" : "Continue"}
        </GradientButton>
      </div>
    </div>
  );
}
