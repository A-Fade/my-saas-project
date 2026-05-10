"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Topbar from "@/app/components/Topbar";
import { Folder, Users, Banknote, Clock, History, CheckCircle, ChevronRight, X, Phone, Building2, Package, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState({
    totalProjects: 0,
    totalWorkers: 0,
    todaySalary: 0,
    activeProjects: 0,
    pendingPayments: 0,
    todayWorkersList: [] as any[],
    pendingWorkersList: [] as any[],
    historyData: [] as any[],
    allProjects: [] as any[],
    todaySpends: [] as any[]
  });
  
  const [view, setView] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    checkUserAndFetchData();
  }, []);

  async function checkUserAndFetchData() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const userId = user.id;

    try {
      // 1. Projects & Workers
      const { data: projects } = await supabase.from("projects").select("*").eq("user_id", userId).order('created_at', { ascending: false });
      const { data: workers } = await supabase.from("workers").select("*").eq("user_id", userId);

      // 2. Today's Attendance
      const { data: attToday } = await supabase.from("attendance")
        .select(`id, workers!inner(name, phone, salary, user_id), projects!inner(name, user_id)`)
        .eq("date", todayDate).eq("status", "present").eq("projects.user_id", userId);
      
      const todaySal = attToday?.reduce((acc, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;

      // 3. Today's Material Spends
      const { data: spndToday } = await supabase.from("project_spends")
        .select(`*, projects!inner(name, user_id)`)
        .eq("projects.user_id", userId);
      
      // Filter for today's spends (if created_at is used)
      const filteredSpends = spndToday?.filter((s: any) => s.created_at.startsWith(todayDate)) || [];

      setData({
        totalProjects: projects?.length || 0,
        totalWorkers: workers?.length || 0,
        todaySalary: todaySal,
        activeProjects: projects?.filter(p => p.status === "active").length || 0,
        pendingPayments: 0, 
        todayWorkersList: attToday || [],
        pendingWorkersList: [], 
        historyData: [],
        allProjects: projects || [],
        todaySpends: filteredSpends
      });
    } catch (err) { console.error(err); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Topbar />
      <main className="p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">My Dashboard</h1>
            <p className="text-slate-500 font-medium text-sm italic">System Overview</p>
          </div>
        </div>

        {/* 6 SMART COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
          <StatCard onClick={() => router.push('/projects')} title="Total Project" value={data.totalProjects} icon={<Folder size={18}/>} color="text-blue-600" bg="bg-blue-50" />
          <StatCard onClick={() => router.push('/workers')} title="Total Worker" value={data.totalWorkers} icon={<Users size={18}/>} color="text-indigo-600" bg="bg-indigo-50" />
          <StatCard onClick={() => setView('today')} title="Today Salary" value={`₹${data.todaySalary}`} icon={<Banknote size={18}/>} color="text-amber-600" bg="bg-amber-50" />
          <StatCard onClick={() => router.push('/projects')} title="Active Project" value={data.activeProjects} icon={<CheckCircle size={18}/>} color="text-green-600" bg="bg-green-50" />
          <StatCard onClick={() => setView('pending')} title="Pending Pay" value={`₹${data.pendingPayments}`} icon={<Clock size={18}/>} color="text-red-600" bg="bg-red-50" />
          <StatCard onClick={() => setView('history')} title="Preview Pay" value="History" icon={<History size={18}/>} color="text-slate-100" bg="bg-slate-800" isDark />
        </div>

        {/* --- TWO LARGE COLUMNS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* 1. PROJECT LIST WITH INDICATORS */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 p-5 text-white flex justify-between items-center">
              <h3 className="font-bold uppercase tracking-widest text-xs flex items-center gap-2"><Folder size={16}/> Project Status List</h3>
              <button onClick={() => router.push('/projects')} className="text-[10px] font-black underline">VIEW ALL</button>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto">
              <div className="space-y-3">
                {data.allProjects.map((p) => (
                  <div key={p.id} onClick={() => router.push(`/projects/${p.id}`)} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${p.status === 'active' ? 'bg-green-500 animate-pulse' : p.status === 'completed' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                      <p className="font-black text-slate-800 uppercase text-sm tracking-tighter">{p.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${p.status === 'active' ? 'bg-green-100 text-green-700' : p.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                        {p.status}
                      </span>
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-800" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. TODAY'S MATERIAL EXPENSES */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 p-5 text-white flex justify-between items-center">
              <h3 className="font-bold uppercase tracking-widest text-xs flex items-center gap-2"><Package size={16}/> Today's Material Spends</h3>
              <span className="text-[10px] font-bold text-slate-400">{todayDate}</span>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto">
              {data.todaySpends.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-slate-400 text-xs font-bold uppercase italic">No material expenses today</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.todaySpends.map((s) => (
                    <div key={s.id} onClick={() => router.push(`/projects/${s.project_id}`)} className="flex items-center justify-between p-4 bg-red-50/50 rounded-2xl border border-red-100 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                      <div>
                        <p className="font-black text-slate-800 uppercase text-sm">{s.item}</p>
                        <p className="text-[9px] font-bold text-red-500 uppercase tracking-tighter italic">{s.projects?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-red-600 tracking-tighter">₹{s.amount}</p>
                        <ArrowRight size={14} className="ml-auto text-red-200 group-hover:text-red-600" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* --- DETAIL VIEW POPUP (Restored from previous) --- */}
        {view && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden w-full max-w-4xl animate-in zoom-in duration-300">
              <div className="bg-slate-800 p-5 text-white flex justify-between items-center">
                <h3 className="font-bold uppercase tracking-widest text-sm italic">{view} Details</h3>
                <button onClick={() => setView(null)} className="p-2 hover:bg-red-500 rounded-full transition"><X size={20}/></button>
              </div>
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                 {/* Logic for Today/Pending/History view remains here */}
                 {view === 'today' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.todayWorkersList.map((att, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl border flex justify-between items-center">
                          <div><p className="font-black text-slate-800 uppercase text-sm">{att.workers?.name}</p><p className="text-[10px] text-blue-600 font-bold">{att.projects?.name}</p></div>
                          <span className="text-lg font-black text-blue-700">₹{att.workers?.salary}</span>
                        </div>
                      ))}
                    </div>
                 )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color, bg, onClick, isDark }: any) {
  return (
    <div onClick={onClick} className={`${isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} p-4 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group`}>
      <div className={`w-10 h-10 flex items-center justify-center rounded-xl mb-3 ${bg} ${color}`}>{icon}</div>
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">{title}</p>
      <div className="flex items-center justify-between"><h2 className="text-lg font-black tracking-tight">{value}</h2><ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></div>
    </div>
  );
}
