import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border p-6 md:p-8 transition-all duration-300",
        tone === "light" && "border-navy-100 bg-white shadow-card hover:shadow-lg hover:-translate-y-0.5",
        tone === "dark" && "border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-card-dark hover:bg-white/[0.06]",
        className
      )}
    >
      {children}
    </div>
  );
}
