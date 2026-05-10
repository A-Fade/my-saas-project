"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";

export default function Dashboard() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [todaySalary, setTodaySalary] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const today = new Date().toISOString().split('T')[0];

    // 1. Projects Count
    const { count } = await supabase.from("projects").select("*", { count: 'exact', head: true });
    setTotalProjects(count || 0);

    // 2. Today's Salary
    const { data: attendance } = await supabase
      .from("attendance")
      .select(`workers(salary)`)
      .eq("date", today);
    
    const total = attendance?.reduce((acc: number, curr: any) => acc + (curr.workers?.salary || 0), 0);
    setTodaySalary(total || 0);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar - Desktop Only */}
      <div className="hidden md:block w-64 fixed h-full">
        <Sidebar />
      </div>

      <div className="flex-1 md:ml-64">
        <Topbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Projects Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-bold uppercase">Total Projects</p>
              <h2 className="text-3xl font-bold text-blue-600 mt-2">{totalProjects}</h2>
            </div>

            {/* Today's Salary Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-bold uppercase">Today's Salary</p>
              <h2 className="text-3xl font-bold text-amber-600 mt-2">₹{todaySalary}</h2>
              <p className="text-xs text-gray-400 mt-2 italic">*Reset automatic at 12:00 AM</p>
            </div>

            {/* Simple Project Status */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-bold uppercase">System Status</p>
              <h2 className="text-xl font-bold text-green-600 mt-2">All Systems Live</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
