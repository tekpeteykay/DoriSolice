"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { IntakeWizard } from "@/components/booking/IntakeWizard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentServiceArea } from "@/types";

interface PrepareContent {
  eyebrow: string;
  heading: string;
  description: string;
}

function PrepareInner({ content }: { content: PrepareContent }) {
  const params = useSearchParams();
  const service = (params.get("service") as AppointmentServiceArea) ?? "general";

  return (
    <div className="bg-slate-50 pb-24 pt-40">
      <div className="container max-w-2xl">
        <SectionHeader eyebrow={content.eyebrow} title={content.heading} description={content.description} />
        <Reveal className="mt-10 rounded-3xl bg-white p-6 shadow-card md:p-10">
          <IntakeWizard serviceArea={service} />
        </Reveal>
      </div>
    </div>
  );
}

export function AppointmentPrepareClient({ content }: { content: PrepareContent }) {
  return (
    <Suspense>
      <PrepareInner content={content} />
    </Suspense>
  );
}
