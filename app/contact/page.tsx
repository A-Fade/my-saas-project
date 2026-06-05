"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Mail,
  Phone,
  Send,
  Clock,
  MessageSquare,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issueType, setIssueType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

    setSubmitted(true);

    setName("");
    setEmail("");
    setIssueType("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <span className="px-4 py-2 rounded-full border bg-white text-sm font-medium">
            BuilderPro Support Center
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6">
            Contact Support
          </h1>

          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Need help with projects, workers, payments or your account?
            Our support team is ready to assist you.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white border rounded-3xl p-6">
            <Clock className="mb-4" size={28} />
            <h3 className="text-3xl font-bold">&lt; 2 Hours</h3>
            <p className="text-gray-500 mt-2">
              Average Response Time
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <MessageSquare className="mb-4" size={28} />
            <h3 className="text-3xl font-bold">24/7</h3>
            <p className="text-gray-500 mt-2">
              Ticket Tracking
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <CheckCircle className="mb-4" size={28} />
            <h3 className="text-3xl font-bold">98%</h3>
            <p className="text-gray-500 mt-2">
              Customer Satisfaction
            </p>
          </div>

        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Form */}
          <div className="lg:col-span-2 bg-white border rounded-3xl p-8">

            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} />
                </div>

                <h2 className="text-3xl font-bold mb-3">
                  Message Sent Successfully
                </h2>

                <p className="text-gray-500 max-w-md mx-auto">
                  Thank you for contacting BuilderPro support.
                  Our team will get back to you shortly.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-3 bg-black text-white rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-2">
                  Send Us a Message
                </h2>

                <p className="text-gray-500 mb-8">
                  Fill out the form below and our support team
                  will contact you.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >                  <div>
                    <label className="block mb-2 font-medium">
                      Full Name
                    </label>

                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Enter your full name"
                      className="w-full h-14 border rounded-2xl px-4 outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Email Address
                    </label>

                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter your email"
                      className="w-full h-14 border rounded-2xl px-4 outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Issue Type
                    </label>

                    <select
                      required
                      value={issueType}
                      onChange={(e) =>
                        setIssueType(e.target.value)
                      }
                      className="w-full h-14 border rounded-2xl px-4 outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">
                        Select Issue Type
                      </option>

                      <option value="Project Issue">
                        Project Issue
                      </option>

                      <option value="Worker Management Issue">
                        Worker Management Issue
                      </option>

                      <option value="Payment Issue">
                        Payment Issue
                      </option>

                      <option value="Account Issue">
                        Account Issue
                      </option>

                      <option value="Technical Support">
                        Technical Support
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">
                      Message
                    </label>

                    <textarea
                      rows={6}
                      required
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value)
                      }
                      placeholder="Describe your issue in detail..."
                      className="w-full border rounded-2xl p-4 resize-none outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-black text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-800 transition disabled:opacity-50"
                  >
                    <Send size={18} />
                    {loading
                      ? "Sending..."
                      : "Send Message"}
                  </button>

                </form>
              </>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            <div className="bg-white border rounded-3xl p-6">
              <h3 className="text-2xl font-bold mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="font-semibold">
                      Email Support
                    </p>

                    <p className="text-gray-500">
                      support@builderpro.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                    <Phone size={20} />
                  </div>

                  <div>
                    <p className="font-semibold">
                      Phone Support
                    </p>

                    <p className="text-gray-500">
                      +91 9876543210
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold mb-2">
                    Business Hours
                  </p>

                  <p className="text-gray-500">
                    Monday - Saturday
                  </p>

                  <p className="text-gray-500">
                    9:00 AM - 6:00 PM
                  </p>
                </div>

              </div>
            </div>

            <div className="bg-white border rounded-3xl p-6">
              <h3 className="text-2xl font-bold mb-3">
                Need Quick Answers?
              </h3>

              <p className="text-gray-500 mb-5">
                Browse our FAQ section for instant help.
              </p>

              <Link
                href="/faq"
                className="inline-block border px-5 py-3 rounded-xl hover:bg-gray-100"
              >
                View FAQs
              </Link>
            </div>

          </div>

        </div>

        {/* Back */}
        <div className="mt-10">
          <Link
            href="/support"
            className="inline-flex items-center gap-2 font-medium hover:text-gray-600"
          >
            <ArrowLeft size={16} />
            Back to Support
          </Link>
        </div>

      </div>
    </div>
  );
}