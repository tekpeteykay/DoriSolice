import { CalculatorDefinition } from "@/types";
import { calculateIncomeTax, calculateEmployeeNI, taxYearRules } from "./tax-engine";
import { formatCurrency } from "@/lib/utils";

export const incomeTaxCalculator: CalculatorDefinition = {
  id: "income-tax",
  slug: "tax/income-tax",
  category: "tax",
  title: "PAYE Income Tax Calculator",
  shortDescription: "Work out Income Tax and National Insurance on your salary.",
  description:
    "Estimate the Income Tax and employee National Insurance due on a salary, plus your estimated net take-home pay, based on the rules for the selected tax year.",
  popular: true,
  questions: [
    {
      id: "salary",
      type: "currency",
      label: "What is your annual gross salary?",
      help: "Enter your salary before any tax, National Insurance or pension deductions.",
      placeholder: "35000",
      required: true,
    },
    {
      id: "otherIncome",
      type: "currency",
      label: "Do you have any other taxable income?",
      help: "For example rental income, freelance income, or dividends outside an ISA. Leave blank if none.",
      placeholder: "0",
      defaultValue: 0,
    },
    {
      id: "pensionPercent",
      type: "percentage",
      label: "Do you pay into a workplace pension?",
      help: "Enter the percentage of salary you contribute (before tax relief). We'll deduct this before calculating your tax.",
      placeholder: "5",
      defaultValue: 0,
    },
    {
      id: "isScottish",
      type: "yesno",
      label: "Are you a Scottish taxpayer?",
      help: "Scotland has its own Income Tax rates and bands, set by the Scottish Parliament. This does not affect National Insurance.",
      defaultValue: false,
    },
  ],
  calculate: (answers) => {
    const salary = Number(answers.salary) || 0;
    const otherIncome = Number(answers.otherIncome) || 0;
    const pensionPercent = (Number(answers.pensionPercent) || 0) / 100;
    const isScottish = Boolean(answers.isScottish);

    const pensionContribution = salary * pensionPercent;
    const taxableSalary = salary - pensionContribution;
    const totalTaxableIncome = taxableSalary + otherIncome;

    const { totalTax, bands, personalAllowance } = calculateIncomeTax(totalTaxableIncome, isScottish);
    const { employeeNi } = calculateEmployeeNI(taxableSalary);

    const grossAnnual = salary + otherIncome;
    const netAnnual = grossAnnual - totalTax - employeeNi - pensionContribution;

    return {
      headline: { label: "Estimated net annual income", value: formatCurrency(netAnnual) },
      lines: [
        { label: "Gross annual income", value: formatCurrency(grossAnnual) },
        { label: "Personal Allowance used", value: formatCurrency(personalAllowance) },
        { label: "Pension contribution", value: formatCurrency(-pensionContribution), tone: "negative" },
        { label: "Income Tax", value: formatCurrency(-totalTax), tone: "negative" },
        { label: "National Insurance", value: formatCurrency(-employeeNi), tone: "negative" },
        { label: "Estimated net annual income", value: formatCurrency(netAnnual), emphasis: true, tone: "positive" },
        { label: "Estimated monthly take-home", value: formatCurrency(netAnnual / 12) },
        { label: "Estimated weekly take-home", value: formatCurrency(netAnnual / 52) },
        ...bands.map((b) => ({
          label: `${b.label} (${(b.rate * 100).toFixed(0)}% on ${formatCurrency(b.amount)})`,
          value: formatCurrency(b.tax),
        })),
      ],
      notes: [
        "This estimate assumes a standard tax code and does not account for benefits in kind, marriage allowance, or other adjustments to your tax code.",
        "Salary sacrifice pension arrangements may produce a different result — a solicitor or accountant can review your payslip in detail.",
      ],
    };
  },
  assumptions: [
    "Assumes a standard (non-adjusted) tax code and no benefits in kind.",
    "Assumes pension contributions are made via relief-at-source or net pay arrangement, not salary sacrifice.",
    "National Insurance is calculated on salary only, not on other income.",
  ],
  rulesVersion: taxYearRules.taxYear,
  sources: [
    { label: "Income Tax rates and Personal Allowances", url: "https://www.gov.uk/income-tax-rates", publisher: "GOV.UK" },
    { label: "National Insurance rates and categories", url: "https://www.gov.uk/national-insurance-rates-letters", publisher: "GOV.UK" },
  ],
  lastUpdated: "2026-01-15",
  relatedGuides: ["how-paye-tax-works", "understanding-tax-codes"],
  relatedServices: ["tax-enquiries"],
};
