import { guides } from "@/data/guides";
import { services } from "@/data/services";
import { calculators } from "@/lib/calculators/registry";
import { taxYear2026_27 } from "@/data/tax-years/2026-27";
import { formatDate } from "@/lib/utils";

export default function AdminContentPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Content &amp; Rules</h1>
      <p className="mt-1 text-navy-500">
        Everything below is driven by data files, not hard-coded UI — in production, this becomes the admin surface for a CMS/database (e.g. Supabase tables) so non-developers can update
        content without a code change.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-navy-100 bg-white p-6">
          <h2 className="font-semibold text-navy-900">Guides ({guides.length})</h2>
          <ul className="mt-4 max-h-72 space-y-2 overflow-y-auto text-sm">
            {guides.map((g) => (
              <li key={g.slug} className="flex items-center justify-between border-b border-navy-50 py-2 last:border-0">
                <span className="text-navy-700">{g.title}</span>
                <span className="text-xs text-navy-400">Reviewed {formatDate(g.lastReviewed)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-6">
          <h2 className="font-semibold text-navy-900">Services ({services.length})</h2>
          <ul className="mt-4 max-h-72 space-y-2 overflow-y-auto text-sm">
            {services.map((s) => (
              <li key={s.slug} className="flex items-center justify-between border-b border-navy-50 py-2 last:border-0">
                <span className="text-navy-700">{s.title}</span>
                <span className="text-xs capitalize text-navy-400">{s.category}</span>
              </li>
            ))}
          </ul>
        </div>

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
