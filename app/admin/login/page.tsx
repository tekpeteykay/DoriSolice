"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { GradientButton } from "@/components/ui/GradientButton";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Full navigation (not router.push) so the middleware re-runs against
    // the fresh session cookie before the admin area renders.
    window.location.href = next;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 bg-[radial-gradient(circle_at_top,rgba(62,116,154,0.25),transparent_60%)] px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-xl font-bold text-white">
            Dori<span className="text-gradient">Solic</span>
          </Link>
          <p className="mt-2 text-sm text-white/50">Sign in to manage the site</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
          <h1 className="text-xl font-semibold text-navy-900">Admin sign in</h1>
          <p className="mt-1 text-sm text-navy-500">Use the admin account you created in Supabase.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-700">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-navy-100 bg-white py-2.5 pl-10 pr-3 text-sm text-navy-900 outline-none transition-colors focus:border-navy-400"
                  placeholder="you@dorisolic.co.uk"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy-700">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-navy-100 bg-white py-2.5 pl-10 pr-3 text-sm text-navy-900 outline-none transition-colors focus:border-navy-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <GradientButton
              type="submit"
              icon={false}
              className="w-full disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </GradientButton>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          <Link href="/" className="hover:text-white/70">
            ← Back to the site
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
