import { createClient } from "@supabase/supabase-js";

export function createServerSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Variabel lingkungan SUPABASE_URL atau SUPABASE_SECRET_KEY belum diatur.");
  }

  return createClient(supabaseUrl, supabaseKey);
}

