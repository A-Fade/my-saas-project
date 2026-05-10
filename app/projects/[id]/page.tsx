"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import toast from "react-hot-toast";
import { Trash2, Edit3, Plus, Wallet, Users, Receipt, Loader2, X } from "lucide-react";

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [workers, setWorkers] = useState<any[]>([]);
  const [spends, setSpends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Spend Form States
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [addingSpend, setAddingSpend] = useState(false);
  const [editingSpendId, setEditingSpendId] = useState<any>(null);
  
  // Budget State
  const [budgetInput, setBudgetInput] = useState("");

  useEffect(() => {
    if (params.id) fetchData();
  }, [params.id]);

  async function fetchData() {
    setLoading(true);
    try {
      // 1. Fetch Project
      const { data: proj } = await supabase.from("projects").select("*").eq("id", params.id).single();
      setProject(proj);
      setBudgetInput(proj?.budget || "0");

      // 2. Fetch Workers (Jo is project_id se link hain)
      const { data: wrk } = await supabase.from("workers").select("*").eq("project_id", params.id);
      setWorkers(wrk || []);

      // 3. Fetch Spends
      const { data: spnd } = await supabase.from("project_spends").select("*").eq("project_id", params.id).order("id", { ascending: false });
      setSpends(spnd || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Update Budget Logic
  async function updateBudget() {
    const { error } = await supabase.from("projects").update({ budget: Number(budgetInput) }).eq("id", params.id);
    if (error) toast.error("Budget update failed");
    else { toast.success("Budget Saved"); fetchData(); }
  }

  // Add or Update Spend Logic
  async function handleSaveSpend() {
    if (!itemName || !itemAmount) return toast.error("Fill item and amount");
    
    setAddingSpend(true);
    const payload = { 
      item: itemName, 
      amount: parseFloat(itemAmount), 
      project_id: params.id 
    };

    let error;
    if (editingSpendId) {
      const { error: err } = await supabase.from("project_spends").update(payload).eq("id", editingSpendId);
      error = err;
    } else {
      const { error: err } = await supabase.from("project_spends").insert([payload]);
      error = err;
    }

    if (error) {
      toast.error("Error: " + error.message);
    } else {
      toast.success(editingSpendId ? "Spend Updated" : "Spend Added");
      resetSpendForm();
      fetchData();
    }
    setAddingSpend(false);
  }

  function handleEditSpend(s: any) {
    setEditingSpendId(s.id);
    setItemName(s.item);
    setItemAmount(s.amount.toString());
  }

  async function deleteSpend(id: any) {
    if (!confirm("Remove this expense?")) return;
    const { error } = await supabase.from("project_spends").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else { toast.success("Spend removed"); fetchData(); }
  }

  function resetSpendForm() {
    setItemName("");
    setItemAmount("");
    setEditingSpendId(null);
  }

  // Final Financial Calculations
  const totalSpent = spends.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const profit = (Number(project?.budget) || 0) - totalSpent;

  if (loading) return <div className="flex h-screen items-center justify-center font-bold text-slate-500">Loading Project Dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="hidden md:block w-64 fixed h-full z-40"><Sidebar /></div>
      <div className="flex-1 md:ml-64">
        <Topbar />
        <div className="max-w-7xl mx-auto p-6 md:p-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase tracking-widest">{project?.name} - Finance Detail</h1>
          </div>

          {/* TOP 4 SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-blue-600">
              <p className="text-slate-500 font-bold text-[10px] tracking-widest mb-2 uppercase">Budget</p>
              <div className="flex items-center gap-1 border-b border-dashed border-slate-200">
                <span className="text-xl font-black text-slate-400">₹</span>
                <input type="number" value={budgetInput} onChange={(e) => setBudgetInput(e.target.value)} className="text-2xl font-black w-full outline-none bg-transparent" />
              </div>
              <button onClick={updateBudget} className="text-[10px] text-blue-600 font-black mt-3 hover:text-blue-800 uppercase">Save Budget</button>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-red-500">
              <p className="text-slate-500 font-bold text-[10px] tracking-widest mb-2 uppercase">Total Spend</p>
              <h2 className="text-3xl font-black text-red-600 tracking-tight">₹{totalSpent}</h2>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-green-500">
              <p className="text-slate-500 font-bold text-[10px] tracking-widest mb-2 uppercase">Profit</p>
              <h2 className="text-3xl font-black text-green-600 tracking-tight">₹{profit}</h2>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-amber-500">
              <p className="text-slate-500 font-bold text-[10px] tracking-widest mb-2 uppercase">Workers</p>
              <h2 className="text-3xl font-black text-amber-600 tracking-tight">{workers.length}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* WORKERS LIST (Automatic) */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 p-6 text-white flex items-center gap-2">
                <Users size={20} className="text-blue-400"/>
                <h3 className="font-bold text-lg">Assigned Workers</h3>
              </div>
              <div className="p-6">
                {workers.length === 0 ? (
                  <div className="text-center py-10 text-slate-400">No workers assigned to this project.</div>
                ) : (
                  <div className="space-y-4">
                    {workers.map(w => (
                      <div key={w.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                        <div>
                          <p className="font-black text-slate-800">{w.name}</p>
                          <p className="text-xs text-slate-500 font-medium">📞 {w.phone || 'N/A'} | 💰 ₹{w.salary}/day</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* EXPENSE TRACKING (With Edit & Delete) */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 p-6 text-white flex items-center gap-2">
                <Receipt size={20} className="text-red-400"/>
                <h3 className="font-bold text-lg">Expense Tracking</h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-3 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <input placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} className="flex-1 bg-white border border-slate-200 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500" />
                  <input placeholder="Amount" type="number" value={itemAmount} onChange={(e) => setItemAmount(e.target.value)} className="md:w-32 bg-white border border-slate-200 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-500" />
                  <div className="flex gap-2">
                    <button onClick={handleSaveSpend} disabled={addingSpend} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all disabled:opacity-50">
                      {addingSpend ? <Loader2 className="animate-spin" size={20}/> : editingSpendId ? <Edit3 size={20}/> : <Plus size={20}/>}
                      {editingSpendId ? "Update" : "Add"}
                    </button>
                    {editingSpendId && (
                      <button onClick={resetSpendForm} className="bg-slate-200 text-slate-600 p-3 rounded-xl hover:bg-slate-300">
                        <X size={20}/>
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {spends.length === 0 && <p className="text-center text-slate-400 py-4">No expenses recorded yet.</p>}
                  {spends.map(s => (
                    <div key={s.id} className="group flex justify-between items-center p-4 bg-red-50/50 rounded-2xl border border-red-100 hover:border-red-200 transition-all">
                      <div>
                        <p className="font-bold text-slate-800">{s.item}</p>
                        <p className="text-sm text-red-600 font-black">₹{s.amount}</p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEditSpend(s)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <Edit3 size={18}/>
                        </button>
                        <button onClick={() => deleteSpend(s.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                          <Trash2 size={18}/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
