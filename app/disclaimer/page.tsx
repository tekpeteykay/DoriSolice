import type { Metadata } from "next";
import { LegalContent } from "@/components/legal/LegalContent";
import { getPageContent } from "@/lib/cms/page-content";

export const metadata: Metadata = { title: "Disclaimer" };
export const revalidate = 60;

export default async function DisclaimerPage() {
  const content = await getPageContent("disclaimer");
  const page = content.content as { title: string; updated: string; sections: { heading: string; body: string }[] };
  return (
    <LegalContent
      title={page.title}
      updated={page.updated}
      sections={page.sections.map((s) => ({ heading: s.heading, body: s.body.split("\n\n").filter(Boolean) }))}
    />
  );
}
