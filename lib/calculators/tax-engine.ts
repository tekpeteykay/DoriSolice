import { taxYear2026_27 } from "@/data/tax-years/2026-27";

const T = taxYear2026_27;

export interface IncomeTaxBreakdown {
  personalAllowance: number;
  taxableIncome: number;
  bands: { label: string; amount: number; rate: number; tax: number }[];
  totalTax: number;
}

/**
 * Calculates rest-of-UK (England, Wales, Northern Ireland) income tax on a
 * given amount of taxable income, applying Personal Allowance tapering for
 * income over £100,000.
 */
export function calculateIncomeTax(totalIncome: number, isScottish: boolean): IncomeTaxBreakdown {
  const paTaper = Math.max(0, totalIncome - T.personalAllowanceTaperThreshold.value);
  const personalAllowance = Math.max(0, T.personalAllowance.value - paTaper / 2);
  const taxableIncome = Math.max(0, totalIncome - personalAllowance);

  const bands: { label: string; amount: number; rate: number; tax: number }[] = [];
  let remaining = taxableIncome;
  let totalTax = 0;

  if (isScottish && T.scottishIncomeTax) {
    const s = T.scottishIncomeTax;
    const stepDefs = [
      { label: "Starter rate", ceiling: s.starterBand.value, rate: s.starterRate.value },
      { label: "Basic rate", ceiling: s.basicBand.value, rate: s.basicRate.value },
      { label: "Intermediate rate", ceiling: s.intermediateBand.value, rate: s.intermediateRate.value },
      { label: "Higher rate", ceiling: s.higherBand.value, rate: s.higherRate.value },
      { label: "Advanced rate", ceiling: Math.max(0, s.advancedBand.value - personalAllowance), rate: s.advancedRate.value },
    ];
    let floor = 0;
    for (const step of stepDefs) {
      const bandSize = Math.max(0, step.ceiling - floor);
      const amountInBand = Math.max(0, Math.min(remaining, bandSize));
      if (amountInBand > 0) {
        const tax = amountInBand * step.rate;
        bands.push({ label: step.label, amount: amountInBand, rate: step.rate, tax });
        totalTax += tax;
        remaining -= amountInBand;
      }
      floor = step.ceiling;
      if (remaining <= 0) break;
    }
    if (remaining > 0) {
      const tax = remaining * s.topRate.value;
      bands.push({ label: "Top rate", amount: remaining, rate: s.topRate.value, tax });
      totalTax += tax;
      remaining = 0;
    }
  } else {
    const stepDefs = [
      { label: "Basic rate", size: T.basicRateBand.value, rate: T.incomeTax.basicRate.value },
      { label: "Higher rate", size: Math.max(0, T.higherRateBand.value - personalAllowance - T.basicRateBand.value), rate: T.incomeTax.higherRate.value },
    ];
    for (const step of stepDefs) {
      const amountInBand = Math.max(0, Math.min(remaining, step.size));
      if (amountInBand > 0) {
        const tax = amountInBand * step.rate;
        bands.push({ label: step.label, amount: amountInBand, rate: step.rate, tax });
        totalTax += tax;
        remaining -= amountInBand;
      }
      if (remaining <= 0) break;
    }
    if (remaining > 0) {
      const tax = remaining * T.incomeTax.additionalRate.value;
      bands.push({ label: "Additional rate", amount: remaining, rate: T.incomeTax.additionalRate.value, tax });
      totalTax += tax;
    }
  }

  return { personalAllowance, taxableIncome, bands, totalTax };
}

export interface NiBreakdown {
  employeeNi: number;
}

export function calculateEmployeeNI(annualSalary: number): NiBreakdown {
  const { primaryThreshold, upperEarningsLimit, class1MainRate, class1UpperRate } = T.nationalInsurance;
  const mainBand = Math.max(0, Math.min(annualSalary, upperEarningsLimit.value) - primaryThreshold.value);
  const upperBand = Math.max(0, annualSalary - upperEarningsLimit.value);
  const employeeNi = mainBand * class1MainRate.value + upperBand * class1UpperRate.value;
  return { employeeNi };
}

export function calculateClass4NI(annualProfit: number): number {
  const { class4LowerLimit, class4UpperLimit, class4MainRate, class4UpperRate } = T.nationalInsurance;
  const mainBand = Math.max(0, Math.min(annualProfit, class4UpperLimit.value) - class4LowerLimit.value);
  const upperBand = Math.max(0, annualProfit - class4UpperLimit.value);
  return mainBand * class4MainRate.value + upperBand * class4UpperRate.value;
}

export function calculateStudentLoan(annualIncome: number, plan: "none" | "plan1" | "plan2" | "plan4" | "plan5" | "postgrad"): number {
  const sl = T.studentLoan;
  switch (plan) {
    case "plan1":
      return Math.max(0, annualIncome - sl.plan1Threshold.value) * sl.plan1Rate.value;
    case "plan2":
      return Math.max(0, annualIncome - sl.plan2Threshold.value) * sl.plan2Rate.value;
    case "plan4":
      return Math.max(0, annualIncome - sl.plan4Threshold.value) * sl.plan1Rate.value;
    case "plan5":
      return Math.max(0, annualIncome - sl.plan5Threshold.value) * sl.plan1Rate.value;
    case "postgrad":
      return Math.max(0, annualIncome - sl.postgradThreshold.value) * sl.postgradRate.value;
    default:
      return 0;
  }
}

export { T as taxYearRules };
