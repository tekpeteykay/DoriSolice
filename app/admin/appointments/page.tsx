import { mockAppointments } from "@/data/mock-admin-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { Appointment } from "@/types";

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
  completed: "bg-navy-50 text-navy-600",
};

function mapRow(row: any): Appointment {
  return {
    id: row.id,
    createdAt: row.created_at,
    serviceArea: row.service_area,
    appointmentTypeId: row.appointment_type_id,
    slot: { date: row.slot_date, time: row.slot_time },
    name: row.name,
    email: row.email,
    phone: row.phone,
    matterDescription: row.matter_description,
    preferredContactMethod: row.preferred_contact_method,
    marketingConsent: row.marketing_consent,
    status: row.status,
  };
}

async function getAppointments(): Promise<{ appointments: Appointment[]; isLive: boolean }> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("slot_date", { ascending: true })
      .order("slot_time", { ascending: true });
    if (!error && data) {
      return { appointments: data.map(mapRow), isLive: true };
    }
  } catch {
    // Falls through to illustrative data below — e.g. Supabase isn't
    // configured yet in this environment.
  }
  return { appointments: mockAppointments, isLive: false };
}

export default async function AdminAppointmentsPage() {
  const { appointments, isLive } = await getAppointments();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Appointments</h1>
      <p className="mt-1 text-navy-500">
        {isLive
          ? "Real requests submitted through the booking calendar, earliest first."
          : "Illustrative data — connect this table to your booking database and calendar integration."}
      </p>

      {isLive && appointments.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-navy-200 bg-white p-10 text-center text-navy-400">
          No appointment requests yet.
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-navy-100 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-navy-100 text-xs uppercase tracking-wide text-navy-400">
              <tr>
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Service</th>
                <th className="px-5 py-3">Date &amp; time</th>
                <th className="px-5 py-3">Contact</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-b border-navy-50 last:border-0">
                  <td className="px-5 py-4">
                    <p className="font-medium text-navy-800">{a.name}</p>
                    <p className="text-xs text-navy-400">{a.matterDescription}</p>
                  </td>
                  <td className="px-5 py-4 capitalize text-navy-600">{a.serviceArea}</td>
                  <td className="px-5 py-4 text-navy-600">
                    {formatDate(a.slot.date)} at {a.slot.time}
                  </td>
                  <td className="px-5 py-4 text-navy-600">
                    {a.email}
                    <br />
                    {a.phone}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColors[a.status]}`}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
