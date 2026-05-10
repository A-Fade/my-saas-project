"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import toast from "react-hot-toast";

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (params.id) fetchProjectDetails();
  }, [params.id]);

  async function fetchProjectDetails() {
    setLoading(true);
    const { data, error } = await supabase.from("projects").select("*").eq("id", params.id).single();
    if (error) {
      toast.error("Project not found");
      router.push("/projects");
    } else {
      setProject(data);
    }
    setLoading(false);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Loading Project Details...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="hidden md:block w-64 fixed h-full z-40"><Sidebar /></div>
      <div className="flex-1 md:ml-64">
        <Topbar />
        <div className="max-w-7xl mx-auto p-6 md:p-10">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">🏗️ {project?.name} Overview</h1>
            <p className="text-slate-500 mt-2 font-medium">📍 {project?.location} | Status: <span className="capitalize text-blue-600 font-bold">{project?.status}</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Financial Summary Cards */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border-b-4 border-green-500 hover:shadow-xl transition-all">
              <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-2">Estimated Budget</p>
              <h2 className="text-4xl font-black text-slate-800">₹ {project?.budget || 0}</h2>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border-b-4 border-red-500 hover:shadow-xl transition-all">
              <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-2">Total Expenditure</p>
              <h2 className="text-4xl font-black text-slate-800">₹ {project?.spent || 0}</h2>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border-b-4 border-blue-500 hover:shadow-xl transition-all">
              <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-2">Project Profit</p>
              <h2 className="text-4xl font-black text-blue-700">₹ {(project?.budget || 0) - (project?.spent || 0)}</h2>
            </div>
          </div>

          {/* Workers & Extra Details Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Project Workers</h3>
            <p className="text-slate-500 font-medium italic">Project workers and attendance data will load here...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
