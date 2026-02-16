-- Migration to add shuffle_questions to exams table
ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS shuffle_questions BOOLEAN DEFAULT FALSE;
