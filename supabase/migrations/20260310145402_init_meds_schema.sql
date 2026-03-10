-- Categories table
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamp with time zone default now() not null
);

-- Canonical medications table
create table public.medications (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category_id uuid references public.categories(id),
  created_at timestamp with time zone default now() not null
);

-- User medications (raw input) table
create table public.user_medications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  raw_name text not null,
  canonical_id uuid references public.medications(id), -- Null if unmapped/pending
  status text not null default 'pending' check (status in ('pending', 'mapped', 'rejected')),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Audit logs table
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid, -- Can be null for system actions
  actor_type text not null, -- 'admin', 'user', 'system'
  event_type text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb,
  created_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.categories enable row level security;
alter table public.medications enable row level security;
alter table public.user_medications enable row level security;
alter table public.audit_logs enable row level security;

-- Setup Admin Role/Check (Simplified for scaffolding)
-- In a real app, you might use a separate admin_users table or custom JWT claims
create table public.admin_users (
  id uuid primary key references auth.users(id),
  created_at timestamp with time zone default now() not null
);
alter table public.admin_users enable row level security;

-- Basic Policies (Assume true admin auth via admin_users table)
create policy "Admins can read all categories" on public.categories for select using (exists (select 1 from public.admin_users where id = (select auth.uid())));
create policy "Admins can insert categories" on public.categories for insert with check (exists (select 1 from public.admin_users where id = (select auth.uid())));
create policy "Admins can update categories" on public.categories for update using (exists (select 1 from public.admin_users where id = (select auth.uid())));

create policy "Admins can read all medications" on public.medications for select using (exists (select 1 from public.admin_users where id = (select auth.uid())));
create policy "Admins can insert medications" on public.medications for insert with check (exists (select 1 from public.admin_users where id = (select auth.uid())));
create policy "Admins can update medications" on public.medications for update using (exists (select 1 from public.admin_users where id = (select auth.uid())));

create policy "Admins can read all user_medications" on public.user_medications for select using (exists (select 1 from public.admin_users where id = (select auth.uid())));
create policy "Admins can update user_medications" on public.user_medications for update using (exists (select 1 from public.admin_users where id = (select auth.uid())));

create policy "Admins can read all audit_logs" on public.audit_logs for select using (exists (select 1 from public.admin_users where id = (select auth.uid())));
create policy "Admins can insert audit_logs" on public.audit_logs for insert with check (exists (select 1 from public.admin_users where id = (select auth.uid())));
