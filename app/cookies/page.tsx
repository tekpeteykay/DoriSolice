import type { Metadata } from "next";
import { LegalContent } from "@/components/legal/LegalContent";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <LegalContent
      title="Cookie Policy"
      updated="[Add date once reviewed]"
      sections={[
        { heading: "What are cookies", body: ["Cookies are small files stored on your device that help websites function and, where permitted, understand how they're used."] },
        { heading: "Cookies we use", body: ["Strictly necessary cookies required for the site to function (e.g. remembering your progress through a calculator or booking flow).", "[Add details of any analytics or marketing cookies once configured, along with the relevant consent mechanism]."] },
        { heading: "Managing cookies", body: ["You can control cookies through your browser settings. Blocking some cookies may affect how parts of the site work."] },
      ]}
    />
  );
}
