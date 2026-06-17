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
  
  // ⚡ Plan aur exact limits track karne ki state variable
  const [userProfile, setUserProfile] = useState({
    plan: "free",
    item_limit: 1,       // Projects Limit (Starter: 1, Pro: 10)
    workers_limit: 2,    // Workers Limit (Starter: 2, Pro: 120)
    clients_limit: 1,    // Clients Limit (Starter: 1, Pro: 10)
    items_count: 0
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
        .from("profiles") 
        .select("plan_status, plan_expiry, plan, items_count") 
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

      // 📊 Plan features mapping logic as per requirements
      let pLimit = 1;   // Starter (Free) Projects
      let wLimit = 2;   // Starter (Free) Workers
      let cLimit = 1;   // Starter (Free) Clients

      const currentPlan = profile.plan || "free";

      if (currentPlan.toLowerCase() === "pro") {
        pLimit = 10;    // Pro: 10 Projects
        wLimit = 120;   // Pro: 120 Workers
        cLimit = 10;    // Pro: 10 Clients
      } else if (currentPlan.toLowerCase() === "business") {
        pLimit = 99999; // Business: Unlimited Projects
        wLimit = 99999; // Business: Unlimited Workers
        cLimit = 99999; // Business: Unlimited Clients
      }

      setUserProfile({
        plan: currentPlan,
        item_limit: pLimit,
        workers_limit: wLimit,
        clients_limit: cLimit,
        items_count: profile.items_count ?? 0
      });

      // Agar subscription token check true hai tabhi baki ka data call chalega
      const now = new Date();
      const startOfDay = new Date(now.setHours(0,0,0,0)).toISOString();
      const endOfDay = new Date(now.setHours(23,59,59,999)).toISOString();

      const { data: projects } = await supabase.from("projects").select("*").eq("user_id", userId);
      const { data: workers } = await supabase.from("workers").select("*").eq("user_id", userId);
      const { data: attToday = [] } = await supabase.from("attendance")
        .select(`id, workers(name, phone, salary), projects!inner(name, user_id)`)
        .eq("date", todayISO)
        .eq("projects.user_id", userId);
      
      const todaySal = attToday?.reduce((acc: number, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;
      const { data: spndToday = [] } = await supabase.from("project_spends")
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
    <div className="h-screen w-full flex items-center justify-center bg-white px-4">
      <div className="w-10 h-10 border-4 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans antialiased text-slate-900">
      <Topbar />
      {/* Responsive root wrapper spacing */}
      <main className="p-4 sm:p-6 md:p-12 max-w-[1400px] mx-auto w-full">
        
        <div className="mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        </div>
        
        {/* ⚡ Dynamic Plan Status Meter & Active Plan Badge */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Plan:</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase border ${
                userProfile.plan.toLowerCase() === 'business' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                userProfile.plan.toLowerCase() === 'pro' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {userProfile.plan.toLowerCase() === 'business' ? '👑 ' : ''}{userProfile.plan === 'free' ? 'Starter' : userProfile.plan}
              </span>
            </div>
            {/* Mobile-only Upgrade button as seen in screenshot */}
            <button onClick={() => router.push('/pricing')} className="md:hidden text-xs font-semibold px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 active:scale-95 transition-transform">
              Upgrade
            </button>
          </div>
          
          {/* Live System Resource Counters */}
          <div className="grid grid-cols-3 md:flex items-center gap-2 md:gap-6 md:ml-auto text-[11px] sm:text-xs font-medium text-slate-600 border-t border-slate-100 md:border-t-0 pt-3 md:pt-0 text-center md:text-left">
            <div className="flex flex-col md:flex-row gap-0.5 md:gap-1">
              <span className="text-slate-400 md:text-slate-600 block md:inline">Projects</span>
              <span className="text-slate-900 font-bold md:font-medium">{data.totalProjects} / {userProfile.plan.toLowerCase() === 'business' ? '∞' : userProfile.item_limit}</span>
            </div>
            <div className="w-px h-5 bg-slate-200 mx-auto hidden md:block"></div>
            <div className="flex flex-col md:flex-row gap-0.5 md:gap-1 border-x border-slate-100 md:border-x-0 px-2 md:px-0">
              <span className="text-slate-400 md:text-slate-600 block md:inline">Workers</span>
              <span className="text-slate-900 font-bold md:font-medium">{data.totalWorkers} / {userProfile.plan.toLowerCase() === 'business' ? '∞' : userProfile.workers_limit}</span>
            </div>
            <div className="w-px h-5 bg-slate-200 mx-auto hidden md:block"></div>
            <div className="flex flex-col md:flex-row gap-0.5 md:gap-1">
              <span className="text-slate-400 md:text-slate-600 block md:inline">Clients Allowed</span>
              <span className="text-slate-900 font-bold md:font-medium">{userProfile.plan.toLowerCase() === 'business' ? 'Unlimited' : userProfile.clients_limit}</span>
            </div>
          </div>
        </div>

        {/* 👑 PREMIUM BUSINESS ANALYTICS MODULE */}
        {userProfile.plan.toLowerCase() === "business" && (
          <div className="mb-8 p-4 sm:p-5 border border-amber-200 bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl flex items-center justify-between gap-3 sm:gap-4 shadow-md text-white animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 text-base">
                👑
              </div>
              <div>
                <h3 className="font-bold text-amber-400 text-xs sm:text-sm uppercase tracking-wider">Premium Business Analytics</h3>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-tight max-w-[220px] sm:max-w-md">
                  Welcome VIP Corporate Partner! Your unlimited resource logging, premium reporting metrics, and advanced modules are active.
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs shrink-0 cursor-pointer shadow-sm active:scale-95 transition-transform">
              <ChevronRight size={16}/>
            </div>
          </div>
        )}

        {/* 6 PROFESSIONAL COLUMNS (CLEAN WHITE MATRIX GRID) */}
        {/* Mobile par perfect grid-cols-2 matrix setup aur desktop par wide grid-cols-6 view */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-12">
          <StatCard onClick={() => router.push('/projects')} title="Projects" value={data.totalProjects} icon={<Folder size={18}/>} />
          <StatCard onClick={() => router.push('/workers')} title="Workers" value={data.totalWorkers} icon={<Users size={18}/>} />
          <StatCard onClick={() => setView('today')} title="Today Pay" value={`₹${data.todaySalary}`} icon={<Banknote size={18}/>} />
          <StatCard onClick={() => router.push('/projects')} title="Active" value={data.activeProjects} icon={<CheckCircle size={18}/>} />
          <StatCard title="Today Spend" value={`₹${totalTodaySpend}`} icon={<Package size={18}/>} />
          <StatCard onClick={() => setView('history')} title="History" value="View" icon={<History size={18}/>} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          {/* Project List */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-semibold text-xs sm:text-sm text-slate-700 uppercase tracking-wider">Project Status</h3>
              <button onClick={() => router.push('/projects')} className="text-xs font-semibold text-blue-600 hover:underline">View all</button>
            </div>
            <div className="p-2 max-h-[350px] sm:max-h-[400px] overflow-y-auto">
              {data.allProjects.length === 0 ? (
                <p className="text-center py-16 sm:py-20 text-slate-400 text-sm">No projects added yet</p>
              ) : (
                data.allProjects.map(p => (
                  <div key={p.id} onClick={() => router.push(`/projects/${p.id}`)} className="flex items-center justify-between p-3 sm:p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                    <span className="font-medium text-sm sm:text-base text-slate-800 truncate pr-2">{p.name}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${p.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>{p.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Material Expenses */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-semibold text-xs sm:text-sm text-slate-700 uppercase tracking-wider">Daily Material Spends</h3>
            </div>
            <div className="p-2 max-h-[350px] sm:max-h-[400px] overflow-y-auto">
              {data.todaySpendsList.length === 0 ? (
                <p className="text-center py-16 sm:py-20 text-slate-400 text-sm">No transactions today</p>
              ) : (
                data.todaySpendsList.map(s => (
                  <div key={s.id} onClick={() => router.push(`/projects/${s.project_id}`)} className="flex items-center justify-between p-3 sm:p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                    <div className="truncate pr-2">
                      <p className="font-medium text-sm sm:text-base text-slate-800 truncate">{s.item}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{s.projects?.name}</p>
                    </div>
                    <span className="font-bold text-sm sm:text-base text-slate-900 shrink-0">₹{s.amount}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
{/* --- DETAIL POPUP --- */}
        {view && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-[2px]">
            <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest">{view === 'today' ? "Daily Attendance" : "Payment Records"}</h3>
                <button onClick={() => setView(null)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full transition-colors"><X size={20}/></button>
              </div>
              <div className="p-4 sm:p-6 max-h-[70vh] sm:max-h-[60vh] overflow-y-auto space-y-3">
                {view === 'today' && (
                  data.todayWorkersList.length === 0 ? <p className="text-center py-10 text-slate-400 text-sm italic">No attendance marked.</p> :
                  data.todayWorkersList.map((att:any, i:number) => (
                    <div key={i} className="p-3 sm:p-4 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors gap-2">
                      <div className="truncate">
                        <p className="font-bold text-sm sm:text-base text-slate-800 truncate">{att.workers?.name}</p>
                        <p className="text-xs text-slate-500 mt-1 truncate">
                          {att.projects?.name} <span className="hidden sm:inline">•</span> <br className="sm:hidden" /> {att.workers?.phone || 'No phone'}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-sm sm:text-base text-slate-900">₹{att.workers?.salary}</p>
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
    <div onClick={onClick} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:border-slate-300 hover:shadow-md transition-all group select-none active:scale-[0.98] md:active:scale-100">
      <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 mb-3 sm:mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors">
        {icon}
      </div>
      <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider sm:tracking-widest text-slate-500 mb-0.5 sm:mb-1 truncate">{title}</p>
      <div className="flex items-center justify-between gap-1">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight truncate">{value}</h2>
        <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all hidden sm:block shrink-0" />
      </div>
    </div>
  );
}
