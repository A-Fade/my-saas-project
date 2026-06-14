"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5">
        
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-2xl font-black text-slate-900">
            BuilderPro
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="font-semibold text-slate-600 hover:text-slate-900">Home</Link>
            <Link href="/pricing" className="font-semibold text-slate-600 hover:text-slate-900">Pricing</Link>
            <Link href="/guides" className="font-semibold text-slate-600 hover:text-slate-900">Guide</Link>
            <Link href="/faq" className="font-semibold text-slate-600 hover:text-slate-900">FAQ</Link>
            <Link href="/about" className="font-semibold text-slate-600 hover:text-slate-900">About</Link>
          </nav>

          {/* Login (Desktop) */}
          <Link
            href="/login"
            className="hidden md:block bg-slate-900 text-white px-5 py-3 rounded-xl font-bold"
          >
            Login
          </Link>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-3 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 shadow-lg">

            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
            <Link href="/guides" onClick={() => setIsOpen(false)}>Guide</Link>
            <Link href="/faq" onClick={() => setIsOpen(false)}>FAQ</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="bg-slate-900 text-white text-center py-3 rounded-xl font-bold"
            >
              Login
            </Link>

          </div>
        )}

      </div>
    </header>
  );
}