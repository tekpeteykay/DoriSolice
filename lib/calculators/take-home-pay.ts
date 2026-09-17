import { CalculatorDefinition } from "@/types";
import { calculateIncomeTax, calculateEmployeeNI, calculateStudentLoan, taxYearRules } from "./tax-engine";
import { formatCurrency } from "@/lib/utils";

const frequencyDivisor: Record<string, number> = {
  annual: 1,
  monthly: 12,
  weekly: 52,
  hourly: 52 * 37.5,
};

export const takeHomePayCalculator: CalculatorDefinition = {
  id: "take-home-pay",
  slug: "salary/take-home-pay",
  category: "salary",
  title: "Take-Home Pay Calculator",
  shortDescription: "See your estimated net pay after tax, NI, pension and student loan.",
  description:
    "Enter your salary in whatever frequency you're paid, add any student loan or pension deductions, and see an estimated breakdown of your take-home pay.",
  popular: true,
  questions: [
    {
      id: "frequency",
      type: "select",
      label: "How is your salary quoted?",
      options: [
        { value: "annual", label: "Per year" },
        { value: "monthly", label: "Per month" },
        { value: "weekly", label: "Per week" },
        { value: "hourly", label: "Per hour (based on 37.5 hrs/week)" },
      ],
      defaultValue: "annual",
      required: true,
    },
    {
      id: "amount",
      type: "currency",
      label: "What is your gross pay?",
      placeholder: "35000",
      required: true,
    },
    {
      id: "isScottish",
      type: "yesno",
      label: "Are you a Scottish taxpayer?",
      defaultValue: false,
    },
    {
      id: "studentLoan",
      type: "select",
      label: "Do you have a student loan?",
      options: [
        { value: "none", label: "No student loan" },
        { value: "plan1", label: "Plan 1 (pre-2012 England/Wales, or NI)" },
        { value: "plan2", label: "Plan 2 (2012–2023 England/Wales)" },
        { value: "plan4", label: "Plan 4 (Scotland)" },
        { value: "plan5", label: "Plan 5 (2023 onwards, England/Wales)" },
        { value: "postgrad", label: "Postgraduate Loan" },
      ],
      defaultValue: "none",
    },
    {
      id: "pensionPercent",
      type: "percentage",
      label: "Pension contribution (% of salary)",
      placeholder: "5",
      defaultValue: 0,
    },
  ],
  calculate: (answers) => {
    const frequency = String(answers.frequency || "annual");
    const amount = Number(answers.amount) || 0;
    const annualGross = amount * (frequencyDivisor[frequency] ?? 1);
    const isScottish = Boolean(answers.isScottish);
    const studentLoanPlan = String(answers.studentLoan || "none") as any;
    const pensionPercent = (Number(answers.pensionPercent) || 0) / 100;

    const pensionContribution = annualGross * pensionPercent;
    const taxableSalary = annualGross - pensionContribution;

    const { totalTax } = calculateIncomeTax(taxableSalary, isScottish);
    const { employeeNi } = calculateEmployeeNI(taxableSalary);
    const studentLoanRepayment = calculateStudentLoan(taxableSalary, studentLoanPlan);

    const netAnnual = annualGross - totalTax - employeeNi - studentLoanRepayment - pensionContribution;

    return {
      headline: {
        label: "Estimated take-home pay",
        value: `${formatCurrency(netAnnual / 12)} / month`,
      },
      lines: [
        { label: "Gross pay (annual equivalent)", value: formatCurrency(annualGross) },
        { label: "Income Tax", value: formatCurrency(-totalTax), tone: "negative" },
        { label: "National Insurance", value: formatCurrency(-employeeNi), tone: "negative" },
        { label: "Pension contribution", value: formatCurrency(-pensionContribution), tone: "negative" },
        { label: "Student loan repayment", value: formatCurrency(-studentLoanRepayment), tone: "negative" },
        { label: "Estimated net pay (annual)", value: formatCurrency(netAnnual), emphasis: true, tone: "positive" },
        { label: "Estimated net pay (monthly)", value: formatCurrency(netAnnual / 12) },
        { label: "Estimated net pay (weekly)", value: formatCurrency(netAnnual / 52) },
      ],
      notes: [
        "Hourly figures assume a 37.5 hour working week and 52 paid weeks a year — adjust the figures if your hours differ.",
      ],
    };
  },
  assumptions: [
    "Assumes a standard tax code with no other adjustments.",
    "Hourly pay is converted to an annual figure assuming 37.5 hours/week and 52 weeks/year.",
  ],
  rulesVersion: taxYearRules.taxYear,
  sources: [
    { label: "Income Tax rates and Personal Allowances", url: "https://www.gov.uk/income-tax-rates", publisher: "GOV.UK" },
    { label: "Student loan repayment thresholds", url: "https://www.gov.uk/repaying-your-student-loan/what-you-pay", publisher: "GOV.UK" },
  ],
  lastUpdated: "2026-01-15",
  relatedGuides: ["how-to-calculate-take-home-pay"],
  relatedServices: ["tax-enquiries"],
};
