// ---------------------------------------------------------------------------
// Dori Solic — core data models.
//
// These types describe the shape of content and business data across the
// platform. They are intentionally framework-agnostic: the same shapes could
// be read from local data files (as they are today) or from a database such
// as Supabase in future without changing components that consume them.
// ---------------------------------------------------------------------------

export type ContentCategory =
  | "immigration"
  | "tax"
  | "benefits"
  | "employment"
  | "family"
  | "business"
  | "housing"
  | "citizenship"
  | "legal-rights"
  | "money"
  | "life-in-the-uk";

export interface SourceReference {
  label: string;
  url: string;
  publisher: "GOV.UK" | "HMRC" | "Home Office" | "DWP" | "UK Parliament" | "Other";
}

export interface Guide {
  slug: string;
  category: ContentCategory;
  title: string;
  summary: string;
  readTimeMinutes: number;
  lastReviewed: string; // ISO date
  reviewer?: string;
  needsReview?: boolean;
  body: GuideSection[];
  relatedCalculators?: string[]; // calculator ids
  relatedServices?: string[]; // service slugs
  relatedGuides?: string[]; // guide slugs
  sources: SourceReference[];
  seoDescription: string;
}

export type GuideSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; tone: "info" | "warning"; text: string };

export interface FAQ {
  id: string;
  category: ContentCategory | "general";
  question: string;
  answer: string;
  relatedCalculator?: string;
  relatedGuide?: string;
}

export interface ServiceItem {
  slug: string;
  category: "immigration" | "tax" | "benefits" | "general";
  title: string;
  shortDescription: string;
  problemStatement: string;
  whoItsFor: string[];
  whatWeHelpWith: string[];
  process: { step: string; description: string }[];
  documentsNeeded: string[];
  typicalQuestions: { question: string; answer: string }[];
  relatedCalculators?: string[];
  relatedGuides?: string[];
}

// ---------------------------------------------------------------------------
// Calculator engine types
// ---------------------------------------------------------------------------

export type QuestionType =
  | "currency"
  | "percentage"
  | "number"
  | "date"
  | "select"
  | "radio"
  | "checkbox"
  | "yesno"
  | "text";

export interface QuestionOption {
  value: string;
  label: string;
  hint?: string;
}

export interface CalculatorQuestionDef {
  id: string;
  type: QuestionType;
  label: string;
  help?: string;
  placeholder?: string;
  options?: QuestionOption[];
  defaultValue?: string | number | boolean;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  /** Show this question only if the predicate over prior answers returns true. */
  showIf?: (answers: Record<string, any>) => boolean;
  required?: boolean;
}

export interface CalculatorResultLine {
  label: string;
  value: number | string;
  emphasis?: boolean;
  tone?: "default" | "positive" | "negative";
  help?: string;
}

export interface CalculatorResult {
  headline: { label: string; value: string };
  lines: CalculatorResultLine[];
  notes?: string[];
  eligibility?: "eligible" | "not-eligible" | "review" | "unknown";
}

export interface CalculatorDefinition {
  id: string;
  slug: string; // e.g. tax/income-tax
  category:
    | "tax"
    | "salary"
    | "self-employment"
    | "benefits"
    | "immigration"
    | "employment"
    | "business"
    | "property"
    | "other";
  title: string;
  shortDescription: string;
  description: string;
  icon?: string;
  questions: CalculatorQuestionDef[];
  calculate: (answers: Record<string, any>) => CalculatorResult;
  assumptions: string[];
  rulesVersion: string;
  sources: SourceReference[];
  lastUpdated: string;
  relatedGuides?: string[];
  relatedServices?: string[];
  popular?: boolean;
}

// ---------------------------------------------------------------------------
// Rules / versioned data
// ---------------------------------------------------------------------------

export interface RuleValue<T = number> {
  name: string;
  value: T;
  effectiveFrom: string;
  effectiveTo?: string;
  source: SourceReference;
  lastReviewed: string;
  notes?: string;
}

