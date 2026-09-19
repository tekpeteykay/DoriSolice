"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppointmentBookingDraft, AppointmentServiceArea, AppointmentTypeDef } from "@/types";
import { serviceAreas, getAvailableSlots } from "@/data/appointment-types";
import { GradientButton } from "@/components/ui/GradientButton";
import { CalculatorProgress } from "@/components/calculators/CalculatorProgress";
import { cn, formatDate } from "@/lib/utils";
import { ArrowLeft, CalendarCheck2, Mail, Phone } from "lucide-react";
import Link from "next/link";

const STEPS = ["Service", "Appointment type", "Date & time", "Your details", "Confirmation"];

export function BookingWizard({ appointmentTypes }: { appointmentTypes: AppointmentTypeDef[] }) {
  const params = useSearchParams();
  const preselected = params.get("service") as AppointmentServiceArea | null;

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<AppointmentBookingDraft>({
    serviceArea: preselected ?? undefined,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const slots = getAvailableSlots();

  function update<K extends keyof AppointmentBookingDraft>(key: K, value: AppointmentBookingDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function next() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function validateDetails(): boolean {
    const errs: Record<string, string> = {};
    if (!draft.name?.trim()) errs.name = "Please enter your name.";
    if (!draft.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) errs.email = "Please enter a valid email address.";
    if (!draft.phone?.trim()) errs.phone = "Please enter a phone number.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (!validateDetails()) return;
    // Booking submission architecture: in production this posts to a
    // server action / API route that writes to the database and triggers
    // confirmation emails and calendar sync (Calendly / Google / Microsoft).
    // eslint-disable-next-line no-console
    console.log("Appointment request submitted", draft);
    setSubmitted(true);
    next();
  }

  return (
    <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-card md:p-10">
      {step < STEPS.length - 1 && <CalculatorProgress step={step} total={STEPS.length - 1} />}

      {step === 0 && (
        <StepShell title="Which area do you need help with?">
          <div className="grid gap-3 sm:grid-cols-2">
            {serviceAreas.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  update("serviceArea", s.id);
                  next();
                }}
                className={cn(
                  "rounded-2xl border-2 p-5 text-left transition-colors",
                  draft.serviceArea === s.id ? "border-red-500 bg-red-50" : "border-navy-100 hover:border-navy-300"
                )}
              >
                <p className="font-semibold text-navy-900">{s.label}</p>
                <p className="mt-1 text-sm text-navy-500">{s.description}</p>
              </button>
            ))}
          </div>
        </StepShell>
      )}

      {step === 1 && (
        <StepShell title="How much time do you need?" onBack={back}>
          <div className="grid gap-3 sm:grid-cols-2">
            {appointmentTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  update("appointmentTypeId", t.id);
                  next();
                }}
                className={cn(
                  "rounded-2xl border-2 p-5 text-left transition-colors",
                  draft.appointmentTypeId === t.id ? "border-red-500 bg-red-50" : "border-navy-100 hover:border-navy-300"
                )}
              >
                <p className="font-semibold text-navy-900">{t.label}</p>
                <p className="mt-1 text-sm text-navy-500">{t.description}</p>
                <p className="mt-2 text-sm font-semibold text-red-600">{t.priceLabel}</p>
              </button>
            ))}
          </div>
        </StepShell>
      )}

      {step === 2 && (
        <StepShell title="Choose a date and time" onBack={back}>
          <div className="max-h-[420px] space-y-5 overflow-y-auto pr-1">
            {slots.map((day) => (
              <div key={day.date}>
                <p className="mb-2 text-sm font-semibold text-navy-700">{formatDate(day.date)}</p>
                <div className="flex flex-wrap gap-2">
                  {day.times.map((time) => {
                    const active = draft.slot?.date === day.date && draft.slot?.time === time;
                    return (
                      <button
                        key={time}
                        onClick={() => {
                          update("slot", { date: day.date, time });
                        }}
                        className={cn(
                          "rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors",
                          active ? "border-red-500 bg-red-50 text-red-700" : "border-navy-100 text-navy-600 hover:border-navy-300"
                        )}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <GradientButton onClick={next} disabled={!draft.slot} className={!draft.slot ? "opacity-50" : ""}>
              Continue
            </GradientButton>
          </div>
        </StepShell>
      )}

      {step === 3 && (
        <StepShell title="Your details" onBack={back}>
          <div className="space-y-4">
            <Field label="Full name" error={errors.name}>
              <input value={draft.name ?? ""} onChange={(e) => update("name", e.target.value)} className={inputClass} placeholder="Jane Doe" />
            </Field>
            <Field label="Email address" error={errors.email}>
              <input type="email" value={draft.email ?? ""} onChange={(e) => update("email", e.target.value)} className={inputClass} placeholder="jane@example.com" />
            </Field>
            <Field label="Telephone" error={errors.phone}>
              <input type="tel" value={draft.phone ?? ""} onChange={(e) => update("phone", e.target.value)} className={inputClass} placeholder="07123 456789" />
            </Field>
            <Field label="Brief description of your matter (optional)">
              <textarea
                value={draft.matterDescription ?? ""}
                onChange={(e) => update("matterDescription", e.target.value)}
                className={cn(inputClass, "min-h-[100px] resize-none")}
                placeholder="A sentence or two is enough — we'll go into detail during the appointment."
              />
            </Field>
            <Field label="Preferred contact method">
              <div className="flex gap-3">
                {(["email", "phone"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => update("preferredContactMethod", m)}
                    className={cn(
                      "rounded-full border-2 px-4 py-2 text-sm font-semibold capitalize transition-colors",
                      draft.preferredContactMethod === m ? "border-red-500 bg-red-50 text-red-700" : "border-navy-100 text-navy-600"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </Field>
            <label className="flex items-start gap-3 text-sm text-navy-500">
              <input
                type="checkbox"
                checked={Boolean(draft.marketingConsent)}
                onChange={(e) => update("marketingConsent", e.target.checked)}
                className="mt-1"
              />
              I&rsquo;m happy to receive occasional updates about UK tax, benefits and immigration rules (optional — separate from being contacted about this appointment).
            </label>
          </div>
          <div className="mt-6 flex justify-end">
            <GradientButton onClick={handleSubmit}>Confirm appointment request</GradientButton>
          </div>
        </StepShell>
      )}

      {step === 4 && submitted && (
        <div className="animate-fade-up text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
            <CalendarCheck2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-navy-900">Your appointment request is in</h2>
          <p className="mx-auto mt-3 max-w-md text-navy-500">
            We&rsquo;ll confirm your {appointmentTypes.find((t) => t.id === draft.appointmentTypeId)?.label.toLowerCase()} by{" "}
            {draft.preferredContactMethod === "phone" ? "phone" : "email"} shortly.
          </p>

          <div className="mx-auto mt-8 max-w-md space-y-3 rounded-2xl border border-navy-100 p-6 text-left">
            <SummaryRow label="Service" value={serviceAreas.find((s) => s.id === draft.serviceArea)?.label ?? "—"} />
            <SummaryRow label="Appointment type" value={appointmentTypes.find((t) => t.id === draft.appointmentTypeId)?.label ?? "—"} />
            <SummaryRow label="Date & time" value={draft.slot ? `${formatDate(draft.slot.date)} at ${draft.slot.time}` : "—"} />
            <SummaryRow label="Name" value={draft.name ?? "—"} />
            <SummaryRow label="Contact" value={draft.email ?? "—"} icon={<Mail className="h-4 w-4" />} />
            <SummaryRow label="Phone" value={draft.phone ?? "—"} icon={<Phone className="h-4 w-4" />} />
          </div>

          <div className="mx-auto mt-8 max-w-md rounded-2xl bg-navy-50 p-6 text-left">
            <p className="font-semibold text-navy-900">Want to make the most of your appointment?</p>
            <p className="mt-1 text-sm text-navy-500">Answer a few quick questions now so we can prepare in advance.</p>
            <GradientButton href={`/appointment/prepare?service=${draft.serviceArea ?? "general"}`} className="mt-4 w-full" size="sm">
              Prepare for your appointment
            </GradientButton>
          </div>

          <p className="mt-8 text-xs text-navy-400">
            This is a request, not a guaranteed booking, until confirmed. Calendar sync (Google, Microsoft or Calendly) and automated email confirmation can be connected here — see the README for
            the integration points.
          </p>
          <Link href="/" className="mt-4 inline-block text-sm font-semibold text-navy-500 hover:text-red-600">
            Back to homepage
          </Link>
        </div>
      )}
    </div>
  );
}

const inputClass = "w-full rounded-xl border-2 border-navy-100 bg-white px-4 py-3 text-navy-900 outline-none transition-colors focus:border-red-500";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-navy-400">{label}</span>
      <span className="flex items-center gap-1.5 font-semibold text-navy-800">
        {icon}
        {value}
      </span>
    </div>
  );
}

function StepShell({ title, onBack, children }: { title: string; onBack?: () => void; children: React.ReactNode }) {
  return (
    <div className="animate-fade-up">
      <div className="mb-6 flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="text-navy-400 hover:text-navy-700">
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <h2 className="text-xl font-bold text-navy-900 md:text-2xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}
