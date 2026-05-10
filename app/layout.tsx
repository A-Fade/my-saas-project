"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, FolderKanban, Users, Settings } from "lucide-react";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Landing ya Auth pages par menu hide karne ke liye logic
  const isDashboard = pathname.includes("/dashboard") || pathname.includes("/projects");

  return (
    <html lang="en">
      <body className="bg-slate-50">
        
        {/* --- MOBILE HAMBURGER BUTTON (Floating Icon) --- */}
        {isDashboard && (
          <div className="lg:hidden fixed top-4 left-4 z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 bg-white shadow-xl rounded-2xl border border-slate-200 text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}

        {/* --- MOBILE SLIDING SIDEBAR (Wix Style) --- */}
        <aside 
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-8 border-b">
            <h2 className="text-2xl font-black text-blue-700">Builder Pro</h2>
          </div>
          <nav className="p-6 space-y-4">
            <MobileLink href="/dashboard" icon={<LayoutDashboard/>} label="Dashboard" active={pathname === "/dashboard"} close={() => setIsOpen(false)} />
            <MobileLink href="/projects" icon={<FolderKanban/>} label="Projects" active={pathname === "/projects"} close={() => setIsOpen(false)} />
            <MobileLink href="/workers" icon={<Users/>} label="Workers" active={pathname === "/workers"} close={() => setIsOpen(false)} />
          </nav>
        </aside>

        {/* Overlay (Blur Background) */}
        {isOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsOpen(false)}></div>
        )}

        {/* MAIN CONTENT */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

// Helper for Mobile Links
function MobileLink({ href, icon, label, active, close }: any) {
  return (
    <Link href={href} onClick={close} className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
      active ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-600 hover:bg-slate-100"
    }`}>
      {icon} {label}
    </Link>
  );
}
