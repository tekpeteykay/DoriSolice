// Read layer for per-page section content (see page-registry.ts for what
// sections/fields exist and their default copy). Mirrors the pattern in
// lib/cms/queries.ts: try Supabase first, merge over the registry's
// defaults field-by-field, and always return a fully-populated object so
// components never have to guard against a missing key.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getPage } from "./page-registry";

export type SectionContent = Record<string, any>;
export type PageContent = Record<string, SectionContent>;

function getPublicSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

// Returns { [sectionKey]: { [fieldKey]: value } } for every section defined
// on this page in the registry — a saved value from Supabase overrides the
// registry default for that one field; anything not yet saved (or with no
// Supabase configured at all) falls back to the default automatically.
export async function getPageContent(pageKey: string): Promise<PageContent> {
  const page = getPage(pageKey);
  if (!page) return {};

  const result: PageContent = {};
  for (const section of page.sections) {
    result[section.key] = { ...section.defaults };
  }

  const supabase = getPublicSupabaseClient();
  if (!supabase) return result;

  const { data, error } = await supabase.from("page_content").select("section_key, fields").eq("page_key", pageKey);
  if (error || !data) return result;

  for (const row of data) {
    if (!result[row.section_key]) continue; // a stale row for a section that no longer exists
    const savedFields = (row.fields as Record<string, unknown>) ?? {};
    for (const [fieldKey, value] of Object.entries(savedFields)) {
      // Treat an explicitly-cleared empty string/array the same as "unset"
      // so a saved-but-blank field falls back to the default rather than
      // rendering nothing.
      const isEmpty = value === "" || value === null || value === undefined || (Array.isArray(value) && value.length === 0);
      if (!isEmpty) result[row.section_key][fieldKey] = value;
    }
  }

  return result;
}
