import { FAQ } from "@/types";

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    category: "general",
    question: "Is Dori Solic a law firm?",
    answer: "Dori Solic provides UK legal, tax and immigration guidance and can connect you with professional advisers for regulated advice. [Add SRA/regulatory information once confirmed].",
  },
  {
    id: "faq-2",
    category: "general",
    question: "Are the calculators on this site official government tools?",
    answer: "No. Our calculators are estimation tools built using publicly available rules and rates. They're designed to help you understand your situation, not to replace an official HMRC, DWP or Home Office decision.",
  },
  {
    id: "faq-3",
    category: "tax",
    question: "How accurate is the tax calculator?",
    answer: "It's a close estimate based on standard assumptions (a normal tax code, no benefits in kind, and so on). Your actual tax position can differ if your circumstances are more complex.",
    relatedCalculator: "income-tax",
    relatedGuide: "how-paye-tax-works",
  },
  {
    id: "faq-4",
    category: "tax",
    question: "Can you help me get a tax refund?",
    answer: "We can review your circumstances and help you understand whether a claim looks worthwhile, and support you in making it. Only HMRC can confirm and pay an actual refund.",
    relatedCalculator: "income-tax",
    relatedGuide: "tax-refunds-explained",
  },
  {
    id: "faq-5",
    category: "immigration",
    question: "What's the minimum income for a spouse visa?",
    answer: "There's a minimum income threshold that applies to most sponsors, though the exact figure has changed in recent years and savings can sometimes bridge a shortfall. Use our calculator for an estimate specific to your situation.",
    relatedCalculator: "spouse-visa-financial-requirement",
    relatedGuide: "spouse-visa-income-requirement",
  },
  {
    id: "faq-6",
    category: "immigration",
    question: "How long does it take to get Indefinite Leave to Remain?",
    answer: "Most routes require 5 years of continuous lawful residence, though some (such as Global Talent for many applicants) allow settlement after 3 years.",
    relatedCalculator: "ilr-eligibility",
    relatedGuide: "what-is-ilr",
  },
  {
    id: "faq-7",
    category: "benefits",
    question: "Will working affect my Universal Credit?",
    answer: "Yes, but gradually — your payment reduces by a percentage (the taper rate) of what you earn above any work allowance, rather than stopping outright.",
    relatedCalculator: "universal-credit-estimator",
    relatedGuide: "how-earnings-affect-universal-credit",
  },
  {
    id: "faq-8",
    category: "employment",
    question: "How much holiday am I entitled to?",
    answer: "Most workers are entitled to a statutory minimum of 5.6 weeks of paid holiday a year, which can include bank holidays depending on your contract.",
    relatedGuide: "holiday-pay-explained",
  },
  {
    id: "faq-9",
    category: "general",
    question: "How much does an appointment cost?",
    answer: "[Add current appointment pricing]. You can see appointment types and durations when you start the booking process.",
  },
  {
    id: "faq-10",
    category: "general",
    question: "Can I get help if I'm not sure what I need?",
    answer: "Yes — use the 'I'm not sure what I need' tool on the homepage, or book a general consultation and we'll help you work out the right next step.",
  },
];

export function getFaqsByCategory(category: FAQ["category"]) {
  return faqs.filter((f) => f.category === category);
}
