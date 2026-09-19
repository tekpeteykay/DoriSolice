"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2, AlertCircle } from "lucide-react";
import { ResourceConfig } from "@/lib/cms/types";
import { createClient } from "@/lib/supabase/client";

interface ResourceListProps {
  resource: ResourceConfig;
}

export function ResourceList({ resource }: ResourceListProps) {
  const [rows, setRows] = useState<Record<string, unknown>[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    setError(null);
    const supabase = createClient();
    const { data, error } = await supabase.from(resource.table).select("*").order(resource.orderBy.column, { ascending: resource.orderBy.ascending ?? true });
    if (error) {
      setError(error.message);
      return;
    }
    setRows(data ?? []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource.key]);

  async function handleDelete(id: string) {
    if (!window.confirm(`Delete this ${resource.singularLabel.toLowerCase()}? This can't be undone.`)) return;
    setDeletingId(id);
    const supabase = createClient();
    const { error } = await supabase.from(resource.table).delete().eq(resource.primaryKey, id);
    setDeletingId(null);
    if (error) {
      setError(error.message);
      return;
    }
    setRows((prev) => prev?.filter((r) => r[resource.primaryKey] !== id) ?? null);
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{resource.label}</h1>
          <p className="mt-1 text-sm text-navy-500">{resource.description}</p>
        </div>
        <Link
          href={`/admin/content/${resource.key}/new`}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
        >
          <Plus className="h-4 w-4" /> Add {resource.singularLabel}
        </Link>
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white">
        {rows === null ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-navy-400">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : rows.length === 0 ? (
          <div className="py-16 text-center text-sm text-navy-400">
            Nothing here yet.{" "}
            <Link href={`/admin/content/${resource.key}/new`} className="font-medium text-navy-700 underline">
              Add the first {resource.singularLabel.toLowerCase()}
            </Link>
            .
          </div>
        ) : (
          <ul className="divide-y divide-navy-50">
            {rows.map((row) => {
              const id = String(row[resource.primaryKey]);
              return (
                <li key={id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-navy-800">{String(row[resource.titleField] ?? "(untitled)")}</p>
                    {resource.subtitleField && row[resource.subtitleField] != null && row[resource.subtitleField] !== "" && (
                      <p className="truncate text-xs text-navy-400">{String(row[resource.subtitleField])}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Link href={`/admin/content/${resource.key}/${id}`} className="rounded-lg p-2 text-navy-400 hover:bg-navy-50 hover:text-navy-700" aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button onClick={() => handleDelete(id)} disabled={deletingId === id} className="rounded-lg p-2 text-navy-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50" aria-label="Delete">
                      {deletingId === id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
