"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { Users, FolderKanban, Wallet, TrendingUp, ChevronRight, Activity } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    todaySalary: 0,
    activeWorkers: 0,
    totalSpends: 0
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];

    try {
      // 1. Total Projects
      const { count: projCount } = await supabase.from("projects").select("*", { count: 'exact', head: true });

      // 2. Today's Attendance & Salary
      const { data: attendance } = await supabase.from("attendance").select(`worker_id, workers(salary)`).eq("date", today);
      const todaySal = attendance?.reduce((acc: number, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;
      const presentCount = attendance?.length || 0;

      // 3. Material Spends
      const { data: spends } = await supabase.from("project_spends").select("amount");
      const totalSpnd = spends?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;

      setStats({
        totalProjects: projCount || 0,
        todaySalary: todaySal,
        activeWorkers: presentCount,
        totalSpends: totalSpnd
      });
    } catch (err) { console.error(err); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR FIXED (Hidden on mobile) */}
      <div className="hidden md:block w-64 fixed h-full z-40">
        <Sidebar />
      </div>

      <div className="flex-1 md:ml-64 flex flex-col">
        <Topbar />
        
        <main className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Main Dashboard</h1>
            <p className="text-slate-500 font-medium mt-2">BuilderPro Business Overview</p>
          </div>

          {/* CLICKABLE PROFESSIONAL CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 1. TODAY'S LABOR CARD */}
            <div 
              onClick={() => router.push('/workers')}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-amber-100 text-amber-600 rounded-3xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Users size={28} />
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-slate-800 transition-colors" />
              </div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Today's Labor Cost</p>
              <h2 className="text-4xl font-black text-slate-800 tracking-tighter">₹{stats.todaySalary}</h2>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">{stats.activeWorkers} Workers Present Today</span>
              </div>
            </div>

            {/* 2. TOTAL PROJECTS CARD */}
            <div 
              onClick={() => router.push('/projects')}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-blue-100 text-blue-600 rounded-3xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FolderKanban size={28} />
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-slate-800 transition-colors" />
              </div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Total Projects</p>
              <h2 className="text-4xl font-black text-slate-800 tracking-tighter">{stats.totalProjects}</h2>
              <p className="text-xs font-bold text-slate-500 mt-4 uppercase tracking-tight">Manage all active sites</p>
            </div>

            {/* 3. MATERIAL SPENDS CARD */}
            <div 
              onClick={() => router.push('/projects')}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-red-100 text-red-600 rounded-3xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Wallet size={28} />
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-slate-800 transition-colors" />
              </div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Total Material Cost</p>
              <h2 className="text-4xl font-black text-slate-800 tracking-tighter">₹{stats.totalSpends}</h2>
              <div className="mt-4 flex items-center gap-2 text-red-500">
                <TrendingUp size={16} />
                <span className="text-xs font-bold uppercase">Total Outflow</span>
              </div>
            </div>

          </div>

          {/* Bottom Info Section */}
          <div className="mt-12 p-10 bg-slate-800 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 uppercase tracking-tighter italic">Professional Construction Management</h3>
              <p className="text-slate-400 max-w-lg font-medium">Aapka BuilderPro system ab real-time data fetch kar raha hai. Har card clickable hai aur aapko direct relevant page par le jayega.</p>
            </div>
            <Activity className="absolute right-[-20px] bottom-[-20px] text-white/5" size={200} />
          </div>
        </main>
      </div>
    </div>
  );
}
