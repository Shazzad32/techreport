// "use client";
// import { useState, useMemo } from "react";

// const NotPaid = ({ devices, assignIds }) => {
//   const [search, setSearch] = useState("");

//   // 🔹 Filter retail + incomplete
//   const filteredData = useMemo(() => {
//     return devices.filter(
//       (item) => item.send_to === "Retail" && item.is_complete === false
//     );
//   }, [devices]);

//   // 🔹 Make result (group by technician)
//   const result = useMemo(() => {
//     const temp = {};

//     filteredData.forEach((item) => {
//       const name = item.issue_by || "Unknown";
//       const deviceId = String(item.device_id);

//       if (!temp[name]) {
//         temp[name] = { total: 0, due: 0, in_hand: 0 };
//       }

//       temp[name].total++;

//       if (assignIds.has(deviceId)) {
//         temp[name].due++;
//       } else {
//         temp[name].in_hand++;
//       }
//     });

//     return temp;
//   }, [filteredData, assignIds]);

//   // 🔹 Convert to array + search + sort
//   const finalData = useMemo(() => {
//     const lowerSearch = search.toLowerCase();

//     return Object.entries(result)
//       .map(([name, value]) => ({ name, ...value }))
//       .filter((item) => item.name.toLowerCase().includes(lowerSearch))
//       .sort((a, b) => a.name.localeCompare(b.name));
//   }, [result, search]);

//   // 🔹 Stats
//   const totalDevice = filteredData.length;
//   const totalDue = finalData.reduce((a, b) => a + b.due, 0);
//   const totalInHand = finalData.reduce((a, b) => a + b.in_hand, 0);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex gap-4">
//           <div className="bg-white p-4 rounded shadow">
//             <p>Total</p>
//             <p className="font-bold text-lg">{totalDevice}</p>
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <p>Due</p>
//             <p className="font-bold text-red-500">{totalDue}</p>
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <p>In Hand</p>
//             <p className="font-bold text-green-600">{totalInHand}</p>
//           </div>
//         </div>
//         <input
//           type="text"
//           placeholder="Search technician..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-4 py-2 rounded w-64"
//         />
//       </div>

//       {/* 📊 Table */}
//       <div className="bg-white rounded shadow overflow-hidden">
//         <div className="grid grid-cols-4 bg-gray-200 font-semibold">
//           <p className="p-3">Technician</p>
//           <p className="p-3">Total</p>
//           <p className="p-3 text-red-500">Due</p>
//           <p className="p-3 text-green-600">In Hand</p>
//         </div>

//         {finalData.length === 0 ? (
//           <p className="p-6 text-center text-gray-500">No data found</p>
//         ) : (
//           finalData.map((item, i) => (
//             <div key={i} className="grid grid-cols-4 border-t hover:bg-gray-50">
//               <p className="p-3">{item.name}</p>
//               <p className="p-3 font-semibold">{item.total}</p>
//               <p className="p-3 text-red-500">{item.due}</p>
//               <p className="p-3 text-green-600">{item.in_hand}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotPaid;

"use client";
import { useState, useMemo } from "react";

