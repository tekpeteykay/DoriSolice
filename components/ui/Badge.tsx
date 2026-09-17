import { cn } from "@/lib/utils";

export function Badge({ children, className, tone = "neutral" }: { children: React.ReactNode; className?: string; tone?: "neutral" | "red" | "navy" | "outline" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        tone === "neutral" && "bg-slate-100 text-navy-700",
        tone === "red" && "bg-red-50 text-red-700",
        tone === "navy" && "bg-navy-900 text-white",
        tone === "outline" && "border border-navy-200 text-navy-600",
        className
      )}
    >
      {children}
    </span>
  );
}
