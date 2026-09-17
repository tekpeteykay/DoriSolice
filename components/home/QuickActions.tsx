"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, ShieldCheck, BookOpenText, CalendarCheck2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    title: "Calculate",
    description: "Work out your tax, salary, benefits or visa figures.",
    href: "/calculators",
    icon: Calculator,
    tone: "navy",
  },
  {
    title: "Check eligibility",
    description: "Find out whether you may qualify.",
    href: "/what-do-i-need",
    icon: ShieldCheck,
    tone: "gradient",
  },
  {
    title: "Get information",
    description: "Understand UK rules in plain English.",
    href: "/guides",
    icon: BookOpenText,
    tone: "slate",
  },
  {
    title: "Book an appointment",
    description: "Speak directly with our team.",
    href: "/appointment",
    icon: CalendarCheck2,
    tone: "white",
  },
];

export function QuickActions() {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Where do you want to start?</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.65, delay: Math.min(i, 6) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={action.href}
                className={cn(
                  "group flex h-full flex-col rounded-3xl p-7 transition-all hover:-translate-y-1.5",
                  action.tone === "navy" && "bg-navy-900 text-white shadow-card-dark",
                  action.tone === "gradient" && "bg-brand-gradient text-white shadow-glow",
                  action.tone === "slate" && "bg-slate-100 text-navy-900 shadow-card",
                  action.tone === "white" && "border border-navy-100 bg-white text-navy-900 shadow-card hover:shadow-lg"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl",
                    action.tone === "white" ? "bg-brand-gradient text-white" : "bg-white/15 text-white",
                    action.tone === "slate" && "bg-navy-900/10 text-navy-900"
                  )}
                >
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{action.title}</h3>
                <p className={cn("mt-2 flex-1 text-sm leading-relaxed", action.tone === "white" || action.tone === "slate" ? "text-navy-500" : "text-white/75")}>
                  {action.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Get started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
