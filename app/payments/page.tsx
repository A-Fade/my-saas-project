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
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => { checkUser(); }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    fetchAll(user.id);
  }

  async function fetchAll(userId: string) {
    setLoading(true);
    const { data: payData } = await supabase.from("payments")
      .select(`id, amount, worker_id, project_id, workers:worker_id (name), projects:project_id (name)`)
      .eq("user_id", userId)
      .order("id", { ascending: false });
    
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
    
    setSaving(true);
    const payload = { 
      amount: Number(amount), 
      worker_id: workerId, 
      project_id: projectId, 
      user_id: user.id 
    };

    const { error } = await supabase.from("payments").insert([payload]);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Payment added");
      setAmount("");
      fetchAll(user.id);
    }
    setSaving(false);
  }

  const totalPayments = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="hidden md:block w-64 fixed left-0 top-0 h-screen z-40">
        <Sidebar />
      </div>

      <div className="flex-1 md:ml-64">
        <Topbar />
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-black text-slate-800"> 💰 Payments </h1>
                <p className="text-slate-500 mt-2"> Manage all worker payments professionally </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
                <p className="text-sm text-slate-500"> Total Payments </p>
                <h2 className="text-3xl font-black text-blue-700"> ₹{totalPayments} </h2>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white">
              <h2 className="text-2xl font-bold"> ➕ Add New Payment </h2>
              <p className="text-blue-100 mt-1"> Add and manage payments easily </p>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2"> Payment Amount </label>
                  <input type="number" className="w-full border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 transition" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2"> Select Worker </label>
                  <select className="w-full border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200" value={workerId} onChange={(e) => setWorkerId(e.target.value)}>
                    <option value=""> Select Worker </option>
                    {workers.map((w: any) => ( <option key={w.id} value={String(w.id)}> {w.name} </option> ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2"> Select Project </label>
                  <select className="w-full border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                    <option value=""> Select Project </option>
                    {projects.map((p: any) => ( <option key={p.id} value={String(p.id)}> {p.name} </option> ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-105 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg disabled:opacity-50">
                  {saving ? "Saving..." : "Add Payment"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-black text-slate-800"> 💳 All Payments </h2>
            </div>
            {loading ? ( <p>Loading...</p> ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {payments.map((p: any) => (
                  <div key={p.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2"> ₹{p.amount} </h3>
                        <p className="text-slate-500"> 👷 {p.workers?.name || "No Worker"} </p>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl"> 💰 </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                        <p className="text-sm text-blue-600 font-bold"> Project </p>
                        <h3 className="text-lg font-semibold text-blue-800"> {p.projects?.name || "No Project"} </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
