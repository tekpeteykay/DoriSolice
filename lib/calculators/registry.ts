import { CalculatorDefinition } from "@/types";
import { incomeTaxCalculator } from "./income-tax";
import { takeHomePayCalculator } from "./take-home-pay";
import { vatCalculator } from "./vat";
import { salaryConverterCalculator } from "./salary-converter";
import { selfEmploymentCalculator } from "./self-employment";
import { spouseVisaCalculator } from "./spouse-visa";
import { skilledWorkerCalculator } from "./skilled-worker";
import { universalCreditCalculator } from "./universal-credit";
import { ilrCalculator } from "./ilr";
import { studentVisaCalculator } from "./student-visa";

// Central registry: every fully implemented calculator is listed here.
// The /calculators hub renders these plus "coming soon" placeholder cards
// defined in data/calculator-catalogue.ts for routes not yet built.
export const calculators: CalculatorDefinition[] = [
  incomeTaxCalculator,
  takeHomePayCalculator,
  vatCalculator,
  salaryConverterCalculator,
  selfEmploymentCalculator,
  spouseVisaCalculator,
  skilledWorkerCalculator,
  universalCreditCalculator,
  ilrCalculator,
  studentVisaCalculator,
];

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: CalculatorDefinition["category"]): CalculatorDefinition[] {
  return calculators.filter((c) => c.category === category);
}
