export interface JourneyResult {
  headline: string;
  description: string;
  guideHref?: string;
  calculatorHref?: string;
  serviceHref?: string;
}

export interface JourneyOption {
  label: string;
  next: string; // node id, or "RESULT"
  result?: JourneyResult;
}

export interface JourneyNode {
  id: string;
  question: string;
  options: JourneyOption[];
}

export const journeyNodes: Record<string, JourneyNode> = {
  start: {
    id: "start",
    question: "What do you need help with?",
    options: [
      { label: "Immigration", next: "immigration" },
      { label: "Tax", next: "tax" },
      { label: "Benefits", next: "benefits" },
      { label: "Employment", next: "employment" },
      { label: "I want to calculate something", next: "RESULT", result: { headline: "Head to our calculators", description: "Browse every UK calculator by category.", calculatorHref: "/calculators" } },
      { label: "I'm not sure", next: "not-sure-1" },
    ],
  },
  immigration: {
    id: "immigration",
    question: "What are you trying to do?",
    options: [
      {
        label: "Join my partner",
        next: "RESULT",
        result: {
          headline: "You may be looking at a Spouse or Partner visa",
          description: "This route lets a British citizen or settled person sponsor a partner to join them in the UK, subject to a financial requirement.",
          guideHref: "/guides/immigration/uk-spouse-visa-explained",
          calculatorHref: "/calculators/immigration/spouse-visa",
          serviceHref: "/services/immigration/spouse-partner-visa",
        },
      },
      {
        label: "Work in the UK",
        next: "RESULT",
        result: {
          headline: "You may be looking at a Skilled Worker visa",
          description: "This is the main sponsored work route, requiring a job offer, sponsorship, and a qualifying salary.",
          guideHref: "/guides/immigration/uk-skilled-worker-visa-explained",
          calculatorHref: "/calculators/immigration/skilled-worker",
          serviceHref: "/services/immigration/skilled-worker-visa",
        },
      },
      {
        label: "Study in the UK",
        next: "RESULT",
        result: {
          headline: "You may need a Student visa",
          description: "Student visa applicants generally need a confirmed offer (CAS) and to show maintenance funds.",
          calculatorHref: "/calculators/immigration/student-visa-funds",
          serviceHref: "/services/immigration/student-visa",
        },
      },
      {
        label: "Apply for ILR",
        next: "RESULT",
        result: {
          headline: "You may be ready for Indefinite Leave to Remain",
          description: "Most routes qualify after 5 years — some after 3. Check your position with our eligibility tool.",
          guideHref: "/guides/immigration/what-is-ilr",
          calculatorHref: "/calculators/immigration/ilr",
          serviceHref: "/services/immigration/ilr-settlement",
        },
      },
      {
        label: "Apply for citizenship",
        next: "RESULT",
        result: {
          headline: "You may be ready to apply for British citizenship",
          description: "Usually available 12 months after ILR, or straight away if married to a British citizen.",
          guideHref: "/guides/citizenship/ilr-vs-citizenship",
          serviceHref: "/services/immigration/british-citizenship",
        },
      },
      {
        label: "Bring a family member",
        next: "RESULT",
        result: {
          headline: "This likely falls under family visas",
          description: "Rules differ depending on the relationship (partner, child, parent) — a consultation can confirm the right route.",
          guideHref: "/guides/immigration/uk-visa-financial-requirements",
          serviceHref: "/services/immigration/spouse-partner-visa",
        },
      },
      { label: "I'm not sure", next: "not-sure-1" },
    ],
  },
  tax: {
    id: "tax",
    question: "What's this about?",
    options: [
      {
        label: "How much tax will I pay?",
        next: "RESULT",
        result: { headline: "Try our Income Tax calculator", description: "See an estimated breakdown of tax, National Insurance and take-home pay.", calculatorHref: "/calculators/tax/income-tax", guideHref: "/guides/tax/how-paye-tax-works" },
      },
      {
        label: "I think I've overpaid tax",
        next: "RESULT",
        result: { headline: "You may be due a refund", description: "Learn the common causes of overpayment and how a claim works.", guideHref: "/guides/tax/tax-refunds-explained", serviceHref: "/services/tax/tax-refund-assistance" },
      },
      {
        label: "I'm self-employed",
        next: "RESULT",
        result: { headline: "Try our Self-Employment tax calculator", description: "Estimate Income Tax and Class 4 NI on your profit.", calculatorHref: "/calculators/self-employment/tax", guideHref: "/guides/tax/self-employed-tax-explained" },
      },
      { label: "Something else", next: "RESULT", result: { headline: "Browse our tax guides and calculators", description: "Or book a consultation for anything specific to your situation.", guideHref: "/guides?category=tax", calculatorHref: "/calculators?category=tax" } },
    ],
  },
  benefits: {
    id: "benefits",
    question: "What's this about?",
    options: [
      {
        label: "Can I get Universal Credit?",
        next: "RESULT",
        result: { headline: "Try our Universal Credit estimator", description: "A short questionnaire gives you an indicative monthly estimate.", calculatorHref: "/calculators/benefits/universal-credit", guideHref: "/guides/benefits/universal-credit-explained" },
      },
      { label: "Something else", next: "RESULT", result: { headline: "Browse our benefits guides", description: "Or book a consultation to talk through your specific situation.", guideHref: "/guides?category=benefits" } },
    ],
  },
  employment: {
    id: "employment",
    question: "What's this about?",
    options: [
      { label: "Holiday pay", next: "RESULT", result: { headline: "Read our holiday pay guide", description: "Understand your statutory minimum entitlement.", guideHref: "/guides/employment/holiday-pay-explained" } },
      { label: "Sick pay", next: "RESULT", result: { headline: "Read our Statutory Sick Pay guide", description: "Check eligibility and how much SSP is worth.", guideHref: "/guides/employment/statutory-sick-pay-explained" } },
      { label: "Something else", next: "RESULT", result: { headline: "Book a consultation", description: "Employment questions often depend on the specifics of your contract.", serviceHref: "/appointment" } },
    ],
  },
  "not-sure-1": {
    id: "not-sure-1",
    question: "Are you dealing with something related to moving to, or staying in, the UK?",
    options: [
      { label: "Yes", next: "immigration" },
      { label: "No", next: "not-sure-2" },
    ],
  },
  "not-sure-2": {
    id: "not-sure-2",
    question: "Is this mainly about money — tax, pay, or benefits?",
    options: [
      { label: "Yes, tax or pay", next: "tax" },
      { label: "Yes, benefits", next: "benefits" },
      {
        label: "No",
        next: "RESULT",
        result: {
          headline: "A general consultation is probably the best next step",
          description: "Because your situation doesn't fit neatly into one category, it's best discussed directly with our team.",
          serviceHref: "/appointment",
        },
      },
    ],
  },
};
