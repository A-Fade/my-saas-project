"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import toast from "react-hot-toast";
import { Trash2, Edit3, Plus, Users, Receipt, Loader2, CheckCircle, Wallet, TrendingUp } from "lucide-react";

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [workers, setWorkers] = useState<any[]>([]);
  const [spends, setSpends] = useState<any[]>([]);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [addingSpend, setAddingSpend] = useState(false);
  const [budgetInput, setBudgetInput] = useState("");

  useEffect(() => {
    if (params.id) fetchData();
  }, [params.id]);

  async function fetchData() {
    setLoading(true);
    try {
      // 1. Fetch Project Details
      const { data: proj } = await supabase.from("projects").select("*").eq("id", params.id).single();
      setProject(proj);
      setBudgetInput(proj?.budget || "0");

      // 2. Fetch Workers (Auto List from Main Workers Table)
      const { data: wrk } = await supabase.from("workers").select("*").eq("project_id", params.id);
      setWorkers(wrk || []);

      // 3. Fetch Spends
      const { data: spnd } = await supabase.from("project_spends").select("*").eq("project_id", params.id).order("id", { ascending: false });
      setSpends(spnd || []);

      // 4. Fetch Attendance
      const { data: att } = await supabase.from("attendance").select("*").eq("project_id", params.id);
      setAttendanceData(att || []);
    } catch (err) {
      console.error("Data Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }

  // Mark Daily Attendance
  async function markAttendance(workerId: string) {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    const { error } = await supabase.from("attendance").insert([
      { 
        worker_id: workerId, 
        project_id: params.id, 
        date: today, 
        status: 'present' 
      }
    ]);

    if (error) {
      if (error.code === '23505') toast.error("Aaj ki hajri pehle se lag chuki hai!");
      else toast.error("Hajri error: " + error.message);
    } else {
      toast.success("Attendance Marked!");
      fetchData();
    }
  }

  // Update Budget
  async function updateBudget() {
    const { error } = await supabase.from("projects").update({ budget: Number(budgetInput) }).eq("id", params.id);
    if (error) toast.error("Failed to update budget");
    else { toast.success("Budget Updated"); fetchData(); }
  }

  // Add/Update Spend Logic
  async function addSpend() {
    if (!itemName || !itemAmount) return toast.error("Fill item details");
    setAddingSpend(true);
    const { error } = await supabase.from("project_spends").insert([{ item: itemName, amount: Number(itemAmount), project_id: params.id }]);
    if (error) toast.error("Spend Error: " + error.message);
    else { toast.success("Spend Added"); setItemName(""); setItemAmount(""); fetchData(); }
    setAddingSpend(false);
  }

  // Calculations
  const calculateWorkerSalary = (workerId: string, perDaySalary: number) => {
    const daysPresent = attendanceData.filter(a => a.worker_id === workerId && a.status === 'present').length;
    return daysPresent * perDaySalary;
  };

  const totalLaborCost = workers.reduce((acc, w) => acc + calculateWorkerSalary(w.id, w.salary), 0);
  const totalMaterialSpent = spends.reduce((acc, s) => acc + (Number(s.amount) || 0), 0);
  const totalOut = totalLaborCost + totalMaterialSpent;
  const currentProfit = (Number(project?.budget) || 0) - totalOut;

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-slate-500">BuilderPro Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <div className="hidden md:block w-64 fixed h-full z-40"><Sidebar /></div>
      <div className="flex-1 md:ml-64">
        <Topbar />
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          
          <div className="mb-6">
            <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">🚀 {project?.name} - Financial Dashboard</h1>
          </div>

          {/* TOP 4 COLUMNS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-blue-600">
              <p className="text-slate-400 font-bold text-[10px] uppercase mb-2">Budget</p>
              <div className="flex items-center gap-1 border-b border-dashed">
                <span className="text-lg font-bold text-slate-400">₹</span>
                <input type="number" value={budgetInput} onChange={(e) => setBudgetInput(e.target.value)} className="text-2xl font-black w-full outline-none bg-transparent" />
              </div>
              <button onClick={updateBudget} className="text-[10px] text-blue-600 font-bold mt-2 uppercase">Save</button>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-red-500">
              <p className="text-slate-400 font-bold text-[10px] uppercase mb-2">Spent (Lab + Mat)</p>
              <h2 className="text-2xl font-black text-red-600 tracking-tighter">₹{totalOut}</h2>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-green-500">
              <p className="text-slate-400 font-bold text-[10px] uppercase mb-2">Net Profit</p>
              <h2 className="text-2xl font-black text-green-600 tracking-tighter">₹{currentProfit}</h2>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border-t-4 border-amber-500">
              <p className="text-slate-400 font-bold text-[10px] uppercase mb-2">Workers</p>
              <h2 className="text-2xl font-black text-amber-600 tracking-tighter">{workers.length}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* WORKER LIST SECTION */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 p-6 text-white flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2 tracking-tight"><Users size={20}/> Workers & Salary</h3>
              </div>
              <div className="p-6 space-y-4">
                {workers.map(w => {
                  const days = attendanceData.filter(a => a.worker_id === w.id).length;
                  const earned = calculateWorkerSalary(w.id, w.salary);
                  return (
                    <div key={w.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                      <div>
                        <p className="font-black text-slate-800">{w.name}</p>
                        <p className="text-[11px] text-slate-500 font-bold">₹{w.salary}/day × {days} days = <span className="text-blue-600 font-black">₹{earned}</span></p>
                      </div>
                      <button onClick={() => markAttendance(w.id)} className="bg-white border p-2 rounded-xl text-slate-600 hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-sm flex flex-col items-center gap-1">
                        <CheckCircle size={18}/>
                        <span className="text-[8px] font-black uppercase tracking-widest">Hajri</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* EXPENSE LIST SECTION */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 p-6 text-white flex items-center gap-2">
                <Receipt size={20}/>
                <h3 className="font-bold tracking-tight">Material Expenditure</h3>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-6 bg-slate-50 p-3 rounded-2xl border border-dashed">
                  <input placeholder="Item" value={itemName} onChange={(e) => setItemName(e.target.value)} className="flex-1 bg-white border p-2 rounded-xl text-sm outline-none" />
                  <input placeholder="Amt" type="number" value={itemAmount} onChange={(e) => setItemAmount(e.target.value)} className="w-24 bg-white border p-2 rounded-xl text-sm outline-none" />
                  <button onClick={addSpend} disabled={addingSpend} className="bg-red-600 text-white p-2 px-4 rounded-xl hover:bg-red-700 transition">
                    {addingSpend ? <Loader2 className="animate-spin" size={20}/> : <Plus size={20}/>}
                  </button>
                </div>
                <div className="space-y-3">
                  {spends.map(s => (
                    <div key={s.id} className="flex justify-between items-center p-4 bg-red-50/50 rounded-2xl border border-red-100">
                      <p className="font-bold text-slate-800">{s.item}</p>
                      <p className="text-sm font-black text-red-600">₹{s.amount}</p>
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
