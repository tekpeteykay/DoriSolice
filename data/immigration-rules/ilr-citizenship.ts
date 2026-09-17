import { SourceReference } from "@/types";

export const ILR_SOURCE: SourceReference = {
  label: "Indefinite leave to remain — GOV.UK",
  url: "https://www.gov.uk/settle-in-the-uk",
  publisher: "Home Office",
};

export const CITIZENSHIP_SOURCE: SourceReference = {
  label: "Register or apply for citizenship — GOV.UK",
  url: "https://www.gov.uk/apply-citizenship-indefinite-leave-remain",
  publisher: "Home Office",
};

export const LIFE_IN_UK_SOURCE: SourceReference = {
  label: "Life in the UK Test — GOV.UK",
  url: "https://www.gov.uk/life-in-the-uk-test",
  publisher: "Home Office",
};

export const ilrRouteQualifyingYears: Record<string, number> = {
  "skilled-worker": 5,
  "spouse-partner": 5,
  "ancestry": 5,
  "global-talent": 3,
  "innovator-founder": 3,
  "other": 5,
};

export const ilrRules = {
  maxAbsenceDaysAnyRolling12Months: 180,
  englishLanguageLevel: "B1 (or exempt, e.g. age, nationality, or a degree taught in English)",
};

export const citizenshipRules = {
  standardQualifyingPeriodAfterILRMonths: 12,
  noWaitIfMarriedToBritishCitizen: true,
  maxAbsenceDaysInQualifyingPeriod: {
    fiveYearRoute: 450,
    threeYearRoute: 270,
  },
  maxAbsenceDaysFinal12Months: 90,
};
