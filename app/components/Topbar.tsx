"use client"; 
import { useEffect, useState } from "react"; 
import { supabase } from "@/lib/supabase"; 
import { useRouter } from "next/navigation"; 
import { Menu, X, LayoutDashboard, FolderKanban, Users, LogOut, Mail, CreditCard, UserCircle } from "lucide-react"; 
import Link from "next/link";

export default function Topbar() { 
  const [email, setEmail] = useState(""); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const router = useRouter(); 

  useEffect(() => { getUser(); }, []); 

  async function getUser() { 
    const { data: { session }, } = await supabase.auth.getSession(); 
    if (session?.user?.email) { setEmail(session.user.email); } 
  } 

  async function logout() { 
    await supabase.auth.signOut(); 
    router.push("/login"); 
  } 

  return ( 
    <div className="relative bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex items-center justify-between z-50"> 
      <div className="flex items-center gap-3">
        {/* --- MOBILE ONLY HAMBURGER --- */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-xl text-slate-700 transition"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <div> 
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight"> BuilderPro </h1> 
          <p className="text-sm text-slate-500"> Welcome back 👋 </p> 
        </div> 
      </div>

      <div className="flex items-center gap-4"> 
        {/* User Info Section */}
        <div className="flex items-center gap-3 bg-slate-50 px-3 md:px-4 py-2 rounded-2xl border border-slate-100"> 
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-700"> {email} </p> 
            <p className="text-xs text-slate-500 text-right"> Admin </p> 
          </div>
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <Mail size={20} />
          </div>
        </div> 

        {/* --- DESKTOP ONLY LOGOUT BUTTON --- */}
        <button 
          onClick={logout} 
          className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition shadow-sm"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* --- MOBILE SLIDING DROPDOWN MENU --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b-2 border-slate-200 shadow-2xl p-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700">
              <LayoutDashboard size={22} className="text-blue-600"/> Dashboard
            </Link>
            <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700">
              <FolderKanban size={22} className="text-blue-600"/> Projects
            </Link>
            <Link href="/workers" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700">
              <Users size={22} className="text-blue-600"/> Workers
            </Link>
            <Link href="/payments" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700">
              <CreditCard size={22} className="text-blue-600"/> Payments
            </Link>
            <Link href="/clients" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700">
              <UserCircle size={22} className="text-blue-600"/> Clients
            </Link>
            <button onClick={logout} className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl font-bold text-red-600 mt-4 border border-red-100">
              <LogOut size={22}/> Logout
            </button>
          </nav>
        </div>
      )}
    </div> 
  ); 
}