export interface TaxYearRules {
  taxYear: string; // "2026/27"
  effectiveFrom: string;
  effectiveTo: string;
  personalAllowance: RuleValue;
  personalAllowanceTaperThreshold: RuleValue;
  basicRateBand: RuleValue;
  higherRateBand: RuleValue;
  incomeTax: {
    basicRate: RuleValue;
    higherRate: RuleValue;
    additionalRate: RuleValue;
  };
  scottishIncomeTax?: {
    starterRate: RuleValue;
    basicRate: RuleValue;
    intermediateRate: RuleValue;
    higherRate: RuleValue;
    advancedRate: RuleValue;
    topRate: RuleValue;
    starterBand: RuleValue;
    basicBand: RuleValue;
    intermediateBand: RuleValue;
    higherBand: RuleValue;
    advancedBand: RuleValue;
  };
  nationalInsurance: {
    primaryThreshold: RuleValue;
    upperEarningsLimit: RuleValue;
    class1MainRate: RuleValue;
    class1UpperRate: RuleValue;
    class4LowerLimit: RuleValue;
    class4UpperLimit: RuleValue;
    class4MainRate: RuleValue;
    class4UpperRate: RuleValue;
  };
  dividendAllowance: RuleValue;
  dividendTax: {
    basicRate: RuleValue;
    higherRate: RuleValue;
    additionalRate: RuleValue;
  };
  personalSavingsAllowanceBasic: RuleValue;
  personalSavingsAllowanceHigher: RuleValue;
  capitalGains: {
    annualExemptAmount: RuleValue;
    residentialBasicRate: RuleValue;
    residentialHigherRate: RuleValue;
    otherAssetsBasicRate: RuleValue;
    otherAssetsHigherRate: RuleValue;
  };
  propertyIncomeAllowance: RuleValue;
  vatStandardRate: RuleValue;
  vatReducedRate: RuleValue;
  studentLoan: {
    plan1Threshold: RuleValue;
    plan2Threshold: RuleValue;
    plan4Threshold: RuleValue;
    plan5Threshold: RuleValue;
    postgradThreshold: RuleValue;
    plan1Rate: RuleValue;
    plan2Rate: RuleValue;
    postgradRate: RuleValue;
  };
}

// ---------------------------------------------------------------------------
// Appointment booking
// ---------------------------------------------------------------------------

export type AppointmentServiceArea =
  | "immigration"
  | "tax"
  | "benefits"
  | "employment"
  | "general";

export interface AppointmentTypeDef {
  id: string;
  label: string;
  durationMinutes: number;
  description: string;
  priceLabel: string;
}

export interface AppointmentSlot {
  date: string; // ISO date
  time: string; // "10:00"
}

export interface AppointmentBookingDraft {
  serviceArea?: AppointmentServiceArea;
  appointmentTypeId?: string;
  slot?: AppointmentSlot;
  name?: string;
  email?: string;
  phone?: string;
  matterDescription?: string;
  preferredContactMethod?: "email" | "phone";
  marketingConsent?: boolean;
}

export interface Appointment extends Required<Omit<AppointmentBookingDraft, "marketingConsent">> {
  id: string;
  createdAt: string;
  marketingConsent: boolean;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

export interface Enquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
  status: "new" | "in-progress" | "resolved";
}

export interface SiteUpdate {
  slug: string;
  title: string;
  category: ContentCategory;
  summary: string;
  published: string;
  lastReviewed: string;
  appliesFrom: string;
  body: string;
  /** Optional CMS-uploaded image — falls back to lib/update-images.ts when unset. */
  imageUrl?: string;
}

export interface DocumentChecklistItem {
  id: string;
  label: string;
  showIf?: (answers: Record<string, any>) => boolean;
}

export interface SearchIndexItem {
  type: "guide" | "calculator" | "service" | "faq" | "immigration-route";
  title: string;
  description: string;
  url: string;
  tags: string[];
}
