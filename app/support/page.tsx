"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  Search,
  MessageCircle,
  BookOpen,
  Ticket,
  Phone,
  ChevronRight,
  Headphones,
  Send,
} from "lucide-react";

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issueType, setIssueType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("support_messages")
      .insert([
        {
          name,
          email,
          issue_type: issueType,
          message,
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setSuccess(true);

    setName("");
    setEmail("");
    setIssueType("");
    setMessage("");
  };

  const faqs = [
    {
      question: "How do I create a new project?",
      answer:
        "Go to Dashboard → Projects → Create Project and fill in your project details.",
    },
    {
      question: "How can I add a new worker?",
      answer:
        "Open the Workers section and click Add Worker to register a new worker.",
    },
    {
      question: "How do I manage payments?",
      answer:
        "Navigate to Payments where you can track invoices, expenses and transactions.",
    },
    {
      question: "How can I update my profile?",
      answer:
        "Go to Settings → Profile and update your information.",
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <span className="px-4 py-2 bg-white border rounded-full text-sm font-medium">
            BuilderPro Help Center
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-5">
            Support Center
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Find answers, browse guides and contact our support team.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search help articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border rounded-2xl h-14 pl-14 pr-4 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Quick Help */}
        <h2 className="text-3xl font-bold mb-6">
          Quick Help
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">

          <Link href="/faq">
            <Card
              icon={<MessageCircle />}
              title="FAQ"
              text="Find answers to common questions."
              button="View FAQs"
            />
          </Link>

          <Link href="/guides">
            <Card
              icon={<BookOpen />}
              title="Guides"
              text="Step-by-step BuilderPro tutorials."
              button="View Guides"
            />
          </Link>

          <Link href="/tickets">
            <Card
              icon={<Ticket />}
              title="Tickets"
              text="Track all support requests."
              button="View Tickets"
            />
          </Link>

          <Link href="/contact">
            <Card
              icon={<Phone />}
              title="Contact Us"
              text="Reach out to our support team."
              button="Contact Now"
            />
          </Link>

        </div>

        {/* FAQ + Contact */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">

          {/* FAQ */}
          <div className="lg:col-span-2 bg-white rounded-3xl border p-6">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold">
                Popular Topics
              </h3>

              <Link
                href="/faq"
                className="font-semibold flex items-center gap-2 hover:text-gray-600"
              >
                View all articles
                <ChevronRight size={18} />
              </Link>
            </div>

            <div className="space-y-3">

              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(
                        openFaq === index ? null : index
                      )
                    }
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium">
                      {faq.question}
                    </span>

                    <ChevronRight
                      size={18}
                      className={`transition ${
                        openFaq === index
                          ? "rotate-90"
                          : ""
                      }`}
                    />
                  </button>

                  {openFaq === index && (
                    <div className="px-5 pb-5 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-white rounded-3xl border p-6">

            <h3 className="text-3xl font-bold">
              Contact Support
            </h3>

            <p className="text-gray-500 mt-2 mb-6">
              Need personal assistance?
            </p>

            <form
  onSubmit={handleSubmit}
  className="space-y-4"
>

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-xl h-12 px-4"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-xl h-12 px-4"
              />

              <select className="w-full border rounded-xl h-12 px-4">
                <option>Select Issue Type</option>
                <option>Project Issue</option>
                <option>Worker Issue</option>
                <option>Payment Issue</option>
                <option>Account Issue</option>
              </select>

              <textarea
                rows={5}
                placeholder="Describe your issue..."
                className="w-full border rounded-xl p-4 resize-none"
              />

              <Link
                href="/contact"
                className="w-full h-12 bg-black text-white rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800"
              >
                <Send size={16} />
                Contact Support
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom Card */}
        <div className="bg-white rounded-3xl border p-8">

          <div className="grid md:grid-cols-3 gap-8 items-center">

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
                <Headphones
                  className="text-white"
                  size={24}
                />
              </div>

              <div>
                <h4 className="font-bold text-xl">
                  Support Hours
                </h4>

                <p className="text-gray-500">
                  Fast and reliable support.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-bold">
                Monday - Saturday
              </h4>

              <p className="text-gray-500">
                9:00 AM - 6:00 PM
              </p>
            </div>

            <div>
              <h4 className="font-bold">
                Email Support
              </h4>

              <p className="text-gray-500">
                support@builderpro.com
              </p>
            </div>

          </div>
        </div>

        <div className="text-center text-gray-500 mt-10">
          © 2026 BuilderPro. All rights reserved.
        </div>

      </div>
    
  );
}

function Card({
  icon,
  title,
  text,
  button,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  button: string;
}) {
  return (
    <div className="bg-white border rounded-3xl p-6 hover:shadow-xl transition cursor-pointer h-full">

      <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white mb-5">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-500 mb-6">
        {text}
      </p>

      <div className="font-semibold flex items-center gap-2">
        {button}
        <ChevronRight size={16} />
      </div>

    </div>
  );
}