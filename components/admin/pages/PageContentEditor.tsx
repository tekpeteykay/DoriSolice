"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, ExternalLink, Loader2 } from "lucide-react";
import { FieldInput } from "@/components/admin/cms/FieldInput";
import { GradientButton } from "@/components/ui/GradientButton";
import { getPage, PageSectionConfig } from "@/lib/cms/page-registry";
import { createClient } from "@/lib/supabase/client";

async function revalidatePage(path: string) {
  try {
    await fetch("/api/revalidate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ targets: [{ path }] }) });
  } catch {
    // Best-effort — the page's own 60-second revalidate window will catch up regardless.
  }
}

export function PageContentEditor({ pageKey }: { pageKey: string }) {
  const page = getPage(pageKey);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, Record<string, unknown>>>({});

  useEffect(() => {
    if (!page) return;
    let cancelled = false;

    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase.from("page_content").select("section_key, fields").eq("page_key", pageKey);
      if (cancelled) return;

      const merged: Record<string, Record<string, unknown>> = {};
      for (const section of page!.sections) {
        merged[section.key] = { ...section.defaults };
      }
      if (!error && data) {
        for (const row of data) {
          if (merged[row.section_key]) merged[row.section_key] = { ...merged[row.section_key], ...(row.fields ?? {}) };
        }
      } else if (error) {
        setLoadError(error.message);
      }
      setValues(merged);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageKey]);

  if (!page) return <p className="text-sm text-navy-400">Unknown page.</p>;

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-sm text-navy-400">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading…
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{page.label}</h1>
          <p className="mt-1 text-sm text-navy-500">Every editable section on this page, in the order it appears.</p>
        </div>
        <Link href={page.path} target="_blank" className="flex shrink-0 items-center gap-1.5 rounded-full border border-navy-100 bg-white px-4 py-2.5 text-sm font-medium text-navy-600 hover:bg-navy-50">
          View page <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      {loadError && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{loadError}</span>
        </div>
      )}

      <div className="mt-6 space-y-6">
        {page.sections.map((section) => (
          <SectionCard
            key={section.key}
            pagePath={page.path}
            pageKey={pageKey}
            section={section}
            values={values[section.key] ?? section.defaults}
            onChange={(next) => setValues((prev) => ({ ...prev, [section.key]: next }))}
          />
        ))}
      </div>
    </div>
  );
}

function SectionCard({
  pageKey,
  pagePath,
  section,
  values,
  onChange,
}: {
  pageKey: string;
  pagePath: string;
  section: PageSectionConfig;
  values: Record<string, unknown>;
  onChange: (v: Record<string, unknown>) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (section.linkedResource) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-6">
        <h2 className="font-semibold text-navy-900">{section.label}</h2>
        <Link href={section.linkedResource.href} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:underline">
          {section.linkedResource.label} <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("page_content").upsert(
        { id: `${pageKey}::${section.key}`, page_key: pageKey, section_key: section.key, fields: values },
        { onConflict: "id" }
      );
      if (error) throw new Error(error.message);
      await revalidatePage(pagePath);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong saving this.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6">
      <h2 className="font-semibold text-navy-900">{section.label}</h2>

      <div className="mt-4 space-y-5">
        {section.fields.map((field) => (
          <div key={field.key}>
            <label className="mb-1.5 block text-sm font-semibold text-navy-800">{field.label}</label>
            {field.helpText && <p className="mb-1.5 text-xs text-navy-400">{field.helpText}</p>}
            <FieldInput field={field} value={values[field.key]} onChange={(v) => onChange({ ...values, [field.key]: v })} />
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-5 flex items-center gap-3 border-t border-navy-100 pt-5">
        <GradientButton type="button" icon={false} size="sm" onClick={handleSave} disabled={saving}>
          {saving ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </span>
          ) : (
            "Save section"
          )}
        </GradientButton>
        {saved && !saving && <span className="text-sm font-medium text-green-600">Saved — live on the site now.</span>}
      </div>
    </div>
  );
}
