// import NotPaid from "@/compontnsts/NotPaid";
// import axios from "axios";

// export default async function Retail() {
//   const [kanaphuliRes, tiktikiRes, data] = await Promise.all([
//     axios.get(process.env.RETAIL_ASSIGN_ID, {
//       headers: {
//         Authorization: "BEARER ####cp-!!!!$$sultantracker.com###",
//       },
//     }),
//     axios.get(process.env.TIKTIKI_ASSING_ID, {
//       headers: {
//         Authorization: "BEARER ####cp-!!!!$$sultantracker.com###",
//       },
//     }),
//     fetch("https://inventory-manage-three.vercel.app/api/devices/retail", {
//       cache: "no-store",
//     }).then((res) => res.json()),
//   ]);

//   const assignSet = new Set([...kanaphuliRes.data, ...tiktikiRes.data]);

//   return <NotPaid devices={data} assignIds={assignSet} />;
// }

import NotPaid from "@/compontnsts/NotPaid";
import axios from "axios";

export default async function Retail() {
  const [kanaphuliRes, tiktikiRes, devices, techRes] = await Promise.all([
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

    // ✅ Technician API
    fetch("https://servicecheck.forbit.tech/api/technician").then((res) =>
      res.json()
    ),
  ]);

  // ✅ assign id set
  const assignSet = new Set([...kanaphuliRes.data, ...tiktikiRes.data]);

  // ✅ create map: name → phone
  const techMap = {};
  techRes.forEach((tech) => {
    const key = tech.tech_name.trim().toLowerCase();
    techMap[key] = tech.tech_phone;
  });

  return <NotPaid devices={devices} assignIds={assignSet} techMap={techMap} />;
}
