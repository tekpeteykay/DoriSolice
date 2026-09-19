import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// Called by the admin panel right after a content save or delete, so the
// public site reflects the change immediately instead of waiting for the
// page's normal cache window to expire. Gated by the signed-in admin
// session cookie (same one middleware.ts checks) rather than a shared
// secret — there's nothing to leak by calling this, but only an
// authenticated admin should be able to trigger it.
export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  let paths: string[] = [];
  try {
    const body = await request.json();
    if (Array.isArray(body.paths)) paths = body.paths.filter((p: unknown) => typeof p === "string");
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, paths });
}
