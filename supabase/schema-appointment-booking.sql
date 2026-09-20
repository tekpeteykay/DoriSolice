-- Real availability checking for the appointment booking calendar.
--
-- Run this once in the Supabase SQL editor, after schema.sql.
--
-- Two things:
--
-- 1. A database-level guarantee that the same date+time can never be booked
--    twice (ignoring cancelled appointments, which free the slot back up).
--    This is what actually stops two people who click "confirm" at the same
--    moment from both getting the same slot — checking availability in the
--    browser first is good UX, but only a database constraint can't be
--    raced.
--
-- 2. A function the public booking page can call to find out which times on
--    a given day are already taken, WITHOUT being able to read anyone's
--    name, email, phone or matter description. Row Level Security on
--    `appointments` intentionally only lets a signed-in admin SELECT rows
--    (see schema.sql) — this function runs with elevated privilege
--    (`security definer`) but only ever returns a bare list of times.

-- 1. Prevent double-booking at the database level.
create unique index if not exists appointments_slot_unique
  on appointments (slot_date, slot_time)
  where status <> 'cancelled';

-- 2. Public "which times are taken on this day" lookup — no PII exposed.
create or replace function get_booked_slot_times(p_date date)
returns table (slot_time text)
language sql
security definer
set search_path = public
stable
as $$
  select a.slot_time
  from appointments a
  where a.slot_date = p_date
    and a.status <> 'cancelled';
$$;

grant execute on function get_booked_slot_times(date) to anon, authenticated;
