"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Topbar from "@/app/components/Topbar";
import StatsCard from "@/app/components/StatsCard";
import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    await fetchData();
    setLoading(false);
  }

  async function fetchData() {
    const [pRes, wRes, payRes] = await Promise.all([
      supabase.from("projects").select("*"),
      supabase.from("workers").select("*"),
      supabase.from("payments").select("*"),
    ]);
    setProjects(pRes.data || []);
    setWorkers(wRes.data || []);
    setPayments(payRes.data || []);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-700 text-lg font-semibold animate-pulse"> Loading Dashboard... </p>
      </div>
    );
  }

  const totalSalary = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const chartData = payments.slice(-7).map((p, i) => ({
    name: `Day ${i + 1}`,
    amount: Number(p.amount || 0),
  }));

  return (
    <div className="bg-slate-100 min-h-screen">
      <Topbar />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* STATS SECTION - Heading color fixed to White via Props/Classes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {/* Note: StatsCard ke andar ka title text white hona chaiye */}
          <StatsCard 
            title="Total Projects" 
            value={projects.length} 
            color="bg-gradient-to-br from-blue-600 to-blue-700 text-white" 
            link="/projects" 
          />
          <StatsCard 
            title="Total Workers" 
            value={workers.length} 
            color="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white" 
            link="/workers" 
          />
          <StatsCard 
            title="Worker Salary" 
            value={`₹${totalSalary}`} 
            color="bg-gradient-to-br from-orange-500 to-orange-600 text-white" 
            link="/payments" 
          />
          <StatsCard 
            title="Active Projects" 
            value={projects.filter((p) => p.status === "active").length} 
            color="bg-gradient-to-br from-violet-600 to-violet-700 text-white" 
            link="/projects" 
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1 bg-white border border-slate-200 rounded-[2rem] shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight"> Recent Projects </h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1"> Latest construction </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl"> 📁 </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-100">
                    <th className="pb-3 font-black uppercase text-[10px]">Project</th>
                    <th className="pb-3 font-black uppercase text-[10px]">Location</th>
                    <th className="pb-3 font-black uppercase text-[10px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.slice(0, 5).map((p: any) => (
                    <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition cursor-pointer" onClick={() => router.push(`/projects/${p.id}`)}>
                      <td className="py-4 font-bold text-slate-700"> {p.name} </td>
                      <td className="text-slate-500 font-medium"> {p.location} </td>
                      <td>
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CHART AREA */}
          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight"> Payment Analytics </h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1"> Salary & expense overview </p>
              </div>
              <div className="flex gap-3">
                <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase"> Total Salary </p>
                  <h3 className="text-xl font-black text-slate-800"> ₹{totalSalary.toLocaleString()} </h3>
                </div>
              </div>
            </div>

            <div className="p-8">
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={4} fill="url(#salaryGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
