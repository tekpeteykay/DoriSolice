import Link from "next/link";
import { ArrowRight, DownloadCloud } from "lucide-react";
import { calculators } from "@/lib/calculators/registry";
import { taxYear2026_27 } from "@/data/tax-years/2026-27";
import { formatDate } from "@/lib/utils";
import { resources } from "@/lib/cms/resources";

export default function AdminContentPage() {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Content &amp; Rules</h1>
          <p className="mt-1 max-w-2xl text-navy-500">
            Everything in the section below is live — changes here update the site immediately, no code or developer needed. Calculators and tax-year/immigration/benefit rules stay
            code-managed for now, shown read-only underneath.
          </p>
        </div>
        <Link href="/admin/content/import" className="flex shrink-0 items-center gap-1.5 rounded-full border border-navy-100 bg-white px-4 py-2.5 text-sm font-medium text-navy-600 hover:bg-navy-50">
          <DownloadCloud className="h-4 w-4" /> Import existing content
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => (
          <Link key={r.key} href={`/admin/content/${r.key}`} className="group flex flex-col justify-between rounded-2xl border border-navy-100 bg-white p-5 transition-colors hover:border-navy-300">
            <div>
              <h2 className="font-semibold text-navy-900">{r.label}</h2>
              <p className="mt-1 text-sm text-navy-500">{r.description}</p>
            </div>
            <span className="mt-4 flex items-center gap-1 text-sm font-medium text-navy-600">
              Manage <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold text-navy-900">Code-managed (read-only)</h2>
      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-navy-100 bg-white p-6">
          <h2 className="font-semibold text-navy-900">Calculators ({calculators.length})</h2>
          <ul className="mt-4 max-h-72 space-y-2 overflow-y-auto text-sm">
            {calculators.map((c) => (
              <li key={c.id} className="flex items-center justify-between border-b border-navy-50 py-2 last:border-0">
                <span className="text-navy-700">{c.title}</span>
                <span className="text-xs text-navy-400">Updated {formatDate(c.lastUpdated)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-6">
          <h2 className="font-semibold text-navy-900">Rule data — {taxYear2026_27.taxYear}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center justify-between border-b border-navy-50 py-2">
              <span className="text-navy-700">Personal Allowance</span>
              <span className="text-navy-500">£{taxYear2026_27.personalAllowance.value.toLocaleString()}</span>
            </li>
            <li className="flex items-center justify-between border-b border-navy-50 py-2">
              <span className="text-navy-700">Basic rate</span>
              <span className="text-navy-500">{(taxYear2026_27.incomeTax.basicRate.value * 100).toFixed(0)}%</span>
            </li>
            <li className="flex items-center justify-between border-b border-navy-50 py-2">
              <span className="text-navy-700">NI primary threshold</span>
              <span className="text-navy-500">£{taxYear2026_27.nationalInsurance.primaryThreshold.value.toLocaleString()}</span>
            </li>
            <li className="flex items-center justify-between py-2">
              <span className="text-navy-700">VAT standard rate</span>
              <span className="text-navy-500">{(taxYear2026_27.vatStandardRate.value * 100).toFixed(0)}%</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-navy-400">Source data lives in /data/tax-years, /data/immigration-rules and /data/benefit-rates — edit those files (or the database table that replaces them) to update every calculator at once.</p>
        </div>
      </div>
    </div>
  );
}
