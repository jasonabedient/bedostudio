-- Bedo Studio Contact Form Schema
-- Run this in the Supabase SQL Editor

-- Create the submissions table
create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  consent_given boolean default false,
  origin_host text -- To track which subdomain the submission came from
);

-- Enable Row Level Security (RLS)
alter table contact_submissions enable row level security;

-- Allow anonymous inserts (adjust as needed for higher security)
-- You may want to add rate limiting or use a Service Role if you prefer
create policy "Allow anonymous inserts"
  on contact_submissions
  for insert
  with check (true);

-- Optional: Allow you (admin) to view submissions
-- create policy "Allow admin to select"
--   on contact_submissions
--   for select
--   using (auth.role() = 'service_role');
