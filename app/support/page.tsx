"use client";

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
  const faqs = [
    "How do I create a new project?",
    "How can I add a new worker?",
    "How do I manage payments?",
    "How can I update my profile?",
    "How do I reset my password?",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-black">
            Support
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            We're here to help. Find answers or contact us.
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
            placeholder="Search for help articles..."
            className="w-full bg-white border border-gray-200 rounded-xl h-14 pl-14 pr-4 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Quick Help */}
        <h2 className="text-3xl font-bold mb-6">
          Quick Help
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mb-14">
          <Card
            icon={<MessageCircle />}
            title="FAQ"
            text="Find quick answers to common questions."
            button="View FAQs"
          />

          <Card
            icon={<BookOpen />}
            title="Guides"
            text="Step-by-step guides to help you get started."
            button="View Guides"
          />

          <Card
            icon={<Ticket />}
            title="Tickets"
            text="Track your support tickets and responses."
            button="View Tickets"
          />

          <Card
            icon={<Phone />}
            title="Contact Us"
            text="Still need help? Reach out to our team."
            button="Contact Now"
          />
        </div>

        {/* FAQ + Contact */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">

          {/* FAQ */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">

            <h3 className="text-3xl font-bold mb-6">
              Popular Topics
            </h3>

            <div className="space-y-2">
              {faqs.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between border-b py-5 hover:bg-gray-50 px-2 rounded-lg transition"
                >
                  <span>{item}</span>

                  <ChevronRight
                    size={18}
                    className="text-gray-500"
                  />
                </button>
              ))}
            </div>

            <button className="mt-6 font-semibold flex items-center gap-2 hover:text-gray-600">
              View all articles
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">

            <h3 className="text-3xl font-bold">
              Contact Support
            </h3>

            <p className="text-gray-500 mt-2 mb-5">
              Send us a message and we'll get back to you soon.
            </p>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg h-12 px-4"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg h-12 px-4"
              />

              <select className="w-full border rounded-lg h-12 px-4">
                <option>Select Issue Type</option>
                <option>Project Issue</option>
                <option>Worker Issue</option>
                <option>Payment Issue</option>
                <option>Account Issue</option>
              </select>

              <textarea
                rows={5}
                placeholder="Describe your issue..."
                className="w-full border rounded-lg p-4 resize-none"
              />

              <button className="w-full h-12 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2">
                <Send size={16} />
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">

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
                  We are available during business hours.
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
                Email Us
              </h4>

              <p className="text-gray-500">
                support@builderpro.com
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 mt-12">
          © 2026 BuilderPro. All rights reserved.
        </div>
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
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">

      <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white mb-5">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-500 mb-6">
        {text}
      </p>

      <button className="font-semibold flex items-center gap-2 hover:text-gray-600">
        {button}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}