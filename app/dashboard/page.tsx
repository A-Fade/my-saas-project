"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Users, FolderKanban, Wallet, TrendingUp, ChevronRight } from "lucide-react";

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
      const { count: projCount } = await supabase.from("projects").select("*", { count: 'exact', head: true });
      const { data: attendance } = await supabase.from("attendance").select(`worker_id, workers(salary)`).eq("date", today);
      const todaySal = attendance?.reduce((acc: number, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;
      const { data: spends } = await supabase.from("project_spends").select("amount");
      const totalSpnd = spends?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;

      setStats({
        totalProjects: projCount || 0,
        todaySalary: todaySal,
        activeWorkers: attendance?.length || 0,
        totalSpends: totalSpnd
      });
    } catch (err) { console.error(err); }
    setLoading(false);
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full min-h-screen bg-slate-50">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Main Dashboard</h1>
        <p className="text-slate-500 font-medium mt-2">BuilderPro Business Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Today's Labor Card */}
        <div onClick={() => router.push('/workers')} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-amber-100 text-amber-600 rounded-3xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Users size={28} />
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-slate-800 transition-colors" />
          </div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Today's Labor Cost</p>
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter">₹{stats.todaySalary}</h2>
          <p className="text-xs font-bold text-slate-500 mt-4 uppercase">{stats.activeWorkers} Workers Present Today</p>
        </div>

        {/* Total Projects Card */}
        <div onClick={() => router.push('/projects')} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-3xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FolderKanban size={28} />
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-slate-800 transition-colors" />
          </div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Total Projects</p>
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter">{stats.totalProjects}</h2>
          <p className="text-xs font-bold text-slate-500 mt-4 uppercase">Manage all active sites</p>
        </div>

        {/* Material Spends Card */}
        <div onClick={() => router.push('/projects')} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-red-100 text-red-600 rounded-3xl group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Wallet size={28} />
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-slate-800 transition-colors" />
          </div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Total Material Cost</p>
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter">₹{stats.totalSpends}</h2>
          <div className="mt-4 flex items-center gap-2 text-red-500">
            <TrendingUp size={16} /> <span className="text-xs font-bold uppercase tracking-tight">Total Outflow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
