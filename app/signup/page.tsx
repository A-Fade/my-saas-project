"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
        
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-10 text-center text-white">
          <h1 className="text-4xl font-black mb-2 tracking-tight">🏗️ Builder<span className="text-blue-300">Pro</span></h1>
          <p className="text-blue-100 text-sm font-medium uppercase tracking-widest">Create New Account</p>
        </div>

        <div className="p-10">
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 block tracking-widest">Email Address</label>
              <input type="email" className="w-full border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none focus:border-blue-400 transition" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 block tracking-widest">Password</label>
              <input type="password" className="w-full border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none focus:border-blue-400 transition" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl hover:bg-blue-700 transition active:scale-95 disabled:opacity-50">
              {loading ? "CREATING ACCOUNT..." : "SIGN UP NOW"}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-8">
            Already have an account? <button onClick={() => router.push('/login')} className="text-blue-600 font-bold hover:underline">Log In</button>
          </p>
        </div>
      </div>
    </div>
  );
}