"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden">
            <img
              src="/icon.png"
              alt="BuilderPro Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            BuilderPro
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-bold text-[11px] uppercase tracking-[0.15em] text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
          <Link href="/guides" className="hover:text-slate-900 transition-colors">Guides</Link>
          <Link href="/faq" className="hover:text-slate-900 transition-colors">FAQ</Link>
          <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
        </nav>

        {/* Login button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-slate-600 font-medium hover:text-slate-900">
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-5 flex flex-col gap-4">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link href="/guides" onClick={() => setIsOpen(false)}>Guides</Link>
          <Link href="/faq" onClick={() => setIsOpen(false)}>FAQ</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>

          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="pt-3 border-t font-semibold"
          >
            Login
          </Link>

          <Link
            href="/signup"
            onClick={() => setIsOpen(false)}
            className="bg-slate-900 text-white text-center py-3 rounded-xl font-semibold"
          >
            Get Started
          </Link>
        </div>
      )}

    </header>
  );
}