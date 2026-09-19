-- Dori Solic CMS — media storage
--
-- Run this once in the Supabase SQL editor, after schema.sql. It creates a
-- public "media" bucket (for images and videos uploaded through the admin
-- panel — hero slides, video testimonials, blog images, etc.) and the
-- policies that let anyone view files in it while only a signed-in admin
-- can upload, replace or delete them.

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public can view media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Admins can upload media"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Admins can update media"
  on storage.objects for update
  using (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Admins can delete media"
  on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');
