import { Reveal } from "@/components/ui/Reveal";

export function LegalContent({ title, updated, sections }: { title: string; updated: string; sections: { heading: string; body: string[] }[] }) {
  return (
    <div className="bg-slate-50 pb-24 pt-40">
      <div className="container max-w-2xl">
        <Reveal className="rounded-4xl bg-white p-7 shadow-card md:p-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">Legal</p>
          <h1 className="mt-2 text-3xl font-bold text-navy-900 md:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-navy-400">Last updated: {updated}</p>

          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-lg font-bold text-navy-900">{s.heading}</h2>
                <div className="mt-3 space-y-3 text-navy-600">
                  {s.body.map((p, i) => (
                    <p key={i} className="leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
