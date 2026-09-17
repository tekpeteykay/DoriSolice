import { RuleValue, SourceReference } from "@/types";

// ---------------------------------------------------------------------------
// PLACEHOLDER RULE DATA — DWP benefit rates change every April. Verify all
// figures against the current GOV.UK benefit rates table before production
// use. Universal Credit in particular depends on many personal
// circumstances beyond what a simple calculator can capture.
// ---------------------------------------------------------------------------

const UC_SOURCE: SourceReference = {
  label: "Universal Credit and benefit rates — GOV.UK",
  url: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2025-to-2026",
  publisher: "DWP",
};

const LAST_REVIEWED = "2026-01-15";

export const universalCreditRates = {
  standardAllowance: {
    singleUnder25: { name: "UC standard allowance — single, under 25 (monthly)", value: 316.98, effectiveFrom: "2025-04-07", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
    single25Plus: { name: "UC standard allowance — single, 25 or over (monthly)", value: 400.14, effectiveFrom: "2025-04-07", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
    coupleBothUnder25: { name: "UC standard allowance — couple, both under 25 (monthly)", value: 497.55, effectiveFrom: "2025-04-07", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
    coupleOne25Plus: { name: "UC standard allowance — couple, one or both 25+ (monthly)", value: 628.10, effectiveFrom: "2025-04-07", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  },
  childElement: {
    firstChild: { name: "Child element — first child (born before 6 Apr 2017) (monthly)", value: 339.00, effectiveFrom: "2025-04-07", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
    additionalChild: { name: "Child element — second/subsequent child (monthly)", value: 292.81, effectiveFrom: "2025-04-07", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  },
  workAllowance: {
    higher: { name: "Work allowance — no housing element included (monthly)", value: 673, effectiveFrom: "2025-04-07", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
    lower: { name: "Work allowance — housing element included (monthly)", value: 404, effectiveFrom: "2025-04-07", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  },
  taperRate: { name: "Universal Credit taper rate", value: 0.55, effectiveFrom: "2023-04-01", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  savingsLowerLimit: { name: "Capital lower limit (no effect below this)", value: 6000, effectiveFrom: "2013-04-29", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  savingsUpperLimit: { name: "Capital upper limit (not normally eligible above this)", value: 16000, effectiveFrom: "2013-04-29", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
};

export const childBenefitRates = {
  eldestChild: { name: "Child Benefit — eldest or only child (weekly)", value: 26.05, effectiveFrom: "2025-04-07", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  additionalChild: { name: "Child Benefit — each additional child (weekly)", value: 17.25, effectiveFrom: "2025-04-07", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  highIncomeChargeThreshold: { name: "High Income Child Benefit Charge — income threshold", value: 60000, effectiveFrom: "2024-04-06", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  highIncomeChargeTaperTop: { name: "High Income Child Benefit Charge — fully tapered away above", value: 80000, effectiveFrom: "2024-04-06", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
};

export const statutoryPayRates = {
  statutorySickPayWeekly: { name: "Statutory Sick Pay (weekly)", value: 118.75, effectiveFrom: "2025-04-06", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  statutoryMaternityPayWeeklyStandard: { name: "Statutory Maternity/Paternity/Adoption/Shared Parental Pay — standard weekly rate", value: 187.18, effectiveFrom: "2025-04-06", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  statutoryMaternityPayEarningsPercentage: { name: "SMP first 6 weeks — % of average weekly earnings", value: 0.9, effectiveFrom: "2003-04-06", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  lowerEarningsLimit: { name: "Lower earnings limit for statutory payments (weekly)", value: 125, effectiveFrom: "2025-04-06", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
};

export const carersAllowanceRates = {
  weeklyRate: { name: "Carer's Allowance (weekly)", value: 83.30, effectiveFrom: "2025-04-07", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  earningsLimitWeekly: { name: "Carer's Allowance earnings limit (weekly, after allowable deductions)", value: 196, effectiveFrom: "2025-04-07", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
  minimumCaringHoursWeekly: { name: "Minimum hours of care provided per week", value: 35, effectiveFrom: "1976-01-01", source: UC_SOURCE, lastReviewed: LAST_REVIEWED } as RuleValue,
};
