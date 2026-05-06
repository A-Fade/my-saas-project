"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import Topbar from "@/app/components/Topbar";
import StatsCard from "@/app/components/StatsCard";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  // 🔐 AUTH CHECK
  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    fetchData();
  }

  // 📊 FETCH DATA
  async function fetchData() {
    const { data: p } = await supabase.from("projects").select("*");
    const { data: w } = await supabase.from("workers").select("*");
    const { data: pay } = await supabase.from("payments").select("*");

    setProjects(p || []);
    setWorkers(w || []);
    setPayments(pay || []);
  }

  // 💰 TOTAL
  const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  // 📈 CHART DATA
  const chartData = payments.slice(-7).map((p, i) => ({
    name: `Day ${i + 1}`,
    amount: p.amount,
  }));

  return (
    <div className="flex-1 bg-gray-100 min-h-screen">

      {/* TOPBAR */}
      <Topbar />

      <div className="p-4 md:p-6 max-w-7xl mx-auto">

        {/* 🔥 STATS CARDS (CLICKABLE) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <StatsCard
            title="Total Projects"
            value={projects.length}
            color="bg-blue-100"
            link="/projects"
          />

          <StatsCard
            title="Total Workers"
            value={workers.length}
            color="bg-green-100"
            link="/workers"
          />

          <StatsCard
            title="Total Payments"
            value={`₹${total}`}
            color="bg-yellow-100"
            link="/payments"
          />

          <StatsCard
            title="Active Projects"
            value={projects.filter(p => p.status === "active").length}
            color="bg-purple-100"
            link="/projects"
          />

        </div>

        {/* 📊 MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 📋 RECENT PROJECTS */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="font-semibold mb-4">Recent Projects</h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-left">
                  <th>Name</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {projects.slice(0, 5).map((p: any) => (
                  <tr key={p.id} className="border-t">
                    <td className="py-2">{p.name}</td>
                    <td>{p.location}</td>
                    <td>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📈 CHART */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h2 className="font-semibold mb-4">Payments Overview</h2>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </div>
  );
}