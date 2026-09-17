import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-3 text-xs font-semibold uppercase tracking-[0.2em]", tone === "dark" ? "text-red-300" : "text-red-600")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-3xl font-bold leading-tight tracking-tight md:text-4xl", tone === "dark" ? "text-white" : "text-navy-900")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed md:text-lg", tone === "dark" ? "text-slate-200" : "text-navy-600")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
