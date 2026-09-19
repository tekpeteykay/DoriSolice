"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, ChevronUp, ChevronDown, Upload, Loader2 } from "lucide-react";
import { FieldConfig } from "@/lib/cms/types";
import { uploadMedia } from "@/lib/cms/storage";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-navy-100 bg-white px-3 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-navy-400";

interface FieldInputProps {
  field: FieldConfig;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function FieldInput({ field, value, onChange }: FieldInputProps) {
  switch (field.type) {
    case "text":
      return (
        <input
          type="text"
          className={inputClass}
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "textarea":
      return (
        <textarea
          className={cn(inputClass, "min-h-[100px] resize-y")}
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "number":
      return (
        <input
          type="number"
          className={inputClass}
          value={value === null || value === undefined ? "" : (value as number)}
          required={field.required}
          onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
        />
      );

    case "date":
      return (
        <input
          type="date"
          className={inputClass}
          value={(value as string)?.slice(0, 10) ?? ""}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "boolean":
      return (
        <label className="flex items-center gap-2.5 text-sm text-navy-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-navy-200 text-navy-900 focus:ring-navy-400"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          {value ? "Yes" : "No"}
        </label>
      );

    case "select":
      return (
        <select className={inputClass} value={(value as string) ?? ""} required={field.required} onChange={(e) => onChange(e.target.value)}>
          <option value="" disabled>
            Select…
          </option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case "string-array":
      return <StringArrayInput field={field} value={(value as string[]) ?? []} onChange={onChange} />;

    case "object-array":
      return <ObjectArrayInput field={field} value={(value as Record<string, string>[]) ?? []} onChange={onChange} />;

    case "guide-body":
      return <GuideBodyInput value={(value as GuideBlock[]) ?? []} onChange={onChange} />;

    case "image":
      return <MediaInput field={field} value={(value as string) ?? ""} onChange={onChange} accept="image/*" kind="image" />;

    case "video":
      return <MediaInput field={field} value={(value as string) ?? ""} onChange={onChange} accept="video/*" kind="video" />;

    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// string-array — a plain list of text values (e.g. "Who it's for" bullets)
// ---------------------------------------------------------------------------
function StringArrayInput({ field, value, onChange }: { field: FieldConfig; value: string[]; onChange: (v: string[]) => void }) {
  function update(i: number, next: string) {
    const copy = [...value];
    copy[i] = next;
    onChange(copy);
  }
  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...value, ""]);
  }

  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input type="text" className={inputClass} value={item} onChange={(e) => update(i, e.target.value)} placeholder={field.itemLabel ? `Add a ${field.itemLabel}…` : undefined} />
          <button type="button" onClick={() => remove(i)} className="shrink-0 rounded-lg p-2 text-navy-300 hover:bg-red-50 hover:text-red-600" aria-label="Remove">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-navy-500 hover:bg-navy-50">
        <Plus className="h-3.5 w-3.5" /> Add {field.itemLabel || "item"}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// object-array — a list of small structured rows (e.g. process steps,
// typical questions, sources)
// ---------------------------------------------------------------------------
function ObjectArrayInput({ field, value, onChange }: { field: FieldConfig; value: Record<string, string>[]; onChange: (v: Record<string, string>[]) => void }) {
  const subFields = field.subFields ?? [];

  function update(i: number, key: string, next: string) {
    const copy = value.map((row, idx) => (idx === i ? { ...row, [key]: next } : row));
    onChange(copy);
  }
  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const copy = [...value];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  }
  function add() {
    const blank = Object.fromEntries(subFields.map((sf) => [sf.key, ""]));
    onChange([...value, blank]);
  }

  return (
    <div className="space-y-3">
      {value.map((row, i) => (
        <div key={i} className="rounded-xl border border-navy-100 bg-navy-50/40 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
              {field.itemLabel || "Item"} {i + 1}
            </span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="rounded-lg p-1.5 text-navy-300 hover:bg-white hover:text-navy-600 disabled:opacity-30" aria-label="Move up">
                <ChevronUp className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} className="rounded-lg p-1.5 text-navy-300 hover:bg-white hover:text-navy-600 disabled:opacity-30" aria-label="Move down">
                <ChevronDown className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => remove(i)} className="rounded-lg p-1.5 text-navy-300 hover:bg-red-50 hover:text-red-600" aria-label="Remove">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {subFields.map((sf) => (
              <div key={sf.key}>
                <label className="mb-1 block text-xs font-medium text-navy-500">{sf.label}</label>
                {sf.type === "textarea" ? (
                  <textarea className={cn(inputClass, "min-h-[70px] resize-y bg-white")} value={row[sf.key] ?? ""} onChange={(e) => update(i, sf.key, e.target.value)} />
                ) : (
                  <input type="text" className={cn(inputClass, "bg-white")} value={row[sf.key] ?? ""} onChange={(e) => update(i, sf.key, e.target.value)} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-navy-500 hover:bg-navy-50">
        <Plus className="h-3.5 w-3.5" /> Add {field.itemLabel || "item"}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// guide-body — the guide/blog content editor: an ordered list of
// paragraph / heading / list / callout blocks, matching GuideSection[].
// ---------------------------------------------------------------------------
type GuideBlock = { type: "paragraph" | "heading" | "list" | "callout"; text?: string; items?: string[]; tone?: "info" | "warning" };

const BLOCK_TYPES: { value: GuideBlock["type"]; label: string }[] = [
  { value: "paragraph", label: "Paragraph" },
  { value: "heading", label: "Heading" },
  { value: "list", label: "Bullet list" },
  { value: "callout", label: "Callout box" },
];

function blankBlock(type: GuideBlock["type"]): GuideBlock {
  if (type === "list") return { type, items: [""] };
  if (type === "callout") return { type, text: "", tone: "info" };
  return { type, text: "" };
}

function GuideBodyInput({ value, onChange }: { value: GuideBlock[]; onChange: (v: GuideBlock[]) => void }) {
  function update(i: number, next: GuideBlock) {
    onChange(value.map((b, idx) => (idx === i ? next : b)));
  }
  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const copy = [...value];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  }
  function add(type: GuideBlock["type"]) {
    onChange([...value, blankBlock(type)]);
  }

  return (
    <div className="space-y-3">
      {value.length === 0 && <p className="text-sm text-navy-400">No content blocks yet — add one below.</p>}
      {value.map((block, i) => (
        <div key={i} className="rounded-xl border border-navy-100 bg-navy-50/40 p-3">
          <div className="mb-2 flex items-center justify-between">
            <select
              className="rounded-lg border border-navy-100 bg-white px-2 py-1 text-xs font-semibold uppercase tracking-wide text-navy-500"
              value={block.type}
              onChange={(e) => update(i, blankBlock(e.target.value as GuideBlock["type"]))}
            >
              {BLOCK_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="rounded-lg p-1.5 text-navy-300 hover:bg-white hover:text-navy-600 disabled:opacity-30" aria-label="Move up">
                <ChevronUp className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} className="rounded-lg p-1.5 text-navy-300 hover:bg-white hover:text-navy-600 disabled:opacity-30" aria-label="Move down">
                <ChevronDown className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => remove(i)} className="rounded-lg p-1.5 text-navy-300 hover:bg-red-50 hover:text-red-600" aria-label="Remove">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {(block.type === "paragraph" || block.type === "heading") && (
            <textarea
              className={cn(inputClass, "min-h-[70px] resize-y bg-white")}
              value={block.text ?? ""}
              placeholder={block.type === "heading" ? "Heading text" : "Paragraph text"}
              onChange={(e) => update(i, { ...block, text: e.target.value })}
            />
          )}

          {block.type === "callout" && (
            <div className="space-y-2">
              <select className="rounded-lg border border-navy-100 bg-white px-2 py-1.5 text-sm" value={block.tone ?? "info"} onChange={(e) => update(i, { ...block, tone: e.target.value as "info" | "warning" })}>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
              </select>
              <textarea className={cn(inputClass, "min-h-[70px] resize-y bg-white")} value={block.text ?? ""} placeholder="Callout text" onChange={(e) => update(i, { ...block, text: e.target.value })} />
            </div>
          )}

          {block.type === "list" && (
            <div className="space-y-2">
              {(block.items ?? []).map((item, itemI) => (
                <div key={itemI} className="flex items-center gap-2">
                  <input
                    type="text"
                    className={cn(inputClass, "bg-white")}
                    value={item}
                    onChange={(e) => {
                      const items = [...(block.items ?? [])];
                      items[itemI] = e.target.value;
                      update(i, { ...block, items });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => update(i, { ...block, items: (block.items ?? []).filter((_, idx) => idx !== itemI) })}
                    className="shrink-0 rounded-lg p-2 text-navy-300 hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove list item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => update(i, { ...block, items: [...(block.items ?? []), ""] })}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-navy-500 hover:bg-white"
              >
                <Plus className="h-3.5 w-3.5" /> Add bullet
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="flex flex-wrap gap-2">
        {BLOCK_TYPES.map((t) => (
          <button key={t.value} type="button" onClick={() => add(t.value)} className="flex items-center gap-1.5 rounded-lg border border-navy-100 bg-white px-2.5 py-1.5 text-sm font-medium text-navy-600 hover:bg-navy-50">
            <Plus className="h-3.5 w-3.5" /> {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// image / video — uploads to Supabase Storage, or paste a URL directly.
// ---------------------------------------------------------------------------
function MediaInput({ field, value, onChange, accept, kind }: { field: FieldConfig; value: string; onChange: (v: string) => void; accept: string; kind: "image" | "video" }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadMedia(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      {value && kind === "image" && (
        <div className="relative h-32 w-32 overflow-hidden rounded-xl border border-navy-100 bg-navy-50">
          <Image src={value} alt="" fill sizes="128px" className="object-cover" unoptimized />
        </div>
      )}
      {value && kind === "video" && (
        <video src={value} controls className="h-40 rounded-xl border border-navy-100 bg-black" />
      )}

      <div className="flex items-center gap-2">
        <input type="text" className={inputClass} value={value} placeholder="Paste a URL, or upload a file →" onChange={(e) => onChange(e.target.value)} />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-navy-100 bg-white px-3 py-2.5 text-sm font-medium text-navy-600 hover:bg-navy-50 disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Uploading…" : "Upload"}
        </button>
        <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {field.helpText && <p className="text-xs text-navy-400">{field.helpText}</p>}
    </div>
  );
}
