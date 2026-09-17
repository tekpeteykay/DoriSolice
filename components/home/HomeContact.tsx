"use client";

import { useState } from "react";
import Image from "next/image";
import { GradientButton } from "@/components/ui/GradientButton";
import { siteConfig } from "@/lib/site-config";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ICON_GRADIENT_ID = "contact-icon-gradient";

export function HomeContact() {
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
    <section id="contact" className="bg-navy-900 py-24 text-white md:py-28">
      {/* Shared gradient definition the icons below paint themselves with —
          same top-to-bottom direction and colors as the FAQ background. */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={ICON_GRADIENT_ID} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BA0A0C" />
            <stop offset="50%" stopColor="#9C7FA8" />
            <stop offset="100%" stopColor="#3E749A" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container grid gap-16 lg:grid-cols-2 lg:px-[220px]">
        <div>
          <Reveal className="flex items-center gap-3">
            <span className="relative h-9 w-9 shrink-0">
              <Image src="/icons/faq-chevron.png" alt="" fill className="object-contain" />
            </span>
            <h2 className="text-4xl font-semibold md:text-5xl">
              <span className="text-gradient">Get in touch</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 max-w-md text-white/70">For anything urgent or specific to your case, booking an appointment is the fastest route.</p>
          </Reveal>

          <div className="mt-12 space-y-8">
            <ContactRow icon={Phone} label="Phone" value={siteConfig.phone} delay={0} />
            <ContactRow icon={Mail} label="Email" value={siteConfig.email} delay={0.06} />
            <ContactRow icon={MapPin} label="Office" value={siteConfig.address} delay={0.12} />
            <ContactRow icon={Clock} label="Opening hours" value={siteConfig.hours} delay={0.18} />
          </div>

          <Reveal delay={0.24} className="mt-12">
            <GradientButton href="/appointment">Book an appointment instead</GradientButton>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {submitted ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-400" />
              <p className="mt-4 font-semibold text-white">Thanks — we&rsquo;ll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full max-w-sm rounded-full border border-white/25 bg-transparent px-6 py-4 text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/60"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full max-w-sm rounded-full border border-white/25 bg-transparent px-6 py-4 text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/60"
              />
              <textarea
                required
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="min-h-[180px] w-full max-w-sm resize-none rounded-[1.75rem] border border-white/25 bg-transparent px-6 py-4 text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/60"
              />
              <label className="flex items-start gap-3 text-sm text-white/60">
                <input required type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1" />
                I consent to Dori Solic contacting me about this enquiry in line with the{" "}
                <a href="/privacy" className="underline">
                  Privacy Policy
                </a>
                .
              </label>
              <GradientButton size="md">Send message</GradientButton>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value, delay = 0 }: { icon: any; label: string; value: string; delay?: number }) {
  return (
    <Reveal delay={delay} y={16} className="flex items-start gap-4">
      <Icon className="mt-0.5 h-6 w-6 shrink-0" style={{ stroke: `url(#${ICON_GRADIENT_ID})` }} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">{label}</p>
        <p className="font-medium text-white">{value}</p>
      </div>
    </Reveal>
  );
}
