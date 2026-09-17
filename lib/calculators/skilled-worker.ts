import { CalculatorDefinition } from "@/types";
import { skilledWorkerRules } from "@/data/immigration-rules/skilled-worker";
import { formatCurrency } from "@/lib/utils";

export const skilledWorkerCalculator: CalculatorDefinition = {
  id: "skilled-worker-salary-check",
  slug: "immigration/skilled-worker",
  category: "immigration",
  title: "Skilled Worker Visa Salary Checker",
  shortDescription: "Compare a job offer's salary against the general Skilled Worker salary thresholds.",
  description:
    "Skilled Worker eligibility depends on your occupation's SOC code, the 'going rate' for that occupation, sponsorship by a licensed employer, and more — salary is only one part. This tool gives an indicative comparison against the general thresholds only.",
  questions: [
    { id: "offeredSalary", type: "currency", label: "What is the annual salary being offered?", required: true },
    {
      id: "goingRate",
      type: "currency",
      label: "What is the 'going rate' for the specific occupation (SOC code), if known?",
      help: "Found in the Skilled Worker occupation list. Leave blank if you don't know it yet — we'll use the general threshold instead.",
      defaultValue: 0,
    },
    {
      id: "isNewEntrant",
      type: "yesno",
      label: "Does the worker qualify as a 'new entrant' to the labour market?",
      help: "For example, under 26, a recent graduate, in professional training, or switching from a Student or Graduate visa.",
      defaultValue: false,
    },
    {
      id: "isHealthAndCare",
      type: "yesno",
      label: "Is this a Health and Care Worker visa role?",
      defaultValue: false,
    },
  ],
  calculate: (answers) => {
    const offeredSalary = Number(answers.offeredSalary) || 0;
    const goingRate = Number(answers.goingRate) || 0;
    const isNewEntrant = Boolean(answers.isNewEntrant);
    const isHealthAndCare = Boolean(answers.isHealthAndCare);

    const baseThreshold = isHealthAndCare
      ? skilledWorkerRules.healthAndCareVisaThreshold.value
      : Math.max(skilledWorkerRules.generalSalaryThreshold.value, goingRate);

    const effectiveThreshold = isNewEntrant && !isHealthAndCare ? Math.round(baseThreshold * skilledWorkerRules.newEntrantDiscountRate.value) : baseThreshold;

    const meetsThreshold = offeredSalary >= effectiveThreshold;

    return {
      headline: {
        label: meetsThreshold ? "Offered salary meets the indicative threshold" : "Offered salary is below the indicative threshold",
        value: formatCurrency(offeredSalary),
      },
      eligibility: meetsThreshold ? "eligible" : "not-eligible",
      lines: [
        { label: "Offered annual salary", value: formatCurrency(offeredSalary) },
        { label: "Applicable indicative threshold", value: formatCurrency(effectiveThreshold) },
        {
          label: "Result",
          value: meetsThreshold ? "Meets the indicative salary threshold" : `Falls short by ${formatCurrency(effectiveThreshold - offeredSalary)}`,
          emphasis: true,
          tone: meetsThreshold ? "positive" : "negative",
        },
      ],
      notes: [
        "Meeting the salary threshold is necessary but not sufficient — the role must also be a genuine vacancy at the required skill level, sponsored by a Home Office licensed sponsor, and correctly coded under the right SOC occupation code.",
        "The Immigration Health Surcharge and visa application fees are payable in addition to any salary requirement.",
      ],
    };
  },
  assumptions: [
    "Uses the general salary threshold unless a specific occupation going rate is entered.",
    "New entrant discount is applied as an approximation — some occupations have their own new entrant going rates.",
    "Does not check sponsorship licensing, genuine vacancy requirements, or English language requirements.",
  ],
  rulesVersion: "Skilled Worker thresholds — reviewed 2026-01-15",
  sources: [
    { label: "Skilled Worker visa: salary requirements", url: "https://www.gov.uk/skilled-worker-visa/knowledge-of-english-and-salary-requirements", publisher: "Home Office" },
  ],
  lastUpdated: "2026-01-15",
  relatedGuides: ["uk-skilled-worker-visa-explained"],
  relatedServices: ["skilled-worker-visa"],
};
