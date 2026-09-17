import { CalculatorDefinition } from "@/types";
import { universalCreditRates } from "@/data/benefit-rates/2026-27";
import { formatCurrency } from "@/lib/utils";

export const universalCreditCalculator: CalculatorDefinition = {
  id: "universal-credit-estimator",
  slug: "benefits/universal-credit",
  category: "benefits",
  title: "Universal Credit Estimator",
  shortDescription: "A step-by-step estimate of a possible monthly Universal Credit payment.",
  description:
    "Universal Credit depends on many personal circumstances. This tool asks only a handful of questions to give a rough, indicative monthly estimate — your actual award, if any, is decided by the DWP based on your full circumstances.",
  popular: true,
  questions: [
    {
      id: "relationshipStatus",
      type: "radio",
      label: "Are you single or part of a couple?",
      options: [
        { value: "single", label: "Single" },
        { value: "couple", label: "Couple (living together)" },
      ],
      required: true,
    },
    {
      id: "under25",
      type: "yesno",
      label: "Are you (and your partner, if you have one) both under 25?",
      defaultValue: false,
    },
    {
      id: "hasChildren",
      type: "yesno",
      label: "Do you have any dependent children living with you?",
      defaultValue: false,
    },
    {
      id: "numberOfChildren",
      type: "number",
      label: "How many dependent children?",
      showIf: (a) => Boolean(a.hasChildren),
      defaultValue: 1,
      min: 1,
    },
    {
      id: "housingStatus",
      type: "radio",
      label: "What is your housing situation?",
      options: [
        { value: "rent", label: "I rent my home" },
        { value: "own", label: "I own my home (with or without a mortgage)" },
        { value: "other", label: "Other / living with family" },
      ],
      defaultValue: "rent",
    },
    {
      id: "monthlyEarnings",
      type: "currency",
      label: "Monthly net earnings from work (take-home pay), if any",
      defaultValue: 0,
    },
    {
      id: "savings",
      type: "currency",
      label: "Total savings and capital you and your partner have",
      defaultValue: 0,
    },
  ],
  calculate: (answers) => {
    const isCouple = answers.relationshipStatus === "couple";
    const under25 = Boolean(answers.under25);
    const hasChildren = Boolean(answers.hasChildren);
    const numberOfChildren = hasChildren ? Math.max(1, Number(answers.numberOfChildren) || 1) : 0;
    const housingStatus = String(answers.housingStatus || "rent");
    const monthlyEarnings = Number(answers.monthlyEarnings) || 0;
    const savings = Number(answers.savings) || 0;

    if (savings > universalCreditRates.savingsUpperLimit.value) {
      return {
        headline: { label: "Likely not eligible", value: "Savings above the capital limit" },
        eligibility: "not-eligible",
        lines: [
          { label: "Your savings and capital", value: formatCurrency(savings) },
          { label: "Capital limit for Universal Credit", value: formatCurrency(universalCreditRates.savingsUpperLimit.value) },
        ],
        notes: ["Having savings or capital over this limit generally means you are not eligible for Universal Credit, with some exceptions. A benefits adviser can confirm whether an exception may apply to you."],
      };
    }

    const standardAllowance = isCouple
      ? under25
        ? universalCreditRates.standardAllowance.coupleBothUnder25.value
        : universalCreditRates.standardAllowance.coupleOne25Plus.value
      : under25
      ? universalCreditRates.standardAllowance.singleUnder25.value
      : universalCreditRates.standardAllowance.single25Plus.value;

    const childElement =
      numberOfChildren > 0
        ? universalCreditRates.childElement.firstChild.value + Math.max(0, numberOfChildren - 1) * universalCreditRates.childElement.additionalChild.value
        : 0;

    const maximumAward = standardAllowance + childElement;

    const workAllowance = hasChildren ? (housingStatus === "rent" ? universalCreditRates.workAllowance.lower.value : universalCreditRates.workAllowance.higher.value) : 0;

    const earningsAboveAllowance = Math.max(0, monthlyEarnings - workAllowance);
    const taperReduction = earningsAboveAllowance * universalCreditRates.taperRate.value;

    const capitalTariffIncome =
      savings > universalCreditRates.savingsLowerLimit.value
        ? Math.ceil((savings - universalCreditRates.savingsLowerLimit.value) / 250) * 4.35
        : 0;

    const estimatedAward = Math.max(0, maximumAward - taperReduction - capitalTariffIncome);

    return {
      headline: { label: "Estimated monthly Universal Credit", value: formatCurrency(estimatedAward) },
      eligibility: estimatedAward > 0 ? "eligible" : "review",
      lines: [
        { label: "Standard allowance", value: formatCurrency(standardAllowance) },
        { label: "Child element", value: formatCurrency(childElement) },
        { label: "Maximum award before deductions", value: formatCurrency(maximumAward) },
        { label: "Reduction for earnings (55% taper above your work allowance)", value: formatCurrency(-taperReduction), tone: "negative" },
        { label: "Reduction for savings/capital", value: formatCurrency(-capitalTariffIncome), tone: "negative" },
        { label: "Estimated monthly payment", value: formatCurrency(estimatedAward), emphasis: true, tone: "positive" },
      ],
      notes: [
        "This estimate does not include a housing element (which depends on your rent and the Local Housing Allowance for your area), or elements for disability, caring responsibilities, or childcare costs — all of which could increase a real award.",
        "Your actual entitlement is decided by the DWP based on your full circumstances.",
      ],
    };
  },
  assumptions: [
    "Excludes housing costs element, disability elements, carer element and childcare costs element.",
    "Assumes monthly earnings are steady and already net of tax, National Insurance and pension contributions.",
  ],
  rulesVersion: "UC rates 2025/26 (confirm current rates)",
  sources: [{ label: "Universal Credit", url: "https://www.gov.uk/universal-credit", publisher: "DWP" }],
  lastUpdated: "2026-01-15",
  relatedGuides: ["universal-credit-explained", "how-earnings-affect-universal-credit"],
  relatedServices: ["universal-credit-guidance"],
};
