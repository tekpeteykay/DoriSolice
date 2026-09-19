"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pageRegistry } from "@/lib/cms/page-registry";
import { cn } from "@/lib/utils";

export function PagesSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-full shrink-0 space-y-1 md:w-56">
      {pageRegistry.map((page) => {
        const href = `/admin/pages/${page.key}`;
        const active = pathname === href;
        return (
          <Link
            key={page.key}
            href={href}
            className={cn(
              "block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-navy-900 text-white" : "text-navy-600 hover:bg-navy-50"
            )}
          >
            {page.label}
          </Link>
        );
      })}
    </nav>
  );
}
