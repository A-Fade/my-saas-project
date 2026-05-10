"use client"; 
import { useEffect, useState } from "react"; 
import { supabase } from "@/lib/supabase"; 
import { useRouter } from "next/navigation"; 
import { Menu, X, LayoutDashboard, FolderKanban, Users, LogOut } from "lucide-react"; // Icons for mobile menu
import Link from "next/link";

export default function Topbar() { 
  const [email, setEmail] = useState(""); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state
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
        {/* --- MOBILE ONLY HAMBURGER (Hidden on Desktop) --- */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-xl text-slate-700 transition"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <div> 
          <h1 className="text-2xl font-bold text-slate-800"> BuilderPro </h1> 
          <p className="text-sm text-slate-500"> Welcome back 👋 </p> 
        </div> 
      </div>

      <div className="flex items-center gap-4"> 
        <div className="hidden md:block text-right"> 
          <p className="text-sm font-semibold text-slate-700"> {email} </p> 
          <p className="text-xs text-slate-500"> Admin </p> 
        </div> 
        <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition" > Logout </button> 
      </div>

      {/* --- MOBILE SLIDING DROPDOWN MENU --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl p-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-2">
            <Link 
              href="/dashboard" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <LayoutDashboard size={20}/> Dashboard
            </Link>
            <Link 
              href="/projects" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <FolderKanban size={20}/> Projects
            </Link>
            <Link 
              href="/workers" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <Users size={20}/> Workers
            </Link>
            <button 
              onClick={logout}
              className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl font-bold text-red-600 mt-2"
            >
              <LogOut size={20}/> Logout
            </button>
          </nav>
        </div>
      )}
    </div> 
  ); 
}
