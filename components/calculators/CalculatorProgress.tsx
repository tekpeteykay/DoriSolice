export function CalculatorProgress({ step, total }: { step: number; total: number }) {
  const pct = total > 0 ? Math.round(((step + 1) / total) * 100) : 100;
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-navy-400">
        <span>Question {Math.min(step + 1, total)} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy-100">
        <div className="h-full rounded-full bg-brand-gradient transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
