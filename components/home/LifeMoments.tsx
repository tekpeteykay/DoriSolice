import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const moments = [
  {
    title: "Moving to the UK to be with someone",
    description: "Spouse and partner visas, financial requirements, and what evidence you'll actually need.",
    details:
      "We help you gather the right evidence, meet the minimum income requirement, and avoid the reasons applications most often get refused.",
    href: "/immigration",
    tone: "navy",
  },
  {
    title: "Starting a new job",
    description: "See your real take-home pay before you say yes to the offer.",
    details:
      "We factor in your tax code, student loan repayments, and pension contributions, so the number you plan around is the one that actually lands in your account.",
    href: "/calculators/salary/take-home-pay",
    tone: "gradient",
  },
  {
    title: "Settling in for the long run",
    description: "ILR, citizenship, and understanding what 'settled' actually means.",
    details:
      "From counting your qualifying years to preparing for the Life in the UK test, we help you build a timeline that avoids costly gaps in your status.",
    href: "/guides/immigration/what-is-ilr",
    tone: "slate",
  },
  {
    title: "Working things out for yourself",
    description: "Self-employed tax, Universal Credit, and other money questions people quietly Google at midnight.",
    details:
      "Whether you're freelancing, driving for an app, or between jobs, we help you understand what you owe, what you're entitled to, and how the two interact.",
    href: "/tax-and-benefits",
    tone: "white",
  },
] as const;

export function LifeMoments() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pb-20 pt-10 md:pt-12">
      <div className="container relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold leading-tight md:whitespace-nowrap md:text-4xl lg:text-5xl">
            <span className="text-gradient">Life Doesn&rsquo;t Come With Categories</span>
          </h2>
          {/* Sora Light */}
          <p className="mx-auto mt-4 max-w-lg text-xl font-light text-navy-900 md:text-2xl">But your situation probably sounds like one of these</p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {moments.map((m, i) => (
            <Reveal key={m.title} delay={Math.min(i, 6) * 0.08}>
              <MomentCard moment={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Card front shows the teaser, the back flips into view on hover with more
// detail. tabIndex + group-focus gives touch devices the same interaction
// via tap-to-focus, since they can't hover — no JS state needed.
function MomentCard({ moment: m }: { moment: (typeof moments)[number] }) {
  const toneClasses = cn(
    m.tone === "navy" && "bg-gradient-to-b from-navy-900 to-navy-500 text-white shadow-card-dark",
    m.tone === "gradient" && "bg-gradient-to-b from-slate-400 via-lilac-500 to-red-600 text-white shadow-glow",
    m.tone === "slate" && "bg-slate-200 text-navy-900",
    m.tone === "white" && "border border-navy-100 bg-white text-navy-900 shadow-card"
  );
  const subColor = m.tone === "white" || m.tone === "slate" ? "text-navy-500" : "text-white/75";
  const labelColor = m.tone === "white" || m.tone === "slate" ? "text-navy-400" : "text-white/50";

  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={m.title}
      className="group relative aspect-[0.85/1] outline-none [perspective:1600px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy-300"
    >
      <div
        className="relative h-full w-full rounded-[1.75rem] transition-transform duration-700 [transform-style:preserve-3d] group-hover:-translate-y-1.5 group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Front face */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-end overflow-hidden rounded-[1.75rem] p-7 [backface-visibility:hidden]",
            toneClasses
          )}
        >
          <h3 className="text-2xl font-medium leading-snug md:text-3xl">{m.title}</h3>
          <p className={cn("mt-3 text-sm leading-relaxed", subColor)}>{m.description}</p>
          {/* Same gradient + hover treatment as the Hero CTA button. */}
          <span className="mt-5 flex h-11 w-11 items-center justify-center self-end rounded-full bg-brand-gradient bg-[length:200%_auto] text-white shadow-glow transition-all duration-300 group-hover:bg-[position:100%_0]">
            <ChevronRight className="h-5 w-5" />
          </span>
        </div>

        {/* Back face — more detail, same text size/font as the front's sub text */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 [backface-visibility:hidden] [transform:rotateY(180deg)]",
            toneClasses
          )}
        >
          <div>
            <p className={cn("text-xs font-semibold uppercase tracking-wide", labelColor)}>{m.title}</p>
            <p className={cn("mt-3 text-sm leading-relaxed", subColor)}>{m.details}</p>
          </div>
          <Link
            href={m.href}
            aria-label={`Learn more about ${m.title}`}
            className="flex h-11 w-11 items-center justify-center self-end rounded-full bg-brand-gradient bg-[length:200%_auto] text-white shadow-glow transition-all duration-300 hover:bg-[position:100%_0] hover:-translate-y-0.5 active:translate-y-0"
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
