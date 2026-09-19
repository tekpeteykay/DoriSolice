import { GuidesPageClient } from "@/components/guides/GuidesPageClient";
import { getGuides } from "@/lib/cms/queries";
import { getPageContent } from "@/lib/cms/page-content";

export const revalidate = 60;

export default async function GuidesPage() {
  const [guides, content] = await Promise.all([getGuides(), getPageContent("guides")]);
  return <GuidesPageClient guides={guides} hero={content.hero as any} />;
}
