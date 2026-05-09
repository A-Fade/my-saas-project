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
  const [editingId, setEditingId] = useState<string | null>(null); // ✅ UUID is string
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => { checkUser(); }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    fetchAll();
  }

  async function fetchAll() {
    setLoading(true);
    const { data: workersData, error: wError } = await supabase
      .from("workers")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: projectsData } = await supabase.from("projects").select("*");

    if (wError) {
      toast.error("Failed to load workers");
      setLoading(false);
      return;
    }

    // ✅ Match UUID worker.project_id with int8 project.id
    const mergedWorkers = (workersData || []).map((worker: any) => {
      const project = (projectsData || []).find(
        (p: any) => String(p.id) === String(worker.project_id)
      );
      return { ...worker, projects: project || null };
    });

    setWorkers(mergedWorkers);
    setProjects(projectsData || []);
    setLoading(false);
  }

  async function handleSave() {
    if (!name || !phone || !salary || !projectId) {
      toast.error("Fill all fields");
      return;
    }

    setSaving(true);
    
    // ✅ Payload data types fixed
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      salary: Number(salary),
      project_id: Number(projectId), // ✅ int8 needs Number
    };

    if (editingId) {
      // ✅ UPDATE using UUID string
      const { error } = await supabase
        .from("workers")
        .update(payload)
        .eq("id", editingId); 

      if (error) {
        console.error("Update Error:", error);
        toast.error(error.message);
        setSaving(false);
        return;
      }
      toast.success("Worker updated");
    } else {
      // ADD
      const { error } = await supabase.from("workers").insert([payload]);
      if (error) {
        toast.error(error.message);
        setSaving(false);
        return;
      }
      toast.success("Worker added");
    }

    // RESET
    setEditingId(null);
    setName(""); setPhone(""); setSalary(""); setProjectId("");
    await fetchAll();
    setSaving(false);
  }

  async function deleteWorker(id: string) {
    if (!window.confirm("Delete this worker?")) return;
    const { error } = await supabase.from("workers").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Worker deleted"); fetchAll(); }
  }

  function editWorker(w: any) {
    setEditingId(w.id);
    setName(w.name || "");
    setPhone(w.phone || "");
    setSalary(String(w.salary || ""));
    setProjectId(w.project_id ? String(w.project_id) : "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="hidden md:block fixed left-0 top-0 h-screen w-64 z-40">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-64">
        <Topbar />
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-black text-slate-800"> 👷 Workers </h1>
                <p className="text-slate-500 mt-2"> Manage all your workers professionally </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
                <p className="text-sm text-slate-500"> Total Workers </p>
                <h2 className="text-3xl font-black text-blue-700"> {workers.length} </h2>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white">
              <h2 className="text-2xl font-bold"> {editingId ? "✏️ Edit Worker" : "➕ Add New Worker"} </h2>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2"> Worker Name </label>
                  <input className="w-full border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2"> Phone Number </label>
                  <input className="w-full border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2"> Salary </label>
                  <input className="w-full border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200" value={salary} onChange={(e) => setSalary(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2"> Select Project </label>
                  <select className="w-full border border-slate-300 bg-slate-50 px-4 py-3 rounded-2xl outline-none focus:ring-4 focus:ring-blue-200" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                    <option value=""> Select Project </option>
                    {projects.map((p: any) => ( <option key={p.id} value={String(p.id)}> {p.name} </option> ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg">
                  {saving ? "Saving..." : editingId ? "Update Worker" : "Add Worker"}
                </button>
                {editingId && (
                  <button onClick={() => { setEditingId(null); setName(""); setPhone(""); setSalary(""); setProjectId(""); }} className="bg-slate-200 text-slate-700 px-8 py-3 rounded-2xl font-semibold"> Cancel </button>
                )}
              </div>
            </div>
          </div>

          {/* LIST */}
          {loading ? ( <p>Loading...</p> ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {workers.map((w: any) => (
                <div key={w.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2"> {w.name} </h3>
                      <p className="text-slate-500"> 📞 {w.phone} </p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <p className="text-sm text-slate-500"> Salary </p>
                      <h3 className="text-xl font-bold text-slate-800"> ₹{w.salary} </h3>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                      <p className="text-sm text-blue-600"> Project </p>
                      <h3 className="text-lg font-semibold text-blue-800"> {w.projects?.name || "No Project"} </h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => editWorker(w)} className="bg-amber-400 text-white py-2 rounded-xl font-semibold"> Edit </button>
                    <button onClick={() => deleteWorker(w.id)} className="bg-red-500 text-white py-2 rounded-xl font-semibold"> Delete </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
