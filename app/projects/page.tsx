"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Topbar from "@/app/components/Topbar";
import Sidebar from "@/app/components/Sidebar";
import { LayoutGrid, MapPin, Activity, Plus, Edit3, Trash2, Eye, FolderRoot } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
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
    fetchProjects(user.id);
  }

  async function fetchProjects(userId: string) {
    setLoading(true);
    const { data, error } = await supabase.from("projects").select("*").eq("user_id", userId).order("id", { ascending: false });
    if (error) toast.error("Failed to load projects");
    setProjects(data || []);
    setLoading(false);
  }

 async function handleSave() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!name || !location || !status || !user) {
    toast.error("Fill all fields");
    return;
  }

  setSaving(true);

  const payload = {
    name,
    location,
    status,
    user_id: user.id,
  };

  // FREE PLAN LIMIT CHECK
  if (!editingId) {

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("user_id", user.id)
      .single();

    if (profile?.plan === "free") {

      const { count } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if ((count || 0) >= 1) {
        toast.error(
          "Free Plan allows only 1 project. Upgrade to Pro."
        );
        setSaving(false);
        return;
      }
    }
  }

  if (editingId) {
    const { error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", editingId);

    if (error) toast.error("Update failed");
    else toast.success("Project updated");

  } else {

    const { error } = await supabase
      .from("projects")
      .insert([payload]);

    if (error) toast.error("Add failed");
    else toast.success("Project added");
  }

  resetForm();
  fetchProjects(user.id);
  setSaving(false);
}                                                                                                                                                        
  function handleEdit(p: any) {
    setName(p.name);
    setLocation(p.location);                                                                   
    setStatus(p.status);
    setEditingId(p.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // FIXED DELETE FUNCTION
  async function handleDelete(id: any) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("User session not found");
        return;
      }

      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id); // Security: ensures user can only delete their own project

      if (error) {
        console.error("Delete error:", error);
        toast.error("Delete failed: " + error.message);
      } else {
        toast.success("Project deleted successfully");
        fetchProjects(user.id);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  }

  function resetForm() {
    setName("");
    setLocation("");
    setStatus("");
    setEditingId(null);
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
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Projects</h1>
              <p className="text-slate-500 font-medium text-sm mt-1">Manage and track your active construction sites</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Units</p>
              <h2 className="text-2xl font-bold text-slate-900">{projects.length}</h2>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-12">
            <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-100">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                {editingId ? "Modify Project Record" : "Register New Project"}
              </h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Site Name</label>
                  <input className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all" placeholder="Enter project name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Site Location</label>
                  <input className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Current Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 appearance-none" >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={handleSave} disabled={saving} className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50">
                  {saving ? "SAVING..." : editingId ? "UPDATE PROJECT" : "ESTABLISH PROJECT"}
                </button>
                {editingId && (
                  <button onClick={resetForm} className="px-10 py-4 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
                )}
              </div>
            </div>
          </div>

          {/* Projects List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <FolderRoot size={20}/>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${p.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                    {p.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{p.name}</h3>
                <p className="text-sm text-slate-500 font-medium mb-6 flex items-center gap-1.5"><MapPin size={14}/> {p.location}</p>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => handleEdit(p)} className="bg-slate-50 border border-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="bg-slate-50 border border-slate-200 text-red-600 py-2.5 rounded-xl font-bold text-xs hover:bg-red-50 hover:border-red-100 transition-all">
                    Delete
                  </button>
                  <button onClick={() => router.push(`/projects/${p.id}`)} className="bg-slate-900 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all">
                    Overview
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
