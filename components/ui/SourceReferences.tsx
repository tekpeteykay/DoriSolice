import { SourceReference } from "@/types";
import { ExternalLink } from "lucide-react";

export function SourceReferences({ sources }: { sources: SourceReference[] }) {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy-500">Sources &amp; references</p>
      <ul className="space-y-2">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1.5 text-sm text-navy-700 underline decoration-navy-300 underline-offset-4 hover:text-red-600"
            >
              {s.label} <span className="text-navy-400">— {s.publisher}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
