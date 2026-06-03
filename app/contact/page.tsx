"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Supabase integration baad me
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Contact Support
          </h1>

          <p className="text-gray-500 mt-3">
            Need help? Send us a message.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Form */}
          <div className="lg:col-span-2 border rounded-2xl p-6">

            {submitted ? (
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold mb-2">
                  Message Sent ✅
                </h2>

                <p className="text-gray-500">
                  Our support team will contact you soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full border rounded-lg h-12 px-4"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full border rounded-lg h-12 px-4"
                />

                <select
                  required
                  className="w-full border rounded-lg h-12 px-4"
                >
                  <option value="">
                    Select Subject
                  </option>

                  <option>
                    Project Issue
                  </option>

                  <option>
                    Worker Issue
                  </option>

                  <option>
                    Payment Issue
                  </option>

                  <option>
                    Account Issue
                  </option>
                </select>

                <textarea
                  required
                  rows={6}
                  placeholder="Describe your issue..."
                  className="w-full border rounded-lg p-4 resize-none"
                />

                <button
                  type="submit"
                  className="w-full h-12 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="border rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">
              Support Information
            </h2>

            <div className="space-y-5">

              <div className="flex gap-3">
                <Mail />
                <div>
                  <h3 className="font-semibold">
                    Email
                  </h3>

                  <p className="text-gray-500">
                    support@builderpro.com
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone />
                <div>
                  <h3 className="font-semibold">
                    Phone
                  </h3>

                  <p className="text-gray-500">
                    +91 9876543210
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">
                  Business Hours
                </h3>

                <p className="text-gray-500">
                  Monday - Saturday
                </p>

                <p className="text-gray-500">
                  9:00 AM - 6:00 PM
                </p>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/support"
            className="font-medium"
          >
            ← Back to Support
          </Link>
        </div>

      </div>
    </div>
  );
}