"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { SearchBar } from "@/components/search/SearchBar";
import { calculatorCategories } from "@/data/calculator-catalogue";
import type { SiteSettings } from "@/lib/cms/site-settings";

interface NavService {
  slug: string;
  category: string;
  title: string;
}

const MOBILE_PANEL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Navbar({ services, settings }: { services: NavService[]; settings: SiteSettings }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  // Which nested submenu is showing on the mobile drill-down nav ("Calculators" /
  // "Services"), or null when the top-level link list is showing.
  const [mobilePanel, setMobilePanel] = useState<string | null>(null);

  return (
    <>
      {/* Always the same solid/blurred navy background — never transparent.
          It used to go transparent above the scroll threshold, which only
          looked right on the home page (dark hero behind it). On every
          other page, whose top section is light, that made the white nav
          text unreadable against a white background. Keeping one consistent
          look across every page (CMS-driven ones included, since this is
          the single Navbar instance rendered from the root layout) avoids
          that entirely. */}
      <header className="fixed inset-x-0 top-0 z-50 bg-navy-900/90 shadow-card-dark backdrop-blur-xl transition-all duration-300">
        <div className="container relative flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo-mark.png" alt={settings.businessName} width={216} height={152} priority className="h-12 w-auto md:h-14" />
          </Link>

          {/* Mobile-only search: fills whatever room is actually free between
              the logo and the hamburger/CTA cluster, rather than a fixed
              guessed width, so it can grow enough to show the full
              placeholder while still sitting right next to the hamburger.
              Hidden at lg+, where the full nav + the xl search box take over. */}
          <div className="flex min-w-0 flex-1 justify-center px-3 lg:hidden">
            <div className="w-full min-w-0 max-w-xs">
              <SearchBar variant="nav" placeholder={settings.searchPlaceholder} />
            </div>
          </div>

          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setMegaOpen(null)}>
            {settings.mainNav.map((item) => {
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
              <SearchBar variant="nav" placeholder={settings.searchPlaceholder} />
            </div>
            <GradientButton href={settings.navCtaHref} size="sm" className="hidden !px-3.5 sm:inline-flex">
              {settings.navCtaLabel}
            </GradientButton>
            <button
              aria-label="Toggle menu"
              className="rounded-full p-2 text-white lg:hidden"
              onClick={() => {
                setMobileOpen((v) => !v);
                setMobilePanel(null);
              }}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header> deliberately: the header gets a
          backdrop-blur when mobileOpen is true, and a backdrop-filter on an
          ancestor creates a new containing block for position:fixed
          descendants — which collapsed this panel to zero height when it
          lived inside the header. As a sibling, it's fixed to the viewport
          like it should be. */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-hidden border-t border-white/10 bg-navy-900/55 shadow-card-dark backdrop-blur-2xl lg:hidden">
          <div className="h-full overflow-y-auto px-6 pb-8 pt-4">
            <AnimatePresence mode="wait" initial={false}>
              {mobilePanel === null ? (
                <motion.div
                  key="main"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.28, ease: MOBILE_PANEL_EASE }}
                >
                  <nav className="flex flex-col gap-1">
                    {settings.mainNav.map((item) => {
                      const hasMega = item.label === "Calculators" || item.label === "Services";
                      return hasMega ? (
                        <button
                          key={item.href}
                          type="button"
                          onClick={() => setMobilePanel(item.label)}
                          className="flex items-center justify-between rounded-xl px-4 py-3.5 text-left text-[26px] leading-tight font-medium text-white/90 hover:bg-white/10"
                        >
                          {item.label}
                          <ChevronRight className="h-6 w-6 shrink-0 text-white/45" />
                        </button>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-xl px-4 py-3.5 text-[26px] leading-tight font-medium text-white/90 hover:bg-white/10"
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                  <GradientButton
                    href={settings.navCtaHref}
                    animatedIcon
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 py-[14.5px] text-[19px] md:text-[19px]"
                  >
                    {settings.navCtaLabel}
                  </GradientButton>
                </motion.div>
              ) : (
                <motion.div
                  key="submenu"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.28, ease: MOBILE_PANEL_EASE }}
                >
                  <button
                    type="button"
                    onClick={() => setMobilePanel(null)}
                    className="mb-2 flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white/90"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                  <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-white/40">{mobilePanel}</p>
                  <nav className="flex flex-col gap-1">
                    {mobilePanel === "Calculators"
                      ? calculatorCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/calculators?category=${cat.id}`}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-xl px-4 py-3.5 text-lg font-medium text-white/90 hover:bg-white/10"
                          >
                            {cat.label}
                          </Link>
                        ))
                      : services.slice(0, 8).map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.category}/${s.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-xl px-4 py-3.5 text-lg font-medium text-white/90 hover:bg-white/10"
                          >
                            {s.title}
                          </Link>
                        ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
}
