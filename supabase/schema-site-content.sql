-- Site-wide content: business details, navigation, footer, and per-page
-- section copy (headings, intros, repeating cards, legal-page bodies).
--
-- Run this once in the Supabase SQL editor, after schema.sql and
-- storage-setup.sql have already been run.

-- ---------------------------------------------------------------------------
-- site_settings — a single row (id = 'default') holding everything that's
-- shared across every page: contact details, social links, the main nav,
-- the footer, and a handful of shared button labels / placeholder text.
-- ---------------------------------------------------------------------------
create table if not exists site_settings (
  id text primary key default 'default',
  business_name text,
  tagline text,
  description text,
  phone text,
  email text,
  address text,
  hours text,
  regulatory text,
  search_placeholder text,
  nav_cta_label text,
  nav_cta_href text,
  footer_cta_eyebrow text,
  footer_cta_heading text,
  footer_cta_button_label text,
  copyright_text text,
  social_links jsonb not null default '[]',   -- [{ "label", "href", "icon" }]
  main_nav jsonb not null default '[]',        -- [{ "label", "href" }]
  footer_links jsonb not null default '[]',    -- [{ "group", "label", "href" }]
  updated_at timestamptz not null default now()
);
create trigger site_settings_set_updated_at before update on site_settings
  for each row execute function set_updated_at();
alter table site_settings enable row level security;
create policy "Public can read site settings" on site_settings for select using (true);
create policy "Admins can write site settings" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- page_content — one row per (page, section): the headings, intro copy,
-- repeating cards and legal-page bodies that live directly on a page rather
-- than in one of the editorial tables above (services, guides, etc).
-- `fields` holds whatever that section's field config defines — see
-- lib/cms/page-registry.ts, which is the single source of truth for what
-- fields exist and what they default to when no row exists yet.
-- ---------------------------------------------------------------------------
create table if not exists page_content (
  id text primary key,              -- `${page_key}::${section_key}`
  page_key text not null,
  section_key text not null,
  sort_order int not null default 0,
  fields jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  unique (page_key, section_key)
);
create index if not exists page_content_page_key_idx on page_content (page_key);
create trigger page_content_set_updated_at before update on page_content
  for each row execute function set_updated_at();
alter table page_content enable row level security;
create policy "Public can read page content" on page_content for select using (true);
create policy "Admins can write page content" on page_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
