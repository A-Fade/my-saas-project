"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Topbar from "@/app/components/Topbar";
import Sidebar from "@/app/components/Sidebar";

export default function Payments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [amount, setAmount] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => { checkUser(); }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    fetchAll(user.id);
  }

  async function fetchAll(userId: string) {
    setLoading(true);
    // ✅ Filter all queries by user_id
    const { data: payData } = await supabase.from("payments").select(`*, workers:worker_id(name), projects:project_id(name)`).eq("user_id", userId).order("created_at", { ascending: false });
    const { data: wData } = await supabase.from("workers").select("*").eq("user_id", userId);
    const { data: pData } = await supabase.from("projects").select("*").eq("user_id", userId);

    setPayments(payData || []);
    setWorkers(wData || []);
    setProjects(pData || []);
    setLoading(false);
  }

  async function handleSave() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!amount || !workerId || !projectId || !user) { toast.error("All fields required"); return; }
    
    const payload = { amount: Number(amount), worker_id: workerId, project_id: projectId, user_id: user.id }; // ✅ Add user_id
    const { error } = await supabase.from("payments").insert([payload]);

    if (error) toast.error(error.message);
    else { toast.success("Payment saved"); fetchAll(user.id); setAmount(""); }
  }

  const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="hidden md:block w-64 fixed left-0 top-0 h-screen z-40"><Sidebar /></div>
      <div className="flex-1 md:ml-64">
        <Topbar />
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
            <div><h1 className="text-4xl font-black text-slate-800">💰 My Payments</h1><p className="text-slate-500 font-medium mt-1">Track worker salary and project expenses</p></div>
            <div className="bg-white p-5 rounded-3xl border-2 border-blue-100 font-black text-blue-700 text-3xl shadow-sm">₹{total.toLocaleString()}</div>
          </div>

          <div className="bg-white border-2 border-slate-50 p-8 rounded-[2.5rem] mb-10 grid grid-cols-1 md:grid-cols-4 gap-5 shadow-sm">
            <input className="bg-slate-50 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100" placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            <select className="bg-slate-50 p-4 rounded-2xl outline-none font-bold" value={workerId} onChange={e => setWorkerId(e.target.value)}>
               <option value="">Select Worker</option>
               {workers.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
            </select>
            <select className="bg-slate-50 p-4 rounded-2xl outline-none font-bold" value={projectId} onChange={e => setProjectId(e.target.value)}>
               <option value="">Select Project</option>
               {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition">Save Payment</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {payments.map(p => (
              <div key={p.id} className="bg-white p-8 rounded-[2rem] border shadow-sm hover:shadow-xl transition-all">
                <h3 className="text-2xl font-black mb-1">{p.workers?.name}</h3>
                <p className="text-slate-400 font-bold mb-5 uppercase text-[10px] tracking-widest">Worker Paid</p>
                <div className="bg-green-50 p-5 rounded-2xl mb-4 border border-green-100">
                  <p className="text-3xl font-black text-green-700">₹{p.amount.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 truncate">🏗️ {p.projects?.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
