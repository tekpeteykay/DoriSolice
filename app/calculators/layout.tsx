import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculators",
  description: "UK tax, salary, benefits and immigration calculators — estimate your numbers in plain English, built on sourced, versioned rules.",
};

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
