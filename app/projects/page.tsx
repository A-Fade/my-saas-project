"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Topbar from "@/app/components/Topbar";
import Sidebar from "@/app/components/Sidebar";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState<any>(null); // ✅ Fixed for UUID
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => { checkUser(); }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    fetchProjects();
  }

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase.from("projects").select("*").order("id", { ascending: false });
    if (error) toast.error("Failed to load projects");
    setProjects(data || []);
    setLoading(false);
  }

  async function handleSave() {
    if (!name || !location || !status) { toast.error("Fill all fields"); return; }
    setSaving(true);
    const payload = { name, location, status };

    if (editingId) {
      const { error } = await supabase.from("projects").update(payload).eq("id", editingId);
      if (error) toast.error("Update failed");
      else toast.success("Project updated");
    } else {
      const { error } = await supabase.from("projects").insert([payload]);
      if (error) toast.error("Add failed");
      else toast.success("Project added");
    }
    resetForm();
    fetchProjects();
    setSaving(false);
  }

  function handleEdit(p: any) {
    setName(p.name); setLocation(p.location); setStatus(p.status); setEditingId(p.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: any) {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else { toast.success("Project deleted"); fetchProjects(); }
  }

  function resetForm() { setName(""); setLocation(""); setStatus(""); setEditingId(null); }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="hidden md:block w-64 fixed left-0 top-0 h-screen z-40"> <Sidebar /> </div>
      <div className="flex-1 md:ml-64">
        <Topbar />
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-black text-slate-800"> 📁 Projects </h1>
              <p className="text-slate-500 mt-2"> Manage all your construction projects easily </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
              <p className="text-sm text-slate-500"> Total Projects </p>
              <h2 className="text-3xl font-black text-blue-700"> {projects.length} </h2>
            </div>
          </div>

          {/* PREMIUM FORM */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white">
              <h2 className="text-2xl font-bold"> {editingId ? "✏️ Edit Project" : "➕ Add New Project"} </h2>
            </div>
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              <input className="border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200" placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200">
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
              <div className="flex gap-4 mt-4">
                <button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg">
                  {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
                </button>
                {editingId && <button onClick={resetForm} className="bg-slate-200 px-8 py-3 rounded-2xl font-semibold"> Cancel </button>}
              </div>
            </div>
          </div>

          {/* LIST */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer" onClick={() => router.push(`/projects/${p.id}`)}>
                <div className="flex justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-800">{p.name}</h3>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">🏗️</div>
                </div>
                <p className="text-slate-500 mb-4">📍 {p.location}</p>
                <div className="grid grid-cols-3 gap-2" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => handleEdit(p)} className="bg-amber-400 text-white py-2 rounded-xl font-bold">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white py-2 rounded-xl font-bold">Delete</button>
                  <button onClick={() => router.push(`/projects/${p.id}`)} className="bg-blue-600 text-white py-2 rounded-xl font-bold">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
