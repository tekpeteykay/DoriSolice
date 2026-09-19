"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { ResourceConfig } from "@/lib/cms/types";
import { ResourceForm } from "./ResourceForm";
import { createClient } from "@/lib/supabase/client";

// Editor for a "singleton" resource (exactly one row, e.g. site-wide
// settings) — skips the list view entirely and loads/edits that one row
// directly, creating it from the resource's default values on first save
// if it doesn't exist in the database yet.
export function SingletonResourceEditor({ resource }: { resource: ResourceConfig }) {
  const [row, setRow] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase.from(resource.table).select("*").eq(resource.primaryKey, resource.singletonId).maybeSingle();
      if (cancelled) return;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setRow(data ?? null);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource.key]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">{resource.label}</h1>
      <p className="mt-1 max-w-2xl text-sm text-navy-500">{resource.description}</p>

      <div className="mt-6 max-w-3xl rounded-2xl border border-navy-100 bg-white p-6">
        {error ? (
          <div className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-navy-400">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : (
          // row is null the very first time this is opened, before anything's
          // ever been saved — the form falls back to resource.defaultValues.
          <ResourceForm resource={resource} initialValues={row ?? undefined} isNew={!row} />
        )}
      </div>
    </div>
  );
}
