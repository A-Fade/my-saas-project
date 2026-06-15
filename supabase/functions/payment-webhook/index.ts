import { serve } from "https://deno.land/std@0.201.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0"

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

serve(async (req) => {
  try {
    const payload = await req.json()
    
    // 1. Payment Gateway se variables nikalyein (Stripe/Razorpay ke metadata se)
    // Note: Checkout banate waqt metadata me user_id aur plan bhejna zaroori hai
    const userId = payload.data?.object?.metadata?.user_id || payload.payload?.payment?.entity?.notes?.user_id
    const planName = payload.data?.object?.metadata?.plan || payload.payload?.payment?.entity?.notes?.plan

    if (!userId || !planName) {
      return new Response(JSON.stringify({ error: "Missing metadata parameters" }), { status: 400 })
    }

    // 2. Supabase Client initialize karein (Bypass RLS using Service Role Key)
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 3. Plan ke mutabik variables set karein
    let pLimit = 1;   // Starter
    let wLimit = 2;   // Starter
    let cLimit = 1;   // Starter
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // 30 Days Expiry

    if (planName.toLowerCase() === 'pro') {
      pLimit = 10; wLimit = 120; cLimit = 10;
    } else if (planName.toLowerCase() === 'business') {
      pLimit = 99999; wLimit = 99999; cLimit = 99999;
    }

    // 4. Profiles Table me secure update run karein
    const { error } = await supabase
      .from('profiles')
      .update({
        plan: planName.toLowerCase(),
        plan_status: planName.toLowerCase(),
        plan_expiry: expiryDate.toISOString(),
        item_limit: pLimit,
        // workers_limit aur clients_limit columns agar table me hain to add karein
      })
      .eq('id', userId)

    if (error) throw error

    return new Response(JSON.stringify({ success: true, message: "Profile upgraded successfully" }), { status: 200 })

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
