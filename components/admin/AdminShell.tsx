"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CalendarCheck2, Inbox, FileText, Layers, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarCheck2 },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/content", label: "Content & Rules", icon: FileText },
  { href: "/admin/pages", label: "Page Content", icon: Layers },
  { href: "/admin/content/site_settings", label: "Site Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // The login page renders its own full-screen layout — no sidebar chrome
  // for a page you see precisely because you're not signed in yet.
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-slate-100 pt-28">
      <aside className="hidden w-64 shrink-0 border-r border-navy-100 bg-white py-8 md:block">
        <div className="px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">Dori Solic</p>
          <p className="font-bold text-navy-900">Admin</p>
        </div>
        <nav className="mt-8 space-y-1 px-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-navy-900 text-white" : "text-navy-600 hover:bg-navy-50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <Link href="/" className="mt-6 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-400 hover:bg-navy-50">
            <Settings className="h-4 w-4" /> Back to site
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-400 hover:bg-navy-50"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </nav>
      </aside>
      <main className="flex-1 px-6 py-10 md:px-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
