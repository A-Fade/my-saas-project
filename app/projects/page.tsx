"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

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

    fetchProjects();
  }

  async function fetchProjects() {
    setLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      toast.error("Failed to load projects");
    }

    setProjects(data || []);
    setLoading(false);
  }

  // ➕ ADD / UPDATE
  async function handleSave() {
    if (!name || !location || !status) {
      toast.error("Fill all fields");
      return;
    }

    setSaving(true);

    if (editingId) {
      const { error } = await supabase
        .from("projects")
        .update({ name, location, status })
        .eq("id", editingId);

      if (error) {
        toast.error("Update failed");
        setSaving(false);
        return;
      }

      toast.success("Project updated");
    } else {
      const { error } = await supabase.from("projects").insert([
        { name, location, status },
      ]);

      if (error) {
        toast.error("Add failed");
        setSaving(false);
        return;
      }

      toast.success("Project added");
    }

    resetForm();
    fetchProjects();
    setSaving(false);
  }

  // ✏️ EDIT
  function handleEdit(p: any) {
    setName(p.name);
    setLocation(p.location);
    setStatus(p.status);
    setEditingId(p.id);
  }

  // ❌ DELETE
  async function handleDelete(id: number) {
    if (!confirm("Delete this project?")) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Delete failed");
      return;
    }

    toast.success("Project deleted");
    fetchProjects();
  }

  function resetForm() {
    setName("");
    setLocation("");
    setStatus("");
    setEditingId(null);
  }

  async function logout() {
    await supabase.auth.signOut();
    toast.success("Logged out");
    router.push("/login");
  }

  // 👉 OPEN PROJECT DETAIL
  function openProject(id: number) {
    router.push(`/projects/${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📁 Projects</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white p-5 rounded-2xl shadow mb-6 max-w-xl">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "✏️ Edit Project" : "➕ Add Project"}
        </h2>

        <input
          className="w-full border p-2 mb-3 rounded-lg"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3 rounded-lg"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3 rounded-lg"
          placeholder="Status (active / completed)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update Project"
              : "Add Project"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div>
        <h2 className="text-xl font-semibold mb-4">📋 All Projects</h2>

        {loading ? (
          <p>Loading...</p>
        ) : projects.length === 0 ? (
          <p>No projects found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {projects.map((p) => (
              <div
                key={p.id}
                onClick={() => openProject(p.id)}
                className="bg-white p-4 rounded-2xl shadow cursor-pointer hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-gray-600">{p.location}</p>

                <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                  {p.status}
                </span>

                {/* ACTIONS */}
                <div
                  className="flex gap-2 mt-4"
                  onClick={(e) => e.stopPropagation()} // 🔥 prevent card click
                >
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 bg-yellow-400 text-white py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => openProject(p.id)}
                    className="flex-1 bg-blue-600 text-white py-1 rounded"
                  >
                    View
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}