"use client";
import { useState, useMemo } from "react";

const NotPaid = ({ devices, assignIds }) => {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return devices.filter(
      (item) => item.send_to === "Retail" && item.is_complete === false
    );
  }, [devices]);

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

  const finalData = useMemo(() => {
    const lower = search.toLowerCase();

    return Object.entries(result)
      .map(([name, value]) => ({ name, ...value }))
      .filter((item) => item.name.toLowerCase().includes(lower))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [result, search]);

  const totalDevice = filteredData.length;
  const totalDue = finalData.reduce((a, b) => a + b.due, 0);
  const totalInHand = finalData.reduce((a, b) => a + b.in_hand, 0);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="sticky top-0 z-10 bg-white border-b px-4 md:px-6 py-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
          <input
            type="text"
            placeholder="Search technician..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
        <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
          <div className="max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-4 bg-gray-600 text-white  text-sm font-semibold sticky top-0 z-10">
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
