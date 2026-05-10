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
      // 1. Fetch ALL Projects (for count and list)
      const { data: projects } = await supabase.from("projects").select("*").eq("user_id", userId).order('created_at', { ascending: false });
      
      // 2. Fetch ALL Workers (for count)
      const { data: workers } = await supabase.from("workers").select("*").eq("user_id", userId);

      // 3. Fetch Today's Attendance (Safe join)
      const { data: attToday } = await supabase.from("attendance")
        .select(`id, workers(name, phone, salary), projects!inner(name, user_id)`)
        .eq("date", todayDate)
        .eq("projects.user_id", userId);
      
      const todaySal = attToday?.reduce((acc, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;

      // 4. Today's Material Spends
      const { data: allSpends } = await supabase.from("project_spends")
        .select(`*, projects!inner(name, user_id)`)
        .eq("projects.user_id", userId);
      
      // Filtering spends manually to ensure it works even if created_at is slightly different
      const filteredSpends = allSpends?.filter((s: any) => s.created_at?.startsWith(todayDate)) || [];

      setData({
        totalProjects: projects?.length || 0,
        totalWorkers: workers?.length || 0,
        todaySalary: todaySal,
        activeProjects: projects?.filter(p => p.status === "active").length || 0,
        pendingPayments: 0, 
        todayWorkersList: attToday || [],
        allProjects: projects || [],
        todaySpends: filteredSpends
      });
    } catch (err) { 
      console.error("Dashboard Error:", err); 
    } finally {
      setLoading(false);
    }
  }

  // --- UI RENDER (Rest same but with data checks) ---
  if (loading) return <div className="h-screen flex items-center justify-center font-black text-slate-400 animate-pulse">BUILDER PRO LOADING...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Topbar />
      <main className="p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">My Dashboard</h1>
          <p className="text-slate-500 font-medium text-sm italic">Account Overview</p>
        </div>

        {/* 6 SMART COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
          <StatCard onClick={() => router.push('/projects')} title="Total Project" value={data.totalProjects} icon={<Folder size={18}/>} color="text-blue-600" bg="bg-blue-50" />
          <StatCard onClick={() => router.push('/workers')} title="Total Worker" value={data.totalWorkers} icon={<Users size={18}/>} color="text-indigo-600" bg="bg-indigo-50" />
          <StatCard onClick={() => setView('today')} title="Today Salary" value={`₹${data.todaySalary}`} icon={<Banknote size={18}/>} color="text-amber-600" bg="bg-amber-50" />
          <StatCard onClick={() => router.push('/projects')} title="Active Project" value={data.activeProjects} icon={<CheckCircle size={18}/>} color="text-green-600" bg="bg-green-50" />
          <StatCard title="Pending Pay" value="₹0" icon={<Clock size={18}/>} color="text-red-600" bg="bg-red-50" />
          <StatCard onClick={() => setView('history')} title="Preview Pay" value="History" icon={<History size={18}/>} color="text-slate-100" bg="bg-slate-800" isDark />
        </div>

        {/* --- LARGE COLUMNS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Project List */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 p-5 text-white flex justify-between items-center">
              <h3 className="font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">Project Status</h3>
            </div>
            <div className="p-4 max-h-[350px] overflow-y-auto">
              {data.allProjects.length === 0 ? <p className="text-center text-slate-400 py-6">No projects yet.</p> : (
                data.allProjects.map((p) => (
                  <div key={p.id} onClick={() => router.push(`/projects/${p.id}`)} className="flex items-center justify-between p-4 mb-2 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer">
                    <span className="font-black text-slate-800 text-sm">{p.name}</span>
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{p.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Material Expense */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 p-5 text-white flex justify-between items-center">
              <h3 className="font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">Today's Spends</h3>
            </div>
            <div className="p-4 max-h-[350px] overflow-y-auto">
              {data.todaySpends.length === 0 ? <p className="text-center text-slate-400 py-6 uppercase font-bold text-[10px]">No spends today</p> : (
                data.todaySpends.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-4 mb-2 bg-red-50/50 rounded-2xl border border-red-100">
                    <span className="font-bold text-slate-800 text-sm">{s.item}</span>
                    <span className="font-black text-red-600">₹{s.amount}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Detail Popup */}
        {view && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl">
              <div className="bg-slate-800 p-5 text-white flex justify-between items-center uppercase font-black tracking-widest text-xs">
                <span>{view} Details</span>
                <X onClick={() => setView(null)} className="cursor-pointer" />
              </div>
              <div className="p-6">
                {data.todayWorkersList.length === 0 ? <p className="text-center py-4 italic">No data found.</p> : (
                  data.todayWorkersList.map((att:any, i:number) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl mb-2 flex justify-between">
                      <div><p className="font-bold">{att.workers?.name}</p><p className="text-xs text-blue-600 font-bold uppercase">{att.projects?.name}</p></div>
                      <p className="font-black text-blue-700 text-lg">₹{att.workers?.salary}</p>
                    </div>
                  ))
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
    <div onClick={onClick} className={`${isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} p-4 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-xl transition-all`}>
      <div className={`w-8 h-8 flex items-center justify-center rounded-lg mb-3 ${bg} ${color}`}>{icon}</div>
      <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
      <h2 className="text-base font-black tracking-tight">{value}</h2>
    </div>
  );
}
