import { GuidesPageClient } from "@/components/guides/GuidesPageClient";
import { getGuides } from "@/lib/cms/queries";

export const revalidate = 60;

export default async function GuidesPage() {
  const guides = await getGuides();
  return <GuidesPageClient guides={guides} />;
}
