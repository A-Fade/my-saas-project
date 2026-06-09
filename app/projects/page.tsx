"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Topbar from "@/app/components/Topbar";
import Sidebar from "@/app/components/Sidebar";
import { LayoutGrid, MapPin, Activity, Plus, Edit3, Trash2, Eye } from "lucide-react";

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
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("id", { ascending: false });
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
      name: name.trim(),
      location: location.trim(),
      status,
      user_id: user.id,
    };

    try {
      // FREE PLAN LIMIT CHECK
      if (!editingId) {
        const { data: profile, error: pErr } = await supabase
          .from("profiles")
          .select("plan")
          .eq("id", user.id)
          .single();

        if (pErr) throw new Error("Profile fetch failed");

        if (profile?.plan === "free") {
          const { count, error: cErr } = await supabase
            .from("projects")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id);

          if (cErr) throw new Error("Count fetch failed");

          if ((count || 0) >= 1) {
            toast.error("Free Plan allows only 1 project. Upgrade to Pro.");
            setSaving(false);
            return;
          }
        }
      }

      if (editingId) {
        // FIXED: Added security check .eq("user_id", user.id)
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editingId)
          .eq("user_id", user.id);

        if (error) throw error;
        toast.success("Project updated");
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([payload]);

        if (error) throw error;
        toast.success("Project added");
      }

      resetForm();
      fetchProjects(user.id);

    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Operation failed");
    } finally {
      setSaving(false);
    }
  }
  function handleEdit(p: any) {
    setName(p.name);
    setLocation(p.location);
    setStatus(p.status);
    setEditingId(p.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
        .eq("user_id", user.id);

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

  if (loading)
    return (
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
                  <input
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all"
                    placeholder="Enter project name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Site Location</label>
                  <input
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 transition-all"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Current Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl outline-none focus:bg-white focus:border-slate-900 appearance-none"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  {saving ? "SAVING..." : editingId ? "UPDATE PROJECT" : "ESTABLISH PROJECT"}
                </button>
                {editingId && (
                  <button onClick={resetForm} className="px-10 py-4 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Projects List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-slate-100 p-2 rounded-xl text-slate-700">
                      <LayoutGrid size={20} />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 truncate">{p.name}</h3>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600 font-medium mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400" />
                      <span>{p.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity size={14} className="text-slate-400" />
                      <span className="capitalize">{p.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 border border-slate-100"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs transition-all flex items-center justify-center border border-red-100"
                  >
                    <Trash2 size={14} />
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
