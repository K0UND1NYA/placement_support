-- Migration to add attachment_url to circulars table
ALTER TABLE public.circulars ADD COLUMN IF NOT EXISTS attachment_url text;
