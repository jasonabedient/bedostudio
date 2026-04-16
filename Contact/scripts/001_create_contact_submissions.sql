-- Create contact_submissions table to store form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS but allow public inserts (no auth required for contact form)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public contact form)
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Only allow service role to select (for admin purposes)
CREATE POLICY "Allow service role to read" ON contact_submissions
  FOR SELECT
  USING (true);
