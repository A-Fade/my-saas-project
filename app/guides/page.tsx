"use client";

import Link from "next/link";
import {
  BookOpen,
  FolderPlus,
  Users,
  CreditCard,
  Settings,
  ArrowRight,
  Search,
  Star,
} from "lucide-react";

export default function GuidesPage() {
  const guides = [
    {
      title: "Getting Started with BuilderPro",
      description:
        "Learn how to set up your BuilderPro account and dashboard.",
      icon: <BookOpen size={24} />,
      category: "Getting Started",
      readTime: "5 min read",
    },
    {
      title: "Creating Your First Project",
      description:
        "Step-by-step guide to creating and managing projects.",
      icon: <FolderPlus size={24} />,
      category: "Projects",
      readTime: "7 min read",
    },
    {
      title: "Managing Workers",
      description:
        "Add, assign and manage workers efficiently.",
      icon: <Users size={24} />,
      category: "Workers",
      readTime: "6 min read",
    },
    {
      title: "Managing Payments",
      description:
        "Track invoices and payment records easily.",
      icon: <CreditCard size={24} />,
      category: "Payments",
      readTime: "8 min read",
    },
    {
      title: "Account Settings",
      description:
        "Update profile, password and preferences.",
      icon: <Settings size={24} />,
      category: "Account",
      readTime: "4 min read",
    },
    {
      title: "Project Reports",
      description:
        "Generate reports and monitor project progress.",
      icon: <BookOpen size={24} />,
      category: "Reports",
      readTime: "10 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}
        <div className="text-center mb-12">
          <span className="px-4 py-2 border rounded-full bg-white text-sm font-medium">
            BuilderPro Knowledge Base
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6">
            Guides & Tutorials
          </h1>

          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Learn how to use BuilderPro efficiently with
            step-by-step tutorials and guides.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border rounded-3xl p-6">
            <h3 className="text-4xl font-bold">50+</h3>
            <p className="text-gray-500 mt-2">
              Detailed Guides
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <h3 className="text-4xl font-bold">20+</h3>
            <p className="text-gray-500 mt-2">
              Video Tutorials
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <h3 className="text-4xl font-bold">24/7</h3>
            <p className="text-gray-500 mt-2">
              Learning Access
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-10">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search guides..."
            className="w-full h-14 bg-white border rounded-2xl pl-14 pr-4 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* Popular */}
        <div className="flex items-center gap-2 mb-6">
          <Star size={20} />
          <h2 className="text-3xl font-bold">
            Popular Guides
          </h2>
        </div>

        {/* Guide Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {guides.map((guide, index) => (
            <div
              key={index}
              className="bg-white border rounded-3xl p-6 hover:shadow-xl transition duration-300"
            >
              <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-5">
                {guide.icon}
              </div>

              <div className="flex justify-between items-center mb-3">
                <span className="text-xs border px-3 py-1 rounded-full">
                  {guide.category}
                </span>

                <span className="text-xs text-gray-500">
                  {guide.readTime}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3">
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

        {/* CTA */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">

          <div className="bg-white border rounded-3xl p-8">
            <h3 className="text-3xl font-bold mb-3">
              Need Help?
            </h3>

            <p className="text-gray-500 mb-5">
              Can't find what you're looking for?
            </p>

            <Link
              href="/contact"
              className="inline-block bg-black text-white px-6 py-3 rounded-xl"
            >
              Contact Support
            </Link>
          </div>

          <div className="bg-white border rounded-3xl p-8">
            <h3 className="text-3xl font-bold mb-3">
              Browse FAQs
            </h3>

            <p className="text-gray-500 mb-5">
              Quick answers to common questions.
            </p>

            <Link
              href="/faq"
              className="inline-block border px-6 py-3 rounded-xl"
            >
              View FAQs
            </Link>
          </div>

        </div>

        {/* Back */}
        <div className="mt-10">
          <Link
            href="/support"
            className="font-medium hover:text-gray-600"
          >
            ← Back to Support
          </Link>
        </div>

      </div>
    </div>
  );
}