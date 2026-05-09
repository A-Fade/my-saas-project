import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>

    </div>
  );
}