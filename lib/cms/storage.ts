import { createClient } from "@/lib/supabase/client";

export const MEDIA_BUCKET = "media";

/**
 * Uploads a file to the "media" Supabase Storage bucket and returns its
 * public URL. Requires the "media" bucket to exist and RLS policies that
 * let signed-in admins write to it — see supabase/storage-setup.sql.
 */
export async function uploadMedia(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "bin";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw new Error(
      error.message.includes("Bucket not found")
        ? "The 'media' storage bucket doesn't exist yet — run supabase/storage-setup.sql in the Supabase SQL editor first."
        : error.message
    );
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
