"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I create a new project?",
      answer:
        "Go to Dashboard → Projects → Create Project. Fill the project details and click Save.",
    },
    {
      question: "How can I add a new worker?",
      answer:
        "Open Workers page and click Add Worker. Enter worker information and save.",
    },
    {
      question: "How do I manage payments?",
      answer:
        "Go to Payments section where you can create, track and manage all transactions.",
    },
    {
      question: "How can I update my profile?",
      answer:
        "Open Settings → Profile and update your information.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Go to Settings → Security → Reset Password.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          Frequently Asked Questions
        </h1>

        <p className="text-gray-500 mb-8">
          Find answers to common BuilderPro questions.
        </p>

        <div className="relative mb-8">
          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-12 pr-4 py-3"
          />
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full p-5 flex items-center justify-between font-medium"
              >
                {faq.question}

                {open === index ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {open === index && (
                <div className="px-5 pb-5 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}