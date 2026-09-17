import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

// NOTE: this admin area is a structural scaffold only — it renders mock
// data so the information architecture (dashboard, appointments, enquiries,
// content & rules management) can be reviewed and built out. Before any
// real use, wire it up to authentication (e.g. Supabase Auth) and gate
// every route here behind a signed-in, authorised admin session.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
