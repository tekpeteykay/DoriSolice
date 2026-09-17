import { CalculatorDefinition } from "@/types";
import { taxYearRules } from "./tax-engine";
import { formatCurrency } from "@/lib/utils";

export const salaryConverterCalculator: CalculatorDefinition = {
  id: "salary-converter",
  slug: "salary/salary-converter",
  category: "salary",
  title: "Salary Converter",
  shortDescription: "Convert between hourly, weekly, monthly and annual pay.",
  description: "Convert a salary or wage from one pay frequency to another, with adjustable hours and paid weeks per year.",
  popular: true,
  questions: [
    {
      id: "frequency",
      type: "select",
      label: "What figure do you have?",
      options: [
        { value: "hourly", label: "Hourly rate" },
        { value: "weekly", label: "Weekly pay" },
        { value: "monthly", label: "Monthly pay" },
        { value: "annual", label: "Annual salary" },
      ],
      defaultValue: "annual",
      required: true,
    },
    { id: "amount", type: "currency", label: "Enter the amount", placeholder: "35000", required: true },
    { id: "hoursPerWeek", type: "number", label: "Hours worked per week", placeholder: "37.5", defaultValue: 37.5 },
    { id: "weeksPerYear", type: "number", label: "Paid weeks per year", help: "Use 52 unless you take unpaid leave.", placeholder: "52", defaultValue: 52 },
  ],
  calculate: (answers) => {
    const frequency = String(answers.frequency || "annual");
    const amount = Number(answers.amount) || 0;
    const hoursPerWeek = Number(answers.hoursPerWeek) || 37.5;
    const weeksPerYear = Number(answers.weeksPerYear) || 52;

    let annual: number;
    switch (frequency) {
      case "hourly":
        annual = amount * hoursPerWeek * weeksPerYear;
        break;
      case "weekly":
        annual = amount * weeksPerYear;
        break;
      case "monthly":
        annual = amount * 12;
        break;
      default:
        annual = amount;
    }

    const monthly = annual / 12;
    const weekly = annual / weeksPerYear;
    const daily = weekly / (hoursPerWeek > 0 ? hoursPerWeek / (hoursPerWeek / 5 || 1) : 5);
    const hourly = weekly / (hoursPerWeek || 1);

    return {
      headline: { label: "Annual equivalent", value: formatCurrency(annual) },
      lines: [
        { label: "Annual", value: formatCurrency(annual), emphasis: true },
        { label: "Monthly", value: formatCurrency(monthly) },
        { label: "Weekly", value: formatCurrency(weekly) },
        { label: "Daily (based on a 5-day week)", value: formatCurrency(weekly / 5) },
        { label: "Hourly", value: formatCurrency(hourly) },
      ],
      notes: ["This is a gross (before tax) conversion. Use the Take-Home Pay calculator to estimate deductions."],
    };
  },
  assumptions: ["Assumes even pay across all paid weeks — irregular overtime or bonuses are not included."],
  rulesVersion: taxYearRules.taxYear,
  sources: [],
  lastUpdated: "2026-01-15",
  relatedGuides: ["how-to-calculate-take-home-pay"],
};
