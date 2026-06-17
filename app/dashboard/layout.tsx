import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900 overflow-hidden w-full">
      
      {/* SIDEBAR - Desktop Only with subtle border */}
      <div className="w-64 hidden md:block border-r border-slate-200 bg-white shadow-sm h-full shrink-0">
        <Sidebar />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden w-full">
        {/* Mobile sizing wrapper (Controlled screen view padding scaling) */}
        <main className="flex-1 overflow-y-auto w-full">
          {/* Mobile par flat p-3 padding lock ki hai aur container screen se bahar nahi jayega */}
          <div className="p-3 sm:p-6 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full box-border">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
