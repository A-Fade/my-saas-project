"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Topbar from "@/app/components/Topbar";
import Sidebar from "@/app/components/Sidebar";

export default function Clients() {
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [projectId, setProjectId] = useState("");
  const [newProjectName, setNewProjectName] = useState(""); 
  const [isNewProject, setIsNewProject] = useState(false); 
  const [budget, setBudget] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
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
    // ✅ Filter by user_id
    const { data: cData } = await supabase.from("clients")
      .select(`*, projects:project_id(id, name, budget, location)`)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    
    const { data: pData } = await supabase.from("projects").select("*").eq("user_id", userId).order("name");
    
    const syncedClients = (cData || []).map(c => ({
      ...c,
      display_budget: c.projects?.budget || 0
    }));

    setClients(syncedClients);
    setProjects(pData || []);
    setLoading(false);
  }

  async function handleSave() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!name || !phone || (!projectId && !newProjectName) || !user) { 
      toast.error("Please fill all details"); 
      return; 
    }
    setSaving(true);

    try {
      let finalProjectId = projectId;

      if (isNewProject && newProjectName) {
        const { data: nProj, error: pErr } = await supabase
          .from("projects")
          .insert([{ name: newProjectName, status: 'active', location: 'Not Specified', budget: Number(budget), user_id: user.id }])
          .select()
          .single();
        if (pErr) throw pErr;
        finalProjectId = nProj.id;
      } else {
        if (projectId) {
          await supabase.from("projects").update({ budget: Number(budget) }).eq("id", projectId);
        }
      }

      const clientPayload = {
        name: name.trim(),
        phone: phone.trim(),
        project_id: finalProjectId,
        user_id: user.id, // ✅ Add user_id
      };

      if (editingId) {
        await supabase.from("clients").update(clientPayload).eq("id", editingId);
        toast.success("Client Updated");
      } else {
        await supabase.from("clients").insert([clientPayload]);
        toast.success("Client Saved");
      }

      resetForm();
      fetchAll(user.id);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setName(""); setPhone(""); setProjectId(""); setNewProjectName(""); 
    setBudget(""); setEditingId(null); setIsNewProject(false);
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="hidden md:block w-64 fixed left-0 top-0 h-screen z-40"> <Sidebar /> </div>
      <div className="flex-1 md:ml-64">
        <Topbar />
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">🤝 Clients</h1>
              <p className="text-slate-500 font-medium mt-1">Manage client projects and shared budgets</p>
            </div>
            <div className="bg-white border-2 border-blue-100 rounded-3xl px-6 py-4 shadow-sm">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Total Clients</p>
              <h2 className="text-3xl font-black text-blue-700">{clients.length}</h2>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingId ? "✏️ Edit Client" : "➕ Add New Client"}</h2>
              <button onClick={() => setIsNewProject(!isNewProject)} className={`text-xs font-bold px-4 py-2 rounded-xl transition ${isNewProject ? 'bg-white text-blue-700' : 'bg-blue-600/50 text-white border border-white/20'}`}>
                {isNewProject ? "Using New Project" : "+ Create New Project instead"}
              </button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <input className="w-full border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none focus:border-blue-400" placeholder="Client Name" value={name} onChange={e => setName(e.target.value)} />
                <input className="w-full border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none focus:border-blue-400" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                <div className="col-span-1">
                  {isNewProject ? (
                    <input className="w-full border-2 border-blue-100 bg-blue-50/30 p-4 rounded-2xl outline-none" placeholder="New Project Name" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} />
                  ) : (
                    <select className="w-full border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none" value={projectId} onChange={e => setProjectId(e.target.value)}>
                      <option value="">Select Existing</option>
                      {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  )}
                </div>
                <input type="number" className="w-full border-2 border-slate-50 bg-slate-50 p-4 rounded-2xl outline-none font-bold" placeholder="Budget" value={budget} onChange={e => setBudget(e.target.value)} />
              </div>
              <button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-12 py-4 rounded-2xl font-black shadow-xl"> {saving ? "SAVING..." : "CONFIRM & SAVE"} </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clients.map(c => (
              <div key={c.id} className="bg-white p-8 rounded-[2.5rem] border shadow-sm hover:shadow-xl transition-all group">
                <h3 className="text-2xl font-black text-slate-800 mb-2">{c.name}</h3>
                <p className="text-slate-400 font-bold mb-6">📞 {c.phone}</p>
                <div className="bg-blue-50/50 p-4 rounded-2xl border-2 border-blue-100/50 mb-6">
                   <p className="font-bold text-slate-700 mb-1">{c.projects?.name || 'Unassigned'}</p>
                   <p className="text-2xl font-black text-blue-700">₹{c.display_budget.toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => {setEditingId(c.id); setName(c.name); setPhone(c.phone); setProjectId(c.project_id); setBudget(c.display_budget); window.scrollTo(0,0);}} className="bg-amber-400 text-white flex-1 py-2 rounded-xl font-bold">Edit</button>
                   <button onClick={() => c.project_id && router.push(`/projects/${c.project_id}`)} className="bg-slate-900 text-white flex-1 py-2 rounded-xl font-bold">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
