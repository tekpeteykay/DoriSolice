import { AppointmentPrepareClient } from "@/components/booking/AppointmentPrepareClient";
import { getPageContent } from "@/lib/cms/page-content";

export const revalidate = 60;

export default async function PreparePage() {
  const content = await getPageContent("appointment-prepare");
  return <AppointmentPrepareClient content={content.hero as any} />;
}
