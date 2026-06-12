"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Topbar from "@/app/components/Topbar";
import { Folder, Users, Banknote, Clock, History, CheckCircle, ChevronRight, X, Package, Phone, Building2 } from "lucide-react";
import toast from "react-hot-toast";

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

      // 🛡️ SUBSCRIPTION SECURITY & 30-DAY AUTO LOCK CHECK
      const { data: profile, error: profileError } = await supabase
        .from("profiles") // Database table target check
        .select("plan_status, plan_expiry")
        .eq("id", userId)
        .single();

      // Current timestamp versus plan expiry target parsing
      const isExpired = profile?.plan_expiry ? new Date(profile.plan_expiry) < new Date() : true;

      // Agar koi plan hi nahi hai, ya status galat hai, ya plan expired ho chuka hai
      if (profileError || !profile || profile.plan_status === "none" || !profile.plan_status || isExpired) {
        if (isExpired && profile?.plan_status && profile.plan_status !== "none") {
          toast.error("Your 30-day plan has expired! Please renew your subscription.");
        } else {
          toast.error("Please choose a plan to access the dashboard.");
        }
        router.push("/pricing"); // Core Redirect parameter
        return;
      }

      // Agar subscription token check true hai tabhi baki ka data call chalega
      const now = new Date();
      const startOfDay = new Date(now.setHours(0,0,0,0)).toISOString();
      const endOfDay = new Date(now.setHours(23,59,59,999)).toISOString();

      const { data: projects } = await supabase.from("projects").select("*").eq("user_id", userId);
      const { data: workers } = await supabase.from("workers").select("*").eq("user_id", userId);
      const { data: attToday } = await supabase.from("attendance")
        .select(`id, workers(name, phone, salary), projects!inner(name, user_id)`)
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
        todayWorkersList: attToday || [],
        todaySpendsList: spndToday || [],
        allProjects: projects || [],
      });
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  const totalTodaySpend = data.todaySpendsList.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased text-slate-900">
      <Topbar />
      <main className="p-6 md:p-12 max-w-[1400px] mx-auto w-full">
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        </div>

        {/* 6 PROFESSIONAL COLUMNS (CLEAN WHITE) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <StatCard onClick={() => router.push('/projects')} title="Projects" value={data.totalProjects} icon={<Folder size={18}/>} />
          <StatCard onClick={() => router.push('/workers')} title="Workers" value={data.totalWorkers} icon={<Users size={18}/>} />
          <StatCard onClick={() => setView('today')} title="Today Pay" value={`₹${data.todaySalary}`} icon={<Banknote size={18}/>} />
          <StatCard onClick={() => router.push('/projects')} title="Active" value={data.activeProjects} icon={<CheckCircle size={18}/>} />
          <StatCard title="Today Spend" value={`₹${totalTodaySpend}`} icon={<Package size={18}/>} />
          <StatCard onClick={() => setView('history')} title="History" value="View" icon={<History size={18}/>} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Project List */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-semibold text-sm text-slate-700 uppercase tracking-wider">Project Status</h3>
            </div>
            <div className="p-2 max-h-[400px] overflow-y-auto">
              {data.allProjects.map(p => (
                <div key={p.id} onClick={() => router.push(`/projects/${p.id}`)} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                  <span className="font-medium text-slate-800">{p.name}</span>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${p.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>{p.status}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Material Expenses */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-semibold text-sm text-slate-700 uppercase tracking-wider">Daily Material Spends</h3>
            </div>
            <div className="p-2 max-h-[400px] overflow-y-auto">
              {data.todaySpendsList.length === 0 ? <p className="text-center py-20 text-slate-400 text-sm">No transactions today</p> : data.todaySpendsList.map(s => (
                <div key={s.id} onClick={() => router.push(`/projects/${s.project_id}`)} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                  <div>
                    <p className="font-medium text-slate-800">{s.item}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{s.projects?.name}</p>
                  </div>
                  <span className="font-bold text-slate-900">₹{s.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- DETAIL POPUP --- */}
        {view && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]">
            <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest">{view === 'today' ? "Daily Attendance" : "Payment Records"}</h3>
                <button onClick={() => setView(null)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full"><X size={20}/></button>
              </div>
              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
                {view === 'today' && (
                  data.todayWorkersList.length === 0 ? <p className="text-center py-10 text-slate-400 italic">No attendance marked.</p> :
                  data.todayWorkersList.map((att:any, i:number) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-100 flex justify-between items-center hover:bg-slate-50">
                      <div>
                        <p className="font-bold text-slate-800">{att.workers?.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{att.projects?.name} • {att.workers?.phone || 'No phone'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">₹{att.workers?.salary}</p>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase mt-0.5 tracking-wider">Present</p>
                      </div>
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

function StatCard({ title, value, icon, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:border-slate-300 hover:shadow-md transition-all group">
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors">
        {icon}
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-1">{title}</p>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h2>
        <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
      </div>
    </div>
  );
}
