"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { IntakeWizard } from "@/components/booking/IntakeWizard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentServiceArea } from "@/types";

function PrepareInner() {
  const params = useSearchParams();
  const service = (params.get("service") as AppointmentServiceArea) ?? "general";

  return (
    <div className="bg-slate-50 pb-24 pt-40">
      <div className="container max-w-2xl">
        <SectionHeader eyebrow="Prepare for your appointment" title="A few quick questions." description="This helps us prepare in advance — it's optional, and only takes a minute." />
        <Reveal className="mt-10 rounded-3xl bg-white p-6 shadow-card md:p-10">
          <IntakeWizard serviceArea={service} />
        </Reveal>
      </div>
    </div>
  );
}

export default function PreparePage() {
  return (
    <Suspense>
      <PrepareInner />
    </Suspense>
  );
}
