"use client";
import Link from "next/link";

export default function Dashboard() {
  const logout = () => {
    document.cookie = "auth=; Max-Age=0; path=/";
    window.location.href = "/login";
  };

  return (
    <div className="flex">
      <div className="w-64 h-screen bg-white border-r p-4">
        <h2 className="text-lg font-bold">DASHBOARD</h2>

        <div className="mt-6 space-y-3">
          <Link
            href="/dashboard/technician-report"
            className="block p-2 hover:bg-gray-200 rounded"
          >
            Technican Report
          </Link>
          <p className="p-2 hover:bg-gray-200 rounded"></p>
          <p className="p-2 hover:bg-gray-200 rounded"></p>
        </div>

        <button
          onClick={logout}
          className="mt-10 w-full bg-red-100 text-red-600 p-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        welcome to sultan tracker
      </div>
    </div>
  );
}
