"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import toast from "react-hot-toast";
import { Trash2, Edit3, Plus, Users, Receipt, Loader2, CheckCircle, X, History, Save } from "lucide-react";

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [workers, setWorkers] = useState<any[]>([]);
  const [spends, setSpends] = useState<any[]>([]);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [addingSpend, setAddingSpend] = useState(false);
  const [editingSpendId, setEditingSpendId] = useState<any>(null);
  const [budgetInput, setBudgetInput] = useState(""); // Budget State

  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (params.id) fetchData();
  }, [params.id]);

  async function fetchData() {
    setLoading(true);
    try {
      const { data: proj } = await supabase.from("projects").select("*").eq("id", params.id).single();
      setProject(proj);
      setBudgetInput(proj?.budget || "0");

      const { data: wrk } = await supabase.from("workers").select("*").eq("project_id", params.id);
      setWorkers(wrk || []);

      const { data: spnd } = await supabase.from("project_spends").select("*").eq("project_id", params.id).order("id", { ascending: false });
      setSpends(spnd || []);

      const { data: att } = await supabase.from("attendance").select("*").eq("project_id", params.id);
      setAttendanceData(att || []);

      const { data: hist } = await supabase.from("daily_labor_history").select("*").eq("project_id", params.id).order("date", { ascending: false });
      setHistory(hist || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  // --- NEW: BUDGET SAVE FUNCTION ---
  async function updateBudget() {
    const { error } = await supabase
      .from("projects")
      .update({ budget: Number(budgetInput) })
      .eq("id", params.id);
    
    if (error) toast.error("Budget update failed");
    else {
      toast.success("Budget Saved Successfully!");
      fetchData(); // Profit update karne ke liye
    }
  }

  async function markAttendance(workerId: string) {
    const { error } = await supabase.from("attendance").insert([{ worker_id: workerId, project_id: params.id, date: todayDate, status: 'present' }]);
    if (error) {
      if (error.code === '23505') toast.error("Aaj ki hajri lag chuki hai!");
      else toast.error("Hajri error");
    } else { toast.success("Attendance Marked!"); fetchData(); }
  }

  async function handleSaveSpend() {
    if (!itemName || !itemAmount) return toast.error("Fill details");
    setAddingSpend(true);
    const payload = { item: itemName, amount: Number(itemAmount), project_id: params.id };
    const { error } = editingSpendId ? await supabase.from("project_spends").update(payload).eq("id", editingSpendId) : await supabase.from("project_spends").insert([payload]);
    if (error) toast.error("Error saving spend");
    else { setItemName(""); setItemAmount(""); setEditingSpendId(null); fetchData(); toast.success("Saved"); }
    setAddingSpend(false);
  }

  async function deleteSpend(id: any) {
    if (!confirm("Delete this expense?")) return;
    const { error } = await supabase.from("project_spends").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else { toast.success("Removed"); fetchData(); }
  }

  async function saveDailyReport() {
    const todayLabor = workers.reduce((acc, w) => {
      const isPresentToday = attendanceData.some(a => a.worker_id === w.id && a.date === todayDate);
      return acc + (isPresentToday ? w.salary : 0);
    }, 0);
    if (todayLabor === 0) return toast.error("Aaj ki koi salary nahi hai!");
    const { error } = await supabase.from("daily_labor_history").upsert([{ project_id: params.id, total_paid: todayLabor, date: todayDate }]);
    if (error) toast.error("Save failed");
    else { toast.success("Daily Report Saved!"); fetchData(); }
  }

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-slate-500 text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden md:block w-64 fixed h-full z-40"><Sidebar /></div>
      <div className="flex-1 md:ml-64">
        <Topbar />
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* --- UPDATED BUDGET COLUMN WITH SAVE OPTION --- */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-blue-600">
               <p className="text-slate-400 font-bold text-[10px] uppercase mb-1">Project Budget</p>
               <input 
                 type="number" 
                 value={budgetInput} 
                 onChange={(e) => setBudgetInput(e.target.value)} 
                 className="text-2xl font-black text-slate-800 w-full outline-none bg-transparent border-b border-dashed border-slate-200" 
               />
               <button onClick={updateBudget} className="flex items-center gap-1 text-[9px] font-black text-blue-600 mt-3 uppercase underline cursor-pointer">
                 <Save size={10}/> Save Budget Amount
               </button>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-amber-500">
               <p className="text-slate-400 font-bold text-[10px] uppercase mb-1 text-amber-600">Today's Labor</p>
               <h2 className="text-2xl font-black text-amber-600">₹{workers.reduce((acc, w) => attendanceData.some(a => a.worker_id === w.id && a.date === todayDate) ? acc + w.salary : acc, 0)}</h2>
               <button onClick={saveDailyReport} className="flex items-center gap-1 text-[9px] font-bold text-blue-600 mt-2 uppercase underline"><Save size={10}/> Lock Report</button>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-red-500">
               <p className="text-slate-400 font-bold text-[10px] uppercase mb-1">Material Spent</p>
               <h2 className="text-2xl font-black text-red-600">₹{spends.reduce((a,c)=>a+c.amount,0)}</h2>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-green-500">
               <p className="text-slate-400 font-bold text-[10px] uppercase mb-1">Current Profit</p>
               <h2 className="text-2xl font-black text-green-600">₹{Number(budgetInput) - (spends.reduce((a,c)=>a+c.amount,0) + history.reduce((a,c)=>a+c.total_paid,0))}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* WORKERS SECTION */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 p-6 text-white flex items-center gap-2 uppercase text-xs tracking-widest"><Users size={20}/><h3>Today's Attendance</h3></div>
              <div className="p-6 space-y-4">
                {workers.map(w => (
                  <div key={w.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                    <div><p className="font-black text-slate-800 text-sm">{w.name}</p><p className="text-[10px] font-bold text-slate-500">₹{w.salary}/day</p></div>
                    <button onClick={() => markAttendance(w.id)} className={`p-2 rounded-xl flex flex-col items-center gap-1 ${attendanceData.some(a=>a.worker_id===w.id && a.date===todayDate) ? 'bg-green-500 text-white' : 'bg-white border text-slate-400'}`}>
                      <CheckCircle size={18}/><span className="text-[8px] font-black uppercase">Present</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* MATERIAL SPEND SECTION */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 p-6 text-white flex items-center gap-2 uppercase text-xs tracking-widest"><Receipt size={20}/><h3>Material Expenditure</h3></div>
              <div className="p-6">
                <div className="flex flex-col gap-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-300">
                  <div className="flex flex-col md:flex-row gap-2">
                    <input placeholder="Item" value={itemName} onChange={(e) => setItemName(e.target.value)} className="flex-1 bg-white border p-3 rounded-xl text-sm outline-none" />
                    <input placeholder="Amount" type="number" value={itemAmount} onChange={(e) => setItemAmount(e.target.value)} className="w-full md:w-28 bg-white border p-3 rounded-xl text-sm outline-none" />
                  </div>
                  <button onClick={handleSaveSpend} className="bg-red-600 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2">
                    {addingSpend ? <Loader2 className="animate-spin" size={18}/> : editingSpendId ? <Edit3 size={18}/> : <Plus size={18}/>}
                    {editingSpendId ? "Update" : "Add Material"}
                  </button>
                </div>
                <div className="space-y-3">
                  {spends.map(s => (
                    <div key={s.id} className="group flex justify-between items-center p-4 bg-red-50/50 rounded-2xl border border-red-100">
                      <div><p className="font-bold text-slate-800 uppercase text-xs">{s.item}</p><p className="text-sm font-black text-red-600">₹{s.amount}</p></div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => {setEditingSpendId(s.id); setItemName(s.item); setItemAmount(s.amount.toString());}} className="text-slate-400 hover:text-blue-600"><Edit3 size={16}/></button>
                        <button onClick={() => deleteSpend(s.id)} className="text-slate-400 hover:text-red-600"><Trash2 size={16}/></button>
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
