import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Cookie-aware server client — reads/writes the signed-in admin session from
// cookies. Use this in Server Components, Server Actions and Route Handlers
// wherever you need to know *who* is signed in (e.g. the admin login check,
// or reading published content on the public site). It's still subject to
// Row Level Security, so it can only do what the signed-in user's policies
// allow.
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component that can't set cookies (e.g. a
          // page render, not a Server Action) — the middleware refreshes
          // the session instead, so this is safe to ignore.
        }
      },
    },
  });
}

// Privileged admin client — uses the service role key, which bypasses Row
// Level Security entirely. Never import this into a client component and
// never send its result to the browser. Only call it from server-only code
// (Server Actions / Route Handlers) AFTER verifying the caller is a signed-in
// admin via createServerSupabaseClient() above — this client trusts you to
// have already done that check, it does not do it for you.
export function createAdminSupabaseClient() {
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
