"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Topbar from "@/app/components/Topbar";
import { Folder, Users, Banknote, Clock, History, CheckCircle, ChevronRight, X, Package, Phone, Building2 } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState({
    totalProjects: 0,
    totalWorkers: 0,
    todaySalary: 0,
    activeProjects: 0,
    todayWorkersList: [] as any[],
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

      // Fetch Projects & Workers
      const { data: projects } = await supabase.from("projects").select("*").eq("user_id", userId);
      const { data: workers } = await supabase.from("workers").select("*").eq("user_id", userId);

      // Today's Attendance List (For Popup)
      const { data: attToday } = await supabase.from("attendance")
        .select(`id, workers(name, phone, salary), projects!inner(name, user_id)`)
        .eq("date", todayISO)
        .eq("projects.user_id", userId);
      
      const todaySal = attToday?.reduce((acc: number, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;

      // Spends
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
        todayWorkersList: attToday || [],
        todaySpendsList: spndToday || [],
        allProjects: projects || [],
      });
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  const totalTodaySpend = data.todaySpendsList.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  // RESET LOADING TO LIGHT THEME
  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Loading BuilderPro...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans">
      <Topbar />
      <main className="p-4 md:p-8 max-w-[1400px] mx-auto w-full">
        
        {/* HEADER */}
        <div className="mb-8 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">System Control</h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Real-time Performance</p>
          </div>
          <div className="bg-slate-800 text-white px-5 py-2 rounded-2xl text-xs font-bold tracking-widest">{todayISO}</div>
        </div>

        {/* 6 SMART COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-10">
          <StatCard onClick={() => router.push('/projects')} title="Projects" value={data.totalProjects} icon={<Folder size={18}/>} bg="bg-[#4f46e5]" />
          <StatCard onClick={() => router.push('/workers')} title="Workers" value={data.totalWorkers} icon={<Users size={18}/>} bg="bg-[#0ea5e9]" />
          <StatCard onClick={() => setView('today')} title="Today Pay" value={`₹${data.todaySalary}`} icon={<Banknote size={18}/>} bg="bg-[#10b981]" />
          <StatCard onClick={() => router.push('/projects')} title="Active" value={data.activeProjects} icon={<CheckCircle size={18}/>} bg="bg-[#8b5cf6]" />
          <StatCard title="Spent" value={`₹${totalTodaySpend}`} icon={<Package size={18}/>} bg="bg-[#f43f5e]" />
          <StatCard onClick={() => setView('history')} title="History" value="View" icon={<History size={18}/>} bg="bg-[#334155]" />
        </div>

        {/* 2 LARGE COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 p-5 text-white font-black text-[10px] uppercase tracking-[0.2em]">Project Status</div>
            <div className="p-4 max-h-[350px] overflow-y-auto space-y-2">
              {data.allProjects.map(p => (
                <div key={p.id} onClick={() => router.push(`/projects/${p.id}`)} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-white transition-all cursor-pointer border border-transparent hover:border-slate-200">
                  <span className="font-black text-slate-700 text-sm uppercase">{p.name}</span>
                  <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{p.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 p-5 text-white font-black text-[10px] uppercase tracking-[0.2em]">Today's Material flow</div>
            <div className="p-4 max-h-[350px] overflow-y-auto space-y-2">
              {data.todaySpendsList.length === 0 ? <p className="text-center py-10 text-slate-300 font-bold text-xs uppercase italic">No data today</p> : data.todaySpendsList.map(s => (
                <div key={s.id} onClick={() => router.push(`/projects/${s.project_id}`)} className="flex items-center justify-between p-4 bg-red-50/50 rounded-2xl border border-red-100 cursor-pointer">
                  <div><p className="font-black text-slate-800 text-sm uppercase">{s.item}</p><p className="text-[9px] font-bold text-red-500 uppercase italic">🏗️ {s.projects?.name}</p></div>
                  <span className="font-black text-slate-800 text-lg">₹{s.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- POPUP VIEW FIX (Today Pay Click Logic restored) --- */}
        {view && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
              <div className="bg-slate-800 p-5 text-white flex justify-between items-center uppercase font-black tracking-widest text-xs">
                <span>{view === 'today' ? "Today's Attendance" : "Records"}</span>
                <button onClick={() => setView(null)} className="p-1 hover:bg-red-500 rounded-full"><X size={20}/></button>
              </div>
              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
                {view === 'today' && (
                  data.todayWorkersList.length === 0 ? <p className="text-center py-4 italic">No attendance marked today.</p> :
                  data.todayWorkersList.map((att:any, i:number) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
                      <div>
                        <p className="font-black text-slate-800 uppercase text-sm">{att.workers?.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1"><Phone size={10}/> {att.workers?.phone || 'N/A'}</p>
                        <p className="text-[10px] text-blue-600 font-black uppercase flex items-center gap-1 mt-1"><Building2 size={10}/> {att.projects?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-blue-700">₹{att.workers?.salary}</p>
                        <p className="text-[8px] font-bold text-green-600 uppercase">Present</p>
                      </div>
                    </div>
                  ))
                )}
                {view === 'history' && <p className="text-center py-10 font-bold text-slate-400">Payment history will load here...</p>}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, bg, onClick }: any) {
  return (
    <div onClick={onClick} className={`${bg} text-white p-5 rounded-[2.2rem] cursor-pointer shadow-lg hover:scale-105 transition-all group relative overflow-hidden`}>
      <div className="absolute -right-2 -top-2 opacity-10 group-hover:scale-150 transition-all duration-700">{icon}</div>
      <p className="text-[9px] font-black uppercase tracking-widest opacity-80 mb-1 leading-none">{title}</p>
      <h2 className="text-xl font-black tracking-tighter">{value}</h2>
      <div className="mt-3 bg-white/20 w-6 h-6 rounded-full flex items-center justify-center"><ChevronRight size={12}/></div>
    </div>
  );
}