const NotPaid = ({ devices, assignIds }) => {
  const [search, setSearch] = useState("");

  // 🔹 Filter data
  const filteredData = useMemo(() => {
    return devices.filter(
      (item) => item.send_to === "Retail" && item.is_complete === false
    );
  }, [devices]);

  // 🔹 Group by technician
  const result = useMemo(() => {
    const temp = {};

    filteredData.forEach((item) => {
      const name = item.issue_by || "Unknown";
      const deviceId = String(item.device_id);

      if (!temp[name]) {
        temp[name] = { total: 0, due: 0, in_hand: 0 };
      }

      temp[name].total++;

      if (assignIds.has(deviceId)) {
        temp[name].due++;
      } else {
        temp[name].in_hand++;
      }
    });

    return temp;
  }, [filteredData, assignIds]);

  // 🔹 Search + Sort
  const finalData = useMemo(() => {
    const lower = search.toLowerCase();

    return Object.entries(result)
      .map(([name, value]) => ({ name, ...value }))
      .filter((item) => item.name.toLowerCase().includes(lower))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [result, search]);

  // 🔹 Stats
  const totalDevice = filteredData.length;
  const totalDue = finalData.reduce((a, b) => a + b.due, 0);
  const totalInHand = finalData.reduce((a, b) => a + b.in_hand, 0);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* 🔹 HEADER (Fixed) */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 md:px-6 py-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Title + Stats */}
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              Technician Report
            </h1>

            <div className="flex gap-3 mt-3">
              <div className="bg-gray-50 px-4 py-2 rounded-lg border">
                <p className="text-xs text-gray-500">Total</p>
                <p className="font-semibold">{totalDevice}</p>
              </div>

              <div className="bg-red-50 px-4 py-2 rounded-lg border">
                <p className="text-xs text-red-500">Due</p>
                <p className="font-semibold text-red-600">{totalDue}</p>
              </div>

              <div className="bg-green-50 px-4 py-2 rounded-lg border">
                <p className="text-xs text-green-600">In Hand</p>
                <p className="font-semibold text-green-700">{totalInHand}</p>
              </div>
            </div>
          </div>

          {/* 🔍 Search */}
          <input
            type="text"
            placeholder="Search technician..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 🔹 TABLE / LIST (Scrollable only this part) */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
        {/* Desktop Table */}

        <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
          <div className="max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-4 bg-gray-800 text-white text-sm font-semibold sticky top-0 z-10">
              <p className="p-4">Technician</p>
              <p className="p-4 text-center">Total</p>
              <p className="p-4 text-center text-red-300">Due</p>
              <p className="p-4 text-center text-green-300">In Hand</p>
            </div>

            {finalData.length === 0 ? (
              <p className="p-6 text-center text-gray-500">No data found</p>
            ) : (
              finalData.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 border-t hover:bg-gray-50 transition text-sm"
                >
                  <p className="p-2 font-medium">{item.name}</p>
                  <p className="p-2 text-center">{item.total}</p>
                  <p className="p-2 text-center text-red-500">{item.due}</p>
                  <p className="p-2 text-center text-green-600">
                    {item.in_hand}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 📱 Mobile Card View */}
        <div className="md:hidden space-y-3">
          {finalData.length === 0 ? (
            <p className="text-center text-gray-500">No data found</p>
          ) : (
            finalData.map((item, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800 text-sm">
                    {item.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    Total: {item.total}
                  </span>
                </div>

                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-red-500">Due: {item.due}</span>
                  <span className="text-green-600">
                    In Hand: {item.in_hand}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotPaid;

// "use client";
// import { useState, useMemo } from "react";

// const NotPaid = ({ devices, assignIds }) => {
//   const [search, setSearch] = useState("");

//   // 🔹 Filter retail + incomplete
//   const filteredData = useMemo(() => {
//     return devices.filter(
//       (item) => item.send_to === "Retail" && item.is_complete === false
//     );
//   }, [devices]);

//   // 🔹 Group by technician
//   const result = useMemo(() => {
//     const temp = {};

//     filteredData.forEach((item) => {
//       const name = item.issue_by || "Unknown";
//       const deviceId = String(item.device_id);

//       if (!temp[name]) {
//         temp[name] = { total: 0, due: 0, in_hand: 0 };
//       }

//       temp[name].total++;

//       if (assignIds.has(deviceId)) {
//         temp[name].due++;
//       } else {
//         temp[name].in_hand++;
//       }
//     });

//     return temp;
//   }, [filteredData, assignIds]);

//   // 🔹 Search + Sort
//   const finalData = useMemo(() => {
//     const lower = search.toLowerCase();

//     return Object.entries(result)
//       .map(([name, value]) => ({ name, ...value }))
//       .filter((item) => item.name.toLowerCase().includes(lower))
//       .sort((a, b) => a.name.localeCompare(b.name));
//   }, [result, search]);

//   // 🔹 Stats
//   const totalDevice = filteredData.length;
//   const totalDue = finalData.reduce((a, b) => a + b.due, 0);
//   const totalInHand = finalData.reduce((a, b) => a + b.in_hand, 0);

//   return (
//     <div className="h-screen flex flex-col bg-gray-100">
//       {/* 🔹 HEADER (FIXED) */}
//       <div className="sticky top-0 z-20 bg-white border-b px-4 md:px-6 py-4 shadow-sm">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           {/* Title + Stats */}
//           <div>
//             <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
//               Technician Report
//             </h1>

//             <div className="flex gap-3 mt-3">
//               <div className="bg-gray-50 px-4 py-2 rounded-lg border">
//                 <p className="text-xs text-gray-500">Total</p>
//                 <p className="font-semibold">{totalDevice}</p>
//               </div>

//               <div className="bg-red-50 px-4 py-2 rounded-lg border">
//                 <p className="text-xs text-red-500">Due</p>
//                 <p className="font-semibold text-red-600">{totalDue}</p>
//               </div>

//               <div className="bg-green-50 px-4 py-2 rounded-lg border">
//                 <p className="text-xs text-green-600">In Hand</p>
//                 <p className="font-semibold text-green-700">{totalInHand}</p>
//               </div>
//             </div>
//           </div>

//           {/* 🔍 Search */}
//           <input
//             type="text"
//             placeholder="Search technician..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border rounded-lg px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       {/* 🔹 BODY */}
//       <div className="flex-1 px-4 md:px-6 py-4">
//         {/* 💻 Desktop Table */}
//         <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
//           <div className="max-h-[70vh] overflow-y-auto">
//             {/* 🔹 Sticky Table Header */}
//             <div className="grid grid-cols-4 bg-gray-800 text-white text-sm font-semibold sticky top-0 z-10">
//               <p className="p-4">Technician</p>
//               <p className="p-4 text-center">Total</p>
//               <p className="p-4 text-center text-red-300">Due</p>
//               <p className="p-4 text-center text-green-300">In Hand</p>
//             </div>

//             {/* 🔹 Rows */}
//             {finalData.length === 0 ? (
//               <p className="p-6 text-center text-gray-500">No data found</p>
//             ) : (
//               finalData.map((item, i) => (
//                 <div
//                   key={i}
//                   className="grid grid-cols-4 border-t hover:bg-gray-50 transition text-sm"
//                 >
//                   <p className="p-4 font-medium">{item.name}</p>
//                   <p className="p-4 text-center">{item.total}</p>
//                   <p className="p-4 text-center text-red-500">{item.due}</p>
//                   <p className="p-4 text-center text-green-600">
//                     {item.in_hand}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* 📱 Mobile View */}
//         <div className="md:hidden space-y-3">
//           {finalData.length === 0 ? (
//             <p className="text-center text-gray-500">No data found</p>
//           ) : (
//             finalData.map((item, i) => (
//               <div key={i} className="bg-white rounded-lg shadow-sm border p-3">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-medium text-gray-800 text-sm">
//                     {item.name}
//                   </h3>
//                   <span className="text-xs text-gray-500">
//                     Total: {item.total}
//                   </span>
//                 </div>

//                 <div className="flex justify-between mt-2 text-sm">
//                   <span className="text-red-500">Due: {item.due}</span>
//                   <span className="text-green-600">
//                     In Hand: {item.in_hand}
//                   </span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotPaid;
