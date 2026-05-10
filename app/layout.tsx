"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Menu, X, LogOut, Mail, LayoutDashboard, FolderKanban, Users, Settings } from "lucide-react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Landing, Login, Signup pages (No Topbar, No Sidebar)
  const isAuthPage = pathname === "/" || pathname === "/login" || pathname === "/signup";

  if (isAuthPage) {
    return (
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="bg-white">
          <Toaster position="top-right" />
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-50 text-gray-900">
        <Toaster position="top-right" />
        
        <div className="min-h-screen flex flex-col">
          {/* --- ONLY TOPBAR (No Permanent Sidebar) --- */}
          <header className="h-16 bg-white border-b px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-4">
              {/* Hamburger Menu Icon (Always Visible) */}
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu size={26} className="text-gray-700" />
              </button>
              <span className="text-xl font-bold text-blue-600 tracking-tight">Builder Pro</span>
            </div>

            <div className="flex items-center gap-4">
              {/* User Gmail - Hidden on very small screens */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border rounded-full">
                <Mail size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-600">user@gmail.com</span>
              </div>
              
              {/* Logout Button */}
              <button className="p-2 md:px-4 md:py-2 text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2">
                <LogOut size={20} />
                <span className="hidden md:inline text-sm font-bold">Logout</span>
              </button>
            </div>
          </header>

          {/* --- SLIDING SIDEBAR (Wix Style - Opens on Click) --- */}
          <aside 
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="h-16 flex items-center justify-between px-6 border-b">
              <span className="text-lg font-bold">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={22} />
              </button>
            </div>
            
            <nav className="p-4 space-y-2">
              <Link href="/dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl text-gray-700 hover:text-blue-600 transition">
                <LayoutDashboard size={20} /> <span className="font-medium">Dashboard</span>
              </Link>
              <Link href="/projects" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl text-gray-700 hover:text-blue-600 transition">
                <FolderKanban size={20} /> <span className="font-medium">Projects</span>
              </Link>
              <Link href="/workers" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl text-gray-700 hover:text-blue-600 transition">
                <Users size={20} /> <span className="font-medium">Workers</span>
              </Link>
              <Link href="/settings" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl text-gray-700 hover:text-blue-600 transition">
                <Settings size={20} /> <span className="font-medium">Settings</span>
              </Link>
            </nav>
          </aside>

          {/* Overlay when sidebar is open */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" 
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          {/* --- MAIN CONTENT AREA --- */}
          <main className="flex-1 p-4 md:p-8 lg:p-12">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
