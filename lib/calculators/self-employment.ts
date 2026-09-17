import { CalculatorDefinition } from "@/types";
import { calculateIncomeTax, calculateClass4NI, taxYearRules } from "./tax-engine";
import { formatCurrency } from "@/lib/utils";

export const selfEmploymentCalculator: CalculatorDefinition = {
  id: "self-employment-tax",
  slug: "self-employment/tax",
  category: "self-employment",
  title: "Self-Employment Tax Calculator",
  shortDescription: "Estimate Income Tax and Class 4 National Insurance on your self-employed profit.",
  description:
    "Enter your turnover and allowable expenses to estimate your taxable profit, Income Tax and Class 4 National Insurance for the tax year, plus a suggested monthly saving to cover your bill.",
  popular: true,
  questions: [
    { id: "turnover", type: "currency", label: "What is your total turnover (gross income) for the year?", placeholder: "45000", required: true },
    { id: "expenses", type: "currency", label: "What are your total allowable business expenses?", help: "Costs wholly and exclusively for the business, such as materials, travel, and a proportion of home costs.", placeholder: "8000", defaultValue: 0 },
    { id: "otherIncome", type: "currency", label: "Any other taxable income (e.g. employment income)?", defaultValue: 0 },
    { id: "isScottish", type: "yesno", label: "Are you a Scottish taxpayer?", defaultValue: false },
  ],
  calculate: (answers) => {
    const turnover = Number(answers.turnover) || 0;
    const expenses = Number(answers.expenses) || 0;
    const otherIncome = Number(answers.otherIncome) || 0;
    const isScottish = Boolean(answers.isScottish);

    const profit = Math.max(0, turnover - expenses);
    const totalTaxableIncome = profit + otherIncome;

    const { totalTax } = calculateIncomeTax(totalTaxableIncome, isScottish);
    // Attribute tax proportionally to self-employed profit vs other income for the headline figure.
    const shareOfProfit = totalTaxableIncome > 0 ? profit / totalTaxableIncome : 0;
    const incomeTaxOnProfit = totalTax * shareOfProfit;
    const class4Ni = calculateClass4NI(profit);

    const totalLiability = incomeTaxOnProfit + class4Ni;
    const monthlyProvision = totalLiability / 12;

    return {
      headline: { label: "Estimated total tax + NI on your profit", value: formatCurrency(totalLiability) },
      lines: [
        { label: "Turnover", value: formatCurrency(turnover) },
        { label: "Allowable expenses", value: formatCurrency(-expenses), tone: "negative" },
        { label: "Estimated taxable profit", value: formatCurrency(profit), emphasis: true },
        { label: "Income Tax (attributable to this profit)", value: formatCurrency(-incomeTaxOnProfit), tone: "negative" },
        { label: "Class 4 National Insurance", value: formatCurrency(-class4Ni), tone: "negative" },
        { label: "Suggested monthly saving", value: formatCurrency(monthlyProvision) },
      ],
      notes: [
        "Class 2 National Insurance is not shown as it is no longer payable by most self-employed people below the small profits threshold, though voluntary payments may protect your state pension record.",
        "If you also have employment income, the split of tax between employment and self-employment shown here is an estimate for illustration only.",
      ],
    };
  },
  assumptions: [
    "Assumes all expenses entered are allowable for tax purposes — HMRC rules on allowable expenses can be detailed.",
    "Does not include Class 2 NI, payments on account, or the impact of a personal pension contribution.",
  ],
  rulesVersion: taxYearRules.taxYear,
  sources: [
    { label: "Self-employed National Insurance rates", url: "https://www.gov.uk/self-employed-national-insurance-rates", publisher: "GOV.UK" },
    { label: "Self Assessment tax returns", url: "https://www.gov.uk/self-assessment-tax-returns", publisher: "HMRC" },
  ],
  lastUpdated: "2026-01-15",
  relatedGuides: ["self-employed-tax-explained"],
  relatedServices: ["self-assessment"],
};
