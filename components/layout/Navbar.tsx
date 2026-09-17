"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/site-config";
import { GradientButton } from "@/components/ui/GradientButton";
import { SearchBar } from "@/components/search/SearchBar";
import { calculatorCategories } from "@/data/calculator-catalogue";
import { services } from "@/data/services";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen ? "bg-navy-900/90 backdrop-blur-xl shadow-card-dark" : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo-mark.png" alt="Dori Solic" width={216} height={152} priority className="h-12 w-auto md:h-14" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setMegaOpen(null)}>
          {mainNav.map((item) => {
            const hasMega = item.label === "Calculators" || item.label === "Services";
            return (
              <div key={item.href} className="relative" onMouseEnter={() => hasMega && setMegaOpen(item.label)}>
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                  {hasMega && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>

                {hasMega && megaOpen === item.label && (
                  <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3">
                    <div className="grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-navy-900/95 p-4 shadow-card-dark backdrop-blur-xl">
                      {item.label === "Calculators"
                        ? calculatorCategories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/calculators?category=${cat.id}`}
                              className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                            >
                              {cat.label}
                            </Link>
                          ))
                        : services.slice(0, 8).map((s) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.category}/${s.slug}`}
                              className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                            >
                              {s.title}
                            </Link>
                          ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden w-56 xl:block">
            <SearchBar variant="nav" />
          </div>
          <GradientButton href="/appointment" size="sm" className="hidden !px-3.5 sm:inline-flex">
            Talk to Us
          </GradientButton>
          <button
            aria-label="Toggle menu"
            className="rounded-full p-2 text-white lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy-900 px-6 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-white/85 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <GradientButton href="/appointment" className="mt-4 w-full">
            Talk to Us
          </GradientButton>
        </div>
      )}
    </header>
  );
}
