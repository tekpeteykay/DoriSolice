"use client";

import { CalculatorQuestionDef } from "@/types";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

export function CalculatorQuestionField({
  question,
  value,
  onChange,
}: {
  question: CalculatorQuestionDef;
  value: any;
  onChange: (value: any) => void;
}) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="animate-fade-up">
      <div className="mb-3 flex items-start justify-between gap-3">
        <label className="text-xl font-semibold text-navy-900 md:text-2xl">{question.label}</label>
        {question.help && (
          <button
            type="button"
            aria-label="Why do we ask this?"
            onClick={() => setShowHelp((v) => !v)}
            className="mt-1 shrink-0 text-navy-400 hover:text-red-600"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        )}
      </div>
      {question.help && showHelp && (
        <p className="mb-4 rounded-xl bg-navy-50 px-4 py-3 text-sm text-navy-600">{question.help}</p>
      )}

      <FieldInput question={question} value={value} onChange={onChange} />
    </div>
  );
}

function FieldInput({ question, value, onChange }: { question: CalculatorQuestionDef; value: any; onChange: (v: any) => void }) {
  switch (question.type) {
    case "currency":
      return (
        <div className="flex items-center gap-2 rounded-2xl border-2 border-navy-100 bg-white px-5 py-4 text-2xl font-semibold text-navy-900 transition-colors focus-within:border-red-500">
          <span className="text-navy-400">£</span>
          <input
            type="number"
            inputMode="decimal"
            className="w-full bg-transparent outline-none"
            placeholder={question.placeholder ?? "0"}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>
      );
    case "percentage":
      return (
        <div className="flex items-center gap-2 rounded-2xl border-2 border-navy-100 bg-white px-5 py-4 text-2xl font-semibold text-navy-900 transition-colors focus-within:border-red-500">
          <input
            type="number"
            inputMode="decimal"
            className="w-full bg-transparent outline-none"
            placeholder={question.placeholder ?? "0"}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          />
          <span className="text-navy-400">%</span>
        </div>
      );
    case "number":
      return (
        <input
          type="number"
          className="w-full rounded-2xl border-2 border-navy-100 bg-white px-5 py-4 text-2xl font-semibold text-navy-900 outline-none transition-colors focus:border-red-500"
          placeholder={question.placeholder}
          min={question.min}
          max={question.max}
          step={question.step ?? 1}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        />
      );
    case "date":
      return (
        <input
          type="date"
          className="w-full rounded-2xl border-2 border-navy-100 bg-white px-5 py-4 text-xl font-semibold text-navy-900 outline-none transition-colors focus:border-red-500"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "text":
      return (
        <input
          type="text"
          className="w-full rounded-2xl border-2 border-navy-100 bg-white px-5 py-4 text-xl font-semibold text-navy-900 outline-none transition-colors focus:border-red-500"
          placeholder={question.placeholder}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "select":
      return (
        <select
          className="w-full appearance-none rounded-2xl border-2 border-navy-100 bg-white px-5 py-4 text-lg font-semibold text-navy-900 outline-none transition-colors focus:border-red-500"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            Select an option
          </option>
          {question.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    case "radio":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {question.options?.map((o) => (
            <button
              type="button"
              key={o.value}
              onClick={() => onChange(o.value)}
              className={cn(
                "rounded-2xl border-2 px-5 py-4 text-left font-medium transition-colors",
                value === o.value ? "border-red-500 bg-red-50 text-red-700" : "border-navy-100 bg-white text-navy-700 hover:border-navy-300"
              )}
            >
              {o.label}
              {o.hint && <span className="mt-1 block text-xs font-normal text-navy-400">{o.hint}</span>}
            </button>
          ))}
        </div>
      );
    case "yesno":
      return (
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Yes", val: true },
            { label: "No", val: false },
          ].map((o) => (
            <button
              type="button"
              key={o.label}
              onClick={() => onChange(o.val)}
              className={cn(
                "rounded-2xl border-2 px-5 py-4 text-lg font-semibold transition-colors",
                value === o.val ? "border-red-500 bg-red-50 text-red-700" : "border-navy-100 bg-white text-navy-700 hover:border-navy-300"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      );
    case "checkbox":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {question.options?.map((o) => {
            const arr: string[] = Array.isArray(value) ? value : [];
            const checked = arr.includes(o.value);
            return (
              <button
                type="button"
                key={o.value}
                onClick={() => onChange(checked ? arr.filter((v) => v !== o.value) : [...arr, o.value])}
                className={cn(
                  "rounded-2xl border-2 px-5 py-4 text-left font-medium transition-colors",
                  checked ? "border-red-500 bg-red-50 text-red-700" : "border-navy-100 bg-white text-navy-700 hover:border-navy-300"
                )}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      );
    default:
      return null;
  }
}
