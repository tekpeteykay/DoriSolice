import type { FAQ } from "@/types";
import { GradientButton } from "@/components/ui/GradientButton";
import { Reveal } from "@/components/ui/Reveal";

interface RealQuestionsContent {
  eyebrow: string;
  heading: string;
  description: string;
  button_label: string;
}

export function RealQuestions({ faqs, content }: { faqs: FAQ[]; content: RealQuestionsContent }) {
  const picks = faqs.filter((f) => ["faq-5", "faq-3", "faq-7"].includes(f.id));

  return (
    <section className="bg-navy-900 py-24 text-white">
      <div className="container grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">{content.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{content.heading}</h2>
          <p className="mt-4 max-w-md text-white/70">{content.description}</p>
          <GradientButton href="/#faq" variant="outline" className="mt-8">
            {content.button_label}
          </GradientButton>
        </Reveal>

        <div className="space-y-4">
          {picks.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.08} className={`rounded-3xl p-5 ${i % 2 === 0 ? "bg-white/[0.06]" : "bg-white/[0.03]"}`}>
              <p className="font-semibold text-white">{f.question}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">{f.answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
