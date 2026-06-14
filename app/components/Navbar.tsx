"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl px-6 py-4 flex items-center justify-between">
          
          <Link href="/" className="text-2xl font-black text-slate-900">
            BuilderPro
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="font-semibold text-slate-600 hover:text-slate-900">
              Home
            </Link>

            <Link href="/pricing" className="font-semibold text-slate-600 hover:text-slate-900">
              Pricing
            </Link>

            <Link href="/guides" className="font-semibold text-slate-600 hover:text-slate-900">
              Guide
            </Link>

            <Link href="/faq" className="font-semibold text-slate-600 hover:text-slate-900">
              FAQ
            </Link>

            <Link href="/about" className="font-semibold text-slate-600 hover:text-slate-900">
              About
            </Link>
          </nav>

          <Link
            href="/login"
            className="bg-slate-900 text-white px-5 py-3 rounded-xl font-bold"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}