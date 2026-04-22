// import axios from "axios";

// async function getData() {
//   const res = await fetch(
//     "https://inventory-manage-three.vercel.app/api/devices/retail",
//     { cache: "no-store" }
//   );
//   return res.json();
// }

// export default async function Retail({ searchParams }) {
//   const { search = "" } = await searchParams;

//   const kanaphuliassignIds = (
//     await axios.get(process.env.RETAIL_ASSIGN_ID, {
//       headers: {
//         Authorization: "BEARER ####cp-!!!!$$sultantracker.com###",
//       },
//     })
//   ).data;

//   const tiktikiAssingIDs = (
//     await axios.get(process.env.TIKTIKI_ASSING_ID, {
//       headers: {
//         Authorization: "BEARER ####cp-!!!!$$sultantracker.com###",
//       },
//     })
//   ).data;

//   const assignSet = new Set([
//     ...new Set([...kanaphuliassignIds, ...tiktikiAssingIDs]),
//   ]);
//   const data = await getData();

//   const filteredData = data.filter(
//     (item) => item.send_to === "Retail" && item.is_complete === false
//   );

//   // 🔹 Build result
//   const result = {};

//   filteredData.forEach((item) => {
//     const name = item.issue_by || "Unknown";
//     const deviceId = String(item.device_id);

//     if (!result[name]) {
//       result[name] = { total: 0, due: 0, in_hand: 0 };
//     }

//     result[name].total++;

//     if (assignSet.has(deviceId)) {
//       result[name].due++;
//     } else {
//       result[name].in_hand++;
//     }
//   });

//   // const finalData = Object.entries(result)
//   //   .map(([name, value]) => ({ name, ...value }))
//   //   .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
//   //   .sort((a, b) => a.name.localeCompare(b.name));

//   const finalData = Object.entries(result)
//     .map(([name, value]) => ({ name, ...value }))
//     .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

//   const totalDevice = filteredData.length;
//   const totalDue = finalData.reduce((a, b) => a + b.due, 0);
//   const totalInHand = finalData.reduce((a, b) => a + b.in_hand, 0);

//   return (
//     <div className="p-4 bg-gray-100 h-full m-w-screen">
//       <div className="bg-white rounded-xl shadow p-4 mb-6 flex justify-between items-center">
//         <div className="flex gap-6">
//           <div>
//             <p className="text-sm text-gray-500">Total Device</p>
//             <p className="text-2xl font-bold">{totalDevice}</p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-500">In Hand</p>
//             <p className="text-2xl font-bold text-green-600">{totalInHand}</p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-500">Due</p>
//             <p className="text-2xl font-bold text-red-500">{totalDue}</p>
//           </div>
//         </div>

//         <form>
//           <input
//             name="search"
//             defaultValue={search}
//             placeholder="Search technician..."
//             className="border px-4 py-2 rounded-lg"
//           />
//         </form>
//       </div>

//       <div className="bg-white rounded-xl shadow overflow-hidden">
//         <div className="grid grid-cols-4 bg-gray-300 text-white font-semibold">
//           <p className="p-4 text-black">Technician</p>
//           <p className="p-4 text-black">Total</p>
//           <p className="p-4 text-red-400">Due</p>
//           <p className="p-4 text-green-400">In Hand</p>
//         </div>
//         <div className="max-h-[500px] overflow-y-auto">
//           {finalData.length === 0 ? (
//             <p className="p-6 text-center text-gray-500">No data found</p>
//           ) : (
//             finalData.map((item, i) => (
//               <div
//                 key={i}
//                 className="grid grid-cols-4 border-t hover:bg-gray-50 transition"
//               >
//                 <p className="p-4">{item.name}</p>
//                 <p className="p-4 font-semibold">{item.total}</p>
//                 <p className="p-4 text-red-500">{item.due}</p>
//                 <p className="p-4 text-green-600">{item.in_hand}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import NotPaid from "@/compontnsts/NotPaid";
import axios from "axios";

export default async function Retail() {
  const [kanaphuliRes, tiktikiRes, data] = await Promise.all([
    axios.get(process.env.RETAIL_ASSIGN_ID, {
      headers: {
        Authorization: "BEARER ####cp-!!!!$$sultantracker.com###",
      },
    }),
    axios.get(process.env.TIKTIKI_ASSING_ID, {
      headers: {
        Authorization: "BEARER ####cp-!!!!$$sultantracker.com###",
      },
    }),
    fetch("https://inventory-manage-three.vercel.app/api/devices/retail", {
      cache: "no-store",
    }).then((res) => res.json()),
  ]);

  const assignSet = new Set([...kanaphuliRes.data, ...tiktikiRes.data]);

  return <NotPaid devices={data} assignIds={assignSet} />;
}
