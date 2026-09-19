"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2, DownloadCloud } from "lucide-react";
import { seedSources, SeedSource } from "@/lib/cms/seed-data";
import { getResource } from "@/lib/cms/resources";
import { createClient } from "@/lib/supabase/client";
import { GradientButton } from "@/components/ui/GradientButton";

type Status = { existing: number | null; state: "idle" | "importing" | "done" | "error"; message?: string };

export default function ImportPage() {
  const [statuses, setStatuses] = useState<Record<string, Status>>(() => Object.fromEntries(seedSources.map((s) => [s.resourceKey, { existing: null, state: "idle" }])));

  useEffect(() => {
    seedSources.forEach(async (source) => {
      const supabase = createClient();
      const { count, error } = await supabase.from(source.table).select("*", { count: "exact", head: true });
      setStatuses((prev) => ({ ...prev, [source.resourceKey]: { ...prev[source.resourceKey], existing: error ? -1 : count ?? 0 } }));
    });
  }, []);

  async function importOne(source: SeedSource) {
    const status = statuses[source.resourceKey];
    if (status.existing && status.existing > 0 && !source.conflictColumn) {
      if (!window.confirm(`${source.table} already has ${status.existing} row(s), and this content type has no way to match existing rows — importing again will add ${source.count} more on top. Continue?`)) {
        return;
      }
    }

    setStatuses((prev) => ({ ...prev, [source.resourceKey]: { ...prev[source.resourceKey], state: "importing" } }));
    const supabase = createClient();
    const query = source.conflictColumn ? supabase.from(source.table).upsert(source.rows, { onConflict: source.conflictColumn }) : supabase.from(source.table).insert(source.rows);
    const { error } = await query;

    if (error) {
      setStatuses((prev) => ({ ...prev, [source.resourceKey]: { ...prev[source.resourceKey], state: "error", message: error.message } }));
      return;
    }
    setStatuses((prev) => ({ ...prev, [source.resourceKey]: { existing: (prev[source.resourceKey].existing ?? 0) + source.count, state: "done" } }));
  }

  async function importAll() {
    for (const source of seedSources) {
      // eslint-disable-next-line no-await-in-loop
      await importOne(source);
    }
  }

  return (
    <div>
      <Link href="/admin/content" className="mb-4 flex items-center gap-1.5 text-sm font-medium text-navy-400 hover:text-navy-700">
        <ArrowLeft className="h-3.5 w-3.5" /> All content
      </Link>
      <h1 className="text-2xl font-bold text-navy-900">Import existing content</h1>
      <p className="mt-1 max-w-2xl text-sm text-navy-500">
        One-time setup: copies the content that&apos;s currently built into the site&apos;s code (services, guides, FAQs, testimonials, updates and more) into the database, so it shows up here to edit.
        Safe to run more than once for services, guides, FAQs, updates and appointment types — it matches on slug/id and won&apos;t duplicate. Testimonials, video testimonials and hero slides have no
        natural match key, so re-running those will ask first.
      </p>

      <div className="mt-4">
        <GradientButton type="button" icon={false} onClick={importAll}>
          <span className="flex items-center gap-2">
            <DownloadCloud className="h-4 w-4" /> Import everything
          </span>
        </GradientButton>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white">
        <ul className="divide-y divide-navy-50">
          {seedSources.map((source) => {
            const resource = getResource(source.resourceKey);
            const status = statuses[source.resourceKey];
            return (
              <li key={source.resourceKey} className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="font-medium text-navy-800">{resource?.label ?? source.table}</p>
                  <p className="text-xs text-navy-400">
                    {source.count} item{source.count === 1 ? "" : "s"} available to import
                    {status.existing !== null && status.existing >= 0 && ` · ${status.existing} currently in the database`}
                  </p>
                  {status.state === "error" && <p className="mt-1 text-xs text-red-600">{status.message}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {status.state === "done" && (
                    <span className="flex items-center gap-1 text-sm text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" /> Imported
                    </span>
                  )}
                  {status.state === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
                  <button
                    onClick={() => importOne(source)}
                    disabled={status.state === "importing"}
                    className="flex items-center gap-1.5 rounded-full border border-navy-100 bg-white px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50 disabled:opacity-60"
                  >
                    {status.state === "importing" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                    {status.state === "importing" ? "Importing…" : "Import"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
