import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UK Guides",
  description: "Plain-English guides to UK tax, benefits, immigration, employment and more — reviewed and dated.",
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
