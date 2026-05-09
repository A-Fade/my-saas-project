"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      router.push("/dashboard");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
        
        {/* TOP SECTION - Blue Gradient */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-10 text-center text-white">
          <h1 className="text-4xl font-black mb-2 tracking-tight">🏗️ Builder<span className="text-blue-300">Pro</span></h1>
          <p className="text-blue-100 text-sm font-medium">Construction Management SaaS</p>
        </div>

        {/* FORM SECTION */}
        <div className="p-10">
          <h2 className="text-2xl font-black text-slate-800 mb-8 text-center">Login to Dashboard</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 block tracking-widest">Email Address</label>
              <input 
                type="email" 
                className="w-full border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none focus:border-blue-400 transition font-medium" 
                placeholder="admin@builderpro.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 block tracking-widest">Password</label>
              <input 
                type="password" 
                className="w-full border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none focus:border-blue-400 transition font-medium" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "AUTHENTICATING..." : "LOG IN NOW"}
            </button>
          </form>

          <p className="text-center text-slate-400 text-xs mt-8 font-bold uppercase tracking-tighter">
            © 2026 BuilderPro Management System
          </p>
        </div>
      </div>
    </div>
  );
}
