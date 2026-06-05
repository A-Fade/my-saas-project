import { createClient } from '@supabase/supabase-js'

console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("SUPABASE KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


const supabaseUrl = "https://jdrujdbdyzraiwvukgcd.supabase.co"
const supabaseKey = "sb_publishable_jnsFJ2FcinxnwcDUkAq5kA_58qCbZu4"

export const supabase = createClient(supabaseUrl, supabaseKey)