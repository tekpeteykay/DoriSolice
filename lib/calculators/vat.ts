import { CalculatorDefinition } from "@/types";
import { taxYearRules } from "./tax-engine";
import { formatCurrency } from "@/lib/utils";

export const vatCalculator: CalculatorDefinition = {
  id: "vat",
  slug: "tax/vat",
  category: "tax",
  title: "VAT Calculator",
  shortDescription: "Add or remove VAT from a price at the standard or reduced rate.",
  description: "Quickly calculate VAT-inclusive or VAT-exclusive prices at the current standard or reduced rate.",
  questions: [
    {
      id: "direction",
      type: "select",
      label: "What do you want to do?",
      options: [
        { value: "add", label: "Add VAT to a net (exclusive) price" },
        { value: "remove", label: "Remove VAT from a gross (inclusive) price" },
      ],
      defaultValue: "add",
      required: true,
    },
    {
      id: "amount",
      type: "currency",
      label: "Enter the amount",
      placeholder: "100",
      required: true,
    },
    {
      id: "rate",
      type: "select",
      label: "Which VAT rate applies?",
      options: [
        { value: "standard", label: `Standard rate (${(taxYearRules.vatStandardRate.value * 100).toFixed(0)}%)` },
        { value: "reduced", label: `Reduced rate (${(taxYearRules.vatReducedRate.value * 100).toFixed(0)}%)` },
      ],
      defaultValue: "standard",
    },
  ],
  calculate: (answers) => {
    const amount = Number(answers.amount) || 0;
    const rate = answers.rate === "reduced" ? taxYearRules.vatReducedRate.value : taxYearRules.vatStandardRate.value;
    const direction = answers.direction === "remove" ? "remove" : "add";

    let net: number, vat: number, gross: number;
    if (direction === "add") {
      net = amount;
      vat = net * rate;
      gross = net + vat;
    } else {
      gross = amount;
      net = gross / (1 + rate);
      vat = gross - net;
    }

    return {
      headline: { label: "VAT-inclusive price", value: formatCurrency(gross) },
      lines: [
        { label: "Net (VAT-exclusive) price", value: formatCurrency(net) },
        { label: `VAT (${(rate * 100).toFixed(0)}%)`, value: formatCurrency(vat) },
        { label: "Gross (VAT-inclusive) price", value: formatCurrency(gross), emphasis: true },
      ],
    };
  },
  assumptions: ["Uses the standard UK VAT rates. Some goods and services are zero-rated or exempt — this tool does not determine VAT liability for a specific product or service."],
  rulesVersion: taxYearRules.taxYear,
  sources: [{ label: "VAT rates", url: "https://www.gov.uk/vat-rates", publisher: "GOV.UK" }],
  lastUpdated: "2026-01-15",
  relatedServices: ["tax-enquiries"],
};
