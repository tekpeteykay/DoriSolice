-- Adds an optional background media field for the hero section's LEFT card
-- (the navy card with the infinity mark and headline/CTA) — separate from
-- `image_url`, which is the RIGHT-hand banner image/GIF/video.
--
-- Run this once in the Supabase SQL editor, after schema.sql. Safe to
-- re-run — `add column if not exists` is a no-op if it's already there.

alter table hero_slides add column if not exists card_media_url text;
