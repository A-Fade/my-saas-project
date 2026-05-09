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
  const [editingId, setEditingId] = useState<string | null>(null); // ✅ UUID is string
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
    fetchAll();
  }

  async function fetchAll() {
    setLoading(true);
    const { data, error } = await supabase
      .from("payments")
      .select(`
        id, 
        amount, 
        worker_id, 
        project_id, 
        workers:worker_id (name), 
        projects:project_id (name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load payments");
    }
    setPayments(data || []);

    const { data: w } = await supabase.from("workers").select("*");
    const { data: p } = await supabase.from("projects").select("*");
    
    setWorkers(w || []);
    setProjects(p || []);
    setLoading(false);
  }

  async function handleSave() {
    if (!amount || !workerId || !projectId) {
      toast.error("All fields required");
      return;
    }

    setSaving(true);
    
    // ✅ UUIDs ko string ki tarah hi bhejna hai, parseInt hata diya
    const payload = {
      amount: Number(amount),
      worker_id: workerId, 
      project_id: Number(projectId), // Project ID int8 hai toh Number chalega
    };

    if (editingId) {
      // ✅ UPDATE logic fix
      const { error } = await supabase
        .from("payments")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Payment updated successfully");
        setEditingId(null);
      }
    } else {
      // ADD
      const { error } = await supabase
        .from("payments")
        .insert([payload]);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Payment added");
      }
    }

    resetForm();
    await fetchAll(); // Refresh data
    setSaving(false);
  }

  async function deletePayment(id: string) {
    if (!window.confirm("Delete this payment?")) return;
    
    const { error } = await supabase
      .from("payments")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Payment deleted");
      fetchAll();
    }
  }

  function editPayment(p: any) {
    setEditingId(p.id);
    setAmount(String(p.amount || ""));
    setWorkerId(p.worker_id ? String(p.worker_id) : "");
    setProjectId(p.project_id ? String(p.project_id) : "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setAmount("");
    setWorkerId("");
    setProjectId("");
    setEditingId(null);
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
              <h2 className="text-2xl font-bold"> {editingId ? "✏️ Edit Payment" : "➕ Add New Payment"} </h2>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2"> Amount </label>
                  <input type="number" className="w-full border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 transition" 
                    value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2"> Worker </label>
                  <select className="w-full border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 transition" 
                    value={workerId} onChange={(e) => setWorkerId(e.target.value)}>
                    <option value=""> Select Worker </option>
                    {workers.map((w: any) => ( <option key={w.id} value={String(w.id)}> {w.name} </option> ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2"> Project </label>
                  <select className="w-full border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200 transition" 
                    value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                    <option value=""> Select Project </option>
                    {projects.map((p: any) => ( <option key={p.id} value={String(p.id)}> {p.name} </option> ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg">
                  {saving ? "Saving..." : editingId ? "Update Payment" : "Add Payment"}
                </button>
                {editingId && <button onClick={resetForm} className="bg-slate-200 text-slate-700 px-8 py-3 rounded-2xl font-semibold"> Cancel </button>}
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
                  <div key={p.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2"> ₹{p.amount} </h3>
                        <p className="text-slate-500"> 👷 {p.workers?.name || "No Worker"} </p>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                        <p className="text-sm text-blue-600"> Project </p>
                        <h3 className="text-lg font-semibold text-blue-800"> {p.projects?.name || "No Project"} </h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => editPayment(p)} className="bg-amber-400 text-white py-2 rounded-xl font-semibold"> Edit </button>
                      <button onClick={() => deletePayment(p.id)} className="bg-red-500 text-white py-2 rounded-xl font-semibold"> Delete </button>
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
