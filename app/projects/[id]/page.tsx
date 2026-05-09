"use client";
import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Topbar from "@/app/components/Topbar";
import Sidebar from "@/app/components/Sidebar";

export default function ProjectDetails({ params: paramsPromise }: any) {
  const params: any = use(paramsPromise);
  const [project, setProject] = useState<any>(null);
  const [workers, setWorkers] = useState<any[]>([]);
  const [spends, setSpends] = useState<any[]>([]);
  
  const [budget, setBudget] = useState("");
  const [spendItem, setSpendItem] = useState("");
  const [spendAmount, setSpendAmount] = useState("");
  const [editingSpendId, setEditingSpendId] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => { fetchAllData(); }, [params.id]);

  async function fetchAllData() {
    setLoading(true);
    const id = Number(params.id); // Ensure ID is a number
    
    const { data: pData } = await supabase.from("projects").select("*").eq("id", id).single();
    if (pData) {
      setProject(pData);
      setBudget(pData.budget || "");
    }

    const { data: wData } = await supabase.from("workers").select("*").eq("project_id", id);
    setWorkers(wData || []);

    const { data: sData } = await supabase.from("spends").select("*").eq("project_id", id).order("created_at", { ascending: false });
    setSpends(sData || []);
    
    setLoading(false);
  }

  async function handleBudgetUpdate() {
    const { error } = await supabase.from("projects").update({ budget: Number(budget) }).eq("id", Number(params.id));
    if (error) toast.error("Budget update failed");
    else { toast.success("Budget saved"); fetchAllData(); }
  }

  async function handleSpendSave() {
    if (!spendItem || !spendAmount) { toast.error("Fill all fields"); return; }
    setSaving(true);
    
    const payload = { 
      item_name: spendItem.trim(), 
      amount: Number(spendAmount), 
      project_id: Number(params.id) // ✅ Explicitly Number for bigint
    };

    if (editingSpendId) {
      const { error } = await supabase.from("spends").update(payload).eq("id", editingSpendId);
      if (error) toast.error("Update failed");
      else { toast.success("Spend updated"); setEditingSpendId(null); }
    } else {
      const { error } = await supabase.from("spends").insert([payload]);
      if (error) {
        console.error(error);
        toast.error("Add failed: Table missing or column error");
      } else {
        toast.success("Added successfully");
      }
    }
    setSpendItem(""); setSpendAmount("");
    fetchAllData();
    setSaving(false);
  }

  async function deleteSpend(id: any) {
    if (!confirm("Delete this spend?")) return;
    await supabase.from("spends").delete().eq("id", id);
    toast.success("Deleted");
    fetchAllData();
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-100 font-bold">Loading...</div>;

  const totalSpent = spends.reduce((sum, s) => sum + (s.amount || 0), 0);
  const profit = (Number(budget) || 0) - totalSpent;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="hidden md:block w-64 fixed left-0 top-0 h-screen z-40"> <Sidebar /> </div>
      <div className="flex-1 md:ml-64">
        <Topbar />
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          
          <div className="mb-8 flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div>
              <h1 className="text-3xl font-black text-slate-800">🏗️ {project?.name}</h1>
              <p className="text-slate-500 font-medium">📍 {project?.location}</p>
            </div>
            <button onClick={() => router.back()} className="bg-slate-100 px-6 py-2 rounded-2xl font-bold text-slate-600">Back</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
               <p className="text-xs font-black text-slate-400 uppercase mb-2">Budget</p>
               <input type="number" className="text-xl font-bold w-full outline-none" value={budget} onChange={(e) => setBudget(e.target.value)} />
               <button onClick={handleBudgetUpdate} className="mt-4 w-full bg-blue-600 text-white text-xs py-2 rounded-xl font-black transition">SAVE</button>
            </div>
            <div className="bg-red-50 p-6 rounded-3xl border border-red-100 shadow-sm"><p className="text-xs font-black text-red-400 uppercase mb-2">Spent</p><h2 className="text-3xl font-black text-red-700">₹{totalSpent}</h2></div>
            <div className={`p-6 rounded-3xl border shadow-sm ${profit >= 0 ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}><p className={`text-xs font-black uppercase mb-2 ${profit >= 0 ? 'text-green-400' : 'text-orange-400'}`}>Profit</p><h2 className={`text-3xl font-black ${profit >= 0 ? 'text-green-700' : 'text-orange-700'}`}>₹{profit}</h2></div>
            <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 shadow-sm"><p className="text-xs font-black text-indigo-400 uppercase mb-2">Workers</p><h2 className="text-3xl font-black text-indigo-700">{workers.length}</h2></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
               <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white"><h2 className="text-xl font-bold">💸 Expenses</h2></div>
               <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                     <input className="border-2 border-slate-100 bg-slate-50 p-3 rounded-2xl outline-none focus:border-blue-400" placeholder="Item Name" value={spendItem} onChange={e => setSpendItem(e.target.value)} />
                     <input type="number" className="border-2 border-slate-100 bg-slate-50 p-3 rounded-2xl outline-none focus:border-blue-400" placeholder="Price" value={spendAmount} onChange={e => setSpendAmount(e.target.value)} />
                     <button onClick={handleSpendSave} className="bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition">{editingSpendId ? 'UPDATE' : 'ADD'}</button>
                  </div>
                  <div className="space-y-3">
                     {spends.map(s => (
                        <div key={s.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-blue-100 transition group">
                           <div className="flex items-center gap-4"><div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">📦</div><div><p className="font-bold text-slate-800 capitalize">{s.item_name}</p><p className="text-sm font-black text-blue-600">₹{s.amount}</p></div></div>
                           <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
                              <button onClick={() => { setEditingSpendId(s.id); setSpendItem(s.item_name); setSpendAmount(s.amount); }} className="text-amber-500 font-bold">✏️</button>
                              <button onClick={() => deleteSpend(s.id)} className="text-red-500 font-bold">🗑️</button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
               <div className="bg-slate-800 p-6 text-white"><h2 className="text-xl font-bold">👷 On-Site Workers</h2></div>
               <div className="p-6 space-y-4">
                  {workers.map(w => (
                    <div key={w.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition">
                      <div className="flex items-center gap-4"><div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-xl">👤</div><div><p className="font-black text-slate-800">{w.name}</p><p className="text-xs text-slate-500 font-bold tracking-tighter">PH: {w.phone}</p></div></div>
                      <div className="text-right"><p className="text-[10px] font-black text-slate-400 uppercase">Salary</p><p className="text-sm font-black text-slate-700">₹{w.salary}</p></div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
