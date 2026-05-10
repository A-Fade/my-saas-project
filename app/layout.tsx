
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <>
      {/* TOPBAR */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-slate-800 rounded"></span>
          <span className="w-6 h-0.5 bg-slate-800 rounded"></span>
          <span className="w-6 h-0.5 bg-slate-800 rounded"></span>
        </button>

        {/* LOGO */}
        <h1 className="text-xl font-black text-slate-800">
          Builder SaaS
        </h1>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          <div className="hidden sm:block text-sm text-slate-500">
            builder@gmail.com
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition"
          >
            Logout
          </button>

        </div>

      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/40 md:hidden">

          {/* SIDEBAR */}
          <div className="w-72 h-full bg-white shadow-2xl p-6 animate-slideInLeft">

            {/* TOP */}
            <div className="flex items-center justify-between mb-8">

              <h2 className="text-2xl font-black text-slate-800">
                Menu
              </h2>

              <button
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold text-slate-700"
              >
                ✕
              </button>

            </div>

            {/* LINKS */}
            <div className="flex flex-col gap-3">

              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="bg-slate-100 hover:bg-blue-100 px-4 py-3 rounded-2xl font-semibold text-slate-700 transition"
              >
                📊 Dashboard
              </Link>

              <Link
                href="/projects"
                onClick={() => setMenuOpen(false)}
                className="bg-slate-100 hover:bg-blue-100 px-4 py-3 rounded-2xl font-semibold text-slate-700 transition"
              >
                📁 Projects
              </Link>

              <Link
                href="/workers"
                onClick={() => setMenuOpen(false)}
                className="bg-slate-100 hover:bg-blue-100 px-4 py-3 rounded-2xl font-semibold text-slate-700 transition"
              >
                👷 Workers
              </Link>

              <Link
                href="/payments"
                onClick={() => setMenuOpen(false)}
                className="bg-slate-100 hover:bg-blue-100 px-4 py-3 rounded-2xl font-semibold text-slate-700 transition"
              >
                💰 Payments
              </Link>

            </div>

          </div>

        </div>
      )}
    </>
  );
}
