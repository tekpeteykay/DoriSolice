import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about UK tax, immigration, benefits and employment, and about working with Dori Solic.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
