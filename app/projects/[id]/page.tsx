"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ProjectDetail() {
  const { id } = useParams();

  const [project, setProject] = useState<any>(null);
  const [budget, setBudget] = useState(0);
  const [spends, setSpends] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const [editingSpendId, setEditingSpendId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: p } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    setProject(p);

    const { data: d } = await supabase
      .from("project_details")
      .select("*")
      .eq("project_id", id)
      .single();

    if (d) setBudget(d.budget || 0);

    const { data: s } = await supabase
      .from("spends")
      .select("*")
      .eq("project_id", id);

    setSpends(s || []);

    const { data: w } = await supabase
      .from("workers")
      .select("*")
      .eq("project_id", id);

    setWorkers(w || []);
  }

  // 💰 SAVE BUDGET
  async function saveBudget() {
    const { error } = await supabase
      .from("project_details")
      .upsert({
        project_id: id,
        budget,
      });

    if (error) toast.error(error.message);
    else toast.success("Budget saved");
  }

  // ➕ ADD / UPDATE SPEND
  async function handleSpend() {
    if (!title || !amount) return;

    if (editingSpendId) {
      const { error } = await supabase
        .from("spends")
        .update({ title, amount: Number(amount) })
        .eq("id", editingSpendId);

      if (error) toast.error(error.message);
      else toast.success("Updated");
    } else {
      const { error } = await supabase.from("spends").insert([
        {
          title,
          amount: Number(amount),
          project_id: id,
        },
      ]);

      if (error) toast.error(error.message);
      else toast.success("Added");
    }

    setTitle("");
    setAmount("");
    setEditingSpendId(null);
    fetchData();
  }

  // ❌ DELETE SPEND
  async function deleteSpend(id: number) {
    const { error } = await supabase
      .from("spends")
      .delete()
      .eq("id", id);

    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      fetchData();
    }
  }

  // ❌ DELETE WORKER
  async function deleteWorker(id: number) {
    const { error } = await supabase
      .from("workers")
      .delete()
      .eq("id", id);

    if (error) toast.error(error.message);
    else {
      toast.success("Worker deleted");
      fetchData();
    }
  }

  // 🔥 AUTO CALC
  const totalSpend = spends.reduce((s, x) => s + x.amount, 0);
  const profit = budget - totalSpend;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        📁 {project?.name}
      </h1>

      {/* TOP CARDS */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">

        {/* BUDGET */}
        <div className="bg-white p-4 rounded-xl">
          <p>Budget</p>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="border p-1 mt-2 w-full"
          />
          <button
            onClick={saveBudget}
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>

        {/* SPEND */}
        <div className="bg-white p-4 rounded-xl">
          <p>Spend</p>
          <h2 className="text-xl font-bold mt-2">₹{totalSpend}</h2>
        </div>

        {/* PROFIT */}
        <div className="bg-white p-4 rounded-xl">
          <p>Profit</p>
          <h2 className="text-xl font-bold mt-2 text-green-600">
            ₹{profit}
          </h2>
        </div>

        {/* WORKERS */}
        <div className="bg-white p-4 rounded-xl">
          <p>Workers</p>
          <h2 className="text-xl font-bold mt-2">
            {workers.length}
          </h2>
        </div>

      </div>

      {/* ADD SPEND */}
      <div className="bg-white p-4 rounded-xl mb-6">
        <h2 className="font-bold mb-3">
          {editingSpendId ? "Edit Spend" : "Add Spend"}
        </h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 mr-2"
        />

        <button
          onClick={handleSpend}
          className="bg-green-500 text-white px-3 py-2 rounded"
        >
          {editingSpendId ? "Update" : "Add"}
        </button>
      </div>

      {/* SPENDS LIST */}
      <div className="bg-white p-4 rounded-xl mb-6">
        <h2 className="font-bold mb-3">Spends</h2>

        {spends.map((s: any) => (
          <div key={s.id} className="flex justify-between items-center border-b py-2">

            <div>
              <p>{s.title}</p>
              <p>₹{s.amount}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingSpendId(s.id);
                  setTitle(s.title);
                  setAmount(s.amount);
                }}
                className="text-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => deleteSpend(s.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* WORKERS */}
      <div className="bg-white p-4 rounded-xl">
        <h2 className="font-bold mb-3">Workers</h2>

        {workers.map((w: any) => (
          <div key={w.id} className="flex justify-between items-center border-b py-2">

            <div>
              <p>{w.name}</p>
              <p className="text-sm text-gray-500">{w.phone}</p>
            </div>

            <button
              onClick={() => deleteWorker(w.id)}
              className="text-red-600"
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}