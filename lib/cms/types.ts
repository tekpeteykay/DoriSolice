// ---------------------------------------------------------------------------
// The CMS is config-driven: one generic list view and one generic form
// render every content type, based on a ResourceConfig describing that
// type's Supabase table and fields. Adding a new editable content type to
// the admin means adding one entry to lib/cms/resources.ts, not building a
// new page.
// ---------------------------------------------------------------------------

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "date"
  | "select"
  | "string-array" // e.g. ["Passports", "Photos"] — a list of plain strings
  | "object-array" // e.g. [{ step, description }] — a list of small structured rows
  | "guide-body" // the guide/blog paragraph+heading+list+callout block editor
  | "image" // uploads to Supabase Storage, stores the public URL
  | "video"; // uploads to Supabase Storage, stores the public URL

export interface SelectOption {
  value: string;
  label: string;
}

export interface SubField {
  key: string;
  label: string;
  type: "text" | "textarea";
}

export interface FieldConfig {
  key: string; // column name in the Supabase table
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: SelectOption[]; // for "select"
  subFields?: SubField[]; // for "object-array"
  itemLabel?: string; // for "object-array"/"string-array" — e.g. "step"
}

export interface ResourceConfig {
  key: string; // used in the admin URL, e.g. "services"
  table: string; // the Supabase table name
  label: string; // plural, e.g. "Services"
  singularLabel: string; // e.g. "Service"
  description: string;
  primaryKey: string; // "id" for most tables, but faqs/appointment_types use a text "id" too — same either way
  slugField?: string; // if set, new rows auto-generate this from titleField unless the user overrides it
  titleField: string; // column shown as the row's title in the list
  subtitleField?: string; // column shown as secondary text in the list
  orderBy: { column: string; ascending?: boolean };
  fields: FieldConfig[];
  defaultValues?: Record<string, unknown>;
}
