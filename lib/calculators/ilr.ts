import { CalculatorDefinition } from "@/types";
import { ilrRouteQualifyingYears, ilrRules } from "@/data/immigration-rules/ilr-citizenship";

export const ilrCalculator: CalculatorDefinition = {
  id: "ilr-eligibility",
  slug: "immigration/ilr",
  category: "immigration",
  title: "ILR / Settlement Eligibility Checker",
  shortDescription: "A quick indicative check of where you may stand for Indefinite Leave to Remain.",
  description:
    "Indefinite Leave to Remain (settlement) has route-specific qualifying periods and detailed rules on absences, English language and 'good character'. This questionnaire gives an indicative starting point only — it is not a substitute for a full review of your case.",
  questions: [
    {
      id: "route",
      type: "select",
      label: "Which immigration route are you on (or were you granted permission under)?",
      options: [
        { value: "skilled-worker", label: "Skilled Worker (5 years)" },
        { value: "spouse-partner", label: "Spouse/Partner visa (5 years)" },
        { value: "ancestry", label: "UK Ancestry visa (5 years)" },
        { value: "global-talent", label: "Global Talent (3 years, for most)" },
        { value: "innovator-founder", label: "Innovator Founder (3 years)" },
        { value: "other", label: "Other / not sure" },
      ],
      required: true,
    },
    {
      id: "startDate",
      type: "date",
      label: "When were you granted permission to stay on this route?",
      required: true,
    },
    {
      id: "excessiveAbsences",
      type: "yesno",
      label: "Have you been outside the UK for more than 180 days in any single 12-month period during this time?",
      defaultValue: false,
    },
    {
      id: "meetsEnglish",
      type: "yesno",
      label: "Do you meet the English language requirement (or are you exempt)?",
      defaultValue: true,
    },
    {
      id: "passedLifeInUk",
      type: "yesno",
      label: "Have you passed the Life in the UK test (or are you exempt)?",
      defaultValue: true,
    },
  ],
  calculate: (answers) => {
    const route = String(answers.route || "other");
    const startDate = answers.startDate ? new Date(String(answers.startDate)) : null;
    const excessiveAbsences = Boolean(answers.excessiveAbsences);
    const meetsEnglish = Boolean(answers.meetsEnglish);
    const passedLifeInUk = Boolean(answers.passedLifeInUk);

    const requiredYears = ilrRouteQualifyingYears[route] ?? 5;
    const yearsElapsed = startDate ? (Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25) : 0;
    const meetsResidencePeriod = yearsElapsed >= requiredYears;

    let eligibility: "eligible" | "not-eligible" | "review" = "review";
    let headlineLabel = "Professional review recommended";

    if (!meetsResidencePeriod) {
      eligibility = "not-eligible";
      headlineLabel = "Not yet eligible based on the information entered";
    } else if (meetsResidencePeriod && !excessiveAbsences && meetsEnglish && passedLifeInUk) {
      eligibility = "eligible";
      headlineLabel = "Potentially eligible";
    } else if (excessiveAbsences || !meetsEnglish || !passedLifeInUk) {
      eligibility = "review";
      headlineLabel = "Professional review recommended";
    }

    const yearsRemaining = Math.max(0, requiredYears - yearsElapsed);

    return {
      headline: { label: headlineLabel, value: `${requiredYears}-year route` },
      eligibility,
      lines: [
        { label: "Qualifying period for this route", value: `${requiredYears} years` },
        { label: "Time elapsed since permission was granted", value: `${yearsElapsed.toFixed(1)} years` },
        meetsResidencePeriod
          ? { label: "Residence requirement", value: "Appears to be met", tone: "positive" }
          : { label: "Time remaining until the qualifying period ends", value: `${yearsRemaining.toFixed(1)} years`, tone: "negative" },
        { label: "Absences flagged as a possible issue", value: excessiveAbsences ? "Yes — review recommended" : "No", tone: excessiveAbsences ? "negative" : "positive" },
        { label: "English language requirement", value: meetsEnglish ? "Met / exempt" : "Not yet met", tone: meetsEnglish ? "positive" : "negative" },
        { label: "Life in the UK test", value: passedLifeInUk ? "Passed / exempt" : "Not yet passed", tone: passedLifeInUk ? "positive" : "negative" },
      ],
      notes: [
        `Absences are capped at no more than ${ilrRules.maxAbsenceDaysAnyRolling12Months} days in any rolling 12-month period for most routes — the exact rule and any discretion available can depend on your specific route.`,
        "This tool does not assess 'good character' (including any criminal record or immigration history issues), which is a separate requirement for settlement.",
      ],
    };
  },
  assumptions: [
    "Assumes continuous permission on the same route for the full qualifying period, with no gaps.",
    "Does not check suitability/good character requirements in detail.",
  ],
  rulesVersion: "ILR qualifying periods — reviewed 2026-01-15",
  sources: [{ label: "Settle in the UK", url: "https://www.gov.uk/settle-in-the-uk", publisher: "Home Office" }],
  lastUpdated: "2026-01-15",
  relatedGuides: ["what-is-ilr", "ilr-vs-citizenship"],
  relatedServices: ["ilr-settlement"],
};
