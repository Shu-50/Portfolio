-- ============================================================================
--  Portfolio backend setup — run this once in the Supabase SQL editor.
--  Dashboard -> SQL Editor -> New query -> paste -> Run.
-- ============================================================================

-- 1) Content table: a single row holding the whole portfolio as JSON.
create table if not exists public.portfolio_content (
  id         text primary key,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.portfolio_content (id, data)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

alter table public.portfolio_content enable row level security;

-- Anyone may read the portfolio (it is a public website).
drop policy if exists "public read content" on public.portfolio_content;
create policy "public read content"
  on public.portfolio_content
  for select
  to anon, authenticated
  using (true);

-- Only a signed-in admin may write. The /dev passcode gates the UI; this gates the data.
drop policy if exists "admin write content" on public.portfolio_content;
create policy "admin write content"
  on public.portfolio_content
  for all
  to authenticated
  using (true)
  with check (true);


-- 2) Storage bucket for the resume PDF, project images and gallery photos.
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

drop policy if exists "public read assets" on storage.objects;
create policy "public read assets"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'portfolio-assets');

drop policy if exists "admin upload assets" on storage.objects;
create policy "admin upload assets"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'portfolio-assets');

drop policy if exists "admin update assets" on storage.objects;
create policy "admin update assets"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'portfolio-assets');

drop policy if exists "admin delete assets" on storage.objects;
create policy "admin delete assets"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'portfolio-assets');

-- ============================================================================
--  3) Create the admin user (Dashboard -> Authentication -> Users -> Add user):
--       Email:    the value you put in VITE_ADMIN_EMAIL
--       Password: the value you put in VITE_ADMIN_PASSWORD
--     Tick "Auto Confirm User" so no email confirmation is required.
--
--  4) Turn OFF public sign-ups so nobody can mint their own writable account:
--     Authentication -> Sign In / Providers -> Email -> disable "Allow new users
--     to sign up".
-- ============================================================================
