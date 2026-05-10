"use client"; // Mobile toggle ke liye client component zaroori hai

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Menu, X, LogOut, Mail } from "lucide-react"; // Icons ke liye lucide-react (Standard in Next.js)

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-50 flex h-screen overflow-hidden">
        <Toaster position="top-right" />

        {/* --- 1. SIDEBAR (Desktop & Mobile) --- */}
        <aside suppressHydrationWarning
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 border-b flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">Builder Pro</span>
            {/* Close button for mobile */}
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <nav className="p-4 space-y-2">
            <Link href="/" className="block p-3 hover:bg-gray-100 rounded">Dashboard</Link>
            <Link href="/projects" className="block p-3 hover:bg-gray-100 rounded">Projects</Link>
            <Link href="/workers" className="block p-3 hover:bg-gray-100 rounded">Workers</Link>
          </nav>
        </aside>

        {/* --- 2. MAIN CONTENT AREA --- */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          
          {/* --- TOPBAR --- */}
          <header className="h-16 bg-white border-b px-4 flex items-center justify-between">
            {/* Mobile Hamburger (Wix style) */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded lg:hidden"
            >
              <Menu size={28} /> {/* Ye rahi wo 3 lines */}
            </button>

            <div className="flex-1 lg:hidden ml-2 font-semibold">Builder SaaS</div>

            {/* Right Side Options (Desktop pe dikhenge, Mobile pe hide honge ya icon ban jayenge) */}
            <div className="flex items-center gap-4 ml-auto">
              <div className="hidden md:flex items-center gap-2 text-gray-600">
                <Mail size={18} />
                <span>user@gmail.com</span>
              </div>
              <button className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition">
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <section className="flex-1 overflow-y-auto p-6">
            {children}
          </section>
        </main>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </body>
    </html>
  );
}
