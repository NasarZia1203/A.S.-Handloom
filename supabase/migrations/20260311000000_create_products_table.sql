-- ============================================================
-- Migration: Create products table
-- Description: Single table for sarees and fabrics catalog
-- ============================================================

-- 1. Create the products table
create table if not exists public.products (
  id          uuid        default gen_random_uuid() primary key,
  code        text        not null unique,
  description text        not null,
  image_url   text        not null,
  category    text        not null check (category in ('saree', 'fabric')),
  is_active   boolean     not null default true,
  sort_order  integer     not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Add table comment
comment on table public.products is 'Product catalog for sarees and fabrics';

-- 2. Enable Row Level Security
alter table public.products enable row level security;

-- 3. RLS Policies

-- Public (anon) can read only active products
create policy "Public can view active products"
  on public.products
  for select
  to anon
  using (is_active = true);

-- Authenticated users can read all products (including inactive, for admin)
create policy "Authenticated users can view all products"
  on public.products
  for select
  to authenticated
  using (true);

-- Authenticated users can insert products
create policy "Authenticated users can insert products"
  on public.products
  for insert
  to authenticated
  with check (true);

-- Authenticated users can update products
create policy "Authenticated users can update products"
  on public.products
  for update
  to authenticated
  using (true)
  with check (true);

-- Authenticated users can delete products
create policy "Authenticated users can delete products"
  on public.products
  for delete
  to authenticated
  using (true);

-- 4. Indexes

-- Index for filtering by category + active status, ordered by sort_order
-- This covers the two main public queries: active sarees and active fabrics
create index idx_products_category_active_sort
  on public.products (category, is_active, sort_order);

-- Index on code for lookups by product code
create index idx_products_code
  on public.products (code);

-- 5. Auto-update updated_at trigger

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger on_products_updated
  before update on public.products
  for each row
  execute function public.handle_updated_at();
