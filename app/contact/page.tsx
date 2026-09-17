"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GradientButton } from "@/components/ui/GradientButton";
import { siteConfig } from "@/lib/site-config";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", consent: false });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Architecture note: in production this posts to an API route which
    // validates input server-side and stores an Enquiry record (see
    // types/index.ts) — see README for the exact integration points.
    // eslint-disable-next-line no-console
    console.log("Contact form submitted", form);
    setSubmitted(true);
  }

  return (
    <div className="bg-slate-50 pb-24 pt-32">
      <div className="container grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeader eyebrow="Contact" title="Get in touch." description="For anything urgent or specific to your case, booking an appointment is the fastest route." />

          <div className="mt-10 space-y-5">
            <ContactRow icon={Phone} label="Phone" value={siteConfig.phone} delay={0} />
            <ContactRow icon={Mail} label="Email" value={siteConfig.email} delay={0.06} />
            <ContactRow icon={MapPin} label="Office" value={siteConfig.address} delay={0.12} />
            <ContactRow icon={Clock} label="Opening hours" value={siteConfig.hours} delay={0.18} />
          </div>

          <Reveal delay={0.24} className="mt-10">
            <GradientButton href="/appointment">Book an appointment instead</GradientButton>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="rounded-3xl border border-navy-100 bg-white p-8 shadow-card">
          {submitted ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
              <p className="mt-4 font-semibold text-navy-900">Thanks — we&rsquo;ll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-navy-700">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border-2 border-navy-100 px-4 py-3 outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-navy-700">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border-2 border-navy-100 px-4 py-3 outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-navy-700">Message</label>
                <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="min-h-[140px] w-full resize-none rounded-xl border-2 border-navy-100 px-4 py-3 outline-none focus:border-red-500" />
              </div>
              <label className="flex items-start gap-3 text-sm text-navy-500">
                <input required type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1" />
                I consent to Dori Solic contacting me about this enquiry in line with the{" "}
                <a href="/privacy" className="underline">
                  Privacy Policy
                </a>
                .
              </label>
              <GradientButton className="w-full">Send message</GradientButton>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, delay = 0 }: { icon: any; label: string; value: string; delay?: number }) {
  return (
    <Reveal delay={delay} y={16} className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">{label}</p>
        <p className="font-medium text-navy-800">{value}</p>
      </div>
    </Reveal>
  );
}
