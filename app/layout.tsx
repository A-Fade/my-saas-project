"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Menu, X } from "lucide-react"; // Wix menu ke liye

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Pages jahan humein Wix-style mobile menu chahiye (sirf dashboard areas)
  const isDashboard = pathname.includes("/dashboard") || pathname.includes("/projects") || pathname.includes("/workers");

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-100">
        <Toaster position="top-right" />

        {/* --- MOBILE ONLY HAMBURGER (Sirf Dashboard pages par dikhega) --- */}
        {isDashboard && (
          <div className="lg:hidden fixed top-4 left-4 z-[60]">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 bg-white shadow-md rounded-md border"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}

        <div className="flex min-h-screen">
          {/* --- SLIDING SIDEBAR FOR MOBILE (Wix Style) --- */}
          {isDashboard && (
            <aside 
              className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="p-6 border-b font-bold text-xl text-blue-600">
                Builder Pro
              </div>
              {/* Aapke mobile navigation links yahan aayenge */}
              <nav className="p-4 space-y-4">
                <p className="text-sm text-gray-500 italic">Mobile Menu Options...</p>
              </nav>
            </aside>
          )}

          {/* Overlay for Mobile */}
          {isSidebarOpen && isDashboard && (
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden" 
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          {/* --- MAIN CONTENT (Aapka Dashboard Page yahan load hoga) --- */}
          <main className="flex-1 w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
