"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Send,
  CheckCircle,
} from "lucide-react";

export default function CreateTicketPage() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const generateTicketNumber = () => {
    return `BP-${Date.now()}`;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      setLoading(false);
      return;
    }

    const ticketNumber = generateTicketNumber();

    const { error } = await supabase
      .from("tickets")
      .insert([
        {
          user_id: user.id,
          ticket_number: ticketNumber,
          subject,
          category,
          priority,
          description,
          status: "Open",
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setSuccess(true);

    setSubject("");
    setCategory("");
    setPriority("Medium");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="mb-8">
          <Link
            href="/tickets"
            className="inline-flex items-center gap-2 font-medium hover:text-gray-600"
          >
            <ArrowLeft size={16} />
            Back to Tickets
          </Link>
        </div>

        <div className="bg-white border rounded-3xl p-8">

          {success ? (
            <div className="text-center py-10">

              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>

              <h2 className="text-3xl font-bold mb-3">
                Ticket Created Successfully
              </h2>

              <p className="text-gray-500 mb-8">
                Your support request has been submitted.
              </p>

              <Link
                href="/tickets"
                className="inline-block bg-black text-white px-6 py-3 rounded-xl"
              >
                View My Tickets
              </Link>

            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-2">
                Create Support Ticket
              </h1>

              <p className="text-gray-500 mb-8">
                Submit a new support request.
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="block mb-2 font-medium">
                    Subject
                  </label>

                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) =>
                      setSubject(e.target.value)
                    }
                    placeholder="Enter ticket subject"
                    className="w-full h-14 border rounded-2xl px-4 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Category
                  </label>

                  <select
                    required
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    className="w-full h-14 border rounded-2xl px-4 outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option value="Payment">
                      Payment Issue
                    </option>

                    <option value="Project">
                      Project Issue
                    </option>

                    <option value="Worker">
                      Worker Issue
                    </option>

                    <option value="Account">
                      Account Issue
                    </option>

                    <option value="Technical">
                      Technical Support
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value)
                    }
                    className="w-full h-14 border rounded-2xl px-4 outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">
                      Medium
                    </option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Description
                  </label>

                  <textarea
                    rows={6}
                    required
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    placeholder="Describe your issue..."
                    className="w-full border rounded-2xl p-4 resize-none outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-black text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-800"
                >
                  <Send size={18} />

                  {loading
                    ? "Creating Ticket..."
                    : "Create Ticket"}
                </button>

              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
}