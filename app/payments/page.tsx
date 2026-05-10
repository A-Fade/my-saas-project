"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Topbar from "@/app/components/Topbar";
import Sidebar from "@/app/components/Sidebar";
import { Banknote, Users, Briefcase, Plus, Wallet, ArrowRight, Clock } from "lucide-react";

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

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
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
    if (!amount || !workerId || !projectId || !user) {
      toast.error("All fields required");
      return;
    }
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
      toast.success("Payment successful");
      setAmount("");
      setWorkerId("");
      setProjectId("");
      fetchAll(user.id);
    }
    setSaving(false);
  }

  const totalPayments = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased text-slate-900">
      <div className="hidden md:block w-64 fixed left-0 top-0 h-screen z-40 border-r border-slate-200">
        <Sidebar />
      </div>

      <div className="flex-1 md:ml-64 flex flex-col">
        <Topbar />
        
        <main className="p-6 md:p-12 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Payments</h1>
              <p className="text-slate-500 font-medium text-sm mt-1">Track and record all labor transactions</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-4">
              <div className="bg-slate-50 p-2 rounded-lg text-slate-600">
                <Wallet size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Total Payout</p>
                <h2 className="text-2xl font-bold text-slate-900 leading-none">₹{totalPayments.toLocaleString()}</h2>
              </div>
            </div>
          </div>

          {/* New Payment Form */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-12">
            <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-2 text-slate-700">
              <Plus size={16} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Create Payment Transaction</h2>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Payment Amount (₹)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all font-bold" 
                    placeholder="0.00" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Assign to Worker</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 appearance-none font-medium" 
                    value={workerId} 
                    onChange={(e) => setWorkerId(e.target.value)}
                  >
                    <option value="">Select Staff Member</option>
                    {workers.map((w: any) => (
                      <option key={w.id} value={String(w.id)}>{w.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Associated Project</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 appearance-none font-medium" 
                    value={projectId} 
                    onChange={(e) => setProjectId(e.target.value)}
                  >
                    <option value="">Select Site</option>
                    {projects.map((p: any) => (
                      <option key={p.id} value={String(p.id)}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button 
                onClick={handleSave} 
                disabled={saving} 
                className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
              >
                {saving ? "PROCESSING..." : "CONFIRM & SEND PAYMENT"}
                {!saving && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </div>

          {/* Payments History List */}
          <div className="mb-6 flex items-center gap-2">
            <Clock size={20} className="text-slate-400" />
            <h2 className="text-xl font-bold text-slate-800">Transaction History</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {payments.length === 0 ? (
               <p className="text-center py-10 text-slate-400 font-bold uppercase text-xs tracking-widest col-span-full">No payments found</p>
            ) : (
              payments.map((p: any) => (
                <div key={p.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Amount Paid</p>
                      <h3 className="text-3xl font-bold text-slate-900">₹{Number(p.amount).toLocaleString()}</h3>
                    </div>
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Banknote size={20}/>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-50 p-2 rounded-lg text-slate-400 group-hover:text-slate-600">
                        <Users size={14}/>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Beneficiary</p>
                        <p className="font-bold text-slate-700 text-sm">{p.workers?.name || "Deleted Staff"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-slate-50 p-2 rounded-lg text-slate-400 group-hover:text-slate-600">
                        <Briefcase size={14}/>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Project Site</p>
                        <p className="font-bold text-slate-700 text-sm">{p.projects?.name || "Closed Project"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
