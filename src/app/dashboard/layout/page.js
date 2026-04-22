"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  const logout = () => {
    document.cookie = "auth=; Max-Age=0; path=/";
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white border-b w-full fixed top-0 z-50">
        <h2 className="font-bold">⚡ Sultan</h2>
        <button onClick={() => setOpen(!open)}>☰</button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          bg-white border-r p-4 w-64 fixed md:static h-full z-40
          transition-all duration-300
          ${open ? "left-0" : "-left-64"}
          md:left-0
        `}
      >
        <h2 className="text-lg font-bold mb-4 hidden md:block">
          ⚡ Sultan Admin
        </h2>

        <div className="space-y-2 mt-10 md:mt-0">
          <Link
            href="/dashboard/alerts"
            className="block p-2 hover:bg-gray-200 rounded"
          >
            Alerts
          </Link>

          <Link
            href="/dashboard/commands"
            className="block p-2 hover:bg-gray-200 rounded"
          >
            Commands
          </Link>

          <Link
            href="/dashboard/retail"
            className="block p-2 hover:bg-gray-200 rounded"
          >
            Retail Collections
          </Link>
        </div>

        <button
          onClick={logout}
          className="mt-10 w-full bg-red-100 text-red-600 p-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-6 bg-gray-100 w-full mt-14 md:mt-0">
        {children}
      </div>
    </div>
  );
}
