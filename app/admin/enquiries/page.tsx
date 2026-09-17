import { mockEnquiries } from "@/data/mock-admin-data";
import { formatDate } from "@/lib/utils";

const statusColors: Record<string, string> = {
  new: "bg-red-50 text-red-700",
  "in-progress": "bg-amber-50 text-amber-700",
  resolved: "bg-green-50 text-green-700",
};

export default function AdminEnquiriesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Enquiries</h1>
      <p className="mt-1 text-navy-500">Messages submitted through the contact form. Illustrative data.</p>

      <div className="mt-8 space-y-4">
        {mockEnquiries.map((e) => (
          <div key={e.id} className="rounded-2xl border border-navy-100 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-navy-900">{e.name} — {e.topic}</p>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColors[e.status]}`}>{e.status.replace("-", " ")}</span>
            </div>
            <p className="mt-2 text-sm text-navy-600">{e.message}</p>
            <p className="mt-3 text-xs text-navy-400">
              {e.email} · {formatDate(e.createdAt.slice(0, 10))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
