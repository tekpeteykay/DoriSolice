import { SearchResultsClient } from "@/components/search/SearchResultsClient";
import { getPageContent } from "@/lib/cms/page-content";

export const revalidate = 60;

export default async function SearchPage() {
  const content = await getPageContent("search");
  return <SearchResultsClient content={content.content as any} />;
}
