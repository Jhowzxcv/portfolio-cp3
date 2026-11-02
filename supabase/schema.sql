-- Execute uma vez no SQL Editor do seu projeto Supabase.
-- Todo acesso às tabelas ocorre pelo backend, que verifica o proprietário.
create table if not exists public.contact_messages (
  id uuid primary key,
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 254),
  message text not null check (char_length(message) between 20 and 5000),
  created_at timestamptz not null default now(),
  responded boolean not null default false,
  email_status text not null default 'pending' check (email_status in ('pending','sent','failed')),
  rate_key text not null
);
create index if not exists contact_messages_rate_idx on public.contact_messages (rate_key, created_at);
create table if not exists public.portfolio_settings (
  id integer primary key check (id = 1),
  featured_ids bigint[] not null default '{}'
);
alter table public.contact_messages enable row level security;
alter table public.portfolio_settings enable row level security;
-- Sem policies para anon/authenticated: nenhuma leitura ou escrita direta é permitida.
revoke all on public.contact_messages from anon, authenticated;
revoke all on public.portfolio_settings from anon, authenticated;
grant all on public.contact_messages, public.portfolio_settings to service_role;

create or replace function public.submit_contact(
  p_id uuid, p_name text, p_email text, p_message text, p_rate_key text
) returns uuid
language plpgsql
set search_path = public
as $$
declare existing public.contact_messages;
begin
  -- Serializa tentativas do mesmo visitante; o limite funciona entre instâncias serverless.
  perform pg_advisory_xact_lock(hashtextextended(p_rate_key, 0));
  select * into existing from public.contact_messages where id = p_id;
  if found then
    if existing.name <> p_name or existing.email <> p_email or existing.message <> p_message then
      raise exception 'IDEMPOTENCY_CONFLICT';
    end if;
    return existing.id;
  end if;
  if (select count(*) from public.contact_messages where rate_key = p_rate_key and created_at > now() - interval '10 minutes') >= 5 then
    raise exception 'RATE_LIMIT';
  end if;
  insert into public.contact_messages (id, name, email, message, rate_key)
  values (p_id, p_name, p_email, p_message, p_rate_key);
  return p_id;
end;
$$;
revoke all on function public.submit_contact(uuid,text,text,text,text) from public, anon, authenticated;
grant execute on function public.submit_contact(uuid,text,text,text,text) to service_role;
