"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Folder,
  Users,
  CreditCard,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Projects", // 🔥 NEW
      path: "/projects",
      icon: <Folder size={20} />,
    },
    {
      name: "Workers",
      path: "/workers",
      icon: <Users size={20} />,
    },
    {
      name: "Payments",
      path: "/payments",
      icon: <CreditCard size={20} />,
    },
  ];

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
        <h1 className="font-bold text-lg">🏗️ Builder</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`
        fixed md:relative top-0 left-0 h-full w-64 
        bg-white border-r shadow-sm p-5 
        transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* LOGO */}
        <h1 className="text-2xl font-bold mb-8 hidden md:block">
          🏗️ Builder SaaS
        </h1>

        {/* MENU */}
        <nav className="space-y-2">
          {menu.map((item) => {
            const active = pathname === item.path;

            return (
              <Link key={item.path} href={item.path}>
                <div
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300
                  ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="absolute bottom-5 left-5 right-5 text-xs text-gray-400">
          © 2026 Builder SaaS
        </div>
      </div>

      {/* OVERLAY (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 md:hidden"
        ></div>
      )}
    </>
  );
}