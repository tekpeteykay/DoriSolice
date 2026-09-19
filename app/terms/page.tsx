import type { Metadata } from "next";
import { LegalContent } from "@/components/legal/LegalContent";
import { getPageContent } from "@/lib/cms/page-content";

export const metadata: Metadata = { title: "Terms" };
export const revalidate = 60;

export default async function TermsPage() {
  const content = await getPageContent("terms");
  const page = content.content as { title: string; updated: string; sections: { heading: string; body: string }[] };
  return (
    <LegalContent
      title={page.title}
      updated={page.updated}
      sections={page.sections.map((s) => ({ heading: s.heading, body: s.body.split("\n\n").filter(Boolean) }))}
    />
  );
}
