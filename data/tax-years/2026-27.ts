import { TaxYearRules, SourceReference } from "@/types";

// ---------------------------------------------------------------------------
// PLACEHOLDER RULE DATA — READ BEFORE UPDATING FOR PRODUCTION
//
// These figures are the most recently confirmed UK tax/NI figures available
// at development time. Government thresholds are set (and sometimes changed)
// at fiscal events, so every value below MUST be checked against the current
// GOV.UK / HMRC guidance before this site is used to advise real clients.
//
// Each value carries its own `source` and `lastReviewed` date so the whole
// rules file can be audited and refreshed independently of any UI code —
// no calculator component needs to change when these numbers are updated.
// ---------------------------------------------------------------------------

const GOV_INCOME_TAX: SourceReference = {
  label: "Income Tax rates and Personal Allowances — GOV.UK",
  url: "https://www.gov.uk/income-tax-rates",
  publisher: "GOV.UK",
};

const GOV_NI: SourceReference = {
  label: "National Insurance rates and categories — GOV.UK",
  url: "https://www.gov.uk/national-insurance-rates-letters",
  publisher: "GOV.UK",
};

const GOV_DIVIDEND: SourceReference = {
  label: "Tax on dividends — GOV.UK",
  url: "https://www.gov.uk/tax-on-dividends",
  publisher: "GOV.UK",
};

const GOV_SAVINGS: SourceReference = {
  label: "Tax on savings interest — GOV.UK",
  url: "https://www.gov.uk/apply-tax-free-interest-on-savings",
  publisher: "GOV.UK",
};

const GOV_CGT: SourceReference = {
  label: "Capital Gains Tax rates — GOV.UK",
  url: "https://www.gov.uk/capital-gains-tax/rates",
  publisher: "GOV.UK",
};

const GOV_PROPERTY: SourceReference = {
  label: "Property Income Allowance — GOV.UK",
  url: "https://www.gov.uk/renting-out-a-property/paying-tax",
  publisher: "GOV.UK",
};

const GOV_VAT: SourceReference = {
  label: "VAT rates — GOV.UK",
  url: "https://www.gov.uk/vat-rates",
  publisher: "GOV.UK",
};

const GOV_STUDENT_LOAN: SourceReference = {
  label: "Student loan repayment thresholds — GOV.UK",
  url: "https://www.gov.uk/repaying-your-student-loan/what-you-pay",
  publisher: "GOV.UK",
};

const LAST_REVIEWED = "2026-01-15";

