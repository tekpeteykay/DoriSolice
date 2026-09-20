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

// The standard consultation slots offered on any bookable day. Every day
// shares the same times for now — swap this out (e.g. to vary by weekday or
// by staff member) without touching the calendar or booking UI, since both
// only depend on this list plus which of it is already booked.
export const DEFAULT_TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

// The office is closed weekends — used by the booking calendar to grey those
// days out. Change this if that ever isn't true.
export function isBookableWeekday(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}
