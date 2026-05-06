"use client";

export default function Topbar() {
  return (
    <div className="w-full bg-white px-6 py-4 shadow flex justify-between items-center">

      {/* LEFT */}
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-medium">Builder</p>
          <p className="text-sm text-gray-500">builder@example.com</p>
        </div>

        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
      </div>

    </div>
  );
}