import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-navy-500">
      <Link href="/" className="hover:text-red-600">
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5" />
          {item.href ? (
            <Link href={item.href} className="hover:text-red-600">
              {item.label}
            </Link>
          ) : (
            <span className="text-navy-800">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
