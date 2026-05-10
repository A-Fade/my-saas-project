import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900">
      {/* SIDEBAR - Desktop Only with subtle border */}
      <div className="w-64 hidden md:block border-r border-slate-200 bg-white shadow-sm">
        <Sidebar />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto relative outline-none focus:outline-none">
          {/* Spacing for content */}
          <div className="p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
