"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Plus,
  ArrowLeft,
} from "lucide-react";

export default function TicketsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (!error && data) {
      setTickets(data);
    }

    setLoading(false);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      ticket.ticket_number
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      ticket.status === filter;

    return matchesSearch && matchesFilter;
  });

  const openCount = tickets.filter(
    (t) => t.status === "Open"
  ).length;

  const progressCount = tickets.filter(
    (t) => t.status === "In Progress"
  ).length;

  const resolvedCount = tickets.filter(
    (t) => t.status === "Resolved"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="text-center mb-12">
          <span className="px-4 py-2 rounded-full border bg-white text-sm font-medium">
            BuilderPro Support Center
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6">
            Support Tickets
          </h1>

          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Track, monitor and manage your support requests.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white border rounded-3xl p-6">
            <h3 className="text-4xl font-bold">
              {openCount}
            </h3>

            <p className="text-gray-500 mt-2">
              Open Tickets
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <h3 className="text-4xl font-bold">
              {progressCount}
            </h3>

            <p className="text-gray-500 mt-2">
              In Progress
            </p>
          </div>

          <div className="bg-white border rounded-3xl p-6">
            <h3 className="text-4xl font-bold">
              {resolvedCount}
            </h3>

            <p className="text-gray-500 mt-2">
              Resolved Tickets
            </p>
          </div>

        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">

          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search ticket..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full h-14 bg-white border rounded-2xl pl-14 pr-4 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <Link
            href="/tickets/create"
            className="h-14 px-6 bg-black text-white rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-800"
          >
            <Plus size={18} />
            Create Ticket
          </Link>

        </div>        <div className="flex flex-wrap gap-3 mb-8">
          {["All", "Open", "In Progress", "Resolved"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-5 py-2 rounded-full border transition ${
                  filter === status
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        {loading ? (
          <div className="bg-white border rounded-3xl p-10 text-center">
            Loading tickets...
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="bg-white border rounded-3xl p-10 text-center">
            <h3 className="text-2xl font-bold mb-2">
              No Tickets Found
            </h3>

            <p className="text-gray-500">
              You haven't created any support tickets yet.
            </p>

            <Link
              href="/tickets/create"
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-xl"
            >
              Create Your First Ticket
            </Link>
          </div>
        ) : (
          <div className="space-y-5">

            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white border rounded-3xl p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                  <div>
                    <h3 className="text-xl font-bold">
                      {ticket.subject}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Ticket ID: {ticket.ticket_number}
                    </p>

                    <p className="text-gray-500">
                      Created:{" "}
                      {new Date(
                        ticket.created_at
                      ).toLocaleDateString()}
                    </p>

                    {ticket.category && (
                      <p className="text-gray-500">
                        Category: {ticket.category}
                      </p>
                    )}

                    {ticket.priority && (
                      <p className="text-gray-500">
                        Priority: {ticket.priority}
                      </p>
                    )}
                  </div>

                  <div>

                    {ticket.status === "Open" && (
                      <span className="flex items-center gap-2 px-4 py-2 rounded-full border">
                        <AlertCircle size={16} />
                        Open
                      </span>
                    )}

                    {ticket.status === "In Progress" && (
                      <span className="flex items-center gap-2 px-4 py-2 rounded-full border">
                        <Clock size={16} />
                        In Progress
                      </span>
                    )}

                    {ticket.status === "Resolved" && (
                      <span className="flex items-center gap-2 px-4 py-2 rounded-full border">
                        <CheckCircle size={16} />
                        Resolved
                      </span>
                    )}

                  </div>

                </div>

                {ticket.description && (
                  <div className="mt-5 pt-5 border-t">
                    <p className="text-gray-600">
                      {ticket.description}
                    </p>
                  </div>
                )}

              </div>
            ))}

          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mt-12">

          <div className="bg-white border rounded-3xl p-8">
            <h3 className="text-3xl font-bold mb-3">
              Need More Help?
            </h3>

            <p className="text-gray-500 mb-6">
              Contact our support team directly.
            </p>

            <Link
              href="/contact"
              className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
            >
              Contact Support
            </Link>
          </div>

          <div className="bg-white border rounded-3xl p-8">
            <h3 className="text-3xl font-bold mb-3">
              Browse FAQs
            </h3>

            <p className="text-gray-500 mb-6">
              Find answers to common BuilderPro questions.
            </p>

            <Link
              href="/faq"
              className="inline-block border px-6 py-3 rounded-xl hover:bg-gray-100"
            >
              View FAQs
            </Link>
          </div>

        </div>

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