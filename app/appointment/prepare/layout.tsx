import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prepare for your appointment",
  robots: { index: false, follow: true },
};

export default function PrepareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
