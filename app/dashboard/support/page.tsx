"use client";

import { useState } from "react";
import {
  LifeBuoy,
  Search,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function SupportPage() {
  const [tickets] = useState([
    {
      id: "#SUP001",
      subject: "Unable to add worker",
      status: "Open",
      date: "31 May 2026",
    },
    {
      id: "#SUP002",
      subject: "Payment not updated",
      status: "Pending",
      date: "29 May 2026",
    },
    {
      id: "#SUP003",
      subject: "Project report issue",
      status: "Resolved",
      date: "25 May 2026",
    },
  ]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Support Center
        </h1>
        <p className="text-slate-500 mt-2">
          Need help? Create a support ticket and our team will assist you.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-3xl shadow-sm p-6 border">
          <Clock className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="text-slate-500">Open Tickets</h3>
          <p className="text-3xl font-bold">2</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 border">
          <CheckCircle className="w-10 h-10 text-green-500 mb-4" />
          <h3 className="text-slate-500">Resolved</h3>
          <p className="text-3xl font-bold">1</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 border">
          <MessageSquare className="w-10 h-10 text-blue-500 mb-4" />
          <h3 className="text-slate-500">Responses</h3>
          <p className="text-3xl font-bold">8</p>
        </div>
      </div>

      {/* Create Ticket */}
      <div className="bg-white rounded-3xl shadow-sm border p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Plus className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold">
            Create New Ticket
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Ticket Subject"
            className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500">
            <option>Select Category</option>
            <option>Projects</option>
            <option>Workers</option>
            <option>Payments</option>
            <option>Account</option>
          </select>
        </div>

        <textarea
          rows={5}
          placeholder="Describe your issue..."
          className="w-full border rounded-xl p-3 mt-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
          Submit Ticket
        </button>
      </div>

      {/* Ticket List */}
      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            My Support Tickets
          </h2>

          <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              placeholder="Search..."
              className="outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-4">Ticket ID</th>
                <th className="text-left p-4">Subject</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((ticket, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-4 font-semibold">
                    {ticket.id}
                  </td>

                  <td className="p-4">
                    {ticket.subject}
                  </td>

                  <td className="p-4">
                    {ticket.date}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        ticket.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : ticket.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Box */}
      <div className="bg-white rounded-3xl shadow-sm border p-6 mt-8">
        <div className="flex items-center gap-3 mb-4">
          <LifeBuoy className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-semibold">
            Contact Support
          </h2>
        </div>

        <div className="space-y-2 text-slate-600">
          <p>📧 support@builderpro.com</p>
          <p>📞 +91 9876543210</p>
          <p>🕒 Mon - Sat (9 AM - 6 PM)</p>
        </div>
      </div>
    </div>
  );
}