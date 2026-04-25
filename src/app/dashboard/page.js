// "use client";
// import Link from "next/link";

// export default function Dashboard() {
//   const logout = () => {
//     document.cookie = "auth=; Max-Age=0; path=/";
//     window.location.href = "/login";
//   };

//   return (
//     <div className="flex">
//       {/* 🔹 Sidebar */}
//       <div className="w-64 h-screen bg-white border-r p-4 flex flex-col justify-between">
//         {/* 🔹 Top Section */}
//         <div>
//           <h2 className="text-lg font-bold">DASHBOARD</h2>

//           <div className="mt-6 space-y-3">
//             <Link
//               href="/dashboard/technician-report"
//               className="block p-2 bg-gray-600 text-white hover:bg-amber-500 rounded"
//             >
//               Technican Report
//             </Link>
//           </div>
//         </div>

//         {/* 🔹 Bottom Section (Logout) */}
//         <button
//           onClick={logout}
//           className="w-full bg-red-300 text-black p-2 rounded hover:bg-red-200"
//         >
//           Logout
//         </button>
//       </div>

//       {/* 🔹 Main Content */}
//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">
//         welcome to sultan tracker
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const logout = () => {
    document.cookie = "auth=; Max-Age=0; path=/";
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 🔹 Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow z-50 
        transform ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition duration-300 flex flex-col justify-between`}
      >
        {/* Top */}
        <div>
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold">Dashboard</h2>
            <button
              className="md:hidden text-xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="p-4 space-y-2">
            <Link
              href="/dashboard/technician-report"
              className="block px-4 py-2 rounded bg-gray-700 text-white hover:bg-amber-500 transition"
            >
              Technician Report
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="p-4">
          <button
            onClick={logout}
            className="w-full bg-red-100 text-red-600 py-2 rounded hover:bg-red-200 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔹 Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔹 Main */}
      <div className="flex-1 flex flex-col">
        {/* 🔹 Topbar */}
        <div className="bg-white shadow px-4 py-3 flex items-center justify-between">
          <button className="md:hidden text-2xl" onClick={() => setOpen(true)}>
            ☰
          </button>

          <h1 className="font-semibold text-lg">Dashboard</h1>
        </div>

        <div className="flex-1 flex items-center justify-center bg-gray-600 text-white text-sm">
          welcome to sultan tracker
        </div>
      </div>
    </div>
  );
}
