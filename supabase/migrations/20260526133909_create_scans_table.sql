create table if not exists public.scans (
    id uuid default gen_random_uuid() primary key,
    url text not null,
    email text not null,
    score integer,
    results_json jsonb,
    status text default 'pending',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.scans enable row level security;

-- Allow anonymous inserts (anyone can trigger a scan)
create policy "Allow anonymous inserts" on public.scans for insert with check (true);

-- Deny all selects (so users cannot scrape other people's emails/URLs)
create policy "Deny anonymous selects" on public.scans for select using (false);
