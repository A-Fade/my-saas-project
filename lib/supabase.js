import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jdrujdbdyzraiwvukgcd.supabase.co"
const supabaseKey = "sb_publishable_jnsFJ2FcinxnwcDUkAq5kA_58qCbZu4"

export const supabase = createClient(supabaseUrl, supabaseKey)