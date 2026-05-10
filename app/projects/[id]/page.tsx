"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import toast from "react-hot-toast";
import { Trash2, Edit3, Plus, Wallet, Users, Receipt } from "lucide-react";

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [workers, setWorkers] = useState<any[]>([]); // Automatic list from workers table
  const [spends, setSpends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States (Sirf Spend ke liye, Worker form hata diya hai)
  const [budgetInput, setBudgetInput] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");

  useEffect(() => {
    if (params.id) fetchData();
  }, [params.id]);

  async function fetchData() {
    setLoading(true);
    // 1. Fetch Project Details
    const { data: proj } = await supabase.from("projects").select("*").eq("id", params.id).single();
    setProject(proj);
    setBudgetInput(proj?.budget || "");

    // 2. Fetch Workers assigned to THIS project (From your main workers table)
    const { data: wrk } = await supabase.from("workers").select("*").eq("project_id", params.id);
    setWorkers(wrk || []);

    // 3. Fetch Spends
    const { data: spnd } = await supabase.from("project_spends").select("*").eq("project_id", params.id);
    setSpends(spnd || []);

    setLoading(false);
  }

  async function updateBudget() {
    const { error } = await supabase.from("projects").update({ budget: Number(budgetInput) }).eq("id", params.id);
    if (error) toast.error("Budget update failed");
    else { toast.success("Budget Saved"); fetchData(); }
  }

  async function addSpend() {
    if (!itemName || !itemAmount) return toast.error("Fill spend details");
    const { error } = await supabase.from("project_spends").insert([{ item: itemName, amount: Number(itemAmount), project_id: params.id }]);
    if (error) toast.error("Failed to add spend");
    else { toast.success("Spend added"); setItemName(""); setItemAmount(""); fetchData(); }
  }

  // Calculations
  const totalSpent = spends.reduce((acc, curr) => acc + curr.amount, 0);
  const profit = (project?.budget || 0) - totalSpent;

  if (loading) return <div className="p-10 text-center font-bold">Loading Project Data...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="hidden md:block w-64 fixed h-full z-40"><Sidebar /></div>
      <div className="flex-1 md:ml-64">
        <Topbar />
        <div className="max-w-7xl mx-auto p-6">
          
          {/* TOP 4 COLUMNS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-blue-600">
              <p className="text-slate-500 font-bold text-xs mb-2">PROJECT BUDGET</p>
              <input type="number" value={budgetInput} onChange={(e) => setBudgetInput(e.target.value)} className="text-2xl font-black w-full outline-none" />
              <button onClick={updateBudget} className="text-xs text-blue-600 font-bold mt-2 hover:underline">SAVE BUDGET</button>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-red-500">
              <p className="text-slate-500 font-bold text-xs mb-2">TOTAL SPEND</p>
              <h2 className="text-2xl font-black text-red-600">₹ {totalSpent}</h2>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-green-500">
              <p className="text-slate-500 font-bold text-xs mb-2">PROFIT</p>
              <h2 className="text-2xl font-black text-green-600">₹ {profit}</h2>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-amber-500">
              <p className="text-slate-500 font-bold text-xs mb-2">PROJECT WORKERS</p>
              <h2 className="text-2xl font-black text-amber-600">{workers.length}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* WORKER LIST (View Only - Fetching from Main Workers Table) */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200">
              <div className="bg-slate-800 p-5 text-white">
                <h3 className="font-bold flex items-center gap-2"><Users size={18}/> Assigned Workers</h3>
              </div>
              <div className="p-5">
                {workers.length === 0 ? (
                  <p className="text-center text-slate-400 py-4">No workers assigned yet.</p>
                ) : (
                  <div className="space-y-3">
                    {workers.map(w => (
                      <div key={w.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-slate-800">{w.name}</p>
                          <p className="text-xs text-slate-500">📞 {w.phone || 'No Number'} | 💰 ₹{w.salary}/day</p>
                        </div>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Active</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SPEND LIST (With Add/Edit/Delete) */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200">
              <div className="bg-slate-800 p-5 text-white">
                <h3 className="font-bold flex items-center gap-2"><Receipt size={18}/> Project Spends</h3>
              </div>
              <div className="p-5">
                <div className="flex gap-2 mb-6">
                  <input placeholder="Item Name (e.g. Cement)" value={itemName} onChange={(e) => setItemName(e.target.value)} className="flex-1 border p-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-red-500" />
                  <input placeholder="Amount" type="number" value={itemAmount} onChange={(e) => setItemAmount(e.target.value)} className="w-28 border p-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-red-500" />
                  <button onClick={addSpend} className="bg-red-500 text-white px-4 rounded-2xl hover:bg-red-600 transition"><Plus size={24}/></button>
                </div>
                <div className="space-y-2">
                  {spends.map(s => (
                    <div key={s.id} className="flex justify-between items-center p-4 bg-red-50 rounded-2xl border border-red-100">
                      <div><p className="font-bold text-slate-800">{s.item}</p><p className="text-sm text-red-600 font-bold">- ₹{s.amount}</p></div>
                      <div className="flex gap-3 text-slate-400">
                        <button className="hover:text-blue-600"><Edit3 size={18}/></button>
                        <button className="hover:text-red-600"><Trash2 size={18}/></button>
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
