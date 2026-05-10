"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Topbar from "@/app/components/Topbar";
import { Folder, Users, Banknote, Clock, History, CheckCircle, ChevronRight, X } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState({
    totalProjects: 0,
    totalWorkers: 0,
    todaySalary: 0,
    activeProjects: 0,
    pendingPayments: 0,
    todayWorkersList: [] as any[],
    pendingWorkersList: [] as any[],
    historyData: [] as any[]
  });
  
  const [view, setView] = useState<string | null>(null); // To handle detail views
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    try {
      // 1. Projects Data
      const { data: projects } = await supabase.from("projects").select("*");
      const active = projects?.filter(p => p.status === "active") || [];

      // 2. Workers Data
      const { data: workers } = await supabase.from("workers").select("*");

      // 3. Today's Attendance & Salary
      const { data: attToday } = await supabase.from("attendance")
        .select(`*, workers(*)`)
        .eq("date", todayDate)
        .eq("status", "present");
      
      const todaySal = attToday?.reduce((acc, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;

      // 4. Pending Payments (Present but Unpaid)
      const { data: pendingAtt } = await supabase.from("attendance")
        .select(`*, workers(*), projects(name)`)
        .eq("payment_status", "unpaid");

      const totalPending = pendingAtt?.reduce((acc, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;

      // 5. History
      const { data: history } = await supabase.from("daily_labor_history").select("*").order("date", { ascending: false });

      setData({
        totalProjects: projects?.length || 0,
        totalWorkers: workers?.length || 0,
        todaySalary: todaySal,
        activeProjects: active.length,
        pendingPayments: totalPending,
        todayWorkersList: attToday || [],
        pendingWorkersList: pendingAtt || [],
        historyData: history || []
      });
    } catch (err) { console.error(err); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Topbar />
      <main className="p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Main Dashboard</h1>
          <p className="text-slate-500 font-medium">Click on any card to view details</p>
        </div>

        {/* 6 CLICKABLE COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          
          <StatCard onClick={() => router.push('/projects')} title="Total Project" value={data.totalProjects} icon={<Folder size={18}/>} color="text-blue-600" bg="bg-blue-50" />
          <StatCard onClick={() => router.push('/workers')} title="Total Worker" value={data.totalWorkers} icon={<Users size={18}/>} color="text-indigo-600" bg="bg-indigo-50" />
          <StatCard onClick={() => setView('today')} title="Today Salary" value={`₹${data.todaySalary}`} icon={<Banknote size={18}/>} color="text-amber-600" bg="bg-amber-50" />
          <StatCard onClick={() => router.push('/projects?status=active')} title="Active Project" value={data.activeProjects} icon={<CheckCircle size={18}/>} color="text-green-600" bg="bg-green-50" />
          <StatCard onClick={() => setView('pending')} title="Pending Pay" value={`₹${data.pendingPayments}`} icon={<Clock size={18}/>} color="text-red-600" bg="bg-red-50" />
          <StatCard onClick={() => setView('history')} title="Preview Pay" value="History" icon={<History size={18}/>} color="text-slate-100" bg="bg-slate-800" isDark />

        </div>

        {/* --- DYNAMIC DETAIL VIEWS (Popup Style) --- */}
        {view && (
          <div className="mt-8 animate-in fade-in zoom-in duration-300">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
              <div className="bg-slate-800 p-5 text-white flex justify-between items-center">
                <h3 className="font-bold uppercase tracking-widest text-sm">
                  {view === 'today' ? "Today's Present Workers" : view === 'pending' ? "Pending Salary List" : "Payment History"}
                </h3>
                <button onClick={() => setView(null)} className="p-2 hover:bg-red-500 rounded-full transition"><X size={20}/></button>
              </div>
              
              <div className="p-6 max-h-[500px] overflow-y-auto">
                {view === 'today' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.todayWorkersList.map((att, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border flex justify-between items-center">
                        <div><p className="font-bold">{att.workers?.name}</p><p className="text-xs text-slate-500">{att.workers?.phone}</p></div>
                        <span className="font-black text-blue-600">₹{att.workers?.salary}</span>
                      </div>
                    ))}
                  </div>
                )}

                {view === 'pending' && (
                  <div className="space-y-3">
                    {data.pendingWorkersList.map((att, i) => (
                      <div key={i} className="p-4 bg-red-50 rounded-2xl border border-red-100 flex justify-between items-center">
                        <div><p className="font-bold">{att.workers?.name}</p><p className="text-[10px] text-red-500 font-bold uppercase">{att.projects?.name} - {att.date}</p></div>
                        <p className="font-black text-red-600">₹{att.workers?.salary}</p>
                      </div>
                    ))}
                  </div>
                )}

                {view === 'history' && (
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {data.historyData.map((h, i) => (
                      <div key={i} className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col items-center">
                        <p className="text-[10px] font-bold text-slate-500 mb-1">{h.date}</p>
                        <p className="text-xl font-black text-blue-700">₹{h.total_paid}</p>
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
    <div 
      onClick={onClick}
      className={`${isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} p-4 rounded-2xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group`}
    >
      <div className={`w-10 h-10 flex items-center justify-center rounded-xl mb-3 ${bg} ${color}`}>
        {icon}
      </div>
      <p className={`text-[9px] font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{title}</p>
      <div className="flex items-center justify-between mt-1">
        <h2 className="text-lg font-black tracking-tight">{value}</h2>
        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
