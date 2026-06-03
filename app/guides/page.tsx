"use client";

import Link from "next/link";
import {
  BookOpen,
  FolderPlus,
  Users,
  CreditCard,
  Settings,
  ArrowRight,
} from "lucide-react";

export default function GuidesPage() {
  const guides = [
    {
      title: "Getting Started with BuilderPro",
      description: "Learn how to set up your account and dashboard.",
      icon: <BookOpen size={24} />,
    },
    {
      title: "Creating Your First Project",
      description: "Step-by-step guide to creating projects.",
      icon: <FolderPlus size={24} />,
    },
    {
      title: "Managing Workers",
      description: "Add, edit and manage workers efficiently.",
      icon: <Users size={24} />,
    },
    {
      title: "Managing Payments",
      description: "Track invoices and payment records.",
      icon: <CreditCard size={24} />,
    },
    {
      title: "Account Settings",
      description: "Update profile, password and preferences.",
      icon: <Settings size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-5xl font-bold text-black">
            Guides
          </h1>

          <p className="text-gray-500 mt-3">
            Learn how to use BuilderPro effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-5">
                {guide.icon}
              </div>

              <h3 className="text-xl font-bold mb-2">
                {guide.title}
              </h3>

              <p className="text-gray-500 mb-6">
                {guide.description}
              </p>

              <button className="flex items-center gap-2 font-medium hover:text-gray-600">
                Read Guide
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/support"
            className="inline-flex items-center gap-2 text-black font-medium"
          >
            ← Back to Support
          </Link>
        </div>

      </div>
    </div>
  );
}