"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Topbar from "@/app/components/Topbar";
import { Folder, Users, Banknote, Clock, History, CheckCircle, ChevronRight, X, Package, LayoutGrid, Zap } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState({
    totalProjects: 0,
    totalWorkers: 0,
    todaySalary: 0,
    activeProjects: 0,
    todaySpendsList: [] as any[], 
    allProjects: [] as any[],
  });
  
  const [view, setView] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const todayISO = new Date().toISOString().split('T')[0];

  useEffect(() => { fetchDashboardData(); }, []);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const userId = user.id;

      const now = new Date();
      const startOfDay = new Date(now.setHours(0,0,0,0)).toISOString();
      const endOfDay = new Date(now.setHours(23,59,59,999)).toISOString();

      const { data: projects } = await supabase.from("projects").select("*").eq("user_id", userId);
      const { data: workers } = await supabase.from("workers").select("*").eq("user_id", userId);
      const { data: attToday } = await supabase.from("attendance").select(`id, workers(salary), projects!inner(user_id)`).eq("date", todayISO).eq("projects.user_id", userId);
      const todaySal = attToday?.reduce((acc: number, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;
      const { data: spndToday } = await supabase.from("project_spends").select(`*, projects!inner(name, user_id)`).eq("projects.user_id", userId).gte("created_at", startOfDay).lte("created_at", endOfDay);

      setData({
        totalProjects: projects?.length || 0,
        totalWorkers: workers?.length || 0,
        todaySalary: todaySal,
        activeProjects: projects?.filter(p => p.status === "active").length || 0,
        todaySpendsList: spndToday || [],
        allProjects: projects || [],
      });
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  const totalTodaySpend = data.todaySpendsList.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#0f172a] text-white font-black tracking-tighter text-3xl">BUILDER PRO...</div>;

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans">
      <Topbar />
      <main className="p-4 md:p-8 max-w-[1400px] mx-auto w-full">
        
        {/* HEADER SECTION */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200">
          <div>
            <h1 className="text-3xl font-black text-[#1e293b] flex items-center gap-2 uppercase tracking-tight">
              <Zap className="text-amber-500 fill-amber-500" size={28} /> Control Dashboard
            </h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Live Analytics & Performance</p>
          </div>
          <div className="bg-[#1e293b] text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-sm font-black uppercase tracking-widest">{todayISO}</span>
          </div>
        </div>

        {/* 6 PREMIUM COLORED COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          <StatCard onClick={() => router.push('/projects')} title="Projects" value={data.totalProjects} icon={<Folder size={20}/>} color="text-white" bg="bg-[#4f46e5]" />
          <StatCard onClick={() => router.push('/workers')} title="Workers" value={data.totalWorkers} icon={<Users size={20}/>} color="text-white" bg="bg-[#0ea5e9]" />
          <StatCard onClick={() => setView('today')} title="Today Pay" value={`₹${data.todaySalary}`} icon={<Banknote size={20}/>} color="text-white" bg="bg-[#10b981]" />
          <StatCard onClick={() => router.push('/projects')} title="Active Sites" value={data.activeProjects} icon={<CheckCircle size={20}/>} color="text-white" bg="bg-[#8b5cf6]" />
          <StatCard title="Today Spend" value={`₹${totalTodaySpend}`} icon={<Package size={20}/>} color="text-white" bg="bg-[#f43f5e]" />
          <StatCard onClick={() => setView('history')} title="History" value="Records" icon={<History size={20}/>} color="text-white" bg="bg-[#334155]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project List Column */}
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-[#1e293b] p-6 text-white flex justify-between items-center">
              <h3 className="font-black uppercase tracking-[0.2em] text-xs flex items-center gap-2">
                <LayoutGrid size={18} className="text-amber-400" /> Project Pipeline
              </h3>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto space-y-3 bg-[#f8fafc]">
              {data.allProjects.map((p) => (
                <div key={p.id} onClick={() => router.push(`/projects/${p.id}`)} className="flex items-center justify-between p-5 bg-white rounded-3xl border-2 border-transparent hover:border-[#4f46e5] hover:shadow-xl transition-all cursor-pointer group">
                  <span className="font-black text-[#334155] uppercase text-sm tracking-tighter">{p.name}</span>
                  <div className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full ${p.status === 'active' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#dbeafe] text-[#1e40af]'}`}>
                    {p.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Material Expenses Column */}
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-[#1e293b] p-6 text-white flex justify-between items-center">
              <h3 className="font-black uppercase tracking-[0.2em] text-xs flex items-center gap-2">
                <Package size={18} className="text-rose-400" /> Material Flow
              </h3>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto space-y-3 bg-[#f8fafc]">
              {data.todaySpendsList.length === 0 ? (
                <div className="py-20 text-center uppercase font-black text-slate-300 tracking-widest text-xs">No Data Today</div>
              ) : (
                data.todaySpendsList.map((s) => (
                  <div key={s.id} onClick={() => router.push(`/projects/${s.project_id}`)} className="flex items-center justify-between p-5 bg-white rounded-3xl border-l-8 border-[#f43f5e] shadow-sm hover:shadow-xl transition-all cursor-pointer">
                    <div>
                      <p className="font-black text-[#1e293b] uppercase text-sm">{s.item}</p>
                      <p className="text-[10px] font-bold text-rose-500 uppercase mt-1">🏗️ {s.projects?.name}</p>
                    </div>
                    <span className="font-black text-[#1e293b] text-xl tracking-tighter">₹{s.amount}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color, bg, onClick }: any) {
  return (
    <div 
      onClick={onClick} 
      className={`${bg} ${color} p-6 rounded-[2.2rem] cursor-pointer shadow-lg hover:scale-105 hover:rotate-1 transition-all duration-300 relative overflow-hidden group`}
    >
      <div className="absolute -right-2 -top-2 opacity-10 group-hover:scale-150 transition-transform duration-700">
        {icon}
      </div>
      <div className="flex flex-col gap-1 relative z-10">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{title}</p>
        <h2 className="text-2xl font-black tracking-tighter leading-none">{value}</h2>
      </div>
      <div className="mt-4 bg-white/20 w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors">
        <ChevronRight size={16} />
      </div>
    </div>
  );
}
