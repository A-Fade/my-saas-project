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
  const [editingId, setEditingId] = useState<any>(null); 
  const [loading, setLoading] = useState(false); 
  const [saving, setSaving] = useState(false); 
  const router = useRouter(); 

  useEffect(() => { checkUser(); }, []); 

  async function checkUser() { 
    const { data: { user } } = await supabase.auth.getUser(); 
    if (!user) { router.push("/login"); return; } 
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
    if (!name || !location || !status || !user) { toast.error("Fill all fields"); return; } 
    setSaving(true); 
    const payload = { name, location, status, user_id: user.id }; 
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

  async function handleDelete(id: any) { 
    if (!confirm("Delete this project?")) return; 
    const { data: { user } } = await supabase.auth.getUser(); 
    const { error } = await supabase.from("projects").delete().eq("id", id); 
    if (error) toast.error("Delete failed"); 
    else { 
      toast.success("Project deleted"); 
      if (user) fetchProjects(user.id); 
    } 
  } 

  function resetForm() { setName(""); setLocation(""); setStatus(""); setEditingId(null); } 

  return ( 
    <div className="min-h-screen bg-slate-100 flex"> 
      <div className="hidden md:block w-64 fixed left-0 top-0 h-screen z-40"> <Sidebar /> </div> 
      <div className="flex-1 md:ml-64"> 
        <Topbar /> 
        <div className="max-w-7xl mx-auto p-4 md:p-6"> 
          {/* Header Stats */}
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4"> 
            <div> 
              <h1 className="text-4xl font-black text-slate-800 tracking-tight"> 📁 Projects </h1> 
              <p className="text-slate-500 mt-2 font-medium"> Manage all your construction projects easily </p> 
            </div> 
            <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm"> 
              <p className="text-sm text-slate-500"> Total Projects </p> 
              <h2 className="text-3xl font-black text-blue-700"> {projects.length} </h2> 
            </div> 
          </div> 

          {/* Form Section */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8"> 
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white"> 
              <h2 className="text-2xl font-bold"> {editingId ? "✏️ Edit Project" : "➕ Add New Project"} </h2> 
              <p className="text-blue-100 mt-1 font-medium"> Manage your construction projects professionally </p> 
            </div> 
            <div className="p-6 md:p-8"> 
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5"> 
                <div> <label className="block text-sm font-semibold text-slate-700 mb-2"> Project Name </label> <input className="w-full border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200" value={name} onChange={(e) => setName(e.target.value)} /> </div> 
                <div> <label className="block text-sm font-semibold text-slate-700 mb-2"> Location </label> <input className="w-full border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200" value={location} onChange={(e) => setLocation(e.target.value)} /> </div> 
                <div> <label className="block text-sm font-semibold text-slate-700 mb-2"> Status </label> <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none" > <option value="">Select Status</option> <option value="active">Active</option> <option value="completed">Completed</option> <option value="pending">Pending</option> </select> </div> 
              </div> 
              <div className="flex flex-wrap gap-4 mt-8"> 
                <button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-105 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg"> {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"} </button> 
                {editingId && <button onClick={resetForm} className="bg-slate-200 text-slate-700 px-8 py-3 rounded-2xl font-semibold transition"> Cancel </button>} 
              </div> 
            </div> 
          </div> 

          {/* List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"> 
            {projects.map((p) => ( 
              <div key={p.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300"> 
                <div className="flex items-start justify-between mb-5"> 
                  <div><h3 className="text-2xl font-bold text-slate-800 mb-2">{p.name}</h3><p className="text-slate-500 font-medium">📍 {p.location}</p></div> 
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">🏗️</div> 
                </div> 
                <div className="mb-6"><span className={`px-4 py-2 rounded-full text-sm font-semibold ${p.status === "active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{p.status}</span></div> 
                <div className="grid grid-cols-3 gap-3"> 
                  <button onClick={() => handleEdit(p)} className="bg-amber-400 hover:bg-amber-500 text-white py-2 rounded-xl font-semibold transition">Edit</button> 
                  <button onClick={() => handleDelete(p.id)} className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition">Delete</button> 
                  <button onClick={() => router.push(`/projects/${p.id}`)} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2 rounded-xl font-semibold transition">View</button> 
                </div> 
              </div> 
            ))} 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}
