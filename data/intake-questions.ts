import { CalculatorQuestionDef, AppointmentServiceArea } from "@/types";

// Progressive, service-specific intake questions shown after booking, so we
// arrive at the appointment already understanding the basics of the case.
// Kept intentionally short — see spec section 23: never a 50-question form.

export const intakeQuestionsByService: Record<AppointmentServiceArea, CalculatorQuestionDef[]> = {
  immigration: [
    {
      id: "applicationType",
      type: "select",
      label: "What type of application is this about?",
      options: [
        { value: "spouse-partner", label: "Spouse / Partner visa" },
        { value: "skilled-worker", label: "Skilled Worker visa" },
        { value: "student", label: "Student visa" },
        { value: "ilr", label: "Indefinite Leave to Remain" },
        { value: "citizenship", label: "British citizenship" },
        { value: "other", label: "Something else" },
      ],
      required: true,
    },
    { id: "currentStatus", type: "text", label: "What is your current immigration status or visa type?", placeholder: "e.g. Student visa, Skilled Worker visa, no current visa" },
    { id: "expiryDate", type: "date", label: "When does your current visa expire (if applicable)?" },
    { id: "keyDates", type: "text", label: "Any key dates we should know about? (e.g. course start date, wedding date, application deadline)" },
  ],
  tax: [
    {
      id: "taxTopic",
      type: "select",
      label: "What's this mainly about?",
      options: [
        { value: "hmrc-letter", label: "An HMRC letter or enquiry" },
        { value: "refund", label: "A possible tax refund" },
        { value: "self-assessment", label: "Self Assessment / self-employment" },
        { value: "tax-code", label: "A tax code query" },
        { value: "other", label: "Something else" },
      ],
      required: true,
    },
    { id: "employmentStatus", type: "select", label: "Are you employed, self-employed, or both?", options: [{ value: "employed", label: "Employed" }, { value: "self-employed", label: "Self-employed" }, { value: "both", label: "Both" }, { value: "neither", label: "Neither currently" }] },
    { id: "taxYear", type: "text", label: "Which tax year does this relate to?", placeholder: "e.g. 2025/26" },
  ],
  benefits: [
    { id: "household", type: "select", label: "Are you claiming as a single person or a couple?", options: [{ value: "single", label: "Single" }, { value: "couple", label: "Couple" }] },
    { id: "hasChildren", type: "yesno", label: "Do you have any dependent children?" },
    { id: "existingClaim", type: "yesno", label: "Do you already have an existing benefits claim?" },
    { id: "issue", type: "text", label: "In a sentence, what's the main issue?" },
  ],
  employment: [
    { id: "employmentIssue", type: "select", label: "What's this about?", options: [{ value: "pay", label: "Pay or holiday pay" }, { value: "dismissal", label: "Dismissal or redundancy" }, { value: "contract", label: "A contract question" }, { value: "other", label: "Something else" }] },
    { id: "stillEmployed", type: "yesno", label: "Are you still employed by this employer?" },
  ],
  general: [
    { id: "topic", type: "text", label: "In a sentence or two, what would you like help with?" },
  ],
};
