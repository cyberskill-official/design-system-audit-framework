-- Add indexes for common query patterns (admin dashboard, de-duplication)
create index if not exists idx_scans_email on public.scans (email);
create index if not exists idx_scans_created_at on public.scans (created_at desc);
create index if not exists idx_scans_status on public.scans (status) where status != 'completed';

-- Add URL length constraint to prevent abuse
alter table public.scans add constraint chk_url_length check (char_length(url) <= 2048);

-- Add email length constraint
alter table public.scans add constraint chk_email_length check (char_length(email) <= 320);

-- Deny anonymous updates and deletes (only service role can modify)
create policy "Deny anonymous updates" on public.scans for update using (false);
create policy "Deny anonymous deletes" on public.scans for delete using (false);
