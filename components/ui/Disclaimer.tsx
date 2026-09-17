import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Disclaimer({ variant = "calculator", className }: { variant?: "calculator" | "guide"; className?: string }) {
  const text =
    variant === "calculator"
      ? "This calculator provides an estimate based on the information you enter and the rules selected. It is not an official HMRC, DWP or Home Office decision and should not be treated as legal or financial advice."
      : "Information provided by Dori Solic is for general information and does not necessarily constitute legal advice. Individual circumstances may produce different outcomes.";

  return (
    <div className={cn("flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900", className)}>
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{text}</p>
    </div>
  );
}
