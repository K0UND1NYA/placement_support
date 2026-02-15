-- Migration: Add answers column to attempts
-- Description: Stores individual question answers in JSONB format for review functionality
-- Date: 2026-02-15

ALTER TABLE attempts 
ADD COLUMN IF NOT EXISTS answers JSONB DEFAULT '{}'::jsonb;

COMMENT ON COLUMN attempts.answers IS 'Stores the student answers as a JSON object {question_id: answer}';
