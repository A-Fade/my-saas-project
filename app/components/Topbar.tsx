"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [email, setEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex items-center justify-between">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          BuilderPro
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="hidden md:block text-right">
          <p className="text-sm font-semibold text-slate-700">
            {email}
          </p>

          <p className="text-xs text-slate-500">
            Admin
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}