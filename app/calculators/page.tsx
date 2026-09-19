import { CalculatorsHubClient } from "@/components/calculators/CalculatorsHubClient";
import { getPageContent } from "@/lib/cms/page-content";

export const revalidate = 60;

export default async function CalculatorsHubPage() {
  const content = await getPageContent("calculators");
  return <CalculatorsHubClient content={content.hero as any} />;
}
