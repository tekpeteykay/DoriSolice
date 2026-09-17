import { AppointmentServiceArea, AppointmentTypeDef } from "@/types";

export const serviceAreas: { id: AppointmentServiceArea; label: string; description: string }[] = [
  { id: "immigration", label: "Immigration", description: "Visas, settlement, citizenship and family applications." },
  { id: "tax", label: "Tax", description: "Income Tax, Self Assessment, refunds and HMRC correspondence." },
  { id: "benefits", label: "Benefits", description: "Universal Credit and other benefit entitlement questions." },
  { id: "employment", label: "Employment", description: "Workplace rights, pay and contract questions." },
  { id: "general", label: "General Consultation", description: "Not sure which category fits — we'll help you work it out." },
];

export const appointmentTypes: AppointmentTypeDef[] = [
  { id: "20-min", label: "20-minute consultation", durationMinutes: 20, description: "A focused conversation about a specific question.", priceLabel: "[Add price]" },
  { id: "30-min", label: "30-minute consultation", durationMinutes: 30, description: "More time to go through your situation in detail.", priceLabel: "[Add price]" },
  { id: "60-min", label: "60-minute consultation", durationMinutes: 60, description: "A full review, suited to more complex matters.", priceLabel: "[Add price]" },
  { id: "document-review", label: "Document / application review", durationMinutes: 45, description: "We review documents or a draft application before you submit.", priceLabel: "[Add price]" },
];

// Placeholder slot generator — replace with a real calendar integration
// (Calendly, Google Calendar, Microsoft Bookings, etc.) by swapping the
// implementation of this function. Every consumer only depends on the
// AppointmentSlot[] shape, not on how slots are produced.
export function getAvailableSlots(daysAhead = 12): { date: string; times: string[] }[] {
  const days: { date: string; times: string[] }[] = [];
  const today = new Date();
  let added = 0;
  let offset = 1;
  while (added < daysAhead) {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    offset += 1;
    const day = d.getDay();
    if (day === 0 || day === 6) continue; // skip weekends
    days.push({
      date: d.toISOString().slice(0, 10),
      times: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"],
    });
    added += 1;
  }
  return days;
}
