"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Payments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  const [amount, setAmount] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [projectId, setProjectId] = useState("");

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

    fetchAll();
  }

  async function fetchAll() {
    setLoading(true);

    // ✅ FORCE JOIN FIX
    const { data, error } = await supabase
      .from("payments")
      .select(`
        id,
        amount,
        worker_id,
        project_id,
        workers:worker_id (name),
        projects:project_id (name)
      `)
      .order("id", { ascending: false });

    if (error) {
      toast.error("Failed to load payments");
    }

    setPayments(data || []);

    const { data: w } = await supabase.from("workers").select("*");
    const { data: p } = await supabase.from("projects").select("*");

    setWorkers(w || []);
    setProjects(p || []);

    setLoading(false);
  }

  // ✅ ADD / UPDATE (FINAL FIX)
  async function handleSave() {
    if (!amount || !workerId || !projectId) {
      toast.error("All fields required");
      return;
    }

    const payload = {
      amount: Number(amount),
      worker_id: parseInt(workerId),
      project_id: parseInt(projectId),
    };

    setSaving(true);

    if (editingId) {
      const { error } = await supabase
        .from("payments")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast.error(error.message);
        setSaving(false);
        return;
      }

      toast.success("Payment updated");
    } else {
      const { error } = await supabase
        .from("payments")
        .insert([payload]);

      if (error) {
        toast.error(error.message);
        setSaving(false);
        return;
      }

      toast.success("Payment added");
    }

    resetForm();
    fetchAll();
    setSaving(false);
  }

  // ✏️ EDIT
  function handleEdit(p: any) {
    setAmount(p.amount.toString());
    setWorkerId(p.worker_id ? p.worker_id.toString() : "");
    setProjectId(p.project_id ? p.project_id.toString() : "");
    setEditingId(p.id);
  }

  // ❌ DELETE
  async function handleDelete(id: number) {
    if (!confirm("Delete this payment?")) return;

    const { error } = await supabase
      .from("payments")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Delete failed");
      return;
    }

    toast.success("Payment deleted");
    fetchAll();
  }

  function resetForm() {
    setAmount("");
    setWorkerId("");
    setProjectId("");
    setEditingId(null);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">💰 Payments</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* TOTAL */}
      <div className="bg-green-500 text-white p-4 rounded-xl mb-6 max-w-sm">
        <p>Total Spent</p>
        <h2 className="text-2xl font-bold">₹{total}</h2>
      </div>

      {/* FORM */}
      <div className="bg-white p-5 rounded-2xl shadow mb-6 max-w-xl">
        <h2 className="mb-4 font-semibold">
          {editingId ? "Edit Payment" : "Add Payment"}
        </h2>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <select
          value={workerId}
          onChange={(e) => setWorkerId(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        >
          <option value="">Select Worker</option>
          {workers.map((w: any) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>

        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        >
          <option value="">Select Project</option>
          {projects.map((p: any) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-blue-600 text-white py-2 rounded"
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update"
              : "Add Payment"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div>
        <h2 className="text-xl font-semibold mb-4">📋 Payments List</h2>

        {loading ? (
          <p>Loading...</p>
        ) : payments.length === 0 ? (
          <p>No payments found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {payments.map((p: any) => (
              <div key={p.id} className="bg-white p-4 rounded-xl shadow">

                <h3 className="font-bold text-lg">₹{p.amount}</h3>

                {/* ✅ NOW FIXED */}
                <p className="text-gray-600">
                  👷 {p.workers?.name || "No worker"}
                </p>

                <p className="text-gray-500 text-sm">
                  📁 {p.projects?.name || "No project"}
                </p>

                <div className="flex gap-2 mt-3">
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
                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}