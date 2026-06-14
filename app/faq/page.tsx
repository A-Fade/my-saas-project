"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FolderKanban,
  Users,
  CreditCard,
  Settings,
} from "lucide-react";

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const faqs = [
    {
      category: "Projects",
      question: "How do I create a new project?",
      answer:
        "Go to Dashboard → Projects → Create Project. Fill all required project details and click Save.",
    },
    {
      category: "Projects",
      question: "How do I edit an existing project?",
      answer:
        "Open the project from the Projects section and click Edit to update project information.",
    },
    {
      category: "Workers",
      question: "How can I add a new worker?",
      answer:
        "Navigate to Workers page, click Add Worker, fill worker details and save.",
    },
    {
      category: "Workers",
      question: "Can I assign workers to projects?",
      answer:
        "Yes. Open a project and use the Assign Worker option to link workers.",
    },
    {
      category: "Payments",
      question: "How do I manage payments?",
      answer:
        "Go to Payments section where you can create, track and manage transactions.",
    },
    {
      category: "Payments",
      question: "How can I view payment history?",
      answer:
        "Open Payments and use the History tab to view all completed transactions.",
    },
    {
      category: "Account",
      question: "How can I update my profile?",
      answer:
        "Go to Settings → Profile and update your information.",
    },
    {
      category: "Account",
      question: "How do I reset my password?",
      answer:
        "Go to Settings → Security → Reset Password.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { name: "All", icon: <HelpCircle size={16} /> },
    { name: "Projects", icon: <FolderKanban size={16} /> },
    { name: "Workers", icon: <Users size={16} /> },
    { name: "Payments", icon: <CreditCard size={16} /> },
    { name: "Account", icon: <Settings size={16} /> },
  ];
return (
  <>
    <Navbar />

    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}
        <div className="text-center mb-12">
          <span className="px-4 py-2 rounded-full border bg-white text-sm font-medium">
            BuilderPro Help Center
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6 text-black">
            Frequently Asked Questions
          </h1>

          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Find answers to common questions about projects,
            workers, payments and account management.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border rounded-3xl p-6">
            <h3 className="text-4xl font-bold">120+</h3>
            <p className="text-gray-500 mt-2">
              Help Articles
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <h3 className="text-4xl font-bold">24/7</h3>
            <p className="text-gray-500 mt-2">
              Access To Resources
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <h3 className="text-4xl font-bold">&lt; 2h</h3>
            <p className="text-gray-500 mt-2">
              Average Response Time
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-white border rounded-2xl h-14 pl-14 pr-4 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() =>
                setActiveCategory(category.name)
              }
              className={`flex items-center gap-2 px-5 py-3 rounded-full border transition ${
                activeCategory === category.name
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border rounded-3xl overflow-hidden hover:shadow-lg transition"
            >
              <button
                onClick={() =>
                  setOpen(
                    open === index ? null : index
                  )
                }
                className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-lg"
              >
                <span>{faq.question}</span>

                {open === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {open === index && (
                <div className="border-t bg-gray-50 px-6 py-5 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <div className="bg-white border rounded-3xl p-10 text-center mt-6">
            <h3 className="text-2xl font-bold">
              No FAQs Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try a different keyword.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">

          <div className="bg-white border rounded-3xl p-8">
            <h3 className="text-3xl font-bold mb-3">
              Need More Help?
            </h3>

            <p className="text-gray-500 mb-6">
              Contact our support team for
              personalized assistance.
            </p>

            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
            >
              Contact Support
            </a>
          </div>

          <div className="bg-white border rounded-3xl p-8">
            <h3 className="text-3xl font-bold mb-3">
              Track Your Tickets
            </h3>

            <p className="text-gray-500 mb-6">
              View support requests and track
              their status.
            </p>

            <a
              href="/tickets"
              className="inline-flex items-center justify-center border px-6 py-3 rounded-xl hover:bg-gray-100"
            >
              View Tickets
            </a>
          </div>

        </div>
           </div>
    </div>
  </>
  );
}