"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Topbar from "@/app/components/Topbar";
import Sidebar from "@/app/components/Sidebar";
import { Users, Phone, Banknote, Briefcase, Edit3, Plus, UserPlus, ArrowRight, Trash2 } from "lucide-react";

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

  if (!name || !phone || !salary || !projectId || !user) {
    toast.error("Fill all fields");
    return;
  }

  setSaving(true);

  const payload = {
    name: name.trim(),
    phone: phone.trim(),
    salary: Number(salary),
    project_id: projectId,
    user_id: user.id,
  };

  // ✅ FREE PLAN LIMIT CHECK (ONLY INSERT)
  if (!editingId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("user_id", user.id)
      .single();

    if (profile?.plan === "free") {
      const { count } = await supabase
        .from("workers")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if ((count || 0) >= 2) {
        toast.error("Free plan allows only 2 workers. Upgrade required.");
        setSaving(false);
        return;
      }
    }
  }

  if (editingId) {
    const { error } = await supabase
      .from("workers")
      .update(payload)
      .eq("id", editingId);

    if (error) toast.error(error.message);
    else toast.success("Worker updated");

  } else {
    const { error } = await supabase
      .from("workers")
      .insert([payload]);

    if (error) toast.error(error.message);
    else toast.success("Worker added");
  }

  resetForm();
  fetchAll(user.id);
  setSaving(false);
}

  // ADDED DELETE FUNCTION
  async function handleDelete(id: any) {
    if (!confirm("Are you sure you want to delete this worker?")) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("workers").delete().eq("id", id).eq("user_id", user.id);

    if (error) {
      toast.error("Delete failed: " + error.message);
    } else {
      toast.success("Worker removed");
      fetchAll(user.id);
    }
  }

  function editWorker(w: any) {
    setEditingId(w.id);
    setName(w.name || "");
    setPhone(w.phone || "");
    setSalary(String(w.salary || ""));
    setProjectId(w.project_id ? String(w.project_id) : "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setPhone("");
    setSalary("");
    setProjectId("");
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
          {/* Header */}
          <div className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Workers</h1>
              <p className="text-slate-500 font-medium text-sm mt-1">Manage your team members and daily rates</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Team Strength</p>
              <h2 className="text-2xl font-bold text-slate-900">{workers.length}</h2>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-12">
            <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-100">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                {editingId ? "Modify Staff Details" : "Onboard New Worker"}
              </h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Full Name</label>
                  <input className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all" placeholder="Worker name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Phone Number</label>
                  <input className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all" placeholder="Contact number" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Daily Rate (₹)</label>
                  <input className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all" placeholder="0.00" value={salary} onChange={e => setSalary(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Assign Site</label>
                  <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 appearance-none font-medium" value={projectId} onChange={e => setProjectId(e.target.value)}>
                    <option value="">Select Project</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={handleSave} disabled={saving} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50">
                  {saving ? "SAVING..." : editingId ? "UPDATE WORKER" : "ADD WORKER"}
                </button>
                {editingId && (
                  <button onClick={resetForm} className="px-10 py-4 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                )}
              </div>
            </div>
          </div>

          {/* Workers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.map(w => (
              <div key={w.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <UserPlus size={20}/>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">Active</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{w.name}</h3>
                <p className="text-sm text-slate-500 font-medium mb-6 flex items-center gap-1.5"><Phone size={14}/> {w.phone}</p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Site</p>
                    <Briefcase size={12} className="text-slate-400" />
                  </div>
                  <p className="font-bold text-slate-700 text-sm truncate uppercase tracking-tight">{w.projects?.name || 'Unassigned'}</p>
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Daily Salary</p>
                      <p className="text-xl font-bold text-slate-900 mt-0.5">₹{Number(w.salary).toLocaleString()}</p>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 italic mb-1">per day</p>
                  </div>
                </div>
                {/* ACTIONS UPDATED */}
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => editWorker(w)} className="bg-slate-50 border border-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-1">
                    <Edit3 size={12}/> Edit
                  </button>
                  <button onClick={() => handleDelete(w.id)} className="bg-slate-50 border border-slate-200 text-red-600 py-2.5 rounded-xl font-bold text-xs hover:bg-red-50 hover:border-red-100 transition-all flex items-center justify-center gap-1">
                    <Trash2 size={12}/> Delete
                  </button>
                  <button onClick={() => w.project_id && router.push(`/projects/${w.project_id}`)} className="bg-slate-900 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-1">
                    Site <ArrowRight size={12}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
