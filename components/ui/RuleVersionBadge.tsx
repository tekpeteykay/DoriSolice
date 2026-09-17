import { CalendarClock, Scale } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function RuleVersionBadge({ rulesVersion, lastUpdated }: { rulesVersion: string; lastUpdated: string }) {
  return (
    <div className="flex flex-wrap gap-3 text-xs font-medium text-navy-500">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1">
        <Scale className="h-3.5 w-3.5" /> Based on rules for {rulesVersion}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1">
        <CalendarClock className="h-3.5 w-3.5" /> Last reviewed {formatDate(lastUpdated)}
      </span>
    </div>
  );
}
