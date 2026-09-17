"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GradientButton } from "@/components/ui/GradientButton";

const STORAGE_KEY = "dorisolic-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore — worst case the banner just reappears next visit.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-brand-gradient px-5 py-5 text-white shadow-[0_-12px_40px_rgba(3,34,54,0.35)] sm:px-8">
      <div className="container flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center text-sm leading-relaxed text-white sm:max-w-2xl sm:text-left">
          We use cookies to make this site work and to understand how it&rsquo;s used. See our{" "}
          <Link href="/cookies" className="font-semibold underline underline-offset-2">
            Cookie Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => choose("declined")}
            className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10 active:translate-y-0"
          >
            Decline
          </button>
          <GradientButton
            variant="dark"
            size="sm"
            icon={false}
            onClick={() => choose("accepted")}
            className="hover:-translate-y-0.5 active:translate-y-0"
          >
            Accept all
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
