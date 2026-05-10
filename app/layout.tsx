"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // Path check karne ke liye
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Menu, X, LogOut, Mail, LayoutDashboard, Users, FolderKanban } from "lucide-react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Pages jahan Sidebar aur Topbar NAHI dikhana (Landing, Login, Signup)
  const isAuthPage = pathname === "/" || pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-100 text-gray-900">
        <Toaster position="top-right" />

        {isAuthPage ? (
          /* --- LANDING / LOGIN / SIGNUP VIEW (No Sidebar) --- */
          <div className="min-h-screen flex flex-col">
            {/* Simple Landing Navbar */}
            <nav className="h-20 bg-white border-b px-6 flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-600">Builder Pro</div>
              <div className="flex gap-4">
                <Link href="/login" className="px-5 py-2 text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                <Link href="/signup" className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium">Get Started</Link>
              </div>
            </nav>
            <main className="flex-1">{children}</main>
          </div>
        ) : (
          /* --- DASHBOARD VIEW (With Responsive Sidebar & Wix Menu) --- */
          <div className="flex h-screen overflow-hidden">
            {/* 1. SIDEBAR */}
            <aside 
              className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-sm transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="h-16 flex items-center justify-between px-6 border-b">
                <span className="text-xl font-bold text-blue-600">Builder Pro</span>
                <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X size={20}/></button>
              </div>
              <nav className="p-4 space-y-1">
                <SidebarLink href="/dashboard" icon={<LayoutDashboard size={18}/>} label="Dashboard" active={pathname === "/dashboard"} />
                <SidebarLink href="/projects" icon={<FolderKanban size={18}/>} label="Projects" active={pathname === "/projects"} />
                <SidebarLink href="/workers" icon={<Users size={18}/>} label="Workers" active={pathname === "/workers"} />
              </nav>
            </aside>

            {/* 2. MAIN AREA */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* TOPBAR */}
              <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
                <div className="flex items-center">
                  <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 p-2 hover:bg-gray-100 rounded-md">
                    <Menu size={24} />
                  </button>
                  <h1 className="text-lg font-semibold capitalize hidden sm:block">
                    {pathname.replace("/", "")}
                  </h1>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col text-right">
                    <span className="text-sm font-medium">User Account</span>
                    <span className="text-xs text-gray-500">user@gmail.com</span>
                  </div>
                  <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition">
                    <LogOut size={22} />
                  </button>
                </div>
              </header>

              <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {children}
              </main>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}
          </div>
        )}
      </body>
    </html>
  );
}

// Helper Component for Sidebar Links
function SidebarLink({ href, icon, label, active }: { href: string; icon: any; label: string; active: boolean }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50"
    }`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}
