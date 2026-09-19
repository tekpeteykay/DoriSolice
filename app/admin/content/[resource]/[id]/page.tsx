"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { getResource } from "@/lib/cms/resources";
import { ResourceForm } from "@/components/admin/cms/ResourceForm";
import { createClient } from "@/lib/supabase/client";

export default function EditResourcePage() {
  const params = useParams<{ resource: string; id: string }>();
  const resource = getResource(params.resource);
  const [row, setRow] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resource) return;
    let cancelled = false;

    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase.from(resource!.table).select("*").eq(resource!.primaryKey, params.id).maybeSingle();
      if (cancelled) return;
      if (error) {
        setError(error.message);
        return;
      }
      if (!data) {
        setError("Not found — it may have been deleted.");
        return;
      }
      setRow(data);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [resource, params.id]);

  if (!resource) notFound();

  return (
    <div>
      <Link href={`/admin/content/${resource.key}`} className="mb-4 flex items-center gap-1.5 text-sm font-medium text-navy-400 hover:text-navy-700">
        <ArrowLeft className="h-3.5 w-3.5" /> {resource.label}
      </Link>
      <h1 className="text-2xl font-bold text-navy-900">Edit {resource.singularLabel}</h1>

      <div className="mt-6 max-w-3xl rounded-2xl border border-navy-100 bg-white p-6">
        {error ? (
          <div className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : !row ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-navy-400">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : (
          <ResourceForm resource={resource} initialValues={row} isNew={false} />
        )}
      </div>
    </div>
  );
}
