-- Migration: Add OTP Rate Limiting Columns
-- Description: Adds columns to track OTP request attempts and block users after exceeding limits
-- Date: 2026-01-27

-- Add otp_request_attempts column to track number of OTP requests
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS otp_request_attempts INTEGER DEFAULT 0;

-- Add otp_blocked_until column to track when user can request OTP again
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS otp_blocked_until TIMESTAMP WITH TIME ZONE;

-- Create index for efficient querying of blocked users
CREATE INDEX IF NOT EXISTS idx_users_otp_blocked_until 
ON users (otp_blocked_until) 
WHERE otp_blocked_until IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN users.otp_request_attempts IS 'Number of OTP requests made by user, resets after successful verification';
COMMENT ON COLUMN users.otp_blocked_until IS 'Timestamp until which user is blocked from requesting OTP (10 minutes after 3 attempts)';
