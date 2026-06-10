"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Lock, Mail, LayoutGrid, ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🔄 REDIRECT CHECK FUNCTION
  async function handleUserRedirect(userId: string) {
    try {
      // Supabase se user ka plan_status fetch kar rahe hain
      const { data: profile, error } = await supabase
        .from("profiles") // Agar aapki table ka naam 'users' hai to yahan badal dein
        .select("plan_status")
        .eq("id", userId)
        .single();

      if (error) throw error;

      // Plan condition check
      if (profile?.plan_status === "none" || !profile?.plan_status) {
        toast.success("Welcome! Please choose a plan.");
        router.push("/pricing"); // Pricing page par bhejo
      } else {
        toast.success("Welcome back!");
        router.push("/dashboard"); // Dashboard par bhejo
      }
    } catch (err) {
      // Agar profile table mein entry nahi mili to default pricing par bhejo
      router.push("/pricing");
    }
  }

  // 📧 EMAIL LOGIN
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else if (data?.user) {
      // Redirect ka logic chalayen
      await handleUserRedirect(data.user.id);
      setLoading(false);
    }
  }

  // 🌐 GOOGLE LOGIN
  async function handleGoogleLogin() {
    // Note: Google OAuth ke liye direct route handle nahi hota, iska status apko
    // layout ya global auth listener/middleware mein check karna hoga kyuki ye pure reload karta hai.
    // Par flow break na ho isliye iska landing URL hum pricing ya dashboard auto-handle ke liye middleware par chhodte hain.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard', // Middleware isko auto-intercept karke pricing par bhej dega agar plan nahi hoga
      }
    });
    if (error) toast.error(error.message);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans antialiased text-slate-900">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
        
        {/* Header - Minimalist Style */}
        <div className="bg-slate-900 p-10 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                <LayoutGrid size={24} className="text-white" />
             </div>
             <h1 className="text-3xl font-bold tracking-tight">Builder<span className="text-slate-400">Pro</span></h1>
             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Professional Portal</p>
          </div>
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1 tracking-wider">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  className="w-full border border-slate-200 bg-slate-50 p-4 pl-12 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all text-sm" 
                  placeholder="name@company.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1 px-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Security Key</label>
                <button type="button" className="text-[10px] font-bold text-slate-400 uppercase hover:text-slate-900 transition-colors">Recover</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  className="w-full border border-slate-200 bg-slate-50 p-4 pl-12 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all text-sm" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? "VERIFYING..." : "ACCESS DASHBOARD"}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="relative my-8 text-center">
            <hr className="border-slate-100" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Sign-in</span>
          </div>

          {/* GOOGLE LOGIN BUTTON */}
          <button 
            onClick={handleGoogleLogin} 
            className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]"
          >
            <img src="https://gstatic.com" className="w-5 h-5" alt="Google" /> 
            Sign in with Cloud Identity
          </button>

          <p className="text-center text-slate-500 text-[13px] mt-10 font-medium">
            New to the platform? <button onClick={() => router.push('/signup')} className="text-slate-900 font-bold hover:underline decoration-2 underline-offset-4">Create Account</button>
          </p>
        </div>
      </div>
    </div>
  );
}
