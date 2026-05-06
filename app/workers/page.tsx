"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Workers() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [projectId, setProjectId] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    fetchAll();
  }

  async function fetchAll() {
    setLoading(true);

    const { data, error } = await supabase
      .from("workers")
      .select("*, projects(name)");

    if (error) toast.error("Failed to load workers");

    const { data: p } = await supabase.from("projects").select("*");

    setWorkers(data || []);
    setProjects(p || []);

    setLoading(false);
  }

  // ➕ ADD + ✏️ UPDATE
  async function handleSave() {
    if (!name || !phone || !salary || !projectId) {
      toast.error("Fill all fields");
      return;
    }

    setSaving(true);

    if (editingId) {
      // UPDATE
      const { error } = await supabase
        .from("workers")
        .update({
          name,
          phone,
          salary: Number(salary),
          project_id: Number(projectId),
        })
        .eq("id", editingId);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Worker updated");
        setEditingId(null);
      }
    } else {
      // ADD
      const { error } = await supabase.from("workers").insert([
        {
          name,
          phone,
          salary: Number(salary),
          project_id: Number(projectId),
        },
      ]);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Worker added");
      }
    }

    // RESET
    setName("");
    setPhone("");
    setSalary("");
    setProjectId("");

    fetchAll();
    setSaving(false);
  }

  // 🗑️ DELETE (instant UI)
  async function deleteWorker(id: number) {
    const confirmDelete = window.confirm("Delete this worker?");
    if (!confirmDelete) return;

    // UI remove instantly
    setWorkers((prev) => prev.filter((w) => w.id !== id));

    const { error } = await supabase
      .from("workers")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      fetchAll(); // rollback
    } else {
      toast.success("Worker deleted");
    }
  }

  // ✏️ EDIT
  function editWorker(w: any) {
    setEditingId(w.id);
    setName(w.name || "");
    setPhone(w.phone || "");
    setSalary(String(w.salary || ""));
    setProjectId(w.project_id ? String(w.project_id) : "");
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">👷 Workers</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6 max-w-xl">
        <h2 className="text-lg mb-4">
          {editingId ? "✏️ Edit Worker" : "➕ Add Worker"}
        </h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <select
          className="w-full border p-2 mb-3 rounded"
          value={projectId || ""}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map((p: any) => (
            <option key={p.id} value={String(p.id)}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {saving
            ? "Saving..."
            : editingId
            ? "Update Worker"
            : "Add Worker"}
        </button>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : workers.length === 0 ? (
          <p>No workers found</p>
        ) : (
          workers.map((w: any) => (
            <div
              key={w.id}
              className="bg-white p-4 rounded-2xl shadow"
            >
              <h3 className="font-bold">{w.name}</h3>
              <p>{w.phone}</p>
              <p className="font-semibold">₹{w.salary}</p>
              <p className="text-sm text-gray-500">
                {w.projects?.name}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => editWorker(w)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteWorker(w.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}