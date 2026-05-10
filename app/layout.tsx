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

  // Landing, Login, Signup par kuch bhi extra nahi dikhega
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

  // Dashboard View (Clean & Single Sidebar/Topbar)
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-50 text-gray-900">
        <Toaster position="top-right" />
        
        <div className="flex h-screen overflow-hidden">
          {/* --- 1. SINGLE SIDEBAR --- */}
          <aside 
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="h-16 flex items-center justify-between px-6 border-b">
              <span className="text-xl font-bold text-blue-600 tracking-tight">Builder Pro</span>
              <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)}><X size={22}/></button>
            </div>
            
            <nav className="p-4 space-y-2">
              <NavItem href="/dashboard" icon={<LayoutDashboard size={20}/>} label="Dashboard" active={pathname === "/dashboard"} />
              <NavItem href="/projects" icon={<FolderKanban size={20}/>} label="Projects" active={pathname === "/projects"} />
              <NavItem href="/workers" icon={<Users size={20}/>} label="Workers" active={pathname === "/workers"} />
              <div className="pt-4 border-t mt-4">
                <NavItem href="/settings" icon={<Settings size={20}/>} label="Settings" active={pathname === "/settings"} />
              </div>
            </nav>
          </aside>

          {/* --- 2. MAIN CONTENT AREA --- */}
          <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
            
            {/* SINGLE TOPBAR */}
            <header className="h-16 bg-white border-b px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
              <div className="flex items-center">
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 mr-3 hover:bg-gray-100 rounded-lg">
                  <Menu size={26} />
                </button>
                <h1 className="text-lg font-semibold text-gray-800 hidden md:block">
                  Project Management
                </h1>
              </div>

              <div className="flex items-center gap-3">
                {/* Desktop User Info */}
                <div className="hidden sm:flex flex-col text-right mr-2">
                  <span className="text-sm font-semibold leading-none">Admin User</span>
                  <span className="text-xs text-gray-500 mt-1">user@gmail.com</span>
                </div>
                {/* Logout Button */}
                <button className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition duration-200">
                  <LogOut size={18} />
                  <span className="hidden lg:inline text-sm font-medium">Logout</span>
                </button>
              </div>
            </header>

            {/* PAGE CONTENT */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>

          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
          )}
        </div>
      </body>
    </html>
  );
}

// Helper Component for Nav Items
function NavItem({ href, icon, label, active }: { href: string; icon: any; label: string; active: boolean }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-gray-600 hover:bg-gray-100"
    }`}>
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
