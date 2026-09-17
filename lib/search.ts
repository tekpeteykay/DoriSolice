import { SearchIndexItem } from "@/types";
import { guides } from "@/data/guides";
import { services } from "@/data/services";
import { faqs } from "@/data/faqs";
import { calculatorCatalogue } from "@/data/calculator-catalogue";

function buildSearchIndex(): SearchIndexItem[] {
  const guideItems: SearchIndexItem[] = guides.map((g) => ({
    type: "guide",
    title: g.title,
    description: g.summary,
    url: `/guides/${g.category}/${g.slug}`,
    tags: [g.category, g.title, g.summary].join(" ").toLowerCase().split(/\W+/),
  }));

  const calcItems: SearchIndexItem[] = calculatorCatalogue.map((c) => ({
    type: "calculator",
    title: c.title,
    description: c.description,
    url: `/calculators/${c.slug}`,
    tags: [c.category, c.title, c.description].join(" ").toLowerCase().split(/\W+/),
  }));

  const serviceItems: SearchIndexItem[] = services.map((s) => ({
    type: "service",
    title: s.title,
    description: s.shortDescription,
    url: `/services/${s.category}/${s.slug}`,
    tags: [s.category, s.title, s.shortDescription].join(" ").toLowerCase().split(/\W+/),
  }));

  const faqItems: SearchIndexItem[] = faqs.map((f) => ({
    type: "faq",
    title: f.question,
    description: f.answer,
    url: `/#${f.id}`,
    tags: [f.category, f.question, f.answer].join(" ").toLowerCase().split(/\W+/),
  }));

  return [...calcItems, ...guideItems, ...serviceItems, ...faqItems];
}

export const searchIndex = buildSearchIndex();

const SYNONYMS: Record<string, string[]> = {
  refund: ["overpaid", "rebate", "hmrc"],
  salary: ["wage", "pay", "income"],
  spouse: ["partner", "marriage", "family"],
  uc: ["universal", "credit", "benefits"],
  visa: ["immigration", "route"],
  ilr: ["settlement", "settle"],
};

export function search(query: string, limit = 8): SearchIndexItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\W+/).filter(Boolean);
  const expandedTerms = new Set<string>(terms);
  for (const t of terms) {
    (SYNONYMS[t] ?? []).forEach((s) => expandedTerms.add(s));
  }

  const scored = searchIndex.map((item) => {
    let score = 0;
    const haystack = (item.title + " " + item.description).toLowerCase();
    if (haystack.includes(q)) score += 10;
    for (const term of expandedTerms) {
      if (item.tags.includes(term)) score += 3;
      if (haystack.includes(term)) score += 1;
    }
    // Slightly favour calculators, since "calculate" is the site's core action.
    if (item.type === "calculator") score += 0.5;
    return { item, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item);
}
