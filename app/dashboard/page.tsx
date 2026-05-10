"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { useRouter } from "next/navigation";
import { Folder, Users, Banknote, Clock, History, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState({
    totalProjects: 0,
    totalWorkers: 0,
    todaySalary: 0,
    activeProjects: 0,
    pendingPayments: 0,
    historyData: [] as any[]
  });
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];

    try {
      // 1. Total & Active Projects
      const { data: projects } = await supabase.from("projects").select("status");
      const totalProj = projects?.length || 0;
      const activeProj = projects?.filter(p => p.status === "active").length || 0;

      // 2. Total Workers
      const { data: workers } = await supabase.from("workers").select("id, salary");
      const totalWrk = workers?.length || 0;

      // 3. Today's Worker Amount (Auto Calculate)
      const { data: attendance } = await supabase.from("attendance").select(`worker_id, workers(salary)`).eq("date", today);
      const todaySal = attendance?.reduce((acc: number, curr: any) => acc + (curr.workers?.salary || 0), 0) || 0;

      // 4. Pending Worker Payment (Simulation logic or from spends)
      const { data: spends } = await supabase.from("project_spends").select("amount");
      const totalSpnd = spends?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;

      // 5. Preview Payments (History)
      const { data: history } = await supabase.from("daily_labor_history").select("*").order("date", { ascending: false });

      setData({
        totalProjects: totalProj,
        totalWorkers: totalWrk,
        todaySalary: todaySal,
        activeProjects: activeProj,
        pendingPayments: totalSpnd, // Aap ise pending logic se replace kar sakte hain
        historyData: history || []
      });
    } catch (err) { console.error(err); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <div className="hidden md:block w-64 fixed h-full z-40"><Sidebar /></div>
      <div className="flex-1 md:ml-64 flex flex-col">
        <Topbar />
        <main className="p-4 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Project Overview</h1>
          </div>

          {/* 6 PROFESSIONAL COLUMNS (SMART GRID) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            
            <StatCard title="Total Project" value={data.totalProjects} icon={<Folder size={18}/>} color="text-blue-600" bg="bg-blue-50" />
            <StatCard title="Total Worker" value={data.totalWorkers} icon={<Users size={18}/>} color="text-indigo-600" bg="bg-indigo-50" />
            <StatCard title="Today Worker Amount" value={`₹${data.todaySalary}`} icon={<Banknote size={18}/>} color="text-amber-600" bg="bg-amber-50" subText="Resets at 12AM" />
            <StatCard title="Active Project" value={data.activeProjects} icon={<CheckCircle size={18}/>} color="text-green-600" bg="bg-green-50" />
            <StatCard title="Pending Payment" value={`₹${data.pendingPayments}`} icon={<Clock size={18}/>} color="text-red-600" bg="bg-red-50" />
            
            {/* Clickable Preview Payment Column */}
            <div 
              onClick={() => setShowHistory(!showHistory)}
              className="bg-slate-800 p-4 rounded-2xl shadow-sm cursor-pointer hover:scale-105 transition-transform text-white border border-slate-700"
            >
              <div className="flex items-center gap-2 mb-2 opacity-80"><History size={16}/> <p className="text-[9px] font-bold uppercase tracking-widest leading-none">Preview Payment</p></div>
              <h2 className="text-lg font-black tracking-tighter">View All</h2>
              <p className="text-[8px] mt-2 text-slate-400 font-medium italic underline">Check history</p>
            </div>
          </div>

          {/* PREVIEW PAYMENT LIST (Shows when clicked) */}
          {showHistory && (
            <div className="mt-8 animate-in fade-in slide-in-from-top duration-300">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
                  <h3 className="font-bold text-sm uppercase tracking-widest">Payment History</h3>
                  <button onClick={() => setShowHistory(false)} className="text-[10px] bg-slate-700 px-2 py-1 rounded-lg hover:bg-red-500">Close</button>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.historyData.length === 0 ? <p className="text-slate-400 text-xs py-4 text-center col-span-full">No history available.</p> : data.historyData.map((h, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-600">{new Date(h.date).toLocaleDateString('en-GB')}</span>
                      <span className="text-sm font-black text-blue-700">₹{h.total_paid}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm text-center">
            <h3 className="font-bold text-slate-800">BuilderPro Professional System</h3>
            <p className="text-slate-500 text-sm mt-1">Sabhi projects aur workers ka real-time data yahan sync ho raha hai.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

// Reusable Professional Card Component
function StatCard({ title, value, icon, color, bg, subText }: any) {
  return (
    <div className={`p-4 rounded-2xl shadow-sm border border-slate-100 bg-white hover:shadow-md transition-shadow relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 p-2 ${bg} ${color} rounded-bl-xl`}>{icon}</div>
      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest leading-none mb-2">{title}</p>
      <h2 className={`text-xl font-black ${color} tracking-tighter`}>{value}</h2>
      {subText && <p className="text-[8px] text-slate-400 mt-2 italic font-medium">{subText}</p>}
    </div>
  );
}
