import { RuleValue, SourceReference } from "@/types";

const SW_SOURCE: SourceReference = {
  label: "Skilled Worker visa: knowledge of English and salary requirements — GOV.UK",
  url: "https://www.gov.uk/skilled-worker-visa/knowledge-of-english-and-salary-requirements",
  publisher: "Home Office",
};

const LAST_REVIEWED = "2026-01-15";

export const skilledWorkerRules = {
  generalSalaryThreshold: {
    name: "General salary threshold (most occupations)",
    value: 38700,
    effectiveFrom: "2024-04-04",
    source: SW_SOURCE,
    lastReviewed: LAST_REVIEWED,
    notes: "The higher of this threshold or the specific 'going rate' for the occupation's SOC code normally applies.",
  } as RuleValue,
  newEntrantDiscountRate: {
    name: "Reduced threshold for eligible 'new entrants' (percentage of standard rate)",
    value: 0.7,
    effectiveFrom: "2024-04-04",
    source: SW_SOURCE,
    lastReviewed: LAST_REVIEWED,
    notes: "Applies to workers under 26, recent graduates, those in professional training, or moving from certain other visa categories.",
  } as RuleValue,
  healthAndCareVisaThreshold: {
    name: "Health and Care Worker visa salary threshold (illustrative)",
    value: 25000,
    effectiveFrom: "2024-04-04",
    source: SW_SOURCE,
    lastReviewed: LAST_REVIEWED,
    notes: "Health and care roles are assessed under separate, generally lower, thresholds — confirm the current figure for the specific role.",
  } as RuleValue,
  immigrationHealthSurchargePerYear: {
    name: "Immigration Health Surcharge (per year of visa, standard rate)",
    value: 1035,
    effectiveFrom: "2024-02-06",
    source: {
      label: "Pay for UK healthcare as part of your immigration application — GOV.UK",
      url: "https://www.gov.uk/healthcare-immigration-application",
      publisher: "Home Office",
    },
    lastReviewed: LAST_REVIEWED,
  } as RuleValue,
};
