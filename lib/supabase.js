import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jdrujdbdyzraiwvukgcd.supabase.co";
const supabaseKey = "sb_publishable_jnsFJ2FcinxnwcDUkAq5kA_58qCbZu4";

console.log("ACTUAL URL:", supabaseUrl);
console.log("ACTUAL KEY:", supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);