import Link from "next/link";
import { mockAppointments, mockEnquiries } from "@/data/mock-admin-data";
import { calculators } from "@/lib/calculators/registry";
import { AlertTriangle, CalendarCheck2, Inbox, TrendingUp } from "lucide-react";
import { getGuides, getUpdates } from "@/lib/cms/queries";

export const revalidate = 60;

function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: any }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-navy-500">{label}</p>
        <Icon className="h-4 w-4 text-navy-300" />
      </div>
      <p className="mt-2 text-3xl font-bold text-navy-900">{value}</p>
    </div>
  );
}

export default async function AdminOverviewPage() {
  const [guides, updates] = await Promise.all([getGuides(), getUpdates()]);
  const needsReview = guides.filter((g) => g.needsReview);
  const popularCalculators = calculators.filter((c) => c.popular);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Overview</h1>
      <p className="mt-1 text-navy-500">A snapshot of activity across the platform. All data below is illustrative.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Appointments this month" value={mockAppointments.length} icon={CalendarCheck2} />
        <StatCard label="Open enquiries" value={mockEnquiries.filter((e) => e.status !== "resolved").length} icon={Inbox} />
        <StatCard label="Guides needing review" value={needsReview.length} icon={AlertTriangle} />
        <StatCard label="Live calculators" value={calculators.length} icon={TrendingUp} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-navy-100 bg-white p-6">
          <h2 className="font-semibold text-navy-900">Recent appointments</h2>
          <div className="mt-4 space-y-3">
            {mockAppointments.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-center justify-between border-b border-navy-50 pb-3 text-sm last:border-0">
                <div>
                  <p className="font-medium text-navy-800">{a.name}</p>
                  <p className="text-navy-400">{a.serviceArea} · {a.slot.date} at {a.slot.time}</p>
                </div>
                <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold capitalize text-navy-600">{a.status}</span>
              </div>
            ))}
          </div>
          <Link href="/admin/appointments" className="mt-4 inline-block text-sm font-semibold text-red-600 hover:underline">
            View all appointments →
          </Link>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-6">
          <h2 className="font-semibold text-navy-900">Content needing review</h2>
          <div className="mt-4 space-y-3">
            {needsReview.slice(0, 4).map((g) => (
              <div key={g.slug} className="flex items-center justify-between border-b border-navy-50 pb-3 text-sm last:border-0">
                <p className="font-medium text-navy-800">{g.title}</p>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Needs review</span>
              </div>
            ))}
          </div>
          <Link href="/admin/content" className="mt-4 inline-block text-sm font-semibold text-red-600 hover:underline">
            Manage content →
          </Link>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-6">
          <h2 className="font-semibold text-navy-900">Popular calculators</h2>
          <div className="mt-4 space-y-3">
            {popularCalculators.map((c) => (
              <div key={c.id} className="flex items-center justify-between border-b border-navy-50 pb-3 text-sm last:border-0">
                <p className="font-medium text-navy-800">{c.title}</p>
                <span className="text-navy-400">{c.rulesVersion}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-6">
          <h2 className="font-semibold text-navy-900">Recent site updates</h2>
          <div className="mt-4 space-y-3">
            {updates.slice(0, 4).map((u) => (
              <div key={u.slug} className="border-b border-navy-50 pb-3 text-sm last:border-0">
                <p className="font-medium text-navy-800">{u.title}</p>
                <p className="text-navy-400">{u.category} · applies from {u.appliesFrom}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
