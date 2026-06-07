"use client";

import { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  FolderOpen,
  Users,
  CreditCard,
  BarChart3,
  Crown,
  Settings,
  Check,
  X,
} from "lucide-react";

export default function SubscriptionPage() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden"
            >
              <Menu className="w-7 h-7 text-slate-700" />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                BuilderPro
              </h1>
              <p className="text-slate-500 text-sm">
                Welcome back 👋
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex bg-slate-100 rounded-2xl px-5 py-3">
              <div>
                <p className="font-semibold text-slate-800">
                  anza3131r@gmail.com
                </p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
            </div>

            <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex w-72 min-h-screen bg-white border-r flex-col justify-between">
          <div className="p-6">
            <nav className="space-y-2">

              <SidebarItem
                icon={<LayoutDashboard size={20} />}
                title="Dashboard"
              />

              <SidebarItem
                icon={<FolderOpen size={20} />}
                title="Projects"
              />

              <SidebarItem
                icon={<Users size={20} />}
                title="Workers"
              />

              <SidebarItem
                icon={<Users size={20} />}
                title="Clients"
              />

              <SidebarItem
                icon={<CreditCard size={20} />}
                title="Payments"
              />

              <SidebarItem
                icon={<BarChart3 size={20} />}
                title="Reports"
              />

              <SidebarItem
                icon={<Crown size={20} />}
                title="Subscription"
                active
              />

              <SidebarItem
                icon={<Settings size={20} />}
                title="Settings"
              />
            </nav>
          </div>

          <div className="p-6">
            <div className="border rounded-2xl p-5 bg-slate-50">
              <p className="text-sm text-slate-500">
                Current Plan
              </p>

              <h3 className="text-2xl font-bold text-blue-600 mt-2">
                Free
              </h3>

              <button className="w-full mt-4 border border-blue-500 text-blue-600 rounded-xl py-3 font-medium">
                Upgrade Plan
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {mobileMenu && (
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden">
            <div className="w-72 h-full bg-white p-6">
              <nav className="space-y-2">

                <SidebarItem
                  icon={<LayoutDashboard size={20} />}
                  title="Dashboard"
                />

                <SidebarItem
                  icon={<FolderOpen size={20} />}
                  title="Projects"
                />

                <SidebarItem
                  icon={<Users size={20} />}
                  title="Workers"
                />

                <SidebarItem
                  icon={<Users size={20} />}
                  title="Clients"
                />

                <SidebarItem
                  icon={<CreditCard size={20} />}
                  title="Payments"
                />

                <SidebarItem
                  icon={<BarChart3 size={20} />}
                  title="Reports"
                />

                <SidebarItem
                  icon={<Crown size={20} />}
                  title="Subscription"
                  active
                />

                <SidebarItem
                  icon={<Settings size={20} />}
                  title="Settings"
                />
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-10">
          <div className="bg-white rounded-3xl border p-6 lg:p-10">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-900">
                  Subscription Plans
                </h1>

                <p className="text-slate-500 mt-2">
                  Choose the perfect plan for your construction business
                </p>
              </div>

              <div className="border rounded-xl px-4 py-3 text-sm text-slate-600">
                All plans include 14-day money back guarantee
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="flex gap-3 mt-8">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold">
                Monthly
              </button>

              <button className="border px-8 py-3 rounded-xl font-semibold">
                Yearly (Save 20%)
              </button>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">

              {/* FREE */}
              <div className="border rounded-3xl p-8">
                <h2 className="text-3xl font-bold">Free</h2>

                <p className="text-slate-500 mt-2">
                  For getting started
                </p>

                <h3 className="text-5xl font-bold mt-6">
                  ₹0
                  <span className="text-lg text-slate-500">
                    /month
                  </span>
                </h3>

                <button className="w-full mt-8 border rounded-xl py-3 font-semibold">
                  Current Plan
                </button>

                <div className="space-y-4 mt-8">

                  <Feature text="1 Project" />
                  <Feature text="1 Worker" />
                  <Feature text="1 Client" />
                  <Feature text="Basic Templates" />
                  <Feature text="Community Support" />

                  <FeatureOff text="Custom Domain" />
                  <FeatureOff text="Reports" />
                  <FeatureOff text="Priority Support" />

                </div>
              </div>

                            {/* PRO */}
              <div className="border-2 border-blue-500 rounded-3xl overflow-hidden">
                <div className="bg-blue-600 text-white text-center py-3 font-semibold">
                  Most Popular
                </div>

                <div className="p-8">
                  <h2 className="text-3xl font-bold">Pro</h2>

                  <p className="text-slate-500 mt-2">
                    For growing businesses
                  </p>

                  <h3 className="text-5xl font-bold mt-6">
                    ₹599
                    <span className="text-lg text-slate-500">
                      /month
                    </span>
                  </h3>

                  <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold">
                    Upgrade to Pro
                  </button>

                  <div className="space-y-4 mt-8">
                    <Feature text="Unlimited Projects" />
                    <Feature text="Unlimited Workers" />
                    <Feature text="Unlimited Clients" />
                    <Feature text="Premium Templates" />
                    <Feature text="Custom Domain" />
                    <Feature text="Payments Management" />
                    <Feature text="Reports & Analytics" />
                    <Feature text="Priority Support" />
                  </div>
                </div>
              </div>

              {/* BUSINESS */}
              <div className="border rounded-3xl p-8">
                <h2 className="text-3xl font-bold">
                  Business
                </h2>

                <p className="text-slate-500 mt-2">
                  For construction companies
                </p>

                <h3 className="text-5xl font-bold mt-6">
                  ₹1499
                  <span className="text-lg text-slate-500">
                    /month
                  </span>
                </h3>

                <button className="w-full mt-8 border border-blue-600 text-blue-600 rounded-xl py-3 font-semibold">
                  Upgrade to Business
                </button>

                <div className="space-y-4 mt-8">
                  <Feature text="Everything in Pro" />
                  <Feature text="Unlimited Clients" />
                  <Feature text="Advanced Reports" />
                  <Feature text="Team Permissions" />
                  <Feature text="Multi Company" />
                  <Feature text="White Label" />
                  <Feature text="Dedicated Manager" />
                  <Feature text="24/7 Priority Support" />
                </div>
              </div>
            </div>

            {/* Compare Plans */}
            <div className="mt-12 border rounded-3xl overflow-hidden">
              <div className="p-6 border-b bg-slate-50">
                <h2 className="text-xl font-bold">
                  Compare Plans
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Feature</th>
                      <th className="p-4">Free</th>
                      <th className="p-4">Pro</th>
                      <th className="p-4">Business</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">Projects</td>
                      <td className="text-center">1</td>
                      <td className="text-center">Unlimited</td>
                      <td className="text-center">Unlimited</td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-4">Workers</td>
                      <td className="text-center">1</td>
                      <td className="text-center">Unlimited</td>
                      <td className="text-center">Unlimited</td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-4">Clients</td>
                      <td className="text-center">1</td>
                      <td className="text-center">Unlimited</td>
                      <td className="text-center">Unlimited</td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-4">Payment Management</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-4">Reports</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                    </tr>

                    <tr className="border-b">
                      <td className="p-4">Custom Domain</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                    </tr>

                    <tr>
                      <td className="p-4">Priority Support</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="mt-10 border rounded-3xl p-8 bg-gradient-to-r from-blue-50 to-slate-50">
              <h2 className="text-2xl font-bold">
                Manage Your Entire Construction Business
              </h2>

              <p className="text-slate-600 mt-2">
                Projects, Workers, Clients, Payments and Reports
                all in one place.
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

/* Components */

function SidebarItem({
  icon,
  title,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
        active
          ? "bg-blue-50 text-blue-600 font-semibold"
          : "hover:bg-slate-100 text-slate-700"
      }`}
    >
      {icon}
      {title}
    </button>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <Check className="w-5 h-5 text-green-600" />
      <span>{text}</span>
    </div>
  );
}

function FeatureOff({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <X className="w-5 h-5 text-red-500" />
      <span className="text-slate-500">{text}</span>
    </div>
  );
}