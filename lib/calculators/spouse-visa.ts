import { CalculatorDefinition } from "@/types";
import { spouseVisaRules, spouseVisaEvidenceByCategory } from "@/data/immigration-rules/spouse-visa";
import { formatCurrency } from "@/lib/utils";

export const spouseVisaCalculator: CalculatorDefinition = {
  id: "spouse-visa-financial-requirement",
  slug: "immigration/spouse-visa",
  category: "immigration",
  title: "Spouse & Partner Visa Financial Requirement Calculator",
  shortDescription: "Estimate whether your income (and savings, if needed) may meet the financial requirement.",
  description:
    "The UK family visa financial requirement can be met through several income categories, or through cash savings. This tool combines the figures you enter to give an estimate of where you stand — it cannot determine eligibility on its own, since evidence, timing and combinations of categories all matter.",
  popular: true,
  questions: [
    {
      id: "sponsorEmploymentIncome",
      type: "currency",
      label: "Sponsor's annual income from UK employment",
      help: "Gross annual salary from a job in the UK, based on your current rate of pay.",
      defaultValue: 0,
    },
    {
      id: "sponsorSelfEmploymentIncome",
      type: "currency",
      label: "Sponsor's annual income from self-employment or a directorship",
      help: "Usually averaged or taken from the latest full financial year — a solicitor can advise on which method suits your evidence.",
      defaultValue: 0,
    },
    {
      id: "nonEmploymentIncome",
      type: "currency",
      label: "Other non-employment income (rental, pension, dividends, etc.)",
      defaultValue: 0,
    },
    {
      id: "applicantEmploymentIncome",
      type: "currency",
      label: "Applicant's income from permitted UK employment (if applicable)",
      help: "Only include this if the applicant is already in the UK with permission to work.",
      defaultValue: 0,
    },
    {
      id: "savings",
      type: "currency",
      label: "Cash savings held (by either of you) for at least 6 months",
      defaultValue: 0,
    },
  ],
  calculate: (answers) => {
    const sponsorEmployment = Number(answers.sponsorEmploymentIncome) || 0;
    const sponsorSelfEmployment = Number(answers.sponsorSelfEmploymentIncome) || 0;
    const nonEmployment = Number(answers.nonEmploymentIncome) || 0;
    const applicantEmployment = Number(answers.applicantEmploymentIncome) || 0;
    const savings = Number(answers.savings) || 0;

    const totalIncome = sponsorEmployment + sponsorSelfEmployment + nonEmployment + applicantEmployment;
    const requirement = spouseVisaRules.minimumIncomeRequirement.value;
    const shortfall = Math.max(0, requirement - totalIncome);

    const savingsNeededForShortfall =
      shortfall > 0 ? spouseVisaRules.cashSavingsThreshold.value + shortfall * spouseVisaRules.savingsMultiplier.value : 0;

    const meetsViaIncomeAlone = totalIncome >= requirement;
    const meetsWithSavings = !meetsViaIncomeAlone && savings >= savingsNeededForShortfall && shortfall > 0;
    const eligible = meetsViaIncomeAlone || meetsWithSavings;

    const categoriesUsed: string[] = [];
    if (sponsorEmployment > 0) categoriesUsed.push("employment-uk");
    if (sponsorSelfEmployment > 0) categoriesUsed.push("self-employment");
    if (nonEmployment > 0) categoriesUsed.push("non-employment");
    if (applicantEmployment > 0) categoriesUsed.push("applicant-employment");
    if (savings > 0 && shortfall > 0) categoriesUsed.push("savings");

    const evidenceNotes = categoriesUsed.flatMap((cat) => spouseVisaEvidenceByCategory[cat] ?? []);

    return {
      headline: {
        label: eligible ? "Estimated: requirement may be met" : "Estimated: requirement may not yet be met",
        value: eligible ? "Looks achievable" : `Shortfall of ${formatCurrency(shortfall)}`,
      },
      eligibility: eligible ? "eligible" : shortfall > 0 && savings > 0 ? "review" : "not-eligible",
      lines: [
        { label: "Total qualifying income entered", value: formatCurrency(totalIncome) },
        { label: "Minimum income requirement", value: formatCurrency(requirement) },
        { label: "Income shortfall", value: formatCurrency(shortfall), tone: shortfall > 0 ? "negative" : "positive" },
        {
          label: "Savings needed to bridge the gap (if relying on savings)",
          value: shortfall > 0 ? formatCurrency(savingsNeededForShortfall) : "Not needed — income alone may be enough",
        },
        { label: "Savings you entered", value: formatCurrency(savings) },
        {
          label: "Result",
          value: meetsViaIncomeAlone
            ? "Income alone may meet the requirement"
            : meetsWithSavings
            ? "Combined income and savings may meet the requirement"
            : "On these figures, the requirement may not be met",
          emphasis: true,
          tone: eligible ? "positive" : "negative",
        },
      ],
      notes: [
        "Immigration Rules on combining income categories are detailed — for example, income from self-employment is usually assessed differently from salaried employment, and some category combinations are not permitted. This tool adds figures together for illustration only.",
        "Evidence you may need based on what you entered:",
        ...evidenceNotes.map((e) => `• ${e}`),
      ],
    };
  },
  assumptions: [
    "Assumes the sponsor is not claiming under the separate 'exceptional circumstances' or fee waiver provisions.",
    "Assumes no dependent children are included in the application — the income requirement is higher where children are included.",
    "Does not check timing, evidential format, or whether categories can lawfully be combined in your circumstances.",
  ],
  rulesVersion: "Appendix FM financial requirement — reviewed 2026-01-15",
  sources: [
    {
      label: "Family visas: Appendix FM — financial requirement",
      url: "https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-fm-financial-requirement",
      publisher: "Home Office",
    },
  ],
  lastUpdated: "2026-01-15",
  relatedGuides: ["spouse-visa-income-requirement", "uk-spouse-visa-explained"],
  relatedServices: ["spouse-partner-visa"],
};
