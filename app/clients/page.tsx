"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Topbar from "@/app/components/Topbar";
import Sidebar from "@/app/components/Sidebar";
import { UserPlus, Briefcase, Phone, Banknote, Edit3, Eye, PlusCircle, ArrowRight, Trash2 } from "lucide-react";

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
    const { data: cData } = await supabase.from("clients")
      .select(`*, projects:project_id(id, name, budget, location)`)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    const { data: pData } = await supabase.from("projects").select("*").eq("user_id", userId).order("name");
    
    const syncedClients = (cData || []).map(c => ({ ...c, display_budget: c.projects?.budget || 0 }));
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

    // CREATE NEW PROJECT (if needed)
    if (isNewProject && newProjectName) {
      const { data: nProj, error: pErr } = await supabase
        .from("projects")
        .insert([
          {
            name: newProjectName,
            status: "active",
            location: "Not Specified",
            budget: Number(budget),
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (pErr) throw pErr;

      finalProjectId = nProj.id;
    } else {
      if (projectId) {
        await supabase
          .from("projects")
          .update({ budget: Number(budget) })
          .eq("id", projectId)
          .eq("user_id", user.id);
      }
    }

    const clientPayload = {
      name: name.trim(),
      phone: phone.trim(),
      project_id: finalProjectId,
      user_id: user.id,
    };

   if (!editingId) {
  const userId = user.id;

  const { data: profile, error: pErr } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", userId)
    .single();

  if (pErr) {
    toast.error("Profile fetch failed");
    setSaving(false);
    return;
  }

  const { count, error: cErr } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (cErr) {
    toast.error("Count fetch failed");
    setSaving(false);
    return;
  }

  if (profile?.plan === "free" && (count ?? 0) >= 1) {
    toast.error("Free plan allows only 1 client");
    setSaving(false);
    return;
  }
}
    // INSERT / UPDATE
    if (editingId) {
      await supabase
        .from("clients")
        .update(clientPayload)
        .eq("id", editingId)
        .eq("user_id", user.id);

      toast.success("Client Updated");
    } else {
      await supabase
        .from("clients")
        .insert([clientPayload]);

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

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this client?")) return;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      
      toast.success("Client deleted");
      fetchAll(user.id);
    } catch (err: any) {
      toast.error("Delete failed: " + err.message);
    }
  }

  function resetForm() {
    setName("");
    setPhone("");
    setProjectId("");
    setNewProjectName("");
    setBudget("");
    setEditingId(null);
    setIsNewProject(false);
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
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Clients</h1>
              <p className="text-slate-500 font-medium text-sm mt-1">Directory of project owners and billing details</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Registered Clients</p>
              <h2 className="text-2xl font-bold text-slate-900">{clients.length}</h2>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-12 transition-all">
            <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">{editingId ? "Update Information" : "New Client Onboarding"}</h2>
              <button onClick={() => setIsNewProject(!isNewProject)} className="text-[10px] font-bold bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-800 transition-colors" >
                <PlusCircle size={14}/> {isNewProject ? "Select Existing Project" : "Create New Project"}
              </button>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Client Name</label>
                  <input className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Contact Number</label>
                  <input className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all" placeholder="Enter phone" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Project Assignment</label>
                  {isNewProject ? (
                    <input className="w-full bg-slate-50 border border-slate-900/10 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900" placeholder="New project name" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} />
                  ) : (
                    <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 appearance-none" value={projectId} onChange={e => setProjectId(e.target.value)}>
                      <option value="">Select Project</option>
                      {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Initial Budget (₹)</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 font-bold" placeholder="0.00" value={budget} onChange={e => setBudget(e.target.value)} />
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={handleSave} disabled={saving} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50">
                  {saving ? "SAVING DATA..." : "SAVE CLIENT RECORD"}
                </button>
                {editingId && (
                  <button onClick={resetForm} className="px-10 py-4 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                )}
              </div>
            </div>
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map(c => (
              <div key={c.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <UserPlus size={20}/>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">Verified</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{c.name}</h3>
                <p className="text-sm text-slate-500 font-medium mb-6 flex items-center gap-1.5"><Phone size={14}/> {c.phone}</p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Assigned Project</p>
                  <p className="font-bold text-slate-700 text-sm truncate uppercase tracking-tight">{c.projects?.name || 'Manual Assignment'}</p>
                  <div className="mt-3 pt-3 border-t border-slate-200/60">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Budget</p>
                    <p className="text-xl font-bold text-slate-900 mt-0.5">₹{c.display_budget.toLocaleString()}</p>
                  </div>
                </div>
                {/* ACTIONS */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button onClick={() => {setEditingId(c.id); setName(c.name); setPhone(c.phone); setProjectId(c.project_id); setBudget(c.display_budget); window.scrollTo({top:0, behavior:'smooth'});}} className="bg-slate-50 border border-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-900 hover:text-white transition-all">
                    Edit Client
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="bg-slate-50 border border-slate-200 text-red-600 py-2.5 rounded-xl font-bold text-xs hover:bg-red-50 hover:border-red-100 transition-all">
                    Delete
                  </button>
                </div>
                <button onClick={() => c.project_id && router.push(`/projects/${c.project_id}`)} className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all">
                  View Project <ArrowRight size={14}/>
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
