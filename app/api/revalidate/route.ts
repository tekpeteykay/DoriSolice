import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

interface Target {
  path: string;
  type?: "layout" | "page";
}

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

  let targets: Target[] = [];
  try {
    const body = await request.json();
    if (Array.isArray(body.targets)) {
      targets = body.targets.filter((t: unknown): t is Target => !!t && typeof t === "object" && typeof (t as Target).path === "string");
    } else if (Array.isArray(body.paths)) {
      // Back-compat with older callers that just send a plain path list.
      targets = body.paths.filter((p: unknown): p is string => typeof p === "string").map((path: string) => ({ path }));
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  for (const target of targets) {
    revalidatePath(target.path, target.type);
  }

  return NextResponse.json({ revalidated: true, targets });
}
