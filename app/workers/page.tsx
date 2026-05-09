"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Topbar from "@/app/components/Topbar";
import Sidebar from "@/app/components/Sidebar";

export default function Workers() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [projectId, setProjectId] = useState("");
  const [editingId, setEditingId] = useState<any>(null);
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
    const { data: wData } = await supabase.from("workers").select("*").eq("user_id", userId).order("id", { ascending: false });
    const { data: pData } = await supabase.from("projects").select("*").eq("user_id", userId);

    const merged = (wData || []).map((worker: any) => {
      const project = (pData || []).find((p: any) => String(p.id) === String(worker.project_id));
      return { ...worker, projects: project || null };
    });

    setWorkers(merged);
    setProjects(pData || []);
    setLoading(false);
  }

  async function handleSave() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!name || !phone || !salary || !projectId || !user) { toast.error("Fill all fields"); return; }
    setSaving(true);
    const payload = { name: name.trim(), phone: phone.trim(), salary: Number(salary), project_id: projectId, user_id: user.id };

    if (editingId) {
      const { error } = await supabase.from("workers").update(payload).eq("id", editingId);
      if (error) toast.error(error.message);
      else toast.success("Worker updated");
    } else {
      const { error } = await supabase.from("workers").insert([payload]);
      if (error) toast.error(error.message);
      else toast.success("Worker added");
    }
    resetForm();
    fetchAll(user.id);
    setSaving(false);
  }

  function editWorker(w: any) {
    setEditingId(w.id); setName(w.name || ""); setPhone(w.phone || ""); setSalary(String(w.salary || "")); setProjectId(w.project_id ? String(w.project_id) : "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() { setEditingId(null); setName(""); setPhone(""); setSalary(""); setProjectId(""); }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="hidden md:block w-64 fixed left-0 top-0 h-screen z-40"><Sidebar /></div>
      <div className="flex-1 md:ml-64">
        <Topbar />
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div><h1 className="text-4xl font-black text-slate-800"> 👷 Workers </h1><p className="text-slate-500 mt-2 font-medium"> Manage all your workers professionally </p></div>
            <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm"><p className="text-sm text-slate-500"> Total Workers </p><h2 className="text-3xl font-black text-blue-700"> {workers.length} </h2></div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white"><h2 className="text-2xl font-bold"> {editingId ? "✏️ Edit Worker" : "➕ Add New Worker"} </h2><p className="text-blue-100 mt-1 font-medium"> Add and manage workers easily </p></div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                <input className="border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none focus:border-blue-400" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input className="border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none focus:border-blue-400" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                <input className="border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none focus:border-blue-400" placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} />
                <select className="border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none focus:border-blue-400 font-bold" value={projectId} onChange={e => setProjectId(e.target.value)}>
                  <option value="">Select Project</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <button onClick={handleSave} disabled={saving} className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-3 rounded-2xl font-black shadow-lg"> {saving ? "Saving..." : editingId ? "Update" : "Add"} </button>
              {editingId && <button onClick={resetForm} className="ml-4 bg-slate-200 px-10 py-3 rounded-2xl font-bold text-slate-700">Cancel</button>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workers.map(w => (
              <div key={w.id} className="bg-white p-6 rounded-3xl border shadow-sm hover:shadow-xl transition-all">
                <h3 className="text-2xl font-black mb-2">{w.name}</h3><p className="text-slate-500 font-bold mb-4">📞 {w.phone}</p>
                <div className="bg-blue-50 p-4 rounded-2xl mb-4 border border-blue-100"><p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Project</p><p className="font-bold text-blue-800">{w.projects?.name || 'No Project'}</p></div>
                <div className="grid grid-cols-2 gap-2"><button onClick={() => editWorker(w)} className="bg-amber-400 text-white py-2 rounded-xl font-bold transition">Edit</button></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
