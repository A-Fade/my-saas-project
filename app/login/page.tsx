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

  // 📧 EMAIL LOGIN
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(error.message);
    else {
      toast.success("Welcome back!");
      router.push("/dashboard");
    }
    setLoading(false);
  }

  // 🌐 GOOGLE LOGIN (ONE CLICK)
  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard',
      }
    });
    if (error) toast.error(error.message);
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
        
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-10 text-center text-white">
          <h1 className="text-4xl font-black mb-2 tracking-tight">🏗️ Builder<span className="text-blue-300">Pro</span></h1>
          <p className="text-blue-100 text-sm font-medium uppercase tracking-widest">Management System</p>
        </div>

        <div className="p-10">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 block tracking-widest">Email Address</label>
              <input type="email" className="w-full border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none focus:border-blue-400 transition" placeholder="admin@builderpro.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[10px] font-black text-blue-600 uppercase hover:underline">Forgot Password?</button>
              </div>
              <input type="password" className="w-full border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none focus:border-blue-400 transition" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl hover:bg-blue-700 transition active:scale-95 disabled:opacity-50">
              {loading ? "AUTHENTICATING..." : "LOG IN NOW"}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="relative my-8 text-center">
            <hr className="border-slate-100" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] font-black text-slate-400 uppercase">OR</span>
          </div>

          {/* GOOGLE LOGIN BUTTON */}
          <button onClick={handleGoogleLogin} className="w-full bg-white border-2 border-slate-100 text-slate-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition active:scale-95">
            <img src="https://svgrepo.com" className="w-5 h-5" alt="Google" />
            Sign in with Google
          </button>

          <p className="text-center text-slate-500 text-sm mt-8">
            Don't have an account? <button onClick={() => router.push('/signup')} className="text-blue-600 font-bold hover:underline">Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
}
