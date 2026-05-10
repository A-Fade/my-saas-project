"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Topbar from "@/app/components/Topbar";
import { Folder, Users, Banknote, Clock, History, CheckCircle, ChevronRight, X, Package } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState({
    totalProjects: 0,
    totalWorkers: 0,
    todaySalary: 0,
    activeProjects: 0,
    todaySpends: [] as any[], // Fix for Today's Spends
    allProjects: [] as any[],
    todayWorkersList: [] as any[]
  });
  
  const [view, setView] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Aaj ki date exact format mein (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const userId = user.id;

    try {
      // 1. Projects & Workers
      const { data: projects } = await supabase.from("projects").select("*").eq("user_id", userId);
      const { data: workers } = await supabase.from("workers").select("*").eq("user_id", userId);

      // 2. Today's Attendance
      const { data: attToday } = await supabase.from("attendance")
        .select(`id, workers(name, salary), projects!inner(name, user_id)`)
        .eq("date", today)
        .eq("projects.user_id", userId);
      
      const todaySal = attToday?.reduce((acc: number, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;

      // 3. TODAY'S SPENDS FIX: Fetching only today's material data
      // Hum projects table se filter kar rahe hain taaki sirf user ka data aaye
      const { data: spndToday } = await supabase.from("project_spends")
        .select(`*, projects!inner(name, user_id)`)
        .eq("projects.user_id", userId);
      
      // Filter strictly by today's date from created_at timestamp
      const filteredSpends = spndToday?.filter((s: any) => {
        return s.created_at && s.created_at.startsWith(today);
      }) || [];

      setData({
        totalProjects: projects?.length || 0,
        totalWorkers: workers?.length || 0,
        todaySalary: todaySal,
        activeProjects: projects?.filter(p => p.status === "active").length || 0,
        todaySpends: filteredSpends,
        allProjects: projects || [],
        todayWorkersList: attToday || []
      });

    } catch (err) { console.error("Fetch Error:", err); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Topbar />
      <main className="p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">My Dashboard</h1>
          <p className="text-slate-500 font-medium text-sm italic tracking-widest">Date: {today}</p>
        </div>

        {/* 6 SMART COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
          <StatCard onClick={() => router.push('/projects')} title="Total Project" value={data.totalProjects} icon={<Folder size={18}/>} color="text-blue-600" bg="bg-blue-50" />
          <StatCard onClick={() => router.push('/workers')} title="Total Worker" value={data.totalWorkers} icon={<Users size={18}/>} color="text-indigo-600" bg="bg-indigo-50" />
          <StatCard onClick={() => setView('today')} title="Today Salary" value={`₹${data.todaySalary}`} icon={<Banknote size={18}/>} color="text-amber-600" bg="bg-amber-50" />
          <StatCard onClick={() => router.push('/projects')} title="Active Project" value={data.activeProjects} icon={<CheckCircle size={18}/>} color="text-green-600" bg="bg-green-50" />
          
          {/* Today's Material Spend Card */}
          <StatCard title="Today Spend" value={`₹${data.todaySpends.reduce((a,c)=>a+c.amount, 0)}`} icon={<Package size={18}/>} color="text-red-600" bg="bg-red-50" />
          
          <StatCard onClick={() => setView('history')} title="Preview Pay" value="History" icon={<History size={18}/>} color="text-slate-100" bg="bg-slate-800" isDark />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Project List */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 p-5 text-white font-black tracking-widest text-[10px] uppercase">Project Status</div>
            <div className="p-4 max-h-[350px] overflow-y-auto space-y-2">
              {data.allProjects.map((p) => (
                <div key={p.id} onClick={() => router.push(`/projects/${p.id}`)} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all cursor-pointer">
                  <span className="font-black text-slate-800 text-sm">{p.name}</span>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{p.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Material Spend List - PRO WORKING */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 p-5 text-white font-black tracking-widest text-[10px] uppercase">Today's Material Expenses</div>
            <div className="p-4 max-h-[350px] overflow-y-auto space-y-2">
              {data.todaySpends.length === 0 ? (
                <p className="text-center text-slate-400 py-10 font-bold uppercase text-[10px] italic">No material kharcha today</p>
              ) : (
                data.todaySpends.map((s) => (
                  <div key={s.id} onClick={() => router.push(`/projects/${s.project_id}`)} className="flex items-center justify-between p-4 bg-red-50/50 rounded-2xl border border-red-100 cursor-pointer hover:bg-red-100 transition-all">
                    <div>
                      <p className="font-black text-slate-800 text-sm uppercase">{s.item}</p>
                      <p className="text-[9px] font-bold text-red-500 uppercase italic tracking-tighter">Project: {s.projects?.name}</p>
                    </div>
                    <span className="font-black text-red-600 text-lg">₹{s.amount}</span>
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
    <div onClick={onClick} className={`${isDark ? 'bg-slate-800 text-white shadow-xl' : 'bg-white text-slate-800'} p-4 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-xl transition-all`}>
      <div className={`w-8 h-8 flex items-center justify-center rounded-lg mb-3 ${bg} ${color}`}>{icon}</div>
      <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none">{title}</p>
      <h2 className="text-base font-black tracking-tight">{value}</h2>
    </div>
  );
}
