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
  UserPlus, // ✅ Naya icon clients ke liye
  LifeBuoy
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ HYDRATION FIX
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 📌 MENU ITEMS (Clients add kar diya gaya hai)
  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <Folder size={20} />,
    },
    {
      name: "Clients", // ✅ Naya Client link
      path: "/clients",
      icon: <UserPlus size={20} />,
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
    
    {
      name: "Support",
      path: "/support",
      icon: <LifeBuoy size={20} />,
    },
  ];

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white shadow-lg">
        <h1 className="font-bold text-xl">
          🏗️ Builder<span className="text-blue-400">Pro</span>
        </h1>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-slate-800 transition"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:relative top-0 left-0 h-full w-64 bg-slate-900 text-white border-r border-slate-800 shadow-2xl p-5 
          transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* LOGO */}
        <div className="mb-10">
          <h1 className="text-3xl font-black">
            🏗️ Builder<span className="text-blue-400">Pro</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Construction Management SaaS
          </p>
        </div>

        {/* MENU */}
        <nav className="space-y-3">
          {menu.map((item) => {
            const active = pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  onClick={() => setOpen(false)}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 font-medium
                    ${
                      active
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <div>{item.icon}</div>
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
            <p className="text-sm font-semibold mb-1"> BuilderPro SaaS </p>
            <p className="text-xs text-slate-400">
              Manage projects, workers & payments easily.
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">
            © 2026 BuilderPro
          </p>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
        ></div>
      )}
    </>
  );
}
