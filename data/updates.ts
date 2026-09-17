import { SiteUpdate } from "@/types";

export const updates: SiteUpdate[] = [
  {
    slug: "spouse-visa-income-requirement-2024",
    title: "Spouse visa minimum income requirement changed to £29,000",
    category: "immigration",
    summary: "The minimum income requirement for family visas rose from £18,600 to £29,000 on 11 April 2024. Further planned increases have been paused pending review.",
    published: "2024-04-11",
    lastReviewed: "2026-01-15",
    appliesFrom: "2024-04-11",
    body: "From 11 April 2024, the minimum income requirement for sponsoring a partner on a family visa increased from £18,600 to £29,000. The government had set out plans for further increases (to £34,500 and then a projected £38,700), but these further rises have been paused pending a review. Anyone relying on the financial requirement should confirm the current threshold before applying, as this is an area that can change again with limited notice.",
  },
  {
    slug: "skilled-worker-threshold-2024",
    title: "Skilled Worker general salary threshold raised to £38,700",
    category: "immigration",
    summary: "From 4 April 2024, the general salary threshold for most Skilled Worker visa applicants rose from £26,200 to £38,700.",
    published: "2024-04-04",
    lastReviewed: "2026-01-15",
    appliesFrom: "2024-04-04",
    body: "The general salary threshold for Skilled Worker visa applications increased substantially on 4 April 2024. Occupation-specific 'going rates' and reduced thresholds for eligible new entrants and health and care roles continue to apply alongside the general threshold.",
  },
  {
    slug: "employee-ni-cut-2024",
    title: "Employee National Insurance main rate cut to 8%",
    category: "money",
    summary: "The main rate of Class 1 employee National Insurance was cut from 10% to 8% from 6 April 2024.",
    published: "2024-04-06",
    lastReviewed: "2026-01-15",
    appliesFrom: "2024-04-06",
    body: "Following an earlier cut from 12% to 10% in January 2024, the main rate of employee National Insurance was reduced again to 8% from the start of the 2024/25 tax year, increasing take-home pay for most employees earning above the primary threshold.",
  },
  {
    slug: "cgt-rates-aligned-2024",
    title: "Capital Gains Tax rates on residential property reduced",
    category: "money",
    summary: "The higher rate of Capital Gains Tax on residential property gains fell from 28% to 24% from 30 October 2024, and rates on other chargeable assets were subsequently aligned.",
    published: "2024-10-30",
    lastReviewed: "2026-01-15",
    appliesFrom: "2024-10-30",
    body: "Capital Gains Tax rates changed at the Autumn Budget 2024. The higher residential property rate fell from 28% to 24%, and rates on other chargeable assets (previously 10%/20%) were subsequently increased to align with the property rates. Always check the rate in force for the specific date of disposal.",
  },
];

export function getUpdateBySlug(slug: string) {
  return updates.find((u) => u.slug === slug);
}
