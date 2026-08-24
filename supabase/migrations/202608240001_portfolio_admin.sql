begin;

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_draft (
  id text primary key default 'main' check (id = 'main'),
  content jsonb not null check (jsonb_typeof(content) = 'object'),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create table if not exists public.portfolio_publication (
  id text primary key default 'main' check (id = 'main'),
  content jsonb not null check (jsonb_typeof(content) = 'object'),
  version integer not null default 1 check (version > 0),
  published_at timestamptz not null default now(),
  published_by uuid references auth.users(id)
);

create table if not exists public.portfolio_revisions (
  id uuid primary key default gen_random_uuid(),
  version integer not null check (version > 0),
  content jsonb not null check (jsonb_typeof(content) = 'object'),
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  unique (version)
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text not null,
  alt_text text not null check (length(trim(alt_text)) > 0),
  mime_type text not null check (mime_type in ('image/jpeg', 'image/png', 'image/webp')),
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 5242880),
  created_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id)
);

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to authenticated;

alter table public.admin_users enable row level security;
alter table public.portfolio_draft enable row level security;
alter table public.portfolio_publication enable row level security;
alter table public.portfolio_revisions enable row level security;
alter table public.media_assets enable row level security;

drop policy if exists "admin reads own allowlist entry" on public.admin_users;
create policy "admin reads own allowlist entry"
on public.admin_users for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "public reads active portfolio" on public.portfolio_publication;
create policy "public reads active portfolio"
on public.portfolio_publication for select
to anon, authenticated
using (id = 'main');

drop policy if exists "admins read draft" on public.portfolio_draft;
create policy "admins read draft"
on public.portfolio_draft for select
to authenticated
using (public.is_portfolio_admin());

drop policy if exists "admins insert draft" on public.portfolio_draft;
create policy "admins insert draft"
on public.portfolio_draft for insert
to authenticated
with check (public.is_portfolio_admin() and updated_by = auth.uid());

drop policy if exists "admins update draft" on public.portfolio_draft;
create policy "admins update draft"
on public.portfolio_draft for update
to authenticated
using (public.is_portfolio_admin())
with check (public.is_portfolio_admin() and updated_by = auth.uid());

drop policy if exists "admins read revisions" on public.portfolio_revisions;
create policy "admins read revisions"
on public.portfolio_revisions for select
to authenticated
using (public.is_portfolio_admin());

drop policy if exists "anyone reads media metadata" on public.media_assets;
create policy "anyone reads media metadata"
on public.media_assets for select
to anon, authenticated
using (true);

drop policy if exists "admins insert media metadata" on public.media_assets;
create policy "admins insert media metadata"
on public.media_assets for insert
to authenticated
with check (public.is_portfolio_admin() and created_by = auth.uid());

drop policy if exists "admins update media metadata" on public.media_assets;
create policy "admins update media metadata"
on public.media_assets for update
to authenticated
using (public.is_portfolio_admin())
with check (public.is_portfolio_admin());

revoke all on public.admin_users, public.portfolio_draft, public.portfolio_publication,
  public.portfolio_revisions, public.media_assets from anon, authenticated;
grant select on public.portfolio_publication, public.media_assets to anon, authenticated;
grant select on public.admin_users, public.portfolio_draft, public.portfolio_revisions to authenticated;
grant insert, update on public.portfolio_draft to authenticated;
grant insert, update on public.media_assets to authenticated;

create or replace function public.publish_portfolio()
returns table(version integer, published_at timestamptz)
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  draft_content jsonb;
  current_publication public.portfolio_publication%rowtype;
  next_version integer;
  publish_time timestamptz := clock_timestamp();
