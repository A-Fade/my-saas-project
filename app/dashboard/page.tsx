"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Topbar from "@/app/components/Topbar";
import { Folder, Users, Banknote, Clock, History, CheckCircle, ChevronRight, X, Phone, Building2 } from "lucide-react";

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
    
    if (!user) {
      router.push("/login");
      return;
    }

    const userId = user.id;

    try {
      // 1. Projects & Workers Count
      const { data: projects } = await supabase.from("projects").select("*").eq("user_id", userId);
      const { data: workers } = await supabase.from("workers").select("*").eq("user_id", userId);

      // 2. Today's Present Workers Details (Name, Phone, Project Name)
      const { data: attToday } = await supabase.from("attendance")
        .select(`
          id, 
          workers!inner(name, phone, salary, user_id), 
          projects!inner(name, user_id)
        `)
        .eq("date", todayDate)
        .eq("status", "present")
        .eq("projects.user_id", userId);
      
      const todaySal = attToday?.reduce((acc, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;

      // 3. Pending Payments
      const { data: pendingAtt } = await supabase.from("attendance")
        .select(`*, workers!inner(name, salary, phone, user_id), projects!inner(name, user_id)`)
        .eq("payment_status", "unpaid")
        .eq("projects.user_id", userId);

      const totalPending = pendingAtt?.reduce((acc, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;

      // 4. Payment History
      const { data: history } = await supabase.from("daily_labor_history")
        .select("*, projects!inner(user_id)")
        .eq("projects.user_id", userId)
        .order("date", { ascending: false });

      setData({
        totalProjects: projects?.length || 0,
        totalWorkers: workers?.length || 0,
        todaySalary: todaySal,
        activeProjects: projects?.filter(p => p.status === "active").length || 0,
        pendingPayments: totalPending,
        todayWorkersList: attToday || [],
        pendingWorkersList: pendingAtt || [],
        historyData: history || []
      });
    } catch (err) { 
      console.error("Fetch Error:", err); 
    }
    setLoading(false);
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
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">{title}</p>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black tracking-tight">{value}</h2>
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Topbar />
      <main className="p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">My Dashboard</h1>
          <p className="text-slate-500 font-medium text-sm italic">Real-time statistics for your account</p>
        </div>

        {/* 6 SMART COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          <StatCard onClick={() => router.push('/projects')} title="Total Project" value={data.totalProjects} icon={<Folder size={18}/>} color="text-blue-600" bg="bg-blue-50" />
          <StatCard onClick={() => router.push('/workers')} title="Total Worker" value={data.totalWorkers} icon={<Users size={18}/>} color="text-indigo-600" bg="bg-indigo-50" />
          <StatCard onClick={() => setView('today')} title="Today Salary" value={`₹${data.todaySalary}`} icon={<Banknote size={18}/>} color="text-amber-600" bg="bg-amber-50" />
          <StatCard onClick={() => router.push('/projects')} title="Active Project" value={data.activeProjects} icon={<CheckCircle size={18}/>} color="text-green-600" bg="bg-green-50" />
          <StatCard onClick={() => setView('pending')} title="Pending Pay" value={`₹${data.pendingPayments}`} icon={<Clock size={18}/>} color="text-red-600" bg="bg-red-50" />
          <StatCard onClick={() => setView('history')} title="Preview Pay" value="History" icon={<History size={18}/>} color="text-slate-100" bg="bg-slate-800" isDark />
        </div>

        {/* --- DYNAMIC VIEWS --- */}
        {view && (
          <div className="mt-8 animate-in fade-in zoom-in duration-300">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
              <div className="bg-slate-800 p-5 text-white flex justify-between items-center">
                <h3 className="font-bold uppercase tracking-widest text-sm italic flex items-center gap-2">
                  {view === 'today' && <><Users size={18}/> Today's Attendance</>}
                  {view === 'pending' && <><Clock size={18}/> Pending Payments</>}
                  {view === 'history' && <><History size={18}/> Payment History</>}
                </h3>
                <button onClick={() => setView(null)} className="p-2 hover:bg-red-500 rounded-full transition"><X size={20}/></button>
              </div>
              
              <div className="p-6 max-h-[500px] overflow-y-auto">
                {view === 'today' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.todayWorkersList.length === 0 ? <p className="text-slate-400 italic text-center py-4 col-span-full">No attendance for today.</p> : data.todayWorkersList.map((att, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center shadow-sm">
                        <div className="space-y-1">
                          <p className="font-black text-slate-800 uppercase text-sm leading-none">{att.workers?.name}</p>
                          <div className="flex items-center gap-2 text-slate-500">
                            <Phone size={10}/> <span className="text-[10px] font-bold">{att.workers?.phone || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-blue-600">
                            <Building2 size={10}/> <span className="text-[10px] font-black uppercase tracking-tighter">{att.projects?.name}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-blue-700">₹{att.workers?.salary}</span>
                          <p className="text-[8px] font-bold text-green-600 uppercase">Present Today</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {view === 'pending' && (
                  <div className="space-y-3">
                    {data.pendingWorkersList.length === 0 ? <p className="text-slate-400 italic">No pending payments.</p> : data.pendingWorkersList.map((att, i) => (
                      <div key={i} className="p-4 bg-red-50 rounded-2xl border border-red-100 flex justify-between items-center shadow-sm">
                        <div>
                          <p className="font-black text-slate-800 uppercase">{att.workers?.name}</p>
                          <p className="text-[10px] text-red-600 font-bold uppercase tracking-tighter">{att.projects?.name} • {new Date(att.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-xl font-black text-red-600">₹{att.workers?.salary}</p>
                      </div>
                    ))}
                  </div>
                )}

                {view === 'history' && (
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {data.historyData.length === 0 ? <p className="text-slate-400 italic col-span-full">No history found.</p> : data.historyData.map((h, i) => (
                      <div key={i} className="p-5 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col items-center shadow-sm">
                        <p className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-widest">{new Date(h.date).toLocaleDateString('en-GB')}</p>
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