export const taxYear2026_27: TaxYearRules = {
  taxYear: "2026/27 (provisional — confirm before go-live)",
  effectiveFrom: "2026-04-06",
  effectiveTo: "2027-04-05",
  personalAllowance: {
    name: "Personal Allowance",
    value: 12570,
    effectiveFrom: "2021-04-06",
    source: GOV_INCOME_TAX,
    lastReviewed: LAST_REVIEWED,
    notes: "Frozen since 2021/22. Confirm this has not changed at the next fiscal event.",
  },
  personalAllowanceTaperThreshold: {
    name: "Income at which Personal Allowance starts to taper (£1 lost per £2 over)",
    value: 100000,
    effectiveFrom: "2010-04-06",
    source: GOV_INCOME_TAX,
    lastReviewed: LAST_REVIEWED,
  },
  basicRateBand: {
    name: "Basic rate band (taxable income above Personal Allowance)",
    value: 37700,
    effectiveFrom: "2021-04-06",
    source: GOV_INCOME_TAX,
    lastReviewed: LAST_REVIEWED,
    notes: "Higher rate begins once total taxable income exceeds Personal Allowance + this band (£50,270 with a standard allowance).",
  },
  higherRateBand: {
    name: "Additional rate threshold (total income)",
    value: 125140,
    effectiveFrom: "2023-04-06",
    source: GOV_INCOME_TAX,
    lastReviewed: LAST_REVIEWED,
  },
  incomeTax: {
    basicRate: { name: "Basic rate", value: 0.2, effectiveFrom: "2021-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
    higherRate: { name: "Higher rate", value: 0.4, effectiveFrom: "2021-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
    additionalRate: { name: "Additional rate", value: 0.45, effectiveFrom: "2023-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
  },
  scottishIncomeTax: {
    starterRate: { name: "Scottish starter rate", value: 0.19, effectiveFrom: "2024-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
    basicRate: { name: "Scottish basic rate", value: 0.2, effectiveFrom: "2024-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
    intermediateRate: { name: "Scottish intermediate rate", value: 0.21, effectiveFrom: "2024-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
    higherRate: { name: "Scottish higher rate", value: 0.42, effectiveFrom: "2024-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
    advancedRate: { name: "Scottish advanced rate", value: 0.45, effectiveFrom: "2024-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
    topRate: { name: "Scottish top rate", value: 0.48, effectiveFrom: "2024-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
    starterBand: { name: "Scottish starter band ceiling", value: 2827, effectiveFrom: "2024-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
    basicBand: { name: "Scottish basic band ceiling", value: 14921, effectiveFrom: "2024-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
    intermediateBand: { name: "Scottish intermediate band ceiling", value: 26561, effectiveFrom: "2024-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
    higherBand: { name: "Scottish higher band ceiling", value: 43662, effectiveFrom: "2024-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
    advancedBand: { name: "Scottish advanced band ceiling (total income)", value: 125140, effectiveFrom: "2024-04-06", source: GOV_INCOME_TAX, lastReviewed: LAST_REVIEWED },
  },
  nationalInsurance: {
    primaryThreshold: { name: "Class 1 primary threshold (annual)", value: 12570, effectiveFrom: "2024-04-06", source: GOV_NI, lastReviewed: LAST_REVIEWED },
    upperEarningsLimit: { name: "Upper earnings limit (annual)", value: 50270, effectiveFrom: "2021-04-06", source: GOV_NI, lastReviewed: LAST_REVIEWED },
    class1MainRate: { name: "Class 1 employee main rate", value: 0.08, effectiveFrom: "2024-04-06", source: GOV_NI, lastReviewed: LAST_REVIEWED },
    class1UpperRate: { name: "Class 1 employee rate above UEL", value: 0.02, effectiveFrom: "2011-04-06", source: GOV_NI, lastReviewed: LAST_REVIEWED },
    class4LowerLimit: { name: "Class 4 lower profits limit", value: 12570, effectiveFrom: "2024-04-06", source: GOV_NI, lastReviewed: LAST_REVIEWED },
    class4UpperLimit: { name: "Class 4 upper profits limit", value: 50270, effectiveFrom: "2021-04-06", source: GOV_NI, lastReviewed: LAST_REVIEWED },
    class4MainRate: { name: "Class 4 main rate", value: 0.06, effectiveFrom: "2024-04-06", source: GOV_NI, lastReviewed: LAST_REVIEWED },
    class4UpperRate: { name: "Class 4 rate above upper limit", value: 0.02, effectiveFrom: "2011-04-06", source: GOV_NI, lastReviewed: LAST_REVIEWED },
  },
  dividendAllowance: { name: "Dividend allowance", value: 500, effectiveFrom: "2024-04-06", source: GOV_DIVIDEND, lastReviewed: LAST_REVIEWED },
  dividendTax: {
    basicRate: { name: "Dividend basic rate", value: 0.0875, effectiveFrom: "2022-04-06", source: GOV_DIVIDEND, lastReviewed: LAST_REVIEWED },
    higherRate: { name: "Dividend higher rate", value: 0.3375, effectiveFrom: "2022-04-06", source: GOV_DIVIDEND, lastReviewed: LAST_REVIEWED },
    additionalRate: { name: "Dividend additional rate", value: 0.3935, effectiveFrom: "2022-04-06", source: GOV_DIVIDEND, lastReviewed: LAST_REVIEWED },
  },
  personalSavingsAllowanceBasic: { name: "Personal savings allowance (basic rate)", value: 1000, effectiveFrom: "2016-04-06", source: GOV_SAVINGS, lastReviewed: LAST_REVIEWED },
  personalSavingsAllowanceHigher: { name: "Personal savings allowance (higher rate)", value: 500, effectiveFrom: "2016-04-06", source: GOV_SAVINGS, lastReviewed: LAST_REVIEWED },
  capitalGains: {
    annualExemptAmount: { name: "CGT annual exempt amount", value: 3000, effectiveFrom: "2024-04-06", source: GOV_CGT, lastReviewed: LAST_REVIEWED },
    residentialBasicRate: { name: "CGT residential property, basic rate", value: 0.18, effectiveFrom: "2024-10-30", source: GOV_CGT, lastReviewed: LAST_REVIEWED },
    residentialHigherRate: { name: "CGT residential property, higher rate", value: 0.24, effectiveFrom: "2024-10-30", source: GOV_CGT, lastReviewed: LAST_REVIEWED },
    otherAssetsBasicRate: { name: "CGT other chargeable assets, basic rate", value: 0.18, effectiveFrom: "2024-10-30", source: GOV_CGT, lastReviewed: LAST_REVIEWED },
    otherAssetsHigherRate: { name: "CGT other chargeable assets, higher rate", value: 0.24, effectiveFrom: "2024-10-30", source: GOV_CGT, lastReviewed: LAST_REVIEWED },
  },
  propertyIncomeAllowance: { name: "Property income allowance", value: 1000, effectiveFrom: "2017-04-06", source: GOV_PROPERTY, lastReviewed: LAST_REVIEWED },
  vatStandardRate: { name: "VAT standard rate", value: 0.2, effectiveFrom: "2011-01-04", source: GOV_VAT, lastReviewed: LAST_REVIEWED },
  vatReducedRate: { name: "VAT reduced rate", value: 0.05, effectiveFrom: "1997-09-01", source: GOV_VAT, lastReviewed: LAST_REVIEWED },
  studentLoan: {
    plan1Threshold: { name: "Plan 1 threshold (annual)", value: 26065, effectiveFrom: "2025-04-06", source: GOV_STUDENT_LOAN, lastReviewed: LAST_REVIEWED },
    plan2Threshold: { name: "Plan 2 threshold (annual)", value: 28470, effectiveFrom: "2025-04-06", source: GOV_STUDENT_LOAN, lastReviewed: LAST_REVIEWED },
    plan4Threshold: { name: "Plan 4 threshold (annual, Scotland)", value: 32745, effectiveFrom: "2025-04-06", source: GOV_STUDENT_LOAN, lastReviewed: LAST_REVIEWED },
    plan5Threshold: { name: "Plan 5 threshold (annual)", value: 25000, effectiveFrom: "2023-08-01", source: GOV_STUDENT_LOAN, lastReviewed: LAST_REVIEWED },
    postgradThreshold: { name: "Postgraduate loan threshold (annual)", value: 21000, effectiveFrom: "2016-08-01", source: GOV_STUDENT_LOAN, lastReviewed: LAST_REVIEWED },
    plan1Rate: { name: "Plan 1/4/5 repayment rate", value: 0.09, effectiveFrom: "2016-04-06", source: GOV_STUDENT_LOAN, lastReviewed: LAST_REVIEWED },
    plan2Rate: { name: "Plan 2 repayment rate", value: 0.09, effectiveFrom: "2016-04-06", source: GOV_STUDENT_LOAN, lastReviewed: LAST_REVIEWED },
    postgradRate: { name: "Postgraduate loan repayment rate", value: 0.06, effectiveFrom: "2016-08-01", source: GOV_STUDENT_LOAN, lastReviewed: LAST_REVIEWED },
  },
};

export const availableTaxYears: TaxYearRules[] = [taxYear2026_27];

export function getTaxYear(taxYear?: string): TaxYearRules {
  return availableTaxYears.find((t) => t.taxYear === taxYear) ?? taxYear2026_27;
}