begin
  if not public.is_portfolio_admin() then
    raise exception 'Only allowlisted portfolio administrators may publish.' using errcode = '42501';
  end if;

  select content into draft_content
  from public.portfolio_draft
  where id = 'main'
  for update;

  if draft_content is null
    or jsonb_typeof(draft_content) <> 'object'
    or coalesce((draft_content ->> 'schemaVersion')::integer, 0) <> 1 then
    raise exception 'The draft is missing or uses an unsupported schema version.';
  end if;

  select * into current_publication
  from public.portfolio_publication
  where id = 'main'
  for update;

  if found then
    insert into public.portfolio_revisions (version, content, created_at, created_by)
    values (
      current_publication.version,
      current_publication.content,
      current_publication.published_at,
      current_publication.published_by
    )
    on conflict (version) do update
      set content = excluded.content,
          created_at = excluded.created_at,
          created_by = excluded.created_by;
    next_version := current_publication.version + 1;
  else
    next_version := 1;
  end if;

  insert into public.portfolio_publication (id, content, version, published_at, published_by)
  values ('main', draft_content, next_version, publish_time, auth.uid())
  on conflict (id) do update
    set content = excluded.content,
        version = excluded.version,
        published_at = excluded.published_at,
        published_by = excluded.published_by;

  delete from public.portfolio_revisions
  where id in (
    select id
    from public.portfolio_revisions
    order by version desc
    offset 10
  );

  return query select next_version, publish_time;
end;
$$;

revoke all on function public.publish_portfolio() from public, anon;
grant execute on function public.publish_portfolio() to authenticated;

create or replace function public.restore_portfolio_revision(revision_id uuid)
returns timestamptz
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  revision_content jsonb;
  restored_at timestamptz := clock_timestamp();
begin
  if not public.is_portfolio_admin() then
    raise exception 'Only allowlisted portfolio administrators may restore a revision.' using errcode = '42501';
  end if;

  select content into revision_content
  from public.portfolio_revisions
  where id = revision_id;

  if revision_content is null then
    raise exception 'Revision not found.';
  end if;

  insert into public.portfolio_draft (id, content, updated_at, updated_by)
  values ('main', revision_content, restored_at, auth.uid())
  on conflict (id) do update
    set content = excluded.content,
        updated_at = excluded.updated_at,
        updated_by = excluded.updated_by;

  return restored_at;
end;
$$;

revoke all on function public.restore_portfolio_revision(uuid) from public, anon;
grant execute on function public.restore_portfolio_revision(uuid) to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public reads portfolio media" on storage.objects;
create policy "public reads portfolio media"
on storage.objects for select
to public
using (bucket_id = 'portfolio-media');

drop policy if exists "admins upload portfolio media" on storage.objects;
create policy "admins upload portfolio media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'portfolio-media' and public.is_portfolio_admin());

drop policy if exists "admins replace portfolio media" on storage.objects;
create policy "admins replace portfolio media"
on storage.objects for update
to authenticated
using (bucket_id = 'portfolio-media' and public.is_portfolio_admin())
with check (bucket_id = 'portfolio-media' and public.is_portfolio_admin());

create or replace function public.delete_portfolio_media(asset_id uuid)
returns text
language plpgsql
security definer
set search_path = public, storage, auth
as $$
declare
  asset_path text;
begin
  if not public.is_portfolio_admin() then
    raise exception 'Only allowlisted portfolio administrators may delete media.' using errcode = '42501';
  end if;

  select storage_path into asset_path
  from public.media_assets
  where id = asset_id
  for update;

  if asset_path is null then
    raise exception 'Media asset not found.';
  end if;

  if exists (
    select 1 from public.portfolio_draft where content::text like ('%' || asset_path || '%')
    union all
    select 1 from public.portfolio_publication where content::text like ('%' || asset_path || '%')
    union all
    select 1 from public.portfolio_revisions where content::text like ('%' || asset_path || '%')
  ) then
    raise exception 'Media is still referenced by draft, publication, or revision.';
  end if;

  delete from storage.objects where bucket_id = 'portfolio-media' and name = asset_path;
  delete from public.media_assets where id = asset_id;
  return asset_path;
end;
$$;

revoke all on function public.delete_portfolio_media(uuid) from public, anon;
grant execute on function public.delete_portfolio_media(uuid) to authenticated;

commit;

