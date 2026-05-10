"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { Users, FolderKanban, Wallet, TrendingUp, ArrowUpRight, Activity } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    todaySalary: 0,
    activeWorkers: 0,
    totalSpends: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];

    // 1. Fetch Projects Count
    const { count: projCount } = await supabase.from("projects").select("*", { count: 'exact', head: true });

    // 2. Fetch Today's Attendance & Salary
    // Note: We join with workers to get their daily salary rate
    const { data: attendance } = await supabase
      .from("attendance")
      .select(`status, date, workers(salary)`)
      .eq("date", today)
      .eq("status", "present");

    const todaySal = attendance?.reduce((acc: number, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;
    const presentCount = attendance?.length || 0;

    // 3. Fetch Total Material Spends
    const { data: spends } = await supabase.from("project_spends").select("amount");
    const totalSpnd = spends?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;

    setStats({
      totalProjects: projCount || 0,
      todaySalary: todaySal,
      activeWorkers: presentCount,
      totalSpends: totalSpnd
    });
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop Only */}
      <div className="hidden md:block w-64 fixed h-full z-40">
        <Sidebar />
      </div>

      <div className="flex-1 md:ml-64 flex flex-col">
        <Topbar />
        
        <main className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">System Overview</h1>
            <p className="text-slate-500 font-medium">Real-time tracking of your construction business</p>
          </div>

          {/* TOP 4 SMART CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Today's Labor Cost - THE SMART COLUMN */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 bg-amber-50 text-amber-600 rounded-bl-2xl">
                <Activity size={20} />
              </div>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Today's Labor</p>
              <h2 className="text-3xl font-black text-slate-800">₹{stats.todaySalary}</h2>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded-lg font-black uppercase">
                  {stats.activeWorkers} Workers Present
                </span>
              </div>
            </div>

            {/* Total Projects */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 hover:shadow-md transition-all relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 bg-blue-50 text-blue-600 rounded-bl-2xl">
                <FolderKanban size={20} />
              </div>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Total Projects</p>
              <h2 className="text-3xl font-black text-slate-800">{stats.totalProjects}</h2>
              <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-tight">Active Sites</p>
            </div>

            {/* Material Expenditure */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 hover:shadow-md transition-all relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 bg-red-50 text-red-600 rounded-bl-2xl">
                <Wallet size={20} />
              </div>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Material Spent</p>
              <h2 className="text-3xl font-black text-slate-800">₹{stats.totalSpends}</h2>
              <p className="text-[10px] text-red-500 mt-4 font-bold uppercase tracking-tight flex items-center gap-1">
                <TrendingUp size={12}/> Total Outflow
              </p>
            </div>

            {/* Business Health (Visual Profit indicator) */}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-900 p-6 rounded-[2rem] shadow-lg text-white relative overflow-hidden">
              <p className="text-blue-100 font-bold text-[10px] uppercase tracking-widest mb-1 opacity-80">System Status</p>
              <h2 className="text-2xl font-black">Professional Mode</h2>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase">All Systems Live</span>
              </div>
              <ArrowUpRight className="absolute bottom-4 right-4 opacity-20" size={60} />
            </div>

          </div>

          {/* Quick Actions or Summary Chart Placeholder */}
          <div className="mt-12 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Welcome to BuilderPro Analytics</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Aaj ki labor cost aur material expenses ka poora hisab yahan real-time update ho raha hai.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
