"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserPlus, Mail, Lock, LayoutGrid, ArrowRight } from "lucide-react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/dashboard',
      }
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Please check your email for verification.");
      router.push("/login");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans antialiased text-slate-900">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
        
        {/* Header - Professional Minimalist */}
        <div className="bg-slate-900 p-10 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                <UserPlus size={24} className="text-white" />
             </div>
             <h1 className="text-3xl font-bold tracking-tight">Builder<span className="text-slate-400">Pro</span></h1>
             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Registration Portal</p>
          </div>
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1 tracking-wider">Business Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  className="w-full border border-slate-200 bg-slate-50 p-4 pl-12 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all text-sm" 
                  placeholder="you@company.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1 tracking-wider">Set Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  className="w-full border border-slate-200 bg-slate-50 p-4 pl-12 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all text-sm" 
                  placeholder="Create a strong password" 
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
              {loading ? "PROCESSING..." : "CREATE MASTER ACCOUNT"}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="text-center text-slate-500 text-[13px] mt-10 font-medium">
            Already registered? <button onClick={() => router.push('/login')} className="text-slate-900 font-bold hover:underline decoration-2 underline-offset-4">Log In</button>
          </p>
        </div>
      </div>
    </div>
  );
}
