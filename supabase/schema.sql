-- Dori Solic CMS schema
--
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New
-- query -> paste this whole file -> Run). It creates every table the CMS
-- needs, turns on Row Level Security everywhere, and adds the policies that
-- let the public site read published content while only signed-in admins
-- can write.
--
-- Deliberately NOT included here: tax-years / immigration-rules /
-- benefit-rates. Those stay as versioned code in /data — they're inputs to
-- calculator logic, not editorial content, and migrating them needs more
-- care (effective-dating, avoiding a bad edit breaking every calculator).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Shared: auto-update `updated_at` on every row change.
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------------
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null check (category in ('immigration', 'tax', 'benefits', 'general')),
  title text not null,
  short_description text not null,
  problem_statement text not null,
  who_its_for text[] not null default '{}',
  what_we_help_with text[] not null default '{}',
  process jsonb not null default '[]',        -- [{ "step": "...", "description": "..." }]
  documents_needed text[] not null default '{}',
  typical_questions jsonb not null default '[]', -- [{ "question": "...", "answer": "..." }]
  related_calculators text[] default '{}',
  related_guides text[] default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger services_set_updated_at before update on services
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- guides
-- ---------------------------------------------------------------------------
create table guides (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null,
  title text not null,
  summary text not null,
  read_time_minutes int not null default 5,
  last_reviewed date not null default current_date,
  reviewer text,
  needs_review boolean not null default false,
  body jsonb not null default '[]',           -- GuideSection[] — paragraph/heading/list/callout blocks
  related_calculators text[] default '{}',
  related_services text[] default '{}',
  related_guides text[] default '{}',
  sources jsonb not null default '[]',         -- [{ "label": "...", "url": "...", "publisher": "..." }]
  seo_description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger guides_set_updated_at before update on guides
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- faqs
-- ---------------------------------------------------------------------------
create table faqs (
  id text primary key,                          -- keep readable ids, e.g. "faq-5"
  category text not null,
  question text not null,
  answer text not null,
  related_calculator text,
  related_guide text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger faqs_set_updated_at before update on faqs
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- testimonials (text)
-- ---------------------------------------------------------------------------
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  service text not null,
  quote text not null,
  rating int not null default 5 check (rating between 1 and 5),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger testimonials_set_updated_at before update on testimonials
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- video_testimonials
-- ---------------------------------------------------------------------------
create table video_testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  service text not null,
  quote text not null,
  poster_url text not null,                     -- Supabase Storage public URL
  video_url text not null,                       -- Supabase Storage public URL
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger video_testimonials_set_updated_at before update on video_testimonials
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- updates (the blog / "See What's New")
-- ---------------------------------------------------------------------------
create table updates (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  summary text not null,
  body text not null,
  image_url text,                                -- falls back to lib/update-images.ts mapping if null
  published date not null default current_date,
  last_reviewed date not null default current_date,
  applies_from date not null default current_date,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger updates_set_updated_at before update on updates
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- hero_slides
-- ---------------------------------------------------------------------------
create table hero_slides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null,
  cta_label text not null,
  cta_href text not null,
  image_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger hero_slides_set_updated_at before update on hero_slides
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- appointment_types (reference data for the booking flow)
-- ---------------------------------------------------------------------------
create table appointment_types (
  id text primary key,
  label text not null,
  duration_minutes int not null,
  description text not null,
  price_label text not null,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- appointments — contains PII, public can INSERT (booking form), only an
-- authenticated admin can read/update/delete.
-- ---------------------------------------------------------------------------
create table appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  service_area text not null,
  appointment_type_id text not null,
  slot_date date not null,
  slot_time text not null,
  name text not null,
  email text not null,
  phone text not null,
  matter_description text not null,
  preferred_contact_method text not null,
  marketing_consent boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed'))
);

-- ---------------------------------------------------------------------------
-- enquiries — same PII treatment as appointments.
-- ---------------------------------------------------------------------------
create table enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  topic text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in-progress', 'resolved'))
);

-- ---------------------------------------------------------------------------
-- Helpful indexes for the lookups the site actually does.
-- ---------------------------------------------------------------------------
create index services_category_idx on services (category);
create index guides_category_idx on guides (category);
create index updates_published_idx on updates (is_published, published desc);
create index appointments_status_idx on appointments (status);
create index enquiries_status_idx on enquiries (status);

-- ---------------------------------------------------------------------------
-- Row Level Security — on by default the moment a table has any policy, but
-- enabling it explicitly means a table with NO policy yet still denies all
-- access rather than silently allowing it.
-- ---------------------------------------------------------------------------
alter table services enable row level security;
alter table guides enable row level security;
alter table faqs enable row level security;
alter table testimonials enable row level security;
alter table video_testimonials enable row level security;
alter table updates enable row level security;
alter table hero_slides enable row level security;
alter table appointment_types enable row level security;
alter table appointments enable row level security;
alter table enquiries enable row level security;

-- Editorial content: anyone can read, only a signed-in admin can write.
create policy "Public can read services" on services for select using (true);
create policy "Admins can write services" on services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public can read guides" on guides for select using (true);
create policy "Admins can write guides" on guides for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public can read faqs" on faqs for select using (true);
create policy "Admins can write faqs" on faqs for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public can read testimonials" on testimonials for select using (true);
create policy "Admins can write testimonials" on testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public can read video testimonials" on video_testimonials for select using (true);
create policy "Admins can write video testimonials" on video_testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public can read hero slides" on hero_slides for select using (true);
create policy "Admins can write hero slides" on hero_slides for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public can read appointment types" on appointment_types for select using (true);
create policy "Admins can write appointment types" on appointment_types for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Updates: the public only ever sees published posts; an admin previewing a
-- draft needs to be signed in to see it.
create policy "Public can read published updates" on updates for select using (is_published = true or auth.role() = 'authenticated');
create policy "Admins can write updates" on updates for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- PII tables: anyone can submit (the public booking/contact forms run
-- unauthenticated), but only a signed-in admin can read or manage them.
create policy "Anyone can submit an appointment" on appointments for insert with check (true);
create policy "Admins can manage appointments" on appointments for select using (auth.role() = 'authenticated');
create policy "Admins can update appointments" on appointments for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can delete appointments" on appointments for delete using (auth.role() = 'authenticated');

create policy "Anyone can submit an enquiry" on enquiries for insert with check (true);
create policy "Admins can manage enquiries" on enquiries for select using (auth.role() = 'authenticated');
create policy "Admins can update enquiries" on enquiries for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admins can delete enquiries" on enquiries for delete using (auth.role() = 'authenticated');
