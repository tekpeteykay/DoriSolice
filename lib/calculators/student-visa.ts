import { CalculatorDefinition } from "@/types";
import { studentVisaRules } from "@/data/immigration-rules/student-visa";
import { formatCurrency } from "@/lib/utils";

export const studentVisaCalculator: CalculatorDefinition = {
  id: "student-visa-funds",
  slug: "immigration/student-visa-funds",
  category: "immigration",
  title: "Student Visa Financial Requirement Calculator",
  shortDescription: "Estimate the maintenance funds you may need to show for a Student visa.",
  description:
    "Student visa applicants generally need to show a set amount of money per month of their course (capped at 9 months), plus extra for any dependants. This is an estimate — your university or college's own confirmation of acceptance will state the exact figure required.",
  questions: [
    {
      id: "location",
      type: "radio",
      label: "Where will you be studying?",
      options: [
        { value: "london", label: "In London" },
        { value: "outside-london", label: "Outside London" },
      ],
      required: true,
    },
    {
      id: "courseMonths",
      type: "number",
      label: "How many months of the course do you need to cover?",
      help: `This is capped at ${studentVisaRules.maxMonthsCapped.value} months even for longer courses.`,
      defaultValue: 9,
      min: 1,
      max: 12,
    },
    {
      id: "hasDependants",
      type: "yesno",
      label: "Do you have any dependants joining you?",
      defaultValue: false,
    },
    {
      id: "numberOfDependants",
      type: "number",
      label: "How many dependants?",
      showIf: (a) => Boolean(a.hasDependants),
      defaultValue: 1,
      min: 1,
    },
  ],
  calculate: (answers) => {
    const isLondon = answers.location === "london";
    const months = Math.min(Number(answers.courseMonths) || 9, studentVisaRules.maxMonthsCapped.value);
    const hasDependants = Boolean(answers.hasDependants);
    const numberOfDependants = hasDependants ? Math.max(1, Number(answers.numberOfDependants) || 1) : 0;

    const monthlyRate = isLondon ? studentVisaRules.monthlyFundsLondon.value : studentVisaRules.monthlyFundsOutsideLondon.value;
    const dependantMonthlyRate = isLondon ? studentVisaRules.dependantMonthlyFundsLondon.value : studentVisaRules.dependantMonthlyFundsOutsideLondon.value;

    const mainApplicantFunds = monthlyRate * months;
    const dependantFunds = dependantMonthlyRate * months * numberOfDependants;
    const totalFunds = mainApplicantFunds + dependantFunds;

    return {
      headline: { label: "Estimated funds required", value: formatCurrency(totalFunds) },
      lines: [
        { label: `Main applicant (${formatCurrency(monthlyRate)} × ${months} months)`, value: formatCurrency(mainApplicantFunds) },
        ...(numberOfDependants > 0
          ? [{ label: `Dependants (${formatCurrency(dependantMonthlyRate)} × ${months} months × ${numberOfDependants})`, value: formatCurrency(dependantFunds) }]
          : []),
        { label: "Total funds to evidence", value: formatCurrency(totalFunds), emphasis: true },
      ],
      notes: [
        `Funds generally need to have been held for at least ${studentVisaRules.fundsHeldForDays.value} consecutive days before you apply.`,
        "If your Confirmation of Acceptance for Studies (CAS) shows your college has already been paid tuition fees or accommodation, you may be able to deduct that amount — check your CAS letter carefully.",
      ],
    };
  },
  assumptions: ["Assumes no tuition or accommodation fees have already been paid to the institution — deduct these from the total if they have."],
  rulesVersion: "Student visa financial requirement — reviewed 2026-01-15",
  sources: [{ label: "Student visa: money (funds) you need", url: "https://www.gov.uk/student-visa/money", publisher: "Home Office" }],
  lastUpdated: "2026-01-15",
  relatedGuides: ["uk-student-visa-explained"],
  relatedServices: ["student-visa"],
};
