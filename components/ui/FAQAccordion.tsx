"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FAQ } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-navy-100 rounded-3xl border border-navy-100 bg-white">
      {items.map((item, i) => {
        const isOpen = openId === item.id;
        return (
          <Reveal key={item.id} id={item.id} delay={Math.min(i, 6) * 0.04} y={16} as="div">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-semibold text-navy-900">{item.question}</span>
              <ChevronDown className={cn("h-5 w-5 shrink-0 text-navy-400 transition-transform duration-300", isOpen && "rotate-180 text-red-600")} />
            </button>
            <div className={cn("grid transition-all duration-300 ease-in-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <div className="overflow-hidden">
                <div className="px-6 pb-6 text-navy-600">
                  <p>{item.answer}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm">
                    {item.relatedCalculator && (
                      <Link href={`/calculators`} className="font-semibold text-red-600 hover:underline">
                        Try a related calculator →
                      </Link>
                    )}
                    {item.relatedGuide && (
                      <Link href={`/guides`} className="font-semibold text-navy-700 hover:underline">
                        Read the related guide →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
