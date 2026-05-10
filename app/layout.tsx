"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Menu, X, LogOut, Mail } from "lucide-react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Sirf Dashboard pages par layout dikhane ke liye logic
  // Agar path '/' (Landing), '/login', ya '/signup' hai to layout hide rahega
  const showDashboardLayout = pathname !== "/" && pathname !== "/login" && pathname !== "/signup";

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-100">
        <Toaster position="top-right" />

        {!showDashboardLayout ? (
          /* --- LANDING, LOGIN, SIGNUP VIEW (Bilkul Clean) --- */
          <main>{children}</main>
        ) : (
          /* --- DASHBOARD VIEW (Sidebar + Topbar) --- */
          <div className="flex h-screen overflow-hidden">
            
            {/* SIDEBAR - Jo aapka pehle se tha */}
            <aside 
              className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-sm transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="h-16 flex items-center justify-between px-6 border-b">
                <span className="text-xl font-bold text-blue-600">Builder Pro</span>
                <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X size={20}/></button>
              </div>
              
              {/* Yahan aapke purane sidebar ke links aayenge */}
              <nav className="p-4">
                 <p className="text-xs text-gray-400 uppercase font-bold px-4 mb-2">Main Menu</p>
                 {/* Aapke purane Sidebar options yahan add karein */}
              </nav>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0">
              
              {/* TOPBAR - Wix Style Mobile Menu + Gmail/Logout */}
              <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
                <div className="flex items-center">
                  {/* Mobile 3-Lines Icon (Sirf mobile pe dikhega) */}
                  <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 p-2 hover:bg-gray-100 rounded-md">
                    <Menu size={24} />
                  </button>
                  <h1 className="font-semibold text-gray-700 hidden sm:block">Dashboard</h1>
                </div>

                <div className="flex items-center gap-4">
                  {/* Gmail & Logout Button */}
                  <div className="hidden md:flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1 rounded-full border">
                    <Mail size={16} />
                    <span className="text-sm">user@gmail.com</span>
                  </div>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition">
                    <span className="hidden sm:inline text-sm font-medium">Logout</span>
                    <LogOut size={20} />
                  </button>
                </div>
              </header>

              {/* DASHBOARD PAGE CONTENT */}
              <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {children}
              </main>
            </div>

            {/* Mobile Overlay (Click karne par sidebar band ho jaye) */}
            {isSidebarOpen && (
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}
          </div>
        )}
      </body>
    </html>
  );
}
