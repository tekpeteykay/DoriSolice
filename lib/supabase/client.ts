"use client";

import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client — uses the public anon key, which is subject
// to Row Level Security policies (see supabase/schema.sql). Safe to import
// from any client component. Public pages that only ever read published
// content can also use this from the server without needing the service
// role key.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
