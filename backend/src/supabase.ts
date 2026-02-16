import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env from root
dotenv.config({ path: path.join(__dirname, '../../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Use Service Role Key for backend bypass of RLS if needed, or Anon key if RLS allows
// Note: USER should provide SUPABASE_SERVICE_ROLE_KEY for secure uploads
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase credentials missing. Please check .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
