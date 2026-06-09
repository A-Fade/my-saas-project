"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Menu, X, LayoutDashboard, FolderKanban, Users, LogOut, Mail, CreditCard, UserCircle, MessageCircle, User, Gem } from "lucide-react";
import Link from "next/link";

export default function Topbar() {
  const [email, setEmail] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data: { session }, } = await supabase.auth.getSession();
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  // Email ka pehla letter nikalne ke liye
  const firstLetter = email ? email.charAt(0).toUpperCase() : "?";

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
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            BuilderPro
          </h1>
          <p className="text-sm text-slate-500"> Welcome back 👋 </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* User Info Section */}
        <div className="relative flex items-center gap-3 bg-slate-50 px-2 md:px-4 py-2 rounded-2xl border border-slate-100">
          {/* Desktop Text */}
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-slate-700"> {email} </p>
            <p className="text-xs text-slate-500"> Admin </p>
          </div>

          {/* Mobile/Desktop Avatar Circle */}
          <button 
            onClick={() => setShowEmailTooltip(!showEmailTooltip)}
            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm active:scale-95 transition-all"
          >
            {firstLetter}
          </button>

          {/* Mobile View Tooltip/Popup */}
          {showEmailTooltip && (
            <div className="absolute top-14 right-0 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-xl whitespace-nowrap z-[60] animate-in fade-in zoom-in duration-200">
              <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-900 rotate-45"></div>
              {email}
            </div>
          )}
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
              <LayoutDashboard size={22} className="text-blue-600" /> Dashboard
            </Link>
            <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700">
              <FolderKanban size={22} className="text-blue-600" /> Projects
            </Link>
            <Link href="/clients" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700">
              <UserCircle size={22} className="text-blue-600" /> Clients
            </Link>
            <Link href="/workers" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700">
              <Users size={22} className="text-blue-600" /> Workers
            </Link>
            <Link href="/payments" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700">
              <CreditCard size={22} className="text-blue-600" /> Payments
            </Link>
            <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700 hover:bg-slate-100 transition-all">
              <Gem size={22} className="text-amber-500" /> Subscription
            </Link>
             <Link href="/support" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700">
              <MessageCircle size={22} className="text-blue-600" /> Support
            </Link>
            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl font-bold text-slate-700">
              <User size={22} className="text-blue-600" /> Profile
            </Link>
            <button onClick={logout} className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl font-bold text-red-600 mt-4 border border-red-100">
              <LogOut size={22} /> Logout
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
