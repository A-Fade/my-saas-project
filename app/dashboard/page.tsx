"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Topbar from "@/app/components/Topbar";
import { Folder, Users, Banknote, Clock, History, CheckCircle, ChevronRight, X, Package, LayoutGrid, ArrowUpRight } from "lucide-react";

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

  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  useEffect(() => {
    fetchDashboardData();
  }, []);

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

      const { data: attToday } = await supabase.from("attendance")
        .select(`id, workers(salary), projects!inner(user_id)`)
        .eq("date", todayISO)
        .eq("projects.user_id", userId);
      
      const todaySal = attToday?.reduce((acc: number, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;

      const { data: spndToday } = await supabase.from("project_spends")
        .select(`*, projects!inner(name, user_id)`)
        .eq("projects.user_id", userId)
        .gte("created_at", startOfDay)
        .lte("created_at", endOfDay);

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

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold tracking-widest text-xs uppercase">Loading Dashboard</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-indigo-100">
      <Topbar />
      <main className="p-4 md:p-10 max-w-[1400px] mx-auto w-full">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <LayoutGrid className="text-indigo-600" size={28} /> Control Center
            </h1>
            <p className="text-slate-500 font-medium mt-1">Real-time construction analytics for your account</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{todayISO}</span>
          </div>
        </div>

        {/* 6 SMART COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          <StatCard onClick={() => router.push('/projects')} title="Projects" value={data.totalProjects} icon={<Folder size={20}/>} color="text-indigo-600" bg="bg-indigo-50" />
          <StatCard onClick={() => router.push('/workers')} title="Workers" value={data.totalWorkers} icon={<Users size={20}/>} color="text-blue-600" bg="bg-blue-50" />
          <StatCard onClick={() => setView('today')} title="Today Salary" value={`₹${data.todaySalary}`} icon={<Banknote size={20}/>} color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard onClick={() => router.push('/projects')} title="Active Sites" value={data.activeProjects} icon={<CheckCircle size={20}/>} color="text-violet-600" bg="bg-violet-50" />
          <StatCard title="Today Spend" value={`₹${totalTodaySpend}`} icon={<Package size={20}/>} color="text-rose-600" bg="bg-rose-50" />
          <StatCard onClick={() => setView('history')} title="Payments" value="History" icon={<History size={20}/>} color="text-white" bg="bg-slate-900" isDark />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Project Status List */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
              <h3 className="font-bold uppercase tracking-widest text-[11px]">Active Projects Tracker</h3>
              <ArrowUpRight size={18} className="opacity-40" />
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto space-y-3">
              {data.allProjects.map((p) => (
                <div key={p.id} onClick={() => router.push(`/projects/${p.id}`)} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-3xl hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer group">
                  <span className="font-bold text-slate-800 tracking-tight">{p.name}</span>
                  <div className={`text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-xl border ${p.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                    {p.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Material Expenses */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
              <h3 className="font-bold uppercase tracking-widest text-[11px]">Material Expenses Flow</h3>
              <Package size={18} className="opacity-40" />
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto space-y-3">
              {data.todaySpendsList.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center gap-2">
                   <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300"><Clock size={24}/></div>
                   <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No transactions recorded yet</p>
                </div>
              ) : (
                data.todaySpendsList.map((s) => (
                  <div key={s.id} onClick={() => router.push(`/projects/${s.project_id}`)} className="flex items-center justify-between p-5 bg-rose-50/30 rounded-3xl border border-rose-100/50 hover:bg-white hover:border-rose-200 transition-all cursor-pointer">
                    <div>
                      <p className="font-bold text-slate-800 uppercase text-xs">{s.item}</p>
                      <p className="text-[10px] font-medium text-slate-500 mt-1 italic tracking-tight">{s.projects?.name}</p>
                    </div>
                    <span className="font-black text-rose-600 text-lg">₹{s.amount}</span>
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

function StatCard({ title, value, icon, color, bg, onClick, isDark }: any) {
  return (
    <div 
      onClick={onClick} 
      className={`${isDark ? 'bg-slate-900 text-white ring-4 ring-slate-900/5 shadow-xl shadow-slate-200' : 'bg-white text-slate-900 shadow-sm border border-slate-200'} p-5 rounded-[2rem] cursor-pointer hover:-translate-y-1.5 transition-all duration-300 group`}
    >
      <div className={`w-11 h-11 flex items-center justify-center rounded-2xl mb-4 ${isDark ? 'bg-slate-800' : bg} ${isDark ? 'text-slate-100' : color} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className={`text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{title}</p>
      <h2 className="text-xl font-black tracking-tight leading-none">{value}</h2>
    </div>
  );
}
