"use client";

import Link from "next/link";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function TicketsPage() {
  const tickets = [
    {
      id: "#BP-1001",
      subject: "Payment Issue",
      status: "Open",
      date: "2026-06-03",
    },
    {
      id: "#BP-1002",
      subject: "Worker Management Problem",
      status: "In Progress",
      date: "2026-06-02",
    },
    {
      id: "#BP-1003",
      subject: "Project Creation Error",
      status: "Resolved",
      date: "2026-06-01",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Support Tickets
          </h1>

          <p className="text-gray-500 mt-3">
            Track all your support requests.
          </p>
        </div>

        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h3 className="font-bold text-lg">
                  {ticket.subject}
                </h3>

                <p className="text-gray-500">
                  Ticket ID: {ticket.id}
                </p>

                <p className="text-gray-500">
                  Created: {ticket.date}
                </p>
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
          ))}
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