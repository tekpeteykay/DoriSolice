import { RuleValue, SourceReference } from "@/types";

// ---------------------------------------------------------------------------
// PLACEHOLDER RULE DATA — verify against current Home Office guidance before
// this calculator is relied upon by real clients. Immigration financial
// requirements have changed several times in recent years; this file is the
// single place to update them.
// ---------------------------------------------------------------------------

const IMMIGRATION_RULES_SOURCE: SourceReference = {
  label: "Family visas: Appendix FM — Immigration Rules — GOV.UK",
  url: "https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-fm-financial-requirement",
  publisher: "Home Office",
};

const LAST_REVIEWED = "2026-01-15";

export const spouseVisaRules = {
  minimumIncomeRequirement: {
    name: "Minimum income requirement (sponsor, no dependent children)",
    value: 29000,
    effectiveFrom: "2024-04-11",
    source: IMMIGRATION_RULES_SOURCE,
    lastReviewed: LAST_REVIEWED,
    notes:
      "Raised from £18,600 on 11 April 2024. Further planned increases (to £34,500 and then £38,700) were paused pending review — confirm the current figure before relying on this tool.",
  } as RuleValue,
  cashSavingsThreshold: {
    name: "Cash savings disregarded before the savings formula applies",
    value: 16000,
    effectiveFrom: "2012-07-09",
    source: IMMIGRATION_RULES_SOURCE,
    lastReviewed: LAST_REVIEWED,
  } as RuleValue,
  savingsMultiplier: {
    name: "Multiplier applied to savings above the disregarded threshold",
    value: 2.5,
    effectiveFrom: "2012-07-09",
    source: IMMIGRATION_RULES_SOURCE,
    lastReviewed: LAST_REVIEWED,
    notes: "Reflects a 2.5 year (30 month) route to settlement.",
  } as RuleValue,
  minimumEvidencePeriodEmploymentMonths: {
    name: "Minimum period of employment income evidence (salaried, same job)",
    value: 6,
    effectiveFrom: "2012-07-09",
    source: IMMIGRATION_RULES_SOURCE,
    lastReviewed: LAST_REVIEWED,
  } as RuleValue,
  minimumEvidencePeriodSelfEmploymentYears: {
    name: "Minimum period of self-employment income evidence",
    value: 1,
    effectiveFrom: "2012-07-09",
    source: IMMIGRATION_RULES_SOURCE,
    lastReviewed: LAST_REVIEWED,
    notes: "Typically the latest full financial year, via a full tax year's self-assessment.",
  } as RuleValue,
};

export const spouseVisaIncomeSources = [
  { value: "employment-uk", label: "Sponsor's employment income (UK-based job)" },
  { value: "self-employment", label: "Sponsor's self-employment / director income" },
  { value: "non-employment", label: "Non-employment income (e.g. rental, pension, dividends)" },
  { value: "applicant-employment", label: "Applicant's income from permitted UK employment" },
  { value: "savings", label: "Cash savings (held for at least 6 months)" },
] as const;

export const spouseVisaEvidenceByCategory: Record<string, string[]> = {
  "employment-uk": [
    "6 months of payslips (if in current job 6+ months) or all payslips since starting",
    "Personal bank statements showing salary being paid in, matching payslips",
    "A letter from the employer confirming role, salary, and length of employment",
    "P60 for the most recent tax year, where applicable",
  ],
  "self-employment": [
    "SA302 (or HMRC tax year overview) for the last full tax year",
    "Company or business bank statements for the same period",
    "Annual self-assessment tax return (or company accounts if a director)",
    "Proof of registration with HMRC or Companies House",
  ],
  "non-employment": [
    "Evidence of the source of the income (e.g. tenancy agreement and rent statements, pension award letter, dividend vouchers)",
    "Bank statements showing receipt of the income for at least the last 12 months",
  ],
  "applicant-employment": [
    "Evidence the applicant has permission to work in the UK (e.g. current visa conditions)",
    "Payslips and bank statements covering the same period as the sponsor's evidence",
    "A letter from the employer confirming role, salary and start date",
  ],
  savings: [
    "Bank or building society statements showing the savings held for at least the 6 months before applying",
    "Evidence the funds are held in cash and are readily available (not, for example, tied up in a pension)",
    "If money was received recently (e.g. inheritance, property sale), evidence of where it came from",
  ],
};
