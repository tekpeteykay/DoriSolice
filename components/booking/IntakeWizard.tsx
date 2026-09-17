"use client";

import { useState } from "react";
import { AppointmentServiceArea } from "@/types";
import { intakeQuestionsByService } from "@/data/intake-questions";
import { CalculatorProgress } from "@/components/calculators/CalculatorProgress";
import { CalculatorQuestionField } from "@/components/calculators/CalculatorQuestionField";
import { GradientButton } from "@/components/ui/GradientButton";
import { DocumentChecklist } from "@/components/booking/DocumentChecklist";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export function IntakeWizard({ serviceArea }: { serviceArea: AppointmentServiceArea }) {
  const questions = intakeQuestionsByService[serviceArea] ?? intakeQuestionsByService.general;
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const current = questions[step];
  const isLast = step === questions.length - 1;

  function setAnswer(id: string, value: any) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  if (done) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-navy-900">Thanks — we&rsquo;ll review this before your appointment</h2>
        <p className="mx-auto mt-3 max-w-md text-navy-500">Bringing along the documents below, where relevant, will help us make the most of the time.</p>
        <div className="mt-8 text-left">
          <DocumentChecklist serviceArea={serviceArea} answers={answers} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <CalculatorProgress step={step} total={questions.length} />
      <CalculatorQuestionField key={current.id} question={current} value={answers[current.id]} onChange={(v) => setAnswer(current.id, v)} />
      <div className="mt-8 flex items-center justify-between">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="inline-flex items-center gap-2 text-sm font-semibold text-navy-500 disabled:opacity-0">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <GradientButton onClick={() => (isLast ? setDone(true) : setStep((s) => s + 1))}>{isLast ? "Finish" : "Continue"}</GradientButton>
      </div>
    </div>
  );
}
