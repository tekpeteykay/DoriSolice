import { Appointment, Enquiry } from "@/types";

// Mock records so the admin UI can be demonstrated end-to-end. Replace with
// real queries once a database (e.g. Supabase) is connected — every table
// below is typed against the same Appointment / Enquiry models used by the
// public booking and contact forms, so swapping the data source shouldn't
// require changing these components.

export const mockAppointments: Appointment[] = [
  { id: "apt-1001", createdAt: "2026-01-10T09:12:00Z", serviceArea: "immigration", appointmentTypeId: "30-min", slot: { date: "2026-01-20", time: "10:00" }, name: "Amara Okafor", email: "amara@example.com", phone: "07700 900123", matterDescription: "Spouse visa financial requirement", preferredContactMethod: "email", marketingConsent: true, status: "confirmed" },
  { id: "apt-1002", createdAt: "2026-01-11T14:02:00Z", serviceArea: "tax", appointmentTypeId: "20-min", slot: { date: "2026-01-21", time: "14:00" }, name: "Liam Carter", email: "liam@example.com", phone: "07700 900124", matterDescription: "Tax code query", preferredContactMethod: "phone", marketingConsent: false, status: "pending" },
  { id: "apt-1003", createdAt: "2026-01-12T11:45:00Z", serviceArea: "benefits", appointmentTypeId: "30-min", slot: { date: "2026-01-22", time: "11:00" }, name: "Priya Nair", email: "priya@example.com", phone: "07700 900125", matterDescription: "Universal Credit decision query", preferredContactMethod: "email", marketingConsent: true, status: "confirmed" },
  { id: "apt-1004", createdAt: "2026-01-13T16:30:00Z", serviceArea: "immigration", appointmentTypeId: "60-min", slot: { date: "2026-01-23", time: "15:00" }, name: "Tomasz Nowak", email: "tomasz@example.com", phone: "07700 900126", matterDescription: "ILR application review", preferredContactMethod: "email", marketingConsent: false, status: "completed" },
];

export const mockEnquiries: Enquiry[] = [
  { id: "enq-2001", createdAt: "2026-01-09T08:00:00Z", name: "Grace Adeyemi", email: "grace@example.com", topic: "Skilled Worker visa", message: "Wanted to check the salary threshold for my job offer.", status: "new" },
  { id: "enq-2002", createdAt: "2026-01-08T13:22:00Z", name: "Sam Whitfield", email: "sam@example.com", topic: "Tax refund", message: "Think I overpaid tax after changing jobs twice last year.", status: "in-progress" },
  { id: "enq-2003", createdAt: "2026-01-07T10:15:00Z", name: "Elena Petrova", email: "elena@example.com", topic: "Student visa", message: "Need help understanding the maintenance funds requirement.", status: "resolved" },
];
