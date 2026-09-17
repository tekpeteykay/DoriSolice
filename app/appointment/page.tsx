import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = { title: "Book an Appointment" };

export default function AppointmentPage() {
  return (
    <div className="bg-slate-50 pb-24">
      <section className="relative overflow-hidden bg-brand-radial pb-16 pt-40 text-white">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[length:44px_44px] opacity-30" />
        <div className="container relative max-w-3xl">
          <SectionHeader
            tone="dark"
            eyebrow="Book an appointment"
            title="Let's find a time that works."
            description="Tell us what you need, choose a slot, and we'll take it from there."
          />
        </div>
      </section>
      <div className="container max-w-3xl">
        <Reveal className="-mt-8 rounded-3xl bg-white p-6 shadow-card md:p-8">
          <Suspense>
            <BookingWizard />
          </Suspense>
        </Reveal>
      </div>
    </div>
  );
}
