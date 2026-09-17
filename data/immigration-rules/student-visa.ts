import { RuleValue, SourceReference } from "@/types";

const STUDENT_SOURCE: SourceReference = {
  label: "Student visa: money (funds) you need — GOV.UK",
  url: "https://www.gov.uk/student-visa/money",
  publisher: "Home Office",
};

const LAST_REVIEWED = "2026-01-15";

export const studentVisaRules = {
  monthlyFundsLondon: { name: "Required funds per month — studying in London", value: 1334, effectiveFrom: "2020-10-05", source: STUDENT_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  monthlyFundsOutsideLondon: { name: "Required funds per month — studying outside London", value: 1023, effectiveFrom: "2020-10-05", source: STUDENT_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  dependantMonthlyFundsLondon: { name: "Required funds per month, per dependant — London", value: 845, effectiveFrom: "2020-10-05", source: STUDENT_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  dependantMonthlyFundsOutsideLondon: { name: "Required funds per month, per dependant — outside London", value: 680, effectiveFrom: "2020-10-05", source: STUDENT_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  maxMonthsCapped: { name: "Maximum number of months of funds required", value: 9, effectiveFrom: "2020-10-05", source: STUDENT_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  fundsHeldForDays: { name: "Minimum number of days funds must be held before applying", value: 28, effectiveFrom: "2020-10-05", source: STUDENT_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
};
