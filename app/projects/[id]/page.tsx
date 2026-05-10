"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import toast from "react-hot-toast";
import { Trash2, Edit3, Plus, Users, Receipt, Loader2, CheckCircle, X, History, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
  const [budgetInput, setBudgetInput] = useState("");

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

  async function updateBudget() {
    const { error } = await supabase
      .from("projects")
      .update({ budget: Number(budgetInput) })
      .eq("id", params.id);
    if (error) toast.error("Budget update failed");
    else {
      toast.success("Budget Saved Successfully!");
      fetchData();
    }
  }

  async function markAttendance(workerId: string) {
    const { error } = await supabase.from("attendance").insert([{ worker_id: workerId, project_id: params.id, date: todayDate, status: 'present' }]);
    if (error) {
      if (error.code === '23505') toast.error("Aaj ki hajri lag chuki hai!");
      else toast.error("Hajri error");
    } else {
      toast.success("Attendance Marked!");
      fetchData();
    }
  }

  async function handleSaveSpend() {
    if (!itemName || !itemAmount) return toast.error("Fill details");
    setAddingSpend(true);
    const payload = { item: itemName, amount: Number(itemAmount), project_id: params.id };
    const { error } = editingSpendId ? await supabase.from("project_spends").update(payload).eq("id", editingSpendId) : await supabase.from("project_spends").insert([payload]);
    if (error) toast.error("Error saving spend");
    else {
      setItemName(""); setItemAmount(""); setEditingSpendId(null); fetchData();
      toast.success(editingSpendId ? "Updated" : "Saved");
    }
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
          
          {/* Header with Back Button */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/projects" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">{project?.name}</h1>
                <p className="text-slate-500 font-medium text-sm mt-1">Project Financial & Team Overview</p>
              </div>
            </div>
            <div className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${project?.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
              {project?.status?.toUpperCase()}
            </div>
          </div>

          {/* 4 SUMMARY COLUMNS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Project Budget</p>
              <input 
                type="number" 
                value={budgetInput} 
                onChange={(e) => setBudgetInput(e.target.value)} 
                className="text-2xl font-bold text-slate-900 w-full outline-none bg-transparent border-b border-dashed border-slate-200 pb-1" 
              />
              <button onClick={updateBudget} className="flex items-center gap-1 text-[10px] font-bold text-slate-900 mt-3 hover:underline">
                <Save size={12}/> SAVE BUDGET
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Today's Labor</p>
              <h2 className="text-2xl font-bold text-amber-600">₹{workers.reduce((acc, w) => attendanceData.some(a => a.worker_id === w.id && a.date === todayDate) ? acc + w.salary : acc, 0)}</h2>
              <button onClick={saveDailyReport} className="flex items-center gap-1 text-[10px] font-bold text-slate-900 mt-3 hover:underline">
                <History size={12}/> LOCK REPORT
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Material Spent</p>
              <h2 className="text-2xl font-bold text-slate-900">₹{spends.reduce((a,c)=>a+c.amount,0)}</h2>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Net Profit</p>
              <h2 className="text-2xl font-bold text-emerald-600">₹{Number(budgetInput) - (spends.reduce((a,c)=>a+c.amount,0) + history.reduce((a,c)=>a+c.total_paid,0))}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* WORKERS SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <Users size={18} className="text-slate-600"/>
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700">Attendance Log</h3>
              </div>
              <div className="p-4 space-y-3">
                {workers.map(w => (
                  <div key={w.id} className="p-4 rounded-xl border border-slate-100 flex justify-between items-center hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-bold text-slate-800">{w.name}</p>
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-tighter">Rate: ₹{w.salary}/day</p>
                    </div>
                    <button 
                      onClick={() => markAttendance(w.id)} 
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all border ${attendanceData.some(a=>a.worker_id===w.id && a.date===todayDate) ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-800'}`}
                    >
                      {attendanceData.some(a=>a.worker_id===w.id && a.date===todayDate) ? 'PRESENT' : 'MARK PRESENT'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* MATERIAL SPEND SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <Receipt size={18} className="text-slate-600"/>
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700">Material Expenses</h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col gap-3 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex flex-col md:flex-row gap-2">
                    <input placeholder="Item (e.g. Cement)" value={itemName} onChange={(e) => setItemName(e.target.value)} className="flex-1 bg-white border border-slate-200 p-3 rounded-xl text-sm outline-none focus:border-slate-900 transition-all" />
                    <input placeholder="Amount" type="number" value={itemAmount} onChange={(e) => setItemAmount(e.target.value)} className="w-full md:w-28 bg-white border border-slate-200 p-3 rounded-xl text-sm outline-none focus:border-slate-900 transition-all" />
                  </div>
                  <button onClick={handleSaveSpend} className="bg-slate-900 text-white p-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">
                    {addingSpend ? <Loader2 className="animate-spin" size={16}/> : editingSpendId ? "UPDATE ITEM" : "ADD MATERIAL"}
                  </button>
                </div>
                <div className="space-y-2">
                  {spends.map(s => (
                    <div key={s.id} className="group flex justify-between items-center p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-all">
                      <div>
                        <p className="font-bold text-slate-800 uppercase text-[11px] tracking-tight">{s.item}</p>
                        <p className="text-sm font-bold text-slate-900">₹{s.amount.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => {setEditingSpendId(s.id); setItemName(s.item); setItemAmount(s.amount.toString());}} className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Edit3 size={16}/></button>
                        <button onClick={() => deleteSpend(s.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
